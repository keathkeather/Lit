import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface EditUserScreenProps {}

const EditUserScreen: React.FC<EditUserScreenProps> = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [user, setUser] = useState({
    username: '',
    password: '',
    account: {
      email: '',
      accountId: 0,
      role: {
        role_id: 0,
        role_name: '',
      },
      firstName: '',
      lastName: '',
    },
  });

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getUser/${accountId}`);
      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [accountId]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/user/updateUser/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User details successfully updated');
        // Optionally, you can redirect or perform other actions upon success
      } else {
        console.error('Failed to update user details:', response.statusText);
        // Handle the failure, show an error message, etc.
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating user details:', error.message);
      } else {
        console.error('Non-Error object thrown during update:', error);
      }
      // Handle network or other errors
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Assuming user.account is an object, check if user.account is defined before accessing its properties
  const email = user.account?.email || '';

  // Assuming user.account.role is an object, check if user.account.role is defined before accessing its properties
  const roleName = user.account?.role?.role_name || '';

  return (
    <div>
      <h2>Edit User Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="account.email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="account.role.role_name"
            value={roleName}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more fields for other user details you want to edit */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserScreen;
