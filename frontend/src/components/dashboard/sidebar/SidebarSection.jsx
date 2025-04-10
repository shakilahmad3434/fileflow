const SidebarSection = ({ title, children, isCollapsed }) => {
  return (
    <div className="p-4 border-b border-gray-800">
      {!isCollapsed && <h3 className="text-xs uppercase text-gray-400 mb-2">{title}</h3>}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export default SidebarSection