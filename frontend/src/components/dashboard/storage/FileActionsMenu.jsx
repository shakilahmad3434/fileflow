import React from 'react';
import { Download, Share, Copy, Edit, Trash2 } from 'lucide-react';
import { useClickOutside } from '../../../utils/useClickOutside'; // Adjust path

const FileActionsMenu = ({ fileId, isOpen, position, onClose, onDownload, onShare, onCopyLink, onRename, onDelete }) => {
  const menuRef = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className={`absolute right-0 py-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700 ${
        position?.top ? 'bottom-8' : 'top-8' // Adjusted from mt-2 to top-8 for consistency
      }`}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
    >
      <button onClick={() => { onDownload(fileId); onClose(); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
        <Download className="h-4 w-4 mr-3" /> Download
      </button>
      <button onClick={() => { onShare(fileId); onClose(); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
        <Share className="h-4 w-4 mr-3" /> Share
      </button>
      <button onClick={() => { onCopyLink(fileId); onClose(); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
        <Copy className="h-4 w-4 mr-3" /> Copy Link
      </button>
      <button onClick={() => { onRename(fileId); onClose(); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
        <Edit className="h-4 w-4 mr-3" /> Rename
      </button>
      <hr className="my-1 border-gray-700" />
      <button onClick={() => { onDelete(fileId); onClose(); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center">
        <Trash2 className="h-4 w-4 mr-3" /> Delete
      </button>
    </div>
  );
}

export default FileActionsMenu