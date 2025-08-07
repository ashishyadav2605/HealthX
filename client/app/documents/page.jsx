'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('original');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showJson, setShowJson] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
      return;
    }

    fetch('https://aarogya-task.onrender.com/api/auth/profile-with-timestamps', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.documents) {
          setDocuments(data.documents);
        } else {
          setError('No documents found');
        }
      })
      .catch(() => setError('Failed to load documents'))
      .finally(() => setLoading(false));
  }, [router]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Function to format JSON text with line breaks
  const formatJsonText = (text) => {
    if (!text) return '';
    return text
      .replace(/\\n/g, '<br />') // Replace \n with line break
      .replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') // Replace \t with spaces
      .replace(/\\"/g, '"'); // Handle escaped quotes if any
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Back to Home
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">My Documents Timeline</h2>
          <p className="text-gray-600">View and manage your uploaded documents</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setViewMode('original')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-200 ${viewMode === 'original' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <i className="ri-file-text-line mr-2"></i>
              View Original
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-gray-200 ${viewMode === 'json' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <i className="ri-code-line mr-2"></i>
              View JSON
            </button>
          </div>
        </div>

        {documents.length > 0 ? (
          <div className="space-y-8">
            {documents.map((doc, index) => {
              const originalName = doc.path.split('\\').pop() || doc.path.split('/').pop();
              return (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-0 h-full flex flex-col items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    {index < documents.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-300"></div>
                    )}
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {originalName}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {new Date(doc.timestamp).toLocaleDateString()} at {new Date(doc.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
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
                      <div className="mt-4">
                        <button
                          onClick={() => setShowJson(showJson === index ? null : index)}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <i className="ri-eye-line mr-2"></i>
                          View JSON
                        </button>
                        {showJson === index && doc.jsonData && (
                          <div className="relative mt-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                              <pre className="text-sm text-gray-800 font-mono" dangerouslySetInnerHTML={{ __html: formatJsonText(doc.jsonData.text) }} />
                            </div>
                            <button
                              onClick={() => copyToClipboard(JSON.stringify(doc.jsonData, null, 2), index)}
                              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                              title="Copy JSON"
                            >
                              {copiedIndex === index ? (
                                <i className="ri-check-line text-green-500"></i>
                              ) : (
                                <i className="ri-file-copy-line"></i>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <i className="ri-folder-open-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No documents yet</h3>
            <p className="text-gray-500 mb-4">Upload your first document to get started</p>
            <button
              onClick={() => router.push('/upload')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <i className="ri-upload-cloud-line mr-2"></i>
              Upload Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}