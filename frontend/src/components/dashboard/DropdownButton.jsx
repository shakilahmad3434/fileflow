import { Download, FileText, Share2, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const DropdownButton = ({isOpen, fileId}) => {
  console.log(fileId)
  if(!isOpen)
    return

  return (
    <div className="absolute -right-10 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-100">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left" role="menuitem">
            <FileText className="mr-2" size={16} />
            Open
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left" role="menuitem">
            <Download className="mr-2" size={16} />
            Download
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left" role="menuitem">
            <Share2 className="mr-2" size={16} />
            Share
          </button>
          <button className="flex items-center px-4 py-2 text-sm hover:text-white hover:bg-gray-700 w-full text-left text-red-500" role="menuitem">
            <Trash2 className="mr-2" size={16} />
            Delete
          </button>
        </div>
      </div>
  );
};

export default DropdownButton;