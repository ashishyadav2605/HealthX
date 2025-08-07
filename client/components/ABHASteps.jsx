'use client';

import { useState, useEffect } from 'react';

export default function ABHASteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: 'ri-link',
      title: 'Link Your ABHA ID',
      description: 'Connect your Ayushman Bharat Health Account for seamless health data integration.',
      image: 'https://readdy.ai/api/search-image?query=Digital%20ABHA%20health%20ID%20card%20linking%20process%20on%20mobile%20device%20with%20Indian%20healthcare%20system%20integration%2C%20modern%20healthcare%20technology%20interface%20with%20blue%20and%20white%20design&width=400&height=300&seq=abha1&orientation=landscape'
    },
    {
      icon: 'ri-upload-cloud-2-line',
      title: 'Upload Medical Documents',
      description: 'Securely upload your medical reports, prescriptions, and health records to the platform.',
      image: 'https://readdy.ai/api/search-image?query=Medical%20documents%20and%20reports%20being%20uploaded%20to%20digital%20healthcare%20platform%2C%20document%20scanning%20and%20upload%20interface%20on%20mobile%20app%20with%20clean%20medical%20design&width=400&height=300&seq=abha2&orientation=landscape'
    },
    {
      icon: 'ri-gift-line',
      title: 'Earn Health Rewards',
      description: 'Get rewarded with better insurance rates and health benefits based on your wellness data.',
      image: 'https://readdy.ai/api/search-image?query=Healthcare%20rewards%20and%20benefits%20interface%20showing%20insurance%20savings%20and%20health%20incentives%2C%20mobile%20app%20displaying%20reward%20points%20and%20healthcare%20benefits%20with%20modern%20design&width=400&height=300&seq=abha3&orientation=landscape'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started with ABHA in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the digital healthcare revolution with your Ayushman Bharat Health Account and unlock personalized health benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start space-x-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                  currentStep === index 
                    ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl flex-shrink-0 transition-colors ${
                  currentStep === index ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 shadow-md'
                }`}>
                  <i className={`${step.icon} text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
              {steps.map((step, index) => (
                <img
                  key={index}
                  src={step.image}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentStep ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                    index === currentStep ? 'bg-blue-600' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}