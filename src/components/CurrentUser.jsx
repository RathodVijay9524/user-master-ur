import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fetchCurrentUser from '../redux/fetchCurrentUser';

const CurrentUser = () => {
  const [user, setUser] = useState(null);
  const { token } = useSelector(state => state.auth);

  console.log("token : ", token)

  useEffect(() => {
    const getUserData = async () => {
      if (!user && token) {
        try {
          const userData = await fetchCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getUserData();
  }, [user, token]);

  // Log user data for debugging
  console.log('CurrentUser component render - user:', user);

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div>
      <h2>Current User Information</h2>
      <ul>
        <li><strong>ID:</strong> {user.id}</li>
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Phone Number:</strong> {user.phoNo}</li>
        <li><strong>Roles:</strong> {user.roles.map(role => role.name).join(', ')}</li>
      </ul>
    </div>
  );
};

export default CurrentUser;
