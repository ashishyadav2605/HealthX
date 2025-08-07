'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const cachedEmail = localStorage.getItem('userEmail');
    if (token && cachedEmail) {
      setIsLoggedIn(true);
      setUserEmail(cachedEmail);
      setLoading(false);
    } else if (token) {
      fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setIsLoggedIn(true);
            setUserEmail(data.email);
            localStorage.setItem('userEmail', data.email);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userEmail');
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setShowProfileMenu(false);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleRestrictedAction = (action, path) => {
    if (!isLoggedIn) {
      toast.info(`Please log in to ${action}`, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      router.push('/auth');
    } else {
      router.push(path);
    }
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleDocumentsClick = () => {
    handleRestrictedAction('view documents', '/documents');
  };

  const handleUploadDocument = () => {
    handleRestrictedAction('upload a document', '/upload');
  };

  const handleContactClick = () => {
    handleRestrictedAction('contact us', '#contact');
  };

  if (loading) {
    return (
      <header className="w-full bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-['Pacifico'] text-blue-600">HealthX</h1>
            </div>
            <div className="animate-pulse flex items-center space-x-4">
              <div className="w-24 h-8 bg-gray-200 rounded"></div>
              <div className="md:hidden w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header className="w-full bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-['Pacifico'] text-blue-600">HealthX</h1>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={handleDocumentsClick}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  My Documents
                </button>
                <button
                  onClick={handleUploadDocument}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap text-left"
                >
                  Upload Document
                </button>
                <button
                  onClick={handleContactClick}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Contact Us
                </button>
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="ri-user-line text-blue-600"></i>
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">{userEmail.split('@')[0]}</span>
                      <i className={`ri-arrow-down-s-line transition-transform ${showProfileMenu ? 'transform rotate-180' : ''}`}></i>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                          <p className="text-xs text-gray-500 mt-1">Welcome back!</p>
                        </div>
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="mr-3 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                              <i className="ri-logout-box-r-line text-red-500"></i>
                            </div>
                            <div>
                              <p className="font-medium">Logout</p>
                              <p className="text-xs text-gray-400">Sign out of your account</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center"
                  >
                    <i className="ri-login-box-line mr-2"></i>
                    Signup/Login
                  </Link>
                )}
              </div>
            </nav>
            <div className="md:hidden flex items-center">
              {isLoggedIn ? (
                <div className="relative mr-2">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <i className="ri-user-line text-blue-600"></i>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50 overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                      </div>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                        >
                          <i className="ri-logout-box-r-line text-red-500 mr-3"></i>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors mr-2 whitespace-nowrap flex items-center"
                >
                  <i className="ri-login-box-line mr-1"></i>
                  Login
                </Link>
              )}
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <i className={`text-xl ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 space-y-1 sm:px-6">
              <button
                onClick={handleDocumentsClick}
                className="w-full flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 text-base font-medium transition-colors rounded-lg hover:bg-gray-50 text-left"
              >
                <i className="ri-folder-line text-blue-500 mr-3"></i>
                My Documents
              </button>
              <button
                onClick={handleUploadDocument}
                className="w-full flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 text-base font-medium transition-colors rounded-lg hover:bg-gray-50 text-left"
              >
                <i className="ri-upload-cloud-line text-green-500 mr-3"></i>
                Upload Document
              </button>
              <button
                onClick={handleContactClick}
                className="w-full flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 text-base font-medium transition-colors rounded-lg hover:bg-gray-50 text-left"
              >
                <i className="ri-contacts-line mr-3"></i>
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}