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
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: [
    {
      path: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      jsonData: { type: Object },
    },
  ],
  documentCount: { type: Number, default: 0 }, // Added for stats
  lastActivity: { type: Date, default: Date.now }, // Added for stats
});

const User = mongoose.model('User', userSchema);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });

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
  destination: './uploads/',
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    let uniqueName = originalName;

    if (fs.existsSync(path.join('./uploads/', uniqueName))) {
      let counter = 1;
      const ext = path.extname(originalName);
      const nameWithoutExt = path.basename(originalName, ext);
      while (fs.existsSync(path.join('./uploads/', `${nameWithoutExt}_${counter}${ext}`))) {
        counter++;
      }
      uniqueName = `${nameWithoutExt}_${counter}${ext}`;
    }
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
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
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('email documents.path');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ email: user.email, documents: user.documents.map(doc => doc.path) });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/auth/profile-with-timestamps', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('email documents');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ email: user.email, documents: user.documents });
  } catch (error) {
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

    const filePath = req.file.path;
    let jsonData = null;

    if (path.extname(filePath).toLowerCase() === '.pdf') {
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        jsonData = { text: pdfData.text };
        fs.writeFileSync(filePath.replace('.pdf', '.json'), JSON.stringify(jsonData, null, 2));
      } catch (pdfError) {
        return res.status(500).json({ message: 'Error processing PDF: ' + pdfError.message });
      }
    }

    user.documents.push({ path: filePath, timestamp: fs.statSync(filePath).birthtime, jsonData });
    user.documentCount = user.documents.length; // Update document count
    user.lastActivity = new Date(); // Update last activity
    await user.save();
    res.json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Admin routes
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select('email documents documentCount lastActivity createdAt');
    res.json({ users });
  } catch (error) {
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
          totalDocs: { $sum: '$documents.length' },
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
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));