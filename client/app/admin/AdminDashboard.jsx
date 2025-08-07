'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('original');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchAdminData(token);
  }, [router]);

  const fetchAdminData = async (token) => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch('https://aarogya-task.onrender.com/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('https://aarogya-task.onrender.com/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!usersRes.ok || !statsRes.ok) {
        if (usersRes.status === 403 || statsRes.status === 403) {
          localStorage.removeItem('token');
          router.push('/admin/login');
          toast.error('Session expired. Please log in again.');
          return;
        }
        throw new Error('Failed to fetch admin data');
      }

      const [usersData, statsData] = await Promise.all([
        usersRes.json(),
        statsRes.json(),
      ]);

      setUsers(usersData.users.map(user => ({
        ...user,
        ...statsData.users?.find(u => u._id === user._id) || {}
      })));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
    toast.success('Logged out successfully');
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const viewUserDocuments = (user) => {
    setSelectedUser(user);
  };

  const backToUsers = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <i className="ri-arrow-left-line mr-1"></i>
                Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <i className="ri-logout-box-line mr-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedUser ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {users.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <i className="ri-user-line text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Documents</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {users.reduce((sum, user) => sum + (user.documentCount || 0), 0)}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <i className="ri-file-text-line text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Recent Activity</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {users.filter(u => new Date(u.lastActivity) > new Date(Date.now() - 86400000)).length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Active in last 24h</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <i className="ri-pulse-line text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Registered Users</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documents
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <i className="ri-user-line text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.documentCount || 0}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.lastActivity ? new Date(user.lastActivity).toLocaleString() : 'Never'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => viewUserDocuments(user)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View Docs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <button
                  onClick={backToUsers}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
                >
                  <i className="ri-arrow-left-line mr-1"></i>
                  Back to Users
                </button>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Documents for {selectedUser.email}
                </h2>
              </div>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => setViewMode('original')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-200 ${
                    viewMode === 'original' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-file-text-line mr-2"></i>
                  View Original
                </button>
                <button
                  onClick={() => setViewMode('json')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-gray-200 ${
                    viewMode === 'json' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-code-line mr-2"></i>
                  View JSON
                </button>
              </div>
            </div>

            {selectedUser.documents && selectedUser.documents.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {selectedUser.documents.map((doc, index) => (
                  <div key={index} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Document #{index + 1}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Uploaded: {new Date(doc.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {viewMode === 'json' && (
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(doc.jsonData, null, 2), index)}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          title="Copy JSON"
                        >
                          {copiedIndex === index ? (
                            <i className="ri-check-line text-green-500"></i>
                          ) : (
                            <i className="ri-file-copy-line"></i>
                          )}
                        </button>
                      )}
                    </div>

                    {viewMode === 'original' ? (
                      <div className="mt-4">
                        <a
                          href={`https://aarogya-task.onrender.com/${doc.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <i className="ri-eye-line mr-2"></i>
                          View Document
                        </a>
                      </div>
                    ) : (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                        <pre className="text-sm text-gray-800 font-mono">
                          {doc.jsonData ? (
                            <code className="whitespace-pre-wrap break-words">
                              {JSON.stringify(doc.jsonData, null, 2)}
                            </code>
                          ) : (
                            'No JSON data available'
                          )}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-folder-open-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No documents found
                </h3>
                <p className="text-gray-500">
                  This user hasn't uploaded any documents yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}