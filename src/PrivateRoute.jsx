// src/PrivateRoute.jsx

import PropTypes from 'prop-types';  // Ensure you import PropTypes
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const isAuthenticated = true; // Replace with actual authentication logic
  const userRole = 'admin'; // Replace with actual role logic

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Adding PropTypes to validate the props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Children can be any type of React node (e.g., components, elements)
  role: PropTypes.string.isRequired,  // Role should be a string
};

export default PrivateRoute;
