import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, 
  Download,
  MoreHorizontal,
  Share2,
  Trash2,
  FileText,
  Image,
  Video,
  File,
  Folder,
  Link2,
  Copy,
  Star,
  Info,
  Lock,
  UserPlus
} from 'lucide-react';

const Recents = () => {
  // Mock data for recent files - replace with your actual data source
  const [recentFiles, setRecentFiles] = useState([
    {
      id: 1,
      name: 'Project Presentation.pptx',
      type: 'document',
      size: '4.2 MB',
      lastAccessed: '2 hours ago',
      icon: <FileText className="text-blue-500" />
    },
    {
      id: 2,
      name: 'Team Photo.jpg',
      type: 'image',
      size: '2.8 MB',
      lastAccessed: '3 hours ago',
      icon: <Image className="text-red-500" />
    },
    {
      id: 3,
      name: 'Product Demo.mp4',
      type: 'video',
      size: '18.5 MB',
      lastAccessed: 'Yesterday',
      icon: <Video className="text-blue-400" />
    },
    {
      id: 4,
      name: 'User Research.pdf',
      type: 'document',
      size: '3.7 MB',
      lastAccessed: 'Yesterday',
      icon: <FileText className="text-blue-500" />
    },
    {
      id: 5,
      name: 'Design Assets',
      type: 'folder',
      size: '45 files',
      lastAccessed: '2 days ago',
      icon: <Folder className="text-yellow-500" />
    },
    {
      id: 6,
      name: 'Budget Report.xlsx',
      type: 'document',
      size: '1.2 MB',
      lastAccessed: '3 days ago',
      icon: <FileText className="text-green-500" />
    },
    {
      id: 7,
      name: 'Quarterly Metrics.csv',
      type: 'other',
      size: '0.8 MB',
      lastAccessed: '4 days ago',
      icon: <File className="text-yellow-500" />
    },
    {
      id: 8,
      name: 'Client Feedback.docx',
      type: 'document',
      size: '1.5 MB',
      lastAccessed: '5 days ago',
      icon: <FileText className="text-blue-500" />
    }
  ]);

  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('recent'); // recent, name, size
  const [openMenuId, setOpenMenuId] = useState(null); // Track which dropdown is open
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0, direction: 'down' });

  // Refs for detecting clicks outside of dropdown
  const dropdownRef = useRef(null);
  const menuButtonsRef = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          !Object.values(menuButtonsRef.current).some(ref => ref && ref.contains(event.target))) {
        setOpenMenuId(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, menuButtonsRef]);

  const calculateDropdownPosition = (buttonElement) => {
    if (!buttonElement) return;
  
    const rect = buttonElement.getBoundingClientRect();
    
    // Position dropdown to the right of the button by default
    const position = {
      top: rect.top,
      left: rect.right + 5, // 5px offset from the button
      direction: 'right'
    };
    
    // Check if there's enough space to the right
    const viewportWidth = window.innerWidth;
    if (rect.right + 230 > viewportWidth) { // 230px is approximate dropdown width + margin
      // If not enough space to the right, position to the left
      position.left = rect.left - 230;
      position.direction = 'left';
    }
  
    // Check if there's enough space below
    const viewportHeight = window.innerHeight;
    if (rect.top + 300 > viewportHeight) { // 300px is approximate dropdown height
      // If not enough space below, align to bottom of viewport with small margin
      position.top = viewportHeight - 320;
    }
    
    return position;
  };

  const toggleDropdown = (fileId, event) => {
    if (openMenuId === fileId) {
      setOpenMenuId(null);
      return;
    }
    
    // Get button element
    const buttonElement = event.currentTarget;
    const position = calculateDropdownPosition(buttonElement);
    
    setDropdownPosition(position);
    setOpenMenuId(fileId);
  };

  const handleActionClick = (action, fileId) => {
    console.log(`${action} clicked for file ID: ${fileId}`);
    setOpenMenuId(null); // Close dropdown after action
    
    // Implement different actions based on the action type
    switch(action) {
      case 'download':
        // Download logic
        console.log(`Downloading file ${fileId}`);
        break;
      case 'share':
        // Share logic
        console.log(`Sharing file ${fileId}`);
        break;
      case 'delete':
        // Delete logic
        console.log(`Deleting file ${fileId}`);
        break;
      case 'copy-link':
        // Copy link logic
        console.log(`Copying link for file ${fileId}`);
        break;
      case 'add-favorite':
        // Add to favorites logic
        console.log(`Adding file ${fileId} to favorites`);
        break;
      case 'file-info':
        // Show file info logic
        console.log(`Showing info for file ${fileId}`);
        break;
      case 'share-permissions':
        // Share permissions logic
        console.log(`Setting permissions for file ${fileId}`);
        break;
      case 'add-user':
        // Add user to share logic
        console.log(`Adding user to share file ${fileId}`);
        break;
      default:
        console.log(`Unknown action ${action} for file ${fileId}`);
    }
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    
    // Sort logic
    let sortedFiles = [...recentFiles];
    
    if (sortType === 'name') {
      sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'size') {
      // This is a simplified sort - you might need more complex logic for actual file sizes
      sortedFiles.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.size.localeCompare(b.size);
      });
    } else {
      // Sort by recent (default)
      sortedFiles.sort((a, b) => {
        // Simplified sorting by lastAccessed
        return a.lastAccessed.localeCompare(b.lastAccessed);
      });
    }
    
    setRecentFiles(sortedFiles);
  };

  // Dropdown menu component
  const DropdownMenu = ({ fileId }) => {
    const position = dropdownPosition;

    const dropdownStyles = {
      position: 'fixed',
      zIndex: 50,
      top: position.top,
      left: position.left,
    };

    return (
      <div 
        ref={dropdownRef}
        className="w-56 bg-gray-800 rounded-md shadow-lg border border-gray-700 fixed"
        style={dropdownStyles}
      >
        <div className="py-1">
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleActionClick('copy-link', fileId)}
          >
            <Link2 size={16} className="mr-3 text-gray-400" />
            Copy sharing link
          </button>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleActionClick('share-permissions', fileId)}
          >
            <Lock size={16} className="mr-3 text-gray-400" />
            Sharing permissions
          </button>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleActionClick('add-user', fileId)}
          >
            <UserPlus size={16} className="mr-3 text-gray-400" />
            Add people
          </button>
          <div className="border-t border-gray-700 my-1"></div>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleActionClick('download', fileId)}
          >
            <Download size={16} className="mr-3 text-gray-400" />
            Download
          </button>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleActionClick('add-favorite', fileId)}
          >
            <Star size={16} className="mr-3 text-gray-400" />
            Add to favorites
          </button>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleActionClick('file-info', fileId)}
          >
            <Info size={16} className="mr-3 text-gray-400" />
            File info
          </button>
          <div className="border-t border-gray-700 my-1"></div>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
            onClick={() => handleActionClick('delete', fileId)}
          >
            <Trash2 size={16} className="mr-3" />
            Delete
          </button>
        </div>
      </div>
    );
  };

  const FileCard = ({ file }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-all hover:bg-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700">
              {file.icon}
            </div>
            <div className="ml-3">
              <h3 className="text-white font-medium truncate max-w-xs">{file.name}</h3>
              <p className="text-gray-400 text-sm">{file.size}</p>
            </div>
          </div>
          <div className="relative">
            <button 
              ref={el => menuButtonsRef.current[`card-${file.id}`] = el}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
              onClick={(e) => toggleDropdown(file.id, e)}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
        <span className="text-gray-400 text-xs flex items-center">
          <Clock size={14} className="mr-1" />
          {file.lastAccessed}
        </span>
        <div className="flex space-x-1">
          <button 
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
            onClick={() => handleActionClick('download', file.id)}
          >
            <Download size={16} />
          </button>
          <button 
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
            onClick={() => handleActionClick('share', file.id)}
          >
            <Share2 size={16} />
          </button>
          <button 
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
            onClick={() => handleActionClick('delete', file.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const FileListItem = ({ file }) => (
    <div className="bg-gray-800 rounded-lg p-3 flex justify-between items-center hover:bg-gray-700 transition-all">
      <div className="flex items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700 mr-3">
          {file.icon}
        </div>
        <div>
          <h3 className="text-white font-medium">{file.name}</h3>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-3">{file.size}</span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {file.lastAccessed}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
          onClick={() => handleActionClick('download', file.id)}
        >
          <Download size={16} />
        </button>
        <button 
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
          onClick={() => handleActionClick('share', file.id)}
        >
          <Share2 size={16} />
        </button>
        <button 
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
          onClick={() => handleActionClick('delete', file.id)}
        >
          <Trash2 size={16} />
        </button>
        <div className="relative">
          <button 
            ref={el => menuButtonsRef.current[`list-${file.id}`] = el}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
            onClick={(e) => toggleDropdown(file.id, e)}
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="text-gray-400 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-white">Recents</h1>
        </div>
        <div className="flex space-x-2">
          <div className="bg-gray-800 rounded-lg overflow-hidden flex">
            <button 
              className={`px-4 py-2 text-sm ${sortBy === 'recent' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              onClick={() => handleSortChange('recent')}
            >
              Recent
            </button>
            <button 
              className={`px-4 py-2 text-sm ${sortBy === 'name' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              onClick={() => handleSortChange('name')}
            >
              Name
            </button>
            <button 
              className={`px-4 py-2 text-sm ${sortBy === 'size' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              onClick={() => handleSortChange('size')}
            >
              Size
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden flex">
            <button 
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button 
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recentFiles.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {recentFiles.map(file => (
            <FileListItem key={file.id} file={file} />
          ))}
        </div>
      )}
      
      {/* Global dropdown menu that appears for the active file */}
      {openMenuId && <DropdownMenu fileId={openMenuId} />}
    </div>
  );
};

export default Recents;