import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!allUsersFetched) {
      fetchUsers();
    }
  }, [allUsersFetched]);

  return (
    <div className=''>
      <h1>Hello admin</h1>
      <div className = "relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className ="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.account.accountId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{user.username}</th>
                <td className="px-6 py-4">{user.account.email}</td>
                <td>{user.account.role.role_name}</td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomeScreen;