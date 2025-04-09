import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';

const DashboardLayout = () => {
  return (
    <div>
      <AdminSidebar />
      <main>
        <Outlet /> {/* This renders the child page */}
      </main>
      {/* <AdminFooter /> */}
    </div>
  );
};

export default DashboardLayout;