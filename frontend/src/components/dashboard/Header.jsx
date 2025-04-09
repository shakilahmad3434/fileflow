import React from "react";
import { 
  Search, 
  Settings, 
  Bell, 
  HelpCircle, 
} from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-16 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700/50 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-sm">
      {/* Logo/Title */}
      <h1 className="text-xl font-semibold text-white tracking-tight bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        File Manager
      </h1>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
        <div className="relative group">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" 
          />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-200 placeholder-gray-500 rounded-lg pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700/50 text-gray-400 text-xs px-2 py-1 rounded-md">
            ⌘ + K
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        <div>
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors"
          aria-label="Search (Mobile)"
        >
          <Search size={20} />
        </button>
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors"
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </button>
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full relative transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
          <img src="/avt.png" alt="profile pic" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;