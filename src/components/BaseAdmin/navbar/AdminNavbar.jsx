
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/admin">
        Admin Panel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/current-user">
              Current User
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/active-users">
              Active Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
