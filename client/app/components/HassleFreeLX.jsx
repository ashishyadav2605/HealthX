'use client';

export default function HassleFreeLX() {
  const screenshots = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUjFma9BfjdGY8tFFqWnqKWAymjVfFmQ59dw&s',
    'https://www.ihhhealthcare.com/images/default-source/ihh/myhealth360/landing02.webp?sfvrsn=43a3696e_1',
    'https://cdn.masto.host/iosdevspace/media_attachments/files/109/835/598/026/288/589/original/558aa23f9061f143.png'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex space-x-6 justify-center">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                style={{
                  transform: `translateY(${index * 20}px) rotate(${(index - 1) * 5}deg)`,
                }}
              >
                <div className="w-48 h-96 bg-white rounded-3xl shadow-2xl p-2">
                  <img
                    src={screenshot}
                    alt={`App screenshot ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Hassle-Free User Experience
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Designed with simplicity in mind. Our intuitive interface makes managing your health data effortless, from uploading documents to accessing insurance plans.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quick Upload</h3>
                  <p className="text-gray-600">Simply snap a photo or select files to upload your medical reports instantly.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Smart Analysis</h3>
                  <p className="text-gray-600">AI analyzes your health data to provide personalized insights and recommendations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Get Coverage</h3>
                  <p className="text-gray-600">Receive tailored insurance plans based on your actual health profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}