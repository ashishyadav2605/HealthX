const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.error('MONGO_URI, JWT_SECRET, ADMIN_EMAIL, or ADMIN_PASSWORD not set in .env file');
  process.exit(1);
}

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'https://aarogya-task-ashish.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB connection with retry logic
const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
      break;
    } catch (err) {
      console.error('MongoDB connection error:', err);
      retries -= 1;
      if (retries === 0) {
        console.error('MongoDB connection failed after retries');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};
connectDB();

// Check MongoDB connection status
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  documents: [
    {
      path: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      jsonData: { type: Object },
    },
  ],
  documentCount: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    if (req.path.startsWith('/api/admin') && !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.user = user;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    let baseName = path.basename(file.originalname, ext);
    let newFilename = file.originalname;
    let index = 1;

    while (fs.existsSync(path.join('./uploads/', newFilename))) {
      const nameWithoutExt = path.basename(newFilename, ext);
      newFilename = `${nameWithoutExt}${index}${ext}`;
      index++;
    }

    cb(null, newFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedType = 'application/pdf';
    if (file.mimetype !== allowedType) {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
});

app.get('/', (req, res) => {
  res.send('Welcome to the HealthX API');
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, isAdmin: true });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password strength validation (e.g., minimum 8 characters)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate JWT token after signup
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Update last activity
    user.lastActivity = new Date();
    await user.save();

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('email documents documentCount lastActivity');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      documents: user.documents.map(doc => ({
        path: doc.path,
        timestamp: doc.timestamp,
      })),
      documentCount: user.documentCount,
      lastActivity: user.lastActivity,
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/auth/profile-with-timestamps', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('email documents');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      documents: user.documents.map(doc => ({
        path: doc.path,
        timestamp: doc.timestamp,
        jsonData: doc.jsonData,
      })),
    });
  } catch (error) {
    console.error('Profile with timestamps error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.post('/api/auth/upload', authenticateToken, upload.single('document'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path.replace(/\\/g, '/'); // Normalize path for consistency
    let jsonData = null;

    if (path.extname(filePath).toLowerCase() === '.pdf') {
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        jsonData = { text: pdfData.text };
        fs.writeFileSync(filePath.replace('.pdf', '.json'), JSON.stringify(jsonData, null, 2));
      } catch (pdfError) {
        console.error('PDF processing error:', pdfError);
        return res.status(500).json({ message: 'Error processing PDF: ' + pdfError.message });
      }
    }

    user.documents.push({ path: filePath, timestamp: new Date(), jsonData });
    user.documentCount = user.documents.length;
    user.lastActivity = new Date();
    await user.save();

    res.json({ message: 'Document uploaded successfully', filePath });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select('email documents documentCount lastActivity createdAt');
    res.json({ users });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          totalDocs: { $sum: '$documentCount' },
          activeUsers: {
            $sum: {
              $cond: [{ $gt: ['$lastActivity', new Date(Date.now() - 24 * 60 * 60 * 1000)] }, 1, 0]
            }
          },
          users: { $push: { _id: '$_id', documentCount: '$documentCount', lastActivity: '$lastActivity' } }
        },
      },
    ]);
    res.json(stats.length ? stats[0] : { totalUsers: 0, totalDocs: 0, activeUsers: 0, users: [] });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));