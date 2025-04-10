import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, FileUp, FolderUp, Upload, Image, Film, FileText, Paperclip, Music, File } from 'lucide-react';
import { getUploadModalFileTypeIcon } from '../../ui/fileIcons'; // Use the utility

const UploadModal = ({ onClose }) => {
  const [uploadType, setUploadType] = useState('file');
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const uploadIntervals = useRef({}); // Store references to all upload intervals

  // Cleanup intervals when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any running intervals on unmount
      Object.values(uploadIntervals.current).forEach(intervalId => {
        clearInterval(intervalId);
      });
    };
  }, []);

  // Handle changing upload type - reset state as needed
  const handleUploadTypeChange = useCallback((type) => {
    setUploadType(type);
    // Reset file input value when changing type to ensure it works correctly
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Simulate file upload progress
  const simulateFileUpload = useCallback((fileName) => {
    // Clear any existing interval for this file
    if (uploadIntervals.current[fileName]) {
      clearInterval(uploadIntervals.current[fileName]);
    }

    let progress = uploadProgress[fileName] || 0;
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        // Check if the file still exists in the state before updating progress
        if (prev[fileName] === undefined) {
          clearInterval(interval);
          delete uploadIntervals.current[fileName];
          return prev;
        }
        
        progress += Math.random() * 15 + 5;
        const newProgress = Math.min(100, Math.floor(progress));
        
        if (newProgress === 100) {
          clearInterval(interval);
          delete uploadIntervals.current[fileName];
        }
        
        return { ...prev, [fileName]: newProgress };
      });
    }, 250);

    // Store the interval reference
    uploadIntervals.current[fileName] = interval;
  }, [uploadProgress]);

  // Process added files
  const handleFiles = useCallback((newFiles) => {
    if (!newFiles || newFiles.length === 0) return;
    
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const currentProgress = { ...uploadProgress };
      
      // Filter to only add files that don't already exist
      const filesToAdd = Array.from(newFiles).filter(newFile => 
        !prevFiles.some(existingFile => 
          existingFile.name === newFile.name && existingFile.size === newFile.size
        )
      );
      
      // Initialize progress for new files
      filesToAdd.forEach(file => {
        updatedFiles.push(file);
        currentProgress[file.name] = 0;
      });
      
      // Update progress state if we added any files
      if (filesToAdd.length > 0) {
        setUploadProgress(currentProgress);
      }
      
      return updatedFiles;
    });
  }, [uploadProgress]);

  // Start actual upload process
  const startUpload = useCallback(() => {
    setUploading(true);
    
    // Start simulation for files that haven't been processed yet
    files.forEach(file => {
      // Only start simulation for files that aren't complete
      if ((uploadProgress[file.name] || 0) < 100) {
        simulateFileUpload(file.name);
      }
    console.log(files)
    });
  }, [files, uploadProgress, simulateFileUpload]);

  // Drag Handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault(); 
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, [handleFiles]);

  // Handle file selection from input
  const handleFileSelect = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
    
    // Always reset input value to allow reselecting the same files
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [handleFiles]);

  // Remove a file
  const removeFile = useCallback((fileName) => {
    // Stop any ongoing upload simulation for this file
    if (uploadIntervals.current[fileName]) {
      clearInterval(uploadIntervals.current[fileName]);
      delete uploadIntervals.current[fileName];
    }
    
    // Remove the file from files state
    setFiles(prev => prev.filter(file => file.name !== fileName));
    
    // Remove the progress entry
    setUploadProgress(prev => {
      const updated = {...prev};
      delete updated[fileName];
      return updated;
    });
  }, []);

  // Reset upload state for new batch
  const resetUploadState = useCallback(() => {
    setUploading(false);
    // Clear completed files
    setFiles(prev => prev.filter(file => (uploadProgress[file.name] || 0) < 100));
  }, [uploadProgress]);

  // Calculate upload statistics
  const pendingFiles = files.filter(file => (uploadProgress[file.name] || 0) < 100);
  const completedFiles = files.filter(file => (uploadProgress[file.name] || 0) === 100);
  const allComplete = files.length > 0 && pendingFiles.length === 0;
  
  // Effect to reset uploading state when all files are complete
  useEffect(() => {
    if (uploading && allComplete) {
      // Reset after a small delay to show completion
      const timer = setTimeout(() => {
        setUploading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [uploading, allComplete]);

  // Determine button state and text
  let uploadButtonText = 'Upload';
  if (pendingFiles.length > 0) {
    uploadButtonText = `Upload (${pendingFiles.length})`;
  }
  if (uploading) {
    uploadButtonText = pendingFiles.length > 0 
      ? `Uploading (${pendingFiles.length})` 
      : 'Processing...';
  }
  if (allComplete) {
    uploadButtonText = 'Complete';
  }

  const isUploadDisabled = files.length === 0 || pendingFiles.length === 0 || (uploading && !allComplete);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl flex flex-col max-h-[90vh] border border-gray-800 shadow-xl">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-medium text-white">Upload Files</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Upload Type Selector */}
        <div className="flex-shrink-0 flex border-b border-gray-800">
          <button 
            onClick={() => handleUploadTypeChange('file')}
            className={`px-6 py-3 text-sm font-medium flex items-center ${uploadType === 'file' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <FileUp className="h-4 w-4 mr-2" /> Upload Files
          </button>
          <button 
            onClick={() => handleUploadTypeChange('folder')}
            className={`px-6 py-3 text-sm font-medium flex items-center ${uploadType === 'folder' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <FolderUp className="h-4 w-4 mr-2" /> Upload Folder
          </button>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto p-6">
          {/* Drag & Drop Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragging ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-gray-600'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 mx-auto text-gray-500" />
            <p className="mt-3 text-sm text-gray-300">
              Drag and drop {uploadType}s here, or{' '}
              <button 
                type="button"
                className="font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 rounded"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Maximum file size: 500MB
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              multiple={uploadType === 'file'}
              {...(uploadType === 'folder' ? { webkitdirectory: "true", directory: "true" } : {})}
            />
          </div>
          
          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3 text-white">
                {uploading 
                  ? `Uploading ${files.length} ${files.length === 1 ? uploadType : `${uploadType}s`}` 
                  : `Selected ${files.length} ${files.length === 1 ? uploadType : `${uploadType}s`}`}
              </h3>
              
              {/* File list with proper scrolling */}
              <div className="space-y-3"> 
                {files.map((file) => (
                  <div 
                    key={`${file.name}-${file.lastModified}-${file.size}`} 
                    className="bg-gray-800 rounded-md p-3 flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {getUploadModalFileTypeIcon(file.name)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-start gap-2">
                        <div className="overflow-hidden flex-grow">
                          <p className="text-sm text-white truncate" title={file.name}>{file.name}</p>
                          <p className="text-xs text-gray-400">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFile(file.name)}
                          className="text-gray-500 hover:text-red-500 flex-shrink-0"
                          title="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>
                            {(uploadProgress[file.name] || 0) === 100 
                              ? "Complete" 
                              : uploading ? "Uploading..." : "Queued"}
                          </span>
                          <span>{uploadProgress[file.name] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-width duration-300 ease-linear ${
                              (uploadProgress[file.name] || 0) === 100 ? 'bg-green-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> {/* End Scrollable Content Area */}
        
        {/* Footer Actions */}
        <div className="flex-shrink-0 flex justify-end px-6 py-4 border-t border-gray-800 bg-gray-800/50">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-md border border-gray-700 hover:bg-gray-700"
          >
            Cancel
          </button>
          
          {/* Upload button with proper state handling */}
          <button 
            type="button"
            className={`ml-3 px-4 py-2 text-sm rounded-md transition-colors ${
              isUploadDisabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : allComplete
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={isUploadDisabled}
            onClick={allComplete ? resetUploadState : startUpload}
          >
            {uploadButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;