import React from 'react';

const StorageUsage = ({ usedGB, totalGB }) => {
  const percentage = totalGB > 0 ? Math.min(100, Math.round((usedGB / totalGB) * 100)) : 0;

  return (
    <div className="p-4 bg-gray-800 m-4 rounded-lg">
      <p className="text-sm font-medium text-gray-300 mb-2">Storage Usage</p>
      <div className="flex items-center">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
             className="bg-orange-600 h-2 rounded-full transition-width duration-300 ease-out" 
             style={{ width: `${percentage}%` }}>
           </div>
        </div>
        <span className="block ml-4 text-sm whitespace-nowrap">{usedGB.toFixed(1)} GB of {totalGB} GB</span>
      </div>
    </div>
  );
}

export default StorageUsage