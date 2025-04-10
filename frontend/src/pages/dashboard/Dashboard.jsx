import { useState } from 'react';
import Header from '../../components/dashboard/Header'
import { FolderIcon, FileIcon, UserIcon, UsersIcon, ArrowDownUp, FileImage, FileVideo, Archive } from 'lucide-react';

const Dashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
    
    const toggleFileSelection = (fileId) => {
      if (selectedFiles.includes(fileId)) {
        setSelectedFiles(selectedFiles.filter(id => id !== fileId));
      } else {
        setSelectedFiles([...selectedFiles, fileId]);
      }
    };
    
    const storageCategories = [
      { id: 1, title: "Image", icon: "image", items: 154, usedGB: 24, totalGB: 100, color: "bg-red-500" },
      { id: 2, title: "Video", icon: "video", items: 24, usedGB: 32, totalGB: 100, color: "bg-blue-500" },
      { id: 3, title: "Document", icon: "document", items: 232, usedGB: 22, totalGB: 100, color: "bg-green-500" },
      { id: 4, title: "Others", icon: "others", items: 154, usedGB: 22, totalGB: 100, color: "bg-yellow-500" },
    ];
    
    const suggestedFiles = [
      { id: 1, name: "Google testing.doc", type: "doc", thumbnail: "/document.png" },
      { id: 2, name: "Data_2021.xls", type: "xls", thumbnail: "/document.png" },
      { id: 3, name: "Compro.pdf", type: "pdf", thumbnail: "/document.png" },
      { id: 4, name: "January Article.doc", type: "doc", thumbnail: "/document.png" },
    ];
    
    const recentFiles = [
      { id: 1, name: "Toba Lake Proposal 2023.doc", size: "8.45 MB", shared: "Me", modified: "23/03/2023 - 17:15" },
      { id: 2, name: "Explaination music mardua holong.pdf", size: "19.21 MB", shared: "Me", modified: "24/03/2023 - 08:09" },
      { id: 3, name: "Member of 2021.xls", size: "5.14 MB", shared: "Team", modified: "25/03/2023 - 17:12" },
      { id: 4, name: "Invoice 2021.pdf", size: "10.66MB", shared: "Me", modified: "26/03/2023 - 09:18" },
      { id: 5, name: "Furniture Catalog January.pdf", size: "28.11 MB", shared: "Me", modified: "27/03/2023 - 16:21" },
    ];
    
    const renderIcon = (type) => {
      switch (type) {
        case "image":
          return <div className="bg-red-500 p-2 rounded text-white"><FileImage size={20} /></div>;
        case "video":
          return <div className="bg-blue-500 p-2 rounded text-white"><FileVideo size={20} /></div>;
        case "document":
          return <div className="bg-green-500 p-2 rounded text-white"><FileIcon size={20} /></div>;
        case "others":
          return <div className="bg-yellow-500 p-2 rounded text-white"><Archive size={20} /></div>;
        default:
          return <div className="bg-gray-500 p-2 rounded text-white"><FileIcon size={20} /></div>;
      }
    };
    
    const getFileIcon = (type) => {
      switch (type) {
        case "doc":
          return <FileIcon size={16} />;
        case "xls":
          return <FileIcon size={16} />;
        case "pdf":
          return <FileIcon size={16} />;
        default:
          return <FileIcon size={16} />;
      }
    };
    
    const getSharedIcon = (type) => {
      return type === "Team" ? 
        <UsersIcon size={16} className="text-gray-500" /> : 
        <UserIcon size={16} className="text-gray-500" />;
    };

  return (
    <div className="flex-1 flex flex-col transition duration-300">
      <Header />
      <div className="bg-gray-900 text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <FolderIcon size={20} />
          <h1 className="text-lg font-medium">Overview Storage</h1>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
            <ArrowDownUp size={16} />
            <span>Sort</span>
          </button>
          
          <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
            <FolderIcon size={16} />
            <span>View</span>
          </button>
          
          <button className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded">
            <span>+</span>
            <span>Create</span>
          </button>
        </div>
      </div>
      
      {/* Storage Overview */}
      <h2 className="text-xl font-medium mb-4">Overview Storage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {storageCategories.map((category) => (
          <div key={category.id} className="bg-gray-800 p-4 rounded">
            <div className="flex items-center space-x-3 mb-2">
              {renderIcon(category.icon)}
              <div>
                <div className="font-medium">{category.title}</div>
                <div className="text-sm text-gray-400">{category.items} items</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2">
              <div 
                className={`h-1.5 rounded-full ${category.color}`} 
                style={{ width: `${(category.usedGB / category.totalGB) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400">
              {category.usedGB} GB of {category.totalGB} GB
            </div>
          </div>
        ))}
      </div>
      
      {/* Suggested Files */}
      <h2 className="text-xl font-medium mb-4">Suggested</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {suggestedFiles.map((file) => (
          <div key={file.id} className="bg-gray-800 rounded overflow-hidden">
            <div className="relative p-2 pt-5">
              <img src={file.thumbnail} alt={file.name} className="w-full" />
            </div>
            <div className="p-4 flex items-center justify-between bg-gray-700">
              <div className="flex items-center space-x-2">
                {getFileIcon(file.type)}
                <span className="text-sm">{file.name}</span>
              </div>
              <button className="text-gray-400">•••</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Files */}
      <h2 className="text-xl font-medium mb-4">Recent files</h2>
      <div className="bg-gray-800 rounded overflow-hidden">
        <div className="grid grid-cols-12 p-4 border-b border-gray-700 text-sm text-gray-400">
          <div className="col-span-1"></div>
          <div className="col-span-5 flex items-center space-x-1">
            <span>Name</span>
            <ArrowDownUp size={16} />
          </div>
          <div className="col-span-2 flex items-center space-x-1">
            <span>Size</span>
            <ArrowDownUp size={16} />
          </div>
          <div className="col-span-2">Shared</div>
          <div className="col-span-2 flex items-center space-x-1">
            <span>Last modified</span>
            <ArrowDownUp size={16} />
          </div>
        </div>
        
        {recentFiles.map((file) => (
          <div key={file.id} className="grid grid-cols-12 p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors">
            <div className="col-span-1">
              <input 
                type="checkbox" 
                className="peer h-4 w-4"
                checked={selectedFiles.includes(file.id)}
                onChange={() => toggleFileSelection(file.id)}
              />
            </div>
            <div className="col-span-5 flex items-center space-x-2">
              <FileIcon size={16} />
              <span>{file.name}</span>
            </div>
            <div className="col-span-2 text-gray-400">{file.size}</div>
            <div className="col-span-2 flex items-center space-x-1">
              {getSharedIcon(file.shared)}
              <span className="text-gray-400">{file.shared}</span>
            </div>
            <div className="col-span-2 text-gray-400">{file.modified}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Dashboard