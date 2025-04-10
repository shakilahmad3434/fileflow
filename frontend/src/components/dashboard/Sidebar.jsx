import React, { useEffect, useState } from 'react'
import { 
  LayoutDashboard, 
  Clock, 
  Star, 
  Trash2, 
  Share,
  Users,
  Plus,
  HardDrive,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const SidebarSection = ({ title, children, isCollapsed }) => {
  return (
    <div className="p-4 border-b border-gray-800">
      {!isCollapsed && <h3 className="text-xs uppercase text-gray-400 mb-2">{title}</h3>}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const SidebarItem = ({ icon, label, count, active, href, isCollapsed, onClick }) => {
  return (
    <Link 
      to={href || "#"}
      onClick={() => onClick(label)}
      className={`flex items-center justify-between gap-2 px-2 text-sm transition-colors duration-300 py-2 hover:bg-gray-800 rounded-md ${
        active ? "bg-orange-500 hover:bg-orange-600" : "text-gray-300 hover:bg-muted"
      }`}
      title={isCollapsed ? label : ""}
    >
      <div className="flex items-center gap-2">
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </div>
      {!isCollapsed && count && <div className="bg-orange-500 text-xs rounded-md px-2 py-0.5">{count}</div>}
    </Link>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const { isCollapsed } = useAuth();
  const location = useLocation();
  
  const pathToLabelMap = {
    "/dashboard": "Overview Storage",
    "/storage": "My Storage",
    "/recents": "Recents",
    "/favorites": "Favorites",
    "/trash": "Trash",
    // Add more as needed
  };
  
  useEffect(() => {
    const activeLabel = Object.entries(pathToLabelMap).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1];
  
    if (activeLabel) setActiveItem(activeLabel);
  }, [location.pathname]);
  
  


  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-60'} h-screen bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300`}>

      {/* Logo */}
      <div className="flex items-center p-4 justify-center">
          <Link to="/" className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl text-white ml-2">
                FileFlow
              </span>
            )}
          </Link>
        </div>
      
      {/* Sidebar Sections */}
      <div className="flex-1 overflow-auto custom-scrollbar overflow-y-auto">
        <SidebarSection title="OVERVIEW" isCollapsed={isCollapsed}>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview Storage" href="/dashboard" active={activeItem === "Overview Storage"} isCollapsed={isCollapsed} onClick={setActiveItem} />
        </SidebarSection>
        
        <SidebarSection title="FILE MANAGER" isCollapsed={isCollapsed}>
          <SidebarItem icon={<Share size={18} />} label="My Storage" href="/storage" active={activeItem === "My Storage"} isCollapsed={isCollapsed} onClick={setActiveItem} />
          <SidebarItem icon={<Clock size={18} />} label="Recents" href="/recents" active={activeItem === "Recents"} count={2} isCollapsed={isCollapsed} onClick={setActiveItem} />
          <SidebarItem icon={<Star size={18} />} label="Favorites" href="/favorites" active={activeItem === "Favorites"} count={4} isCollapsed={isCollapsed} onClick={setActiveItem} />
          <SidebarItem icon={<Trash2 size={18} />} label="Trash" isCollapsed={isCollapsed} />
        </SidebarSection>
        
        <SidebarSection title="SHARED FILE" isCollapsed={isCollapsed}>
          <SidebarItem icon={<Share size={18} />} label="Shared Folder" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Share size={18} />} label="Shared File" isCollapsed={isCollapsed} />
        </SidebarSection>
        
        <SidebarSection title="TEAM STORAGE" isCollapsed={isCollapsed}>
          <SidebarItem icon={<Users size={18} />} label="DMC Team" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Users size={18} />} label="Developer Team" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Plus size={18} />} label="Add team storage" isAction isCollapsed={isCollapsed} />
        </SidebarSection>
      </div>

      {!isCollapsed && (
        <div className="mt-auto p-4">
          <div className="bg-gray-800 rounded-md p-2 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive size={14} />
                <span className="text-sm">Storage</span>
              </div>
              <span className="text-xs">82%</span>
            </div>
            <div className='relative h-1.5 w-full overflow-hidden rounded-full bg-gray-700 mb-4'>
              <div className='h-full w-full flex-1 bg-orange-500 transition-all' style={{ transform: `translateX(-${100 - (82 || 0)}%)` }}></div>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded py-2 text-sm transition duration-300">
              Upgrade Plan
            </button>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="mt-auto p-2 flex justify-center mb-4">
          <button className="bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors">
            <HardDrive size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar