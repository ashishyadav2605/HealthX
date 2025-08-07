'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-['Pacifico'] text-blue-400">HealthX</h3>
            <p className="text-gray-400 leading-relaxed">
              Revolutionizing healthcare data management with secure storage, intelligent analysis, and personalized insurance solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors cursor-pointer">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors cursor-pointer">
                <i className="ri-instagram-line text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Pricing</Link></li>
              <li><Link href="#security" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Security</Link></li>
              <li><Link href="#integrations" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Integrations</Link></li>
              <li><Link href="#api" className="text-gray-400 hover:text-white transition-colors cursor-pointer">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="#help" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Help Center</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact Us</Link></li>
              <li><Link href="#documentation" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Documentation</Link></li>
              <li><Link href="#status" className="text-gray-400 hover:text-white transition-colors cursor-pointer">System Status</Link></li>
              <li><Link href="#community" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-blue-400"></i>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-blue-400"></i>
                <span className="text-gray-400">support@healthx.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-map-pin-line text-blue-400 mt-1"></i>
                <span className="text-gray-400">
                  123 Healthcare Ave<br />
                  Medical District, MD 12345
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#privacy" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
              <Link href="#terms" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
              <Link href="#cookies" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Cookie Policy</Link>
            </div>
            <p className="text-gray-400">
              © 2024 HealthX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}