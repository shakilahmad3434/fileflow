import React, { useRef } from 'react';
import { Star, Download, MoreHorizontal } from 'lucide-react';
import FileActionsMenu from './FileActionsMenu';
import { getListFileIcon } from '../../ui/fileIcons'; // Adjust path

const FileListItem = ({ 
  file, 
  activeFileMenu, 
  menuPositions, 
  onToggleMenu, 
  onDownload, 
  onStar,
  onShare,
  onCopyLink,
  onRename,
  onDelete 
}) => {
  const buttonRef = useRef(null);

  const handleMenuToggle = () => {
    onToggleMenu(file.id, buttonRef.current); // Pass button ref for position calculation
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50">
      <td className="py-3 pl-4">
        <div className="flex items-center">
          {getListFileIcon(file.type)}
          <span className="ml-3 truncate" title={file.name}>{file.name}</span>
          {file.starred && <Star className="h-4 w-4 text-yellow-500 ml-2 fill-yellow-500 flex-shrink-0" />}
        </div>
      </td>
      <td className="py-3 text-gray-400 whitespace-nowrap">{file.size}</td>
      <td className="py-3 text-gray-400 whitespace-nowrap">{file.modified}</td>
      <td className="py-3 pr-4">
        <div className="flex items-center justify-end space-x-1 md:space-x-2">
          <button 
            onClick={() => onDownload(file.id)} 
            className="p-1 hover:bg-gray-700 rounded hidden sm:block" // Hide on small screens initially
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onStar(file.id)} 
            className="p-1 hover:bg-gray-700 rounded"
            title={file.starred ? "Unstar" : "Star"}
          >
            <Star className={`h-4 w-4 transition-colors ${file.starred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400 hover:text-white'}`} />
          </button>
          <div className="relative">
            <button 
              ref={buttonRef}
              className="p-1 hover:bg-gray-700 rounded"
              onClick={handleMenuToggle}
              title="More actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            <FileActionsMenu 
              fileId={file.id}
              isOpen={activeFileMenu === file.id}
              position={menuPositions[file.id]}
              onClose={() => onToggleMenu(null)} // Close by setting active menu to null
              onDownload={onDownload}
              onShare={onShare}
              onCopyLink={onCopyLink}
              onRename={onRename}
              onDelete={onDelete}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default FileListItem