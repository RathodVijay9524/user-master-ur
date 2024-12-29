// src/components/BaseAdmin/BaseAdmin.js
import AdminNavbar from './navbar/AdminNavbar';
import Header from './navbar/Footer';
import Footer from './navbar/Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet

const BaseAdmin = () => {
  return (
    <div>
      <AdminNavbar /> {/* Admin Navigation */}
      <Header title="Admin Dashboard" /> {/* Admin Header */}

      <main>
        <Outlet /> {/* This will render the nested routes like AdminHome, AdminDashboard, or ActiveUser */}
      </main>

      <Footer /> {/* Admin Footer */}
    </div>
  );
};

export default BaseAdmin;
