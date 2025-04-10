import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { useAuth } from '../contexts/AuthContext';


const DashboardLayout = () => {
  const { isCollapsed } = useAuth();
  return (
    <div className='flex min-h-screen bg-gray-900 text-white'>
      <Sidebar />
      <main className={`w-full transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-60'}`}>
        <Outlet /> {/* This renders the child page */}
      </main>
    </div>
  );
};

export default DashboardLayout;