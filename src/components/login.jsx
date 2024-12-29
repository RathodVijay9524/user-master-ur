import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasNavigated, setHasNavigated] = useState(false); // New state to track navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ usernameOrEmail, password }));

      if (result.meta.requestStatus === 'fulfilled') {
        const userRoles = result.payload.data.user.roles.map(role => role.name);
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
      } else {
        console.error('Login failed:', result.error.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    if (user && !hasNavigated) {
      const userRoles = user.roles.map(role => role.name);
      console.log('User roles from state:', userRoles);

      if (userRoles.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else if (userRoles.includes('ROLE_WORKER')) {
        navigate('/worker');
      } else if (userRoles.includes('ROLE_NORMAL')) {
        navigate('/user');
      } else {
        console.error('No matching role found.');
      }

      setHasNavigated(true); // Set navigation to true after navigation
    }
  }, [user, navigate, hasNavigated]);

  return (
    <div>
      {error && <p>{error.errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
};

export default Login;
