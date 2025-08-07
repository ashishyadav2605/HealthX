'use client';

import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose HealthX?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience healthcare technology that puts you first with our innovative features designed for modern healthcare management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="ri-flashlight-line"
            title="Convenient"
            description="Access your medical reports anytime, anywhere. Upload, store, and manage all your health documents in one secure place with just a few taps."
            delay={0}
          />
          <FeatureCard
            icon="ri-focus-3-line"
            title="Accurate"
            description="AI-powered analysis of your health data provides precise insights and personalized insurance recommendations based on your actual medical history."
            delay={200}
          />
          <FeatureCard
            icon="ri-speed-line"
            title="Efficient"
            description="Streamlined processes that save you time. From document upload to insurance approval, everything happens faster with HealthX technology."
            delay={400}
          />
        </div>
      </div>
    </section>
  );
}