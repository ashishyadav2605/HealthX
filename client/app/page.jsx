'use client';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import NetworkFlowAnimation from './components/NetworkFlowAnimation';
import SeamlessAccess from './components/SeamlessAccess';
import HassleFreeLX from './components/HassleFreeLX';
import ABHASteps from './components/ABHASteps';
import Feedbacks from './components/Feedbacks';
import PrivacyNote from './components/PrivacyNote';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <NetworkFlowAnimation />
      <SeamlessAccess />
      <HassleFreeLX />
      <ABHASteps />
      <Feedbacks />
      <PrivacyNote />
      <Newsletter />
      <Footer />
    </div>
  );
}