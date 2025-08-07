'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    'https://www.shutterstock.com/shutterstock/videos/1102837843/thumb/1.jpg?ip=x480',
    'https://www.openaccessgovernment.org/wp-content/uploads/2022/10/dreamstime_m_94292974-scaled.jpg',
    'https://s3.ap-south-1.amazonaws.com/m3india-app-dev/ckeditor/content/medical_report-1516692227.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your Health Data,
              <span className="text-blue-600 block">Secured & Rewarded</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Store your medical reports securely and get personalized health insurance plans based on your health data. Join thousands of users who trust HealthX with their medical information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="transition-transform hover:scale-105">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on App Store"
                    className="h-12 w-auto" // Standard Apple badge aspect ratio
                  />
                </a>
                <a href="#" className="transition-transform hover:scale-105">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12 w-auto" // Standard Google badge aspect ratio
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Healthcare illustration ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
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