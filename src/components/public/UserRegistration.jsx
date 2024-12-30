import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserRegistration = () => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phoNo: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/v1/users/register', user);
      setLoading(false);
      setSuccess(response.data);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data ? err.response.data : "Registration failed.");
      setSuccess(null);
    }
  };

  const handleReset = () => {
    setUser({
      name: '',
      username: '',
      email: '',
      password: '',
      phoNo: '',
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title text-center mb-4">User Registration</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success.message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoNo"
                  value={user.phoNo}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
                <button type="button" className="btn btn-secondary mt-1" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              Already registered? <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
