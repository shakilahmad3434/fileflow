import React, { useState } from 'react';
import { ArrowUpDown, RefreshCw, Trash2, History, ArrowRight } from 'lucide-react';

const Trash = () => {
  const [trashItems, setTrashItems] = useState([
    {
      id: 1,
      name: 'Project Presentation.pptx',
      type: 'document',
      size: '12.4 MB',
      deletedDate: '2025-04-03',
      expiryDate: '2025-05-03',
    },
    {
      id: 2,
      name: 'Company Logo.png',
      type: 'image',
      size: '2.1 MB',
      deletedDate: '2025-04-05',
      expiryDate: '2025-05-05',
    },
    {
      id: 3,
      name: 'Meeting Recording.mp4',
      type: 'video',
      size: '45.7 MB',
      deletedDate: '2025-04-08',
      expiryDate: '2025-05-08',
    },
    {
      id: 4,
      name: 'Financial Report.xlsx',
      type: 'document',
      size: '5.3 MB',
      deletedDate: '2025-04-09',
      expiryDate: '2025-05-09',
    },
    {
      id: 5,
      name: 'User Manual.pdf',
      type: 'document',
      size: '8.9 MB',
      deletedDate: '2025-04-10',
      expiryDate: '2025-05-10',
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('deletedDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return (
          <div className="bg-green-500 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'image':
        return (
          <div className="bg-red-500 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'video':
        return (
          <div className="bg-blue-500 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-yellow-500 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedItems = [...trashItems].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === trashItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(trashItems.map(item => item.id));
    }
  };

  const handleRestore = () => {
    // Logic to restore selected items
    setTrashItems(trashItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleDelete = () => {
    // Logic to permanently delete selected items
    setTrashItems(trashItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const totalItems = trashItems.length;
  const daysToExpiry = 30; // Default expiry period

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <Trash2 className="mr-2 h-6 w-6" />
          <h1 className="text-2xl font-semibold">Trash</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center text-gray-400 mb-2">
            <History className="h-5 w-5 mr-2" />
            <span>Items in trash will be automatically deleted after {daysToExpiry} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{totalItems} items in trash</span>
            <div className="flex space-x-4">
              <button 
                onClick={handleRestore}
                disabled={selectedItems.length === 0}
                className={`flex items-center px-4 py-2 rounded ${
                  selectedItems.length === 0 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Restore
              </button>
              <button 
                onClick={handleDelete}
                disabled={selectedItems.length === 0}
                className={`flex items-center px-4 py-2 rounded ${
                  selectedItems.length === 0 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Permanently
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-gray-800 rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                      checked={selectedItems.length === trashItems.length && trashItems.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('size')}
                  >
                    Size
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('deletedDate')}
                  >
                    Deleted Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('expiryDate')}
                  >
                    Expiry Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getFileIcon(item.type)}
                        <span className="ml-3">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{item.size}</td>
                    <td className="py-3 px-4 text-gray-400">{formatDate(item.deletedDate)}</td>
                    <td className="py-3 px-4 text-gray-400">{formatDate(item.expiryDate)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            // Restore single item
                            setTrashItems(trashItems.filter(i => i.id !== item.id));
                          }}
                          className="p-1 text-blue-400 hover:text-blue-300"
                          title="Restore"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            // Delete single item permanently
                            setTrashItems(trashItems.filter(i => i.id !== item.id));
                          }}
                          className="p-1 text-red-400 hover:text-red-300"
                          title="Delete Permanently"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    <div className="flex flex-col items-center">
                      <Trash2 className="h-12 w-12 mb-3" />
                      <p className="text-lg">Trash is empty</p>
                      <p className="text-sm">Items you delete will appear here</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trash;