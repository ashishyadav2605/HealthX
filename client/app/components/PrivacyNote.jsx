'use client';

export default function PrivacyNote() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://www.baker.edu/wp-content/uploads/keepYourComputerSafe-main.jpg"
              alt="Privacy and Security"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-blue-600/10 rounded-2xl"></div>
            <div className="absolute top-6 left-6 bg-white rounded-full p-3 shadow-lg">
              <i className="ri-shield-check-line text-2xl text-green-600"></i>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <i className="ri-lock-line text-xl text-blue-600"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Your Privacy Matters</h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We understand the sensitivity of your health data. HealthX employs enterprise-grade security measures to ensure your medical information remains private and secure at all times.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0 mt-1">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">End-to-End Encryption</h3>
                  <p className="text-gray-600">All your medical data is encrypted both in transit and at rest using military-grade encryption standards.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0 mt-1">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">HIPAA Compliance</h3>
                  <p className="text-gray-600">Fully compliant with healthcare data protection regulations and international privacy standards.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0 mt-1">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Your Data, Your Control</h3>
                  <p className="text-gray-600">You have complete control over who can access your data and can revoke permissions at any time.</p>
                </div>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
              Learn More About Privacy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}