import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Header from '../../components/dashboard/Header';
import StorageHeader from '../../components/dashboard/storage/StorageHeader';
import StorageUsage from '../../components/dashboard/storage/StorageUsage';
import FileFilters from '../../components/dashboard/storage/FileFilters';
import FileList from '../../components/dashboard/storage/FileList';
import UploadModal from '../../components/dashboard/storage/UploadModal';
// Assuming sample data or fetching logic would be here or imported
import { sampleFiles } from '../../data/sampleFiles';

export default function MyStorage() {
  const [files, setFiles] = useState(sampleFiles); // Load initial data
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeFileMenu, setActiveFileMenu] = useState(null); // Holds the ID of the open menu
  const [menuPositions, setMenuPositions] = useState({}); // Stores { fileId: { top: boolean } }
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter files based on selected filter
  const filteredFiles = useMemo(() => {
      if (selectedFilter === 'all') return files;
      return files.filter(file => 
          selectedFilter === 'starred' ? file.starred : file.type === selectedFilter
      );
  }, [files, selectedFilter]);

  // --- Menu Logic ---

  // Calculate if menu should open upwards
  const calculateMenuPosition = (buttonElement) => {
    if (!buttonElement) return { top: false };
    
    const buttonRect = buttonElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const menuHeightEstimate = 200; // Estimate menu height in pixels
    
    // Open upwards if not enough space below
    return { top: spaceBelow < menuHeightEstimate && buttonRect.top > menuHeightEstimate };
  };

  // Toggle file action menu
  const toggleFileMenu = useCallback((id, buttonElement) => {
      if (activeFileMenu === id) {
          setActiveFileMenu(null); // Close if clicking the same menu button again
      } else {
          if (id !== null && buttonElement) {
              const position = calculateMenuPosition(buttonElement);
              setMenuPositions(prev => ({ ...prev, [id]: position }));
          }
          setActiveFileMenu(id); // Open the new menu (or null to close all)
      }
  }, [activeFileMenu]); // Dependency on activeFileMenu

  // Close file menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {

        if (activeFileMenu !== null) {
           // A simple heuristic: check if the click target is NOT a 'more options' button
           const isMoreButton = event.target.closest('button[title="More actions"]'); 
           if (!isMoreButton) {

           }
       }
     }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
 }, [activeFileMenu]); // Rerun effect if activeFileMenu changes

  // --- File Action Handlers ---
  // Wrap handlers in useCallback if they are passed down to memoized components (like FileList/FileListItem if they use React.memo)
  
  const handleDownload = useCallback((fileId) => {
    console.log(`Download file ${fileId}`);
    // Add actual download logic
  }, []);

  const handleStar = useCallback((fileId) => {
    console.log(`Toggle star for file ${fileId}`);
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { ...file, starred: !file.starred } : file
      )
    );
  }, []);
  
  const handleShare = useCallback((fileId) => console.log(`Share file ${fileId}`), []);
  const handleCopyLink = useCallback((fileId) => console.log(`Copy link for file ${fileId}`), []);
  const handleRename = useCallback((fileId) => console.log(`Rename file ${fileId}`), []);
  const handleDelete = useCallback((fileId) => {
      console.log(`Delete file ${fileId}`);
      // Add confirmation dialog logic here ideally
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      setActiveFileMenu(null); // Close menu if open for deleted file
  }, []);
  
  // --- Other Handlers ---
  const handleFilterChange = useCallback((filter) => {
      setSelectedFilter(filter);
      setActiveFileMenu(null); // Close any open menus when changing filter
  }, []);

  const handleOpenUploadModal = useCallback(() => setIsUploadModalOpen(true), []);
  const handleCloseUploadModal = useCallback(() => setIsUploadModalOpen(false), []);

  // --- Footer Stats Calculation ---
  const totalSizeMB = useMemo(() => {
      return filteredFiles.reduce((acc, file) => {
          // Basic size parsing (improve if format varies)
          const sizeMatch = file.size.match(/([\d.]+)\s*(MB|GB|KB)/i);
          if (!sizeMatch) return acc;
          
          const value = parseFloat(sizeMatch[1]);
          const unit = sizeMatch[2].toUpperCase();
          
          if (unit === 'GB') return acc + value * 1024;
          if (unit === 'KB') return acc + value / 1024;
          return acc + value; // Assume MB if no unit or MB
      }, 0);
  }, [filteredFiles]);


  return (
    <div className="flex-1 flex flex-col h-screen"> {/* Ensure full height */}
      <Header /> {/* Your existing main application header */}
      <div className="flex-1 flex flex-col bg-gray-900 text-white overflow-hidden"> {/* Allow content to scroll */}
        
        <StorageHeader onUploadClick={handleOpenUploadModal} />

        {/* Non-scrolling content */}
        <StorageUsage usedGB={35.2} totalGB={100} /> {/* Pass actual data */}
        <FileFilters selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />

        {/* Scrolling File List */}
        <div className="flex-1 p-4 overflow-y-auto"> {/* Make this div scrollable */}
           <FileList 
               files={filteredFiles} 
               activeFileMenu={activeFileMenu}
               menuPositions={menuPositions}
               onToggleMenu={toggleFileMenu}
               onDownload={handleDownload}
               onStar={handleStar}
               onShare={handleShare}
               onCopyLink={handleCopyLink}
               onRename={handleRename}
               onDelete={handleDelete}
           />
        </div>
        
        {/* Footer stats */}
        <div className="flex-shrink-0 p-3 border-t border-gray-800 flex justify-between text-sm text-gray-400 bg-gray-900">
          <span>
            {filteredFiles.length} {filteredFiles.length === 1 ? 'item' : 'items'}
          </span>
          {totalSizeMB > 0 && (
            <span>
                Total size: {totalSizeMB > 1024 ? (totalSizeMB / 1024).toFixed(1) + ' GB' : totalSizeMB.toFixed(1) + ' MB'}
            </span>
          )}
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <UploadModal onClose={handleCloseUploadModal} />
        )}
      </div>
    </div>
  );
}