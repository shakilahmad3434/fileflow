import React from 'react';
import FileListItem from './FileListItem';

const FileList = ({ 
  files, 
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
  if (!files || files.length === 0) {
    return <div className="p-8 text-center text-gray-500">No files found for this filter.</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="text-left py-3 pl-4 font-medium w-2/5">Name</th>
            <th className="text-left py-3 font-medium w-1/5">Size</th>
            <th className="text-left py-3 font-medium w-1/5">Modified</th>
            <th className="text-right py-3 pr-4 font-medium w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <FileListItem 
              key={file.id} 
              file={file} 
              activeFileMenu={activeFileMenu}
              menuPositions={menuPositions}
              onToggleMenu={onToggleMenu}
              onDownload={onDownload}
              onStar={onStar}
              onShare={onShare}
              onCopyLink={onCopyLink}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileList