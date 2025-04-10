import React, { useState } from 'react';
import { Upload, MoreHorizontal } from 'lucide-react';
import HeaderActionsMenu from './HeaderActionsMenu';

const StorageHeader = ({ onUploadClick, onNewFolder, onShare }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMoreClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Placeholder actions - implement actual logic
  const handleNewFolder = () => console.log("New Folder clicked");
  const handleShare = () => console.log("Share clicked");

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">My Storage</h1>
      </div>
      <div className="flex gap-2">
        <button 
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md flex items-center text-sm hover:scale-104 transition duration-200"
          onClick={onUploadClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </button>
        <div className="relative">
          <button 
            className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md"
            onClick={handleMoreClick}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          
          <HeaderActionsMenu 
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
            onUploadClick={onUploadClick}
            onNewFolder={onNewFolder || handleNewFolder} // Use passed prop or default
            onShare={onShare || handleShare} // Use passed prop or default
          />
        </div>
      </div>
    </div>
  );
}

export default StorageHeader