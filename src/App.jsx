import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseAdmin from './components/BaseAdmin/BaseAdmin';
import BaseUser from './components/BaseUser/BaseUser';
import BaseWorker from './components/BaseWorker/BaseWorker';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import PrivateRoute from './PrivateRoute';
import AdminHome from './components/BaseAdmin/AdminHome';
import ActiveUser from './components/BaseAdmin/ActiveUser';
import Login from './components/login'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="ROLE_ADMIN">
              <BaseAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="active-users" element={<ActiveUser />} />
        </Route>

        <Route
          path="/user"
          element={
            <PrivateRoute requiredRole="ROLE_NORMAL">
              <BaseUser />
            </PrivateRoute>
          }
        >
          <Route path="" element={<UserDashboard />} />
        </Route>

        <Route
          path="/worker"
          element={
            <PrivateRoute requiredRole="ROLE_WORKER">
              <BaseWorker />
            </PrivateRoute>
          }
        >
          <Route path="" element={<WorkerDashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
