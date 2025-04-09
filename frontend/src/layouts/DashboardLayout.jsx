import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-900 text-white'>
      <Sidebar />
      <main className='w-full'>
        <Outlet /> {/* This renders the child page */}
      </main>
    </div>
  );
};

export default DashboardLayout;