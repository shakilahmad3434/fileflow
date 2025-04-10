import { Link } from "react-router-dom";

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

export default SidebarItem