import React, { useState, useRef, useEffect } from 'react';
import { Search, Upload, Download, File, Folder, Image, Video, FileText, MoreHorizontal, Trash2, Star, Clock, Share, Edit, Copy, AlertCircle } from 'lucide-react';

const MyStorage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [activeFileMenu, setActiveFileMenu] = useState(null);
  const [menuPositions, setMenuPositions] = useState({});
  
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
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center text-sm">
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
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
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
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <span className="ml-4 text-sm">35.2 GB of 100 GB</span>
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
    </div>
  );
}

export default MyStorage;