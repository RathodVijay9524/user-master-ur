// src/components/BaseWorker/BaseWorker.js
import WorkerNavbar from './navbar/WorkerNavbar';
import Header from './navbar/Footer';
import Footer from './navbar/Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet

const BaseWorker = () => {
  return (
    <div>
      <WorkerNavbar />
      <Header title="Worker Dashboard" />
      <main>
        <Outlet /> {/* Render child dashboard components (WorkerDashboard) here */}
      </main>
      <Footer />
    </div>
  );
};

export default BaseWorker;
