'use client';

import { useState, useEffect } from 'react';

export default function SeamlessAccess() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 45);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const appIcons = [
    { icon: 'ri-smartphone-line', label: 'Mobile App' },
    { icon: 'ri-computer-line', label: 'Web Portal' },
    { icon: 'ri-tablet-line', label: 'Tablet Access' },
    { icon: 'ri-cloud-line', label: 'Cloud Storage' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Seamless Access Across All Devices
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your health data is always within reach. Access HealthX from any device, anywhere, with complete synchronization across all platforms.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <span className="text-gray-700">Real-time data synchronization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <span className="text-gray-700">Cross-platform compatibility</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <span className="text-gray-700">Secure offline access</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 border-2 border-blue-200 rounded-full" style={{
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 1s ease-in-out'
              }}>
                {appIcons.map((app, index) => (
                  <div
                    key={index}
                    className="absolute w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-lg border-2 border-blue-100"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-140px) rotate(-${index * 90}deg)`,
                    }}
                  >
                    <i className={`${app.icon} text-2xl text-blue-600`}></i>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center bg-blue-600 rounded-full shadow-xl">
                  <i className="ri-health-book-line text-3xl text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}