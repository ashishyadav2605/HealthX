'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setSuccess('');
      setUploadComplete(false);
    }
  };

  const handleFileChange = (e) => {
    handleFileSelect(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to upload documents');
      router.push('/auth');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('https://aarogya-task.onrender.com/api/auth/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setSuccess('Document uploaded successfully!');
      setUploadComplete(true);
      setFile(null);
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Upload Document</h2>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div
            className="space-y-2"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-1">
              Select a document
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="ri-upload-cloud-2-line text-3xl text-blue-500 mb-2"></i>
                  <p className="text-sm text-gray-500">
                    {fileName || (
                      <>
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  {fileName && (
                    <p className="text-xs text-gray-400 mt-1">
                      {Math.round(file.size / 1024)} KB
                    </p>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
              <i className="ri-checkbox-circle-line mr-2"></i>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading || !file || uploadComplete}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
              isUploading || !file || uploadComplete
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isUploading ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Uploading...
              </>
            ) : uploadComplete ? (
              <>
                <i className="ri-check-line mr-2"></i>
                Upload Complete
              </>
            ) : (
              <>
                <i className="ri-upload-line mr-2"></i>
                Upload Document
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Supported formats: PDF, DOCX, JPG, PNG</p>
          <p className="mt-1">Max file size: 5MB</p>
        </div>
      </div>
    </div>
  );
}
