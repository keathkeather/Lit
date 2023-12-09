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

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getAllUsers`);
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

  useEffect(() => {
    if (!allUsersFetched) {
      fetchUsers();
    }
  }, [allUsersFetched]);

  return (
    <div className="flex">
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
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => (filter ? user.account.role.role_name === filter : true))
                .map((user) => (
                  <tr
                    key={user.account.accountId}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-lightg dark:hover:gray"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {user.username}
                    </th>
                    <td className="px-6 py-4">{user.account.email}</td>
                    <td className="px-6 py-4"> {user.account.role.role_name} </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/edituser/${user.account.accountId}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeScreen;
