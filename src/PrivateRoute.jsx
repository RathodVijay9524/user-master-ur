import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, user } = useSelector(state => state.auth);

  // Add logging for debugging
  console.log('Token:', token);
  console.log('User:', user);
  console.log('Required Role:', requiredRole);

  // Check if the user is authenticated and has the required role
  if (!token || (requiredRole && !user?.roles.some(role => role.name === requiredRole))) {
    // Add logging for debugging
    console.log('Redirecting to login');
    return <Navigate to="/" />;
  }

  // If authenticated and role matches, render the children (protected route content)
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default PrivateRoute;
