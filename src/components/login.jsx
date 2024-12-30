import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, fetchUserData } from '../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ usernameOrEmail, password }));

      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchUserData());

        const user = result.payload && result.payload.data && result.payload.data.user;
        if (user) {
          const userRoles = user.roles.map(role => role.name);
          console.log('User roles:', userRoles);

          if (userRoles.includes('ROLE_ADMIN')) {
            navigate('/admin');
          } else if (userRoles.includes('ROLE_WORKER')) {
            navigate('/worker');
          } else if (userRoles.includes('ROLE_NORMAL')) {
            navigate('/user');
          } else {
            console.error('No matching role found.');
          }
        }
      } else {
        console.error('Login failed:', result.error.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container mt-5">
      {error && <p className="text-danger">{error.errorMessage}</p>}
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username or Email:</label>
          <input
            type="text"
            className="form-control"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
