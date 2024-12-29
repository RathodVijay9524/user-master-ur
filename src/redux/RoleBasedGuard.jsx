import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBasedGuard = ({ children, requiredRole }) => {
  const { token, user, loading } = useSelector(state => state.auth);

  console.log('Token:', token);
  console.log('User:', user);
  console.log('Required Role:', requiredRole);

  if (loading) {
    return <div>Loading...</div>;
  }

  const roleMatch = requiredRole && user?.roles.some(userRole => userRole.name === requiredRole);

  if (!token || !roleMatch) {
    console.log('Redirecting to login');
    localStorage.removeItem('jwtToken'); // Optionally remove token
    return <Navigate to="/login" />;
  }

  return children;
};

RoleBasedGuard.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default RoleBasedGuard;
