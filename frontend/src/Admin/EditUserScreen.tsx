import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface EditUserScreenProps {}

const EditUserScreen: React.FC<EditUserScreenProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
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
      const response = await fetch(`http://localhost:8080/user/getUser/${userId}`);
      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/user/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User details successfully updated');
        navigate('/admin');
        
      } else {
        console.error('Failed to update user details:', response.statusText);
        
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating user details:', error.message);
      } else {
        console.error('Non-Error object thrown during update:', error);
      }
      
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    setUser((prevUser) => {
      if (name === 'username') {
        return { ...prevUser, [name]: value };
      } else if (name === 'account.email') {
        return { ...prevUser, account: { ...prevUser.account, email: value } };
      } else if (name === 'account.role.role_name') {
        return { ...prevUser, account: { ...prevUser.account, role: { ...prevUser.account.role, role_name: value } } };
      } else {
        // Handle other top-level properties if needed
        return { ...prevUser, [name]: value };
      }
    });
  };  

  return (
    <div className="flex">
      <div className="flex p-4">
        <div className="relative overflow-x shadow-md sm:rounded-lg bg-[#D3D3D3]">
          <form onSubmit={handleFormSubmit} className="w-full">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="account.email"
                  value={user.account?.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="account.role.role_name"
                  value={user.account?.role?.role_name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="col-span-1 flex items-end">
                <button type="submit" className="bg-[#F88125] hover:bg-[#0C2467] text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserScreen;
