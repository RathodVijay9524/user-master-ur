import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseAdmin from './components/BaseAdmin/BaseAdmin';
import BaseUser from './components/BaseUser/BaseUser';
import BaseWorker from './components/BaseWorker/BaseWorker';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard';

import AdminHome from './components/BaseAdmin/AdminHome';
import ActiveUser from './components/BaseAdmin/ActiveUser';
import CurrentUser from './components/CurrentUser';
import Login from './components/Login';
import { fetchUserData } from './redux/authSlice';
import RoleBasedGuard from './redux/RoleBasedGuard';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <RoleBasedGuard requiredRole="ROLE_ADMIN">
              <BaseAdmin />
            </RoleBasedGuard>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="current-user" element={<CurrentUser />} />
          <Route path="active-users" element={<ActiveUser />} />
          <Route index element={<AdminHome />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <RoleBasedGuard requiredRole="ROLE_NORMAL">
              <BaseUser />
            </RoleBasedGuard>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          {/* Add other user-specific routes here */}
        </Route>

        {/* Worker Routes */}
        <Route
          path="/worker"
          element={
            <RoleBasedGuard requiredRole="ROLE_WORKER">
              <BaseWorker />
            </RoleBasedGuard>
          }
        >
          <Route path="dashboard" element={<WorkerDashboard />} />
          {/* Add other worker-specific routes here */}
        </Route>

        {/* Login and Default Route */}

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
