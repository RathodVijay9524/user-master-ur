// src/components/BaseUser/BaseUser.js
import UserNavbar from './Navbar/UserNavbar';
import Header from './navbar/Footer';
import Footer from './navbar/Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet

const BaseUser = () => {
  return (
    <div>
      <UserNavbar />
      <Header title="User Dashboard" />
      <main>
        <Outlet /> {/* Render child dashboard components (UserDashboard) here */}
      </main>
      <Footer />
    </div>
  );
};

export default BaseUser;
