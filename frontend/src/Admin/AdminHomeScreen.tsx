import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

interface RoleEntity {
  role_id: number;
  role_name: string;
}

interface AccountEntity {
  email: string;
  accountId: number;
  role: RoleEntity;
  firstName: string;
  lastName: string;
}

interface UserEntity {
  username: string;
  password: string;
  account: AccountEntity;
}

interface AdminHomeScreenProps {}

const AdminHomeScreen: React.FC<AdminHomeScreenProps> = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [allUsersFetched, setAllUsersFetched] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [isDelUserModalVisible, setDelUserModalVisible] = useState(false);
  const [selectedDelUserId, setSelectedDelUserId] = useState<number | null>(null as number | null);
  const allUserModalVisible = isDelUserModalVisible;

  const toggleDelUserModal = (userId: number) => {
    console.log('toggleDelUserModal called with userId:', userId);
    setSelectedDelUserId(userId);
    setDelUserModalVisible(!isDelUserModalVisible);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getAllAvailableUsers`);
      const data: UserEntity[] = await response.json();

      if (data.length === 0) {
        setAllUsersFetched(true);
        return;
      }

      setUsers((prevUsers) => [...prevUsers, ...data]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFilter = (role: string | null) => {
    setFilter(role);
  };

  const handleDeleteUser = async () => {
    console.log('Deleting user with userId:', selectedDelUserId);
    if (selectedDelUserId === null) {
      console.error('Invalid userId');
      return;
    } else {
  
    try {
      const response = await fetch(`http://localhost:8080/user/deleteUser/${selectedDelUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.account.accountId !== selectedDelUserId));
        console.log('User deleted successfully');
      } else {
        const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to delete user');
      }
  
      setDelUserModalVisible(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setDelUserModalVisible(false); // Close the modal after deletion
    }
  }
  };  

  const itemsPerPage = 7;
  const getUsersForCurrentPage = () => {
    const startIndex = (usersCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter users based on the selected role
    const filteredUsers = filter
    ? users.filter((user) => user.account.role.role_name === filter)
    : users;

    const filteredAndExcludedUsers =
    filter !== 'Author' ? filteredUsers.filter((user) => user.account.role.role_name !== 'Author') : filteredUsers;

    console.log('Filtered Users:', filteredAndExcludedUsers);

    return filteredAndExcludedUsers.slice(startIndex, endIndex);
  };

  useEffect(() => {
    if (!allUsersFetched) {
      fetchUsers();
    }
  }, [allUsersFetched]);

  return (
    <div className="flex">
      
              {isDelUserModalVisible && (
                <div className="bs-overlay"></div>
              )}
              <style>
                {`
                .bs-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 100;
                }

                .bs-modal {
                    position: fixed;
                    top: 31%;
                    left: 40%;
                    z-index: 100;
                }

                .bs-modal-open {
                    overflow: hidden;
                }
                `}
              </style>
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <div className="text-sm font-medium text-center text-gray-500 border-white border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a
                href="#"
                onClick={() => handleFilter(null)}
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  filter === null ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Users
              </a>
            </li>
            <li className="me-2">
              <a
                href="#"
                onClick={() => handleFilter('Author')}
                className={`inline-block p-4 rounded-t-lg dark:text-blue-500 ${
                  filter === 'Author' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Authors
              </a>
            </li>
          </ul>
        </div>

        {/* User table */}
        <div className="relative overflow-x-auto mt-5 shadow-md sm:rounded-lg h-[32.5rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {getUsersForCurrentPage().map((user, index) => (
                <tr
                  key={user.account.accountId}
                  className={`${
                    index % 2 === 0
                      ? 'bg-[#ffffff] dark:bg-gray-800'
                      : 'bg-[#10235d08] dark:bg-gray-900'
                  } ${
                    index !== users.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.account.email}</td>
                  <td className="px-6 py-4"> {user.account.role.role_name} </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/edituser/${user.account.accountId}`}
                      className="mr-2 focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => toggleDelUserModal(user.account.accountId)}
                      className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 p-2.5 rounded-lg">
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-1 px-3 py-2 text-xs font-bold rounded-full ${
                usersCurrentPage === index + 1 ? 'bg-[#10235d] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#10235d] hover:text-white'
              }`}
              onClick={() => setUsersCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div
          id="user-delete-modal"
          className={`bs-modal ${isDelUserModalVisible ? '' : 'hidden'}`}
        >
          <div className="w-full max-w-md max-h-full" style={{ width: '300px' }}>
            <div className="relative bg-white border border-white rounded-xl">
              <div className="flex flex-col items-center mt-4 mb-4 p-4">
                <div className="mt-2 font-bold text-xl text-[#c72b2b]">Delete User</div>
                <div className="font-semibold text-md text-center p-4">Are you sure you want to delete the user?</div>
                <div className="flex flex-row mt-2 mb-2">
                  <button type="button" onClick={() => setDelUserModalVisible(false)} className="mr-5 px-8 py-2 rounded bg-[#E6E6E6] text-black font-semibold cursor-pointer text-sm">
                    Cancel
                  </button>
                  <button type="button" onClick={handleDeleteUser} className="px-8 py-2 rounded bg-[#c72b2b] text-white font-semibold cursor-pointer text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeScreen;