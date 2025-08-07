'use client';

import { useState, useEffect } from 'react';

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    } hover:-translate-y-1 cursor-pointer group`}>
      <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors">
        <i className={`${icon} text-2xl text-blue-600`}></i>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}