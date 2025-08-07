'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with Health Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest healthcare technology updates, wellness tips, and personalized insurance insights delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap text-lg"
              >
                Subscribe Now
              </button>
            </div>
          </form>
          
          {isSubscribed && (
            <div className="mt-6 p-4 bg-green-500 text-white rounded-full max-w-md mx-auto">
              <i className="ri-check-line mr-2"></i>
              Thank you for subscribing to our newsletter!
            </div>
          )}
          
          <p className="text-blue-100 text-sm mt-6">
            <i className="ri-lock-line mr-1"></i>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}