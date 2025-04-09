import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Upload, Download, File, Folder, Image, Video, FileText, 
  MoreHorizontal, Trash2, Star, Clock, Share, Edit, Copy, AlertCircle,
  X, FileUp, FolderUp, Film, Paperclip, Music
} from 'lucide-react';
import Header from '../../components/dashboard/Header';

// Main Storage Component
export default function MyStorage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [activeFileMenu, setActiveFileMenu] = useState(null);
  const [menuPositions, setMenuPositions] = useState({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const headerMenuRef = useRef(null);
  const fileMenuRefs = useRef({});
  const buttonRefs = useRef({});
  
  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target)) {
        setHeaderMenuOpen(false);
      }
      
      if (activeFileMenu !== null && 
          fileMenuRefs.current[activeFileMenu] && 
          !fileMenuRefs.current[activeFileMenu].contains(event.target)) {
        setActiveFileMenu(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeFileMenu]);

  // Calculate if menu should open upwards
  const calculateMenuPosition = (id) => {
    if (!buttonRefs.current[id]) return { top: false };
    
    const buttonRect = buttonRefs.current[id].getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    
    // If space below is less than 200px, open menu upwards
    return { top: spaceBelow < 200 };
  };
  
  // Sample data - replace with your actual data
  const files = [
    { id: 1, name: 'Project Presentation.pptx', type: 'document', size: '2.4 MB', modified: 'Apr 5, 2025', starred: true },
    { id: 2, name: 'Team Photo.jpg', type: 'image', size: '3.8 MB', modified: 'Apr 3, 2025', starred: false },
    { id: 3, name: 'Product Demo.mp4', type: 'video', size: '18.2 MB', modified: 'Apr 2, 2025', starred: true },
    { id: 4, name: 'Financial Report.pdf', type: 'document', size: '1.7 MB', modified: 'Mar 28, 2025', starred: false },
    { id: 5, name: 'Code Backup.zip', type: 'other', size: '5.3 MB', modified: 'Mar 25, 2025', starred: false },
    { id: 6, name: 'Meeting Notes.docx', type: 'document', size: '0.5 MB', modified: 'Mar 20, 2025', starred: false },
  ];

  // Filter files based on selected filter
  const filteredFiles = selectedFilter === 'all' 
    ? files 
    : files.filter(file => 
        selectedFilter === 'starred' ? file.starred : file.type === selectedFilter
      );

  // Icon mapping for file types
  const getFileIcon = (type) => {
    switch(type) {
      case 'document': return <FileText className="text-blue-500" />;
      case 'image': return <Image className="text-red-500" />;
      case 'video': return <Video className="text-purple-500" />;
      default: return <File className="text-yellow-500" />;
    }
  };

  // Toggle file action menu
  const toggleFileMenu = (id) => {
    if (activeFileMenu === id) {
      setActiveFileMenu(null);
      return;
    }
    
    // Calculate position before opening
    const position = calculateMenuPosition(id);
    setMenuPositions(prev => ({ ...prev, [id]: position }));
    setActiveFileMenu(id);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header />
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header with search and actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">My Storage</h1>
          <div className="ml-6 bg-gray-800 rounded-md flex items-center px-3 py-1">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-64"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md flex items-center text-sm hover:scale-104 transition duration-200"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </button>
          <div className="relative">
            <button 
              className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md"
              onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
              ref={el => buttonRefs.current['header'] = el}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {/* Header Action Menu */}
            {headerMenuOpen && (
              <div 
                ref={headerMenuRef}
                className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700"
              >
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                  <Folder className="h-4 w-4 mr-3" />
                  New Folder
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
                  onClick={() => {
                    setHeaderMenuOpen(false);
                    setIsUploadModalOpen(true);
                  }}
                >
                  <Upload className="h-4 w-4 mr-3" />
                  Upload Files
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                  <Upload className="h-4 w-4 mr-3" />
                  Upload Folder
                </button>
                <hr className="my-1 border-gray-700" />
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                  <Share className="h-4 w-4 mr-3" />
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Storage usage stats */}
      <div className="p-4 bg-gray-800 m-4 rounded-lg">
        <p className="text-sm font-medium text-gray-300 mb-2">Storage Usage</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <span className="block ml-4 text-sm">35.2 GB of 100 GB</span>
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="flex px-4 border-b border-gray-800">
        <button 
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 text-sm font-medium ${selectedFilter === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          All Files
        </button>
        <button 
          onClick={() => setSelectedFilter('document')}
          className={`px-4 py-2 text-sm font-medium ${selectedFilter === 'document' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Documents
        </button>
        <button 
          onClick={() => setSelectedFilter('image')}
          className={`px-4 py-2 text-sm font-medium ${selectedFilter === 'image' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Images
        </button>
        <button 
          onClick={() => setSelectedFilter('video')}
          className={`px-4 py-2 text-sm font-medium ${selectedFilter === 'video' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Videos
        </button>
        <button 
          onClick={() => setSelectedFilter('other')}
          className={`px-4 py-2 text-sm font-medium ${selectedFilter === 'other' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Others
        </button>
        <button 
          onClick={() => setSelectedFilter('starred')}
          className={`px-4 py-2 text-sm font-medium ${selectedFilter === 'starred' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'} flex items-center`}
        >
          <Star className="h-4 w-4 mr-1" /> Starred
        </button>
      </div>
      
      {/* Files table */}
      <div className="flex-1 p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="text-left py-3 pl-4 font-medium">Name</th>
              <th className="text-left py-3 font-medium">Size</th>
              <th className="text-left py-3 font-medium">Modified</th>
              <th className="text-right py-3 pr-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr key={file.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="py-3 pl-4">
                  <div className="flex items-center">
                    {getFileIcon(file.type)}
                    <span className="ml-3">{file.name}</span>
                    {file.starred && <Star className="h-4 w-4 text-yellow-500 ml-2 fill-yellow-500" />}
                  </div>
                </td>
                <td className="py-3 text-gray-400">{file.size}</td>
                <td className="py-3 text-gray-400">{file.modified}</td>
                <td className="py-3 pr-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <Star className={`h-4 w-4 ${file.starred ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                    </button>
                    <div className="relative">
                      <button 
                        className="p-1 hover:bg-gray-700 rounded"
                        onClick={() => toggleFileMenu(file.id)}
                        ref={el => buttonRefs.current[file.id] = el}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      
                      {/* File Action Menu - With smart positioning */}
                      {activeFileMenu === file.id && (
                        <div 
                          ref={el => fileMenuRefs.current[file.id] = el}
                          className={`absolute right-0 py-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700 ${
                            menuPositions[file.id]?.top ? 'bottom-8' : 'top-8'
                          }`}
                        >
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                            <Download className="h-4 w-4 mr-3" />
                            Download
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                            <Share className="h-4 w-4 mr-3" />
                            Share
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                            <Copy className="h-4 w-4 mr-3" />
                            Copy Link
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                            <Edit className="h-4 w-4 mr-3" />
                            Rename
                          </button>
                          <hr className="my-1 border-gray-700" />
                          <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center">
                            <Trash2 className="h-4 w-4 mr-3" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer stats */}
      <div className="p-3 border-t border-gray-800 flex justify-between text-sm text-gray-400">
        <div>
          {filteredFiles.length} files
        </div>
        <div>
          Total: {filteredFiles.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(1)} MB
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
    </div>
  );
}

// Upload Modal Component
function UploadModal({ onClose }) {
  const [uploadType, setUploadType] = useState('file');
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  // Process the files
  const handleFiles = (newFiles) => {
    const updatedFiles = [...files];
    
    newFiles.forEach(file => {
      // Check if file already exists in the list
      if (!files.some(f => f.name === file.name && f.size === file.size)) {
        updatedFiles.push(file);
        // Initialize progress for this file
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }));
      }
    });
    
    setFiles(updatedFiles);
    
    // Simulate upload progress for each file
    updatedFiles.forEach(file => {
      if (uploadProgress[file.name] === 0) {
        simulateFileUpload(file.name);
      }
    });
  };

  // Remove a file from the list
  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const updated = {...prev};
      delete updated[fileName];
      return updated;
    });
  };

  // Simulate file upload progress
  const simulateFileUpload = (fileName) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileName]: Math.floor(progress)
      }));
    }, 300);
  };

  // Get file type icon
  const getFileTypeIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    const videoTypes = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
    const documentTypes = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'];
    const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
    const audioTypes = ['mp3', 'wav', 'ogg', 'flac', 'aac'];
    
    if (imageTypes.includes(extension)) return <Image className="text-red-500" />;
    if (videoTypes.includes(extension)) return <Film className="text-purple-500" />;
    if (documentTypes.includes(extension)) return <FileText className="text-blue-500" />;
    if (archiveTypes.includes(extension)) return <Paperclip className="text-yellow-500" />;
    if (audioTypes.includes(extension)) return <Music className="text-green-500" />;
    
    return <File className="text-gray-400" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl overflow-hidden border border-gray-800 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-medium">Upload Files</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Upload Type Selector */}
        <div className="flex border-b border-gray-800">
          <button 
            onClick={() => setUploadType('file')}
            className={`px-6 py-3 text-sm font-medium flex items-center ${uploadType === 'file' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          >
            <FileUp className="h-4 w-4 mr-2" />
            Upload Files
          </button>
          <button 
            onClick={() => setUploadType('folder')}
            className={`px-6 py-3 text-sm font-medium flex items-center ${uploadType === 'folder' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          >
            <FolderUp className="h-4 w-4 mr-2" />
            Upload Folder
          </button>
        </div>
        
        {/* Upload Area */}
        <div className="p-6">
          {/* Drag & Drop Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragging ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-700'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-500" />
            <p className="mt-4 text-sm text-gray-300">
              Drag and drop files here, or 
              <button 
                className="text-blue-500 hover:text-blue-400 ml-1"
                onClick={() => fileInputRef.current.click()}
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
              webkitdirectory={uploadType === 'folder' ? '' : undefined}
              directory={uploadType === 'folder' ? '' : undefined}
            />
          </div>
          
          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Uploading {files.length} {files.length === 1 ? 'file' : 'files'}</h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div key={index} className="bg-gray-800 rounded-md p-3 flex items-center">
                    <div className="flex-shrink-0">
                      {getFileTypeIcon(file.name)}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-start">
                        <div className="overflow-hidden">
                          <p className="text-sm truncate">{file.name}</p>
                          <p className="text-xs text-gray-400">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFile(file.name)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-gray-400">
                          {uploadProgress[file.name] || 0}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-800 bg-gray-800">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button 
            className={`ml-3 px-4 py-2 text-sm rounded-md ${
              files.length === 0 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={files.length === 0}
          >
            Upload {files.length > 0 ? `(${files.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}