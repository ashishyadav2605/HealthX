'use client';

export default function HassleFreeLX() {
  const screenshots = [
    'https://readdy.ai/api/search-image?query=Mobile%20app%20screenshot%20showing%20medical%20report%20upload%20interface%20with%20clean%20modern%20design%2C%20healthcare%20app%20UI%20with%20document%20upload%20buttons%20and%20progress%20indicators%2C%20white%20background%20medical%20interface&width=300&height=600&seq=screen1&orientation=portrait',
    'https://readdy.ai/api/search-image?query=Healthcare%20mobile%20app%20screenshot%20displaying%20health%20data%20dashboard%20with%20charts%20and%20medical%20information%2C%20modern%20medical%20app%20interface%20with%20blue%20accents%20and%20clean%20white%20design&width=300&height=600&seq=screen2&orientation=portrait',
    'https://readdy.ai/api/search-image?query=Mobile%20health%20insurance%20app%20screenshot%20showing%20personalized%20insurance%20plans%20and%20recommendations%2C%20modern%20healthcare%20app%20UI%20with%20policy%20options%20and%20pricing%2C%20clean%20medical%20interface%20design&width=300&height=600&seq=screen3&orientation=portrait'
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