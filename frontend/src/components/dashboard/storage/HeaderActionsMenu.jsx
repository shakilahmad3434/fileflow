import React from 'react';
import { Folder, Upload, Share } from 'lucide-react';
import { useClickOutside } from '../../../utils/useClickOutside'; // Adjust path if needed

const HeaderActionsMenu = ({ isOpen, onClose, onUploadClick, onNewFolder, onShare }) => {
  const menuRef = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700"
    >
      <button 
        onClick={onNewFolder}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
      >
        <Folder className="h-4 w-4 mr-3" />
        New Folder
      </button>
      <button 
        onClick={() => { onUploadClick(); onClose(); }} // Close menu when upload clicked
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
      >
        <Upload className="h-4 w-4 mr-3" />
        Upload Files
      </button>
      <button 
        onClick={() => { /* Add folder upload logic */ onClose(); }} // Placeholder
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
      >
        <Upload className="h-4 w-4 mr-3" />
        Upload Folder
      </button>
      <hr className="my-1 border-gray-700" />
      <button 
        onClick={onShare}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
      >
        <Share className="h-4 w-4 mr-3" />
        Share
      </button>
    </div>
  );
}

export default HeaderActionsMenu