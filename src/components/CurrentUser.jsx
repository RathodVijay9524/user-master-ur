
import { useSelector } from 'react-redux';

const CurrentUser = () => {
  const { user } = useSelector(state => state.auth);

  // Check if user exists before rendering
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
