import React from 'react';
import { Star } from 'lucide-react';

const filters = [
  { id: 'all', label: 'All Files' },
  { id: 'document', label: 'Documents' },
  { id: 'image', label: 'Images' },
  { id: 'video', label: 'Videos' },
  { id: 'other', label: 'Others' },
  { id: 'starred', label: 'Starred', icon: Star },
];

const FileFilters = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="flex px-4 border-b border-gray-800 overflow-x-auto">
      {filters.map(filter => (
        <button 
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 text-sm font-medium flex-shrink-0 flex items-center ${
            selectedFilter === filter.id 
            ? 'text-blue-500 border-b-2 border-blue-500' 
            : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {filter.icon && <filter.icon className={`h-4 w-4 mr-1 ${selectedFilter === filter.id ? 'text-blue-500' : ''}`} />} 
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FileFilters