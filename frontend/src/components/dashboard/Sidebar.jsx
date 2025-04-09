import React from 'react'
import { 
  Search, 
  ChevronDown, 
  PlusSquare, 
  Settings, 
  Bell, 
  HelpCircle, 
  LayoutDashboard, 
  Clock, 
  Star, 
  Trash2, 
  Share,
  Users,
  Plus,
  Image,
  Video,
  FileText,
  Package,
  MoreVertical,
  HardDrive
} from "lucide-react";
import { Link } from 'react-router-dom';

const SidebarSection = ({ title, children }) => {
  return (
    <div className="p-4 border-b border-gray-800">
      <h3 className="text-xs uppercase text-gray-400 mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const SidebarItem = ({ icon, label, count, active, isAction, href }) => {
  return (
    <Link 
      to={href}
      className={`flex items-center justify-between gap-2 px-2 text-sm transition-colors duration-300 py-2 hover:bg-gray-800 rounded-md ${
        active ? "bg-orange-500 hover:bg-orange-600 hover:scale-102" : "text-gray-300 hover:bg-muted"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {count && <div className="bg-orange-500 text-xs rounded-md px-2 py-0.5">{count}</div>}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="flex items-center p-4">
          <Link to="/" className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-fileflow-dark">
              FileFlow
            </span>
          </Link>
        </div>
      
      {/* Sidebar Sections */}

      <div className="flex-1 overflow-auto">
        <SidebarSection title="OVERVIEW">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview Storage" active={true} href="/dashboard" />
        </SidebarSection>
        
        <SidebarSection title="FILE MANAGER">
          <SidebarItem icon={<Share size={18} />} label="My Storage" href="/storage" />
          <SidebarItem icon={<Clock size={18} />} label="Recents" count={2} />
          <SidebarItem icon={<Star size={18} />} label="Favorites" count={4} />
          <SidebarItem icon={<Trash2 size={18} />} label="Trash" />
        </SidebarSection>
        
        <SidebarSection title="SHARED FILE">
          <SidebarItem icon={<Share size={18} />} label="Shared Folder" />
          <SidebarItem icon={<Share size={18} />} label="Shared File" />
        </SidebarSection>
        
        <SidebarSection title="TEAM STORAGE">
          <SidebarItem icon={<Users size={18} />} label="DMC Team" />
          <SidebarItem icon={<Users size={18} />} label="Developer Team" />
          <SidebarItem icon={<Plus size={18} />} label="Add team storage" isAction />
        </SidebarSection>
      </div>

      <div className="mt-auto p-4">
        <div className="bg-card rounded-md p-2 space-y-2">
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
          <button className="w-full bg-orange-500 hover:bg-orange-600 hover:scale-102 text-white rounded py-2 text-sm transition duration-300">
            Upgrade Plan
          </button>
        </div>
      </div>

    </div>
  );
}

export default Sidebar