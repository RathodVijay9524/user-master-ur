// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BaseAdmin from './components/BaseAdmin/BaseAdmin';
import BaseUser from './components/BaseUser/BaseUser';
import BaseWorker from './components/BaseWorker/BaseWorker';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import PrivateRoute from './PrivateRoute';
import AdminHome from './components/BaseAdmin/AdminHome';
import ActiveUser from './components/BaseAdmin/ActiveUser';

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Route for Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin"> {/* Only allow admins to access */}
              <BaseAdmin />
            </PrivateRoute>
          }
        >
          {/* Default route for admin, which will render the AdminHome component */}
          <Route index element={<AdminHome />} /> {/* This will render only AdminHome when you visit /admin */}

          {/* Nested routes for Admin Dashboard and Active Users */}
          <Route path="dashboard" element={<AdminDashboard />} /> {/* This will render the AdminDashboard */}
          <Route path="active-users" element={<ActiveUser />} /> {/* This will render ActiveUser */}
        </Route>




        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <BaseUser />
            </PrivateRoute>
          }
        >
          <Route path="" element={<UserDashboard />} /> {/* User Dashboard as child */}
        </Route>




        <Route
          path="/worker"
          element={
            <PrivateRoute role="worker">
              <BaseWorker />
            </PrivateRoute>
          }
        >
          <Route path="" element={<WorkerDashboard />} /> {/* Worker Dashboard as child */}
        </Route>

        {/* Redirect to login if path doesn't match any route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<h2>Login Page</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
