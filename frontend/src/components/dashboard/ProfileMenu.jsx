import { useEffect, useRef, useState } from 'react';
import { Settings, LogOut, Download, Share2, FolderOpen, Star, Shield, Users, Cloud } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileMenu = ({isOpen, setIsOpen, triggerRef}) => {
  const {logout} = useAuth()
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current && // Check if triggerRef exists
        !triggerRef.current.contains(event.target) // Exclude clicks on the profile pic
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen, triggerRef]);

  if (!isOpen) return null;
  
  return (
        <div 
        ref={menuRef}
          className="absolute top-12 right-0 w-72 bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden z-50"
        >
          <div className="p-4">
            {/* Profile Header */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <img src="/avt.png" alt="profile card" className='w-full h-full object-cover' />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">John Doe</h3>
                <p className="text-xs text-gray-400">Premium Account</p>
              </div>
            </div>
            
            {/* Storage Usage */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Storage Used</span>
                <span>78 GB of 100 GB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 my-3"></div>

            {/* File Management Section */}
            <div className="mb-2">
              <h4 className="text-xs uppercase text-gray-500 font-medium mb-1 px-3">File Management</h4>
              <div className="space-y-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <FolderOpen size={16} className="mr-3 text-blue-400" />
                  My Files
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Download size={16} className="mr-3 text-green-400" />
                  Recent Downloads
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Star size={16} className="mr-3 text-yellow-400" />
                  Favorites
                </button>
              </div>
            </div>

            {/* Sharing Section */}
            <div className="mb-2">
              <h4 className="text-xs uppercase text-gray-500 font-medium mb-1 px-3">Sharing</h4>
              <div className="space-y-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Share2 size={16} className="mr-3 text-purple-400" />
                  Shared With Me
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Users size={16} className="mr-3 text-blue-400" />
                  Team Folders
                </button>
              </div>
            </div>

            {/* Account Section */}
            <div className="mb-2">
              <h4 className="text-xs uppercase text-gray-500 font-medium mb-1 px-3">Account</h4>
              <div className="space-y-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Settings size={16} className="mr-3 text-gray-400" />
                  Account Settings
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Shield size={16} className="mr-3 text-gray-400" />
                  Security
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition duration-150">
                  <Cloud size={16} className="mr-3 text-gray-400" />
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 my-3"></div>

            {/* Logout */}
            <button onClick={logout} className="flex items-center w-full px-3 py-2 text-sm text-orange-400 hover:bg-gray-800 rounded transition duration-150">
              <LogOut size={16} className="mr-3 text-orange-400" />
              Logout
            </button>
          </div>
        </div>
  );
};

export default ProfileMenu;