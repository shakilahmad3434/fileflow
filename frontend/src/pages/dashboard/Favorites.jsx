import React, { useState } from 'react';
import { 
  Download, 
  Star, 
  Share2, 
  Trash, 
  ArrowUpDown, 
  Search,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
  Grid,
  List
} from 'lucide-react';

// Sample data - replace with your actual data fetching logic
const sampleFavorites = [
  { 
    id: 1, 
    name: 'Project Proposal.pdf', 
    type: 'pdf', 
    dateAdded: '2025-03-15T14:30:00', 
    size: 2.4, 
    category: 'document' 
  },
  { 
    id: 2, 
    name: 'Team Photo.jpg', 
    type: 'jpg', 
    dateAdded: '2025-03-10T09:15:00', 
    size: 3.7, 
    category: 'image' 
  },
  { 
    id: 3, 
    name: 'Product Demo.mp4', 
    type: 'mp4', 
    dateAdded: '2025-04-01T16:45:00', 
    size: 24.8, 
    category: 'video' 
  },
  { 
    id: 4, 
    name: 'Financial Report Q1.xlsx', 
    type: 'xlsx', 
    dateAdded: '2025-04-05T11:20:00', 
    size: 1.2, 
    category: 'document' 
  },
  { 
    id: 5, 
    name: 'Marketing Assets.zip', 
    type: 'zip', 
    dateAdded: '2025-03-22T13:10:00', 
    size: 56.3, 
    category: 'others' 
  },
];

// File type to icon and color mapping
const fileTypeMap = {
  document: { 
    icon: <FileText size={20} />, 
    color: 'bg-green-500' 
  },
  image: { 
    icon: <ImageIcon size={20} />, 
    color: 'bg-red-500' 
  },
  video: { 
    icon: <Video size={20} />, 
    color: 'bg-blue-500' 
  },
  audio: { 
    icon: <Music size={20} />, 
    color: 'bg-purple-500' 
  },
  others: { 
    icon: <File size={20} />, 
    color: 'bg-yellow-500' 
  }
};

const Favorites = () => {
  const [favorites, setFavorites] = useState(sampleFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('dateAdded');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Handle removing a file from favorites
  const handleRemoveFromFavorites = (id) => {
    setFavorites(favorites.filter(file => file.id !== id));
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format file size
  const formatFileSize = (sizeInMB) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(1)} GB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort files
  const filteredAndSortedFiles = favorites
    .filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'size') {
        return sortDirection === 'asc' ? a.size - b.size : b.size - a.size;
      } else if (sortField === 'dateAdded') {
        return sortDirection === 'asc' 
          ? new Date(a.dateAdded) - new Date(b.dateAdded) 
          : new Date(b.dateAdded) - new Date(a.dateAdded);
      } else {
        return sortDirection === 'asc'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

  // Get icon and color for file type
  const getFileTypeInfo = (file) => {
    return fileTypeMap[file.category] || fileTypeMap.others;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main content area */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500" size={24} />
            <h1 className="text-2xl font-semibold">Favorites</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* View mode toggle */}
            <div className="flex bg-gray-800 rounded-md">
              <button
                className={`p-2 rounded-l-md ${viewMode === 'list' ? 'bg-blue-600' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
              <button
                className={`p-2 rounded-r-md ${viewMode === 'grid' ? 'bg-blue-600' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* File count summary */}
        <div className="mb-6 text-gray-400">
          {filteredAndSortedFiles.length} {filteredAndSortedFiles.length === 1 ? 'item' : 'items'} in favorites
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-700 bg-gray-850">
              <div className="col-span-5 flex items-center">
                <button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  <span>Name</span>
                  {sortField === 'name' && (
                    <ArrowUpDown size={16} className="ml-1" />
                  )}
                </button>
              </div>
              <div className="col-span-2 flex items-center">
                <button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                  onClick={() => handleSort('type')}
                >
                  <span>Type</span>
                  {sortField === 'type' && (
                    <ArrowUpDown size={16} className="ml-1" />
                  )}
                </button>
              </div>
              <div className="col-span-2 flex items-center">
                <button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                  onClick={() => handleSort('dateAdded')}
                >
                  <span>Date Added</span>
                  {sortField === 'dateAdded' && (
                    <ArrowUpDown size={16} className="ml-1" />
                  )}
                </button>
              </div>
              <div className="col-span-1 flex items-center">
                <button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                  onClick={() => handleSort('size')}
                >
                  <span>Size</span>
                  {sortField === 'size' && (
                    <ArrowUpDown size={16} className="ml-1" />
                  )}
                </button>
              </div>
              <div className="col-span-2 text-gray-300 text-right">Actions</div>
            </div>

            {/* File list */}
            {filteredAndSortedFiles.length > 0 ? (
              filteredAndSortedFiles.map((file) => {
                const fileTypeInfo = getFileTypeInfo(file);
                
                return (
                  <div 
                    key={file.id} 
                    className="grid grid-cols-12 px-6 py-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
                  >
                    <div className="col-span-5 flex items-center space-x-3">
                      <div className={`p-2 rounded-md ${fileTypeInfo.color} text-white`}>
                        {fileTypeInfo.icon}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center">
                          <span className="font-medium truncate">{file.name}</span>
                          <Star className="ml-2 w-4 h-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center uppercase text-xs font-semibold text-gray-400">
                      {file.type}
                    </div>
                    <div className="col-span-2 flex items-center text-gray-300">
                      {formatDate(file.dateAdded)}
                    </div>
                    <div className="col-span-1 flex items-center text-gray-300">
                      {formatFileSize(file.size)}
                    </div>
                    <div className="col-span-2 flex justify-end items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
                        <Share2 size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-full"
                        onClick={() => handleRemoveFromFavorites(file.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-gray-400">
                No favorite files found.
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAndSortedFiles.length > 0 ? (
              filteredAndSortedFiles.map((file) => {
                const fileTypeInfo = getFileTypeInfo(file);
                
                return (
                  <div
                    key={file.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="p-4 relative">
                      <div className="absolute top-4 right-4">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      </div>
                      <div className={`w-16 h-16 mx-auto mb-4 ${fileTypeInfo.color} rounded-lg flex items-center justify-center`}>
                        <div className="w-8 h-8 text-white">
                          {fileTypeInfo.icon}
                        </div>
                      </div>
                      <h3 className="text-center font-medium text-white mb-1 truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <div className="text-xs text-gray-400 text-center mb-3">
                        {formatFileSize(file.size)} • {formatDate(file.dateAdded)}
                      </div>
                      <div className="flex justify-center space-x-2 pt-2 border-t border-gray-700">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
                          <Download size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
                          <Share2 size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-full"
                          onClick={() => handleRemoveFromFavorites(file.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-8 text-center text-gray-400">
                No favorite files found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;