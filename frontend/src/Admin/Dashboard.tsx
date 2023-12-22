import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { fetchBooks, Book} from '../Home/BookService';


interface UserEntity {
    username: string;
    account: {
      firstName: string;
      lastName: string;
      role: {
        role_name: string;
      };
      accountAchievement: {
        achievements: []
      },
    };
  }


interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);
    
    // Pagination settings
    const usersItemsPerPage = 5;
    const [usersCurrentPage, setUsersCurrentPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [pendingBooksCount, setPendingBooksCount] = useState<number>(0);
    const [originalBooks, setOriginalBooks] = useState<Book[]>([]);

    const totalUsers = users.length;
    
    // Fetch users data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [response] = await Promise.all([fetch('http://localhost:8080/user/getAllAvailableUsers')
          ]);

          const data: UserEntity[] = await response.json();

          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      console.log('Fetching data...'); // Add this log for debugging
      fetchData();
    }, [usersCurrentPage]);
  
    const getUsersForCurrentPage = () => {
      const startIndex = (usersCurrentPage - 1) * usersItemsPerPage;
      const endIndex = startIndex + usersItemsPerPage;
      return users.slice(startIndex, endIndex);
    };

    // Fetch books data
 /* useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [response, pendingCountResponse] = await Promise.all([fetch('http://localhost:8080/book/allAvailableBooks'),
        fetch('http://localhost:8080/bookRequest/pending'),
        ]);

        const data: BookEntity[] = await response.json();
        const pendingCountData: number = await pendingCountResponse.json();

        console.log('Books:', data);
        console.log('Pending Books Count:', pendingCountData);

        setBooks(data);
        setTotalBooks(data.length);
        setPendingBooksCount(pendingCountData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); */
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksData = await fetchBooks();
        setOriginalBooks(booksData);
        setBooks(booksData);
        console.log('Books fetched successfully:', booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }; 
  
    fetchBooksData();
  }, []);

  return (
    <div className="">
      <Sidebar />
      <div className="mt-16 ml-80 mr-16 text-3xl  font-bold text-color-gray">
        Dashboard
      </div>
      <div className="ml-80 mr-16 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
         <div className="bg-white border border-lgray p-4 h-24 flex items-center">
            <svg
                className="w-8 h-8 text-gray-800 dark:text-bgc1 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 19"
                fill="currentColor"
            >
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
            <div className="mb-8 ml-8">USERS</div>
            <div className="mt-8 -ml-8">{totalUsers}</div>
        </div>

        <div className="bg-white border border-lgray p-4 h-24 flex items-center">
            <svg
                className="w-8 h-8 text-gray-800 dark:text-bgc1 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 18"
                fill="currentColor"
            >
                <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z"/>
            </svg>
            <div className="mb-8 ml-8">BOOKS</div>
            <div className="mt-8 -ml-8">{totalBooks}</div>
        </div>

        <div className="bg-white border border-lgray p-4 h-24 flex items-center">
            <svg
                className="w-8 h-8 text-gray-800 dark:text-bgc1 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
            </svg>
            <div className="mb-8 ml-8">PENDING BOOKS</div>
            <div className="mt-8 -ml-8">{pendingBooksCount}</div>
        </div>

      </div>
        <div className="mt-10 ml-80 mr-16 text-2xl text-color-gray">
            All Users
        </div>

      {/* Render the Users table with pagination */}
      <div className="ml-80 mr-16 mt-4">
        {/* Render the Users table */}
        <div className="relative overflow-x-auto mt-5 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Firstname
                </th>
                <th scope="col" className="px-6 py-3">
                  Lastname
                </th>
                <th scope="col" className="px-6 py-3">
                  Achievements
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {getUsersForCurrentPage().map((user, index) => (
                <tr
                  key={user.username}
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
                  <td className="px-6 py-4">{user.account.role.role_name}</td>
                  <td className="px-6 py-4">{user.account.firstName}</td>
                  <td className="px-6 py-4">{user.account.lastName}</td>
                  <td className="px-6 py-4">{user.account.accountAchievement.achievements.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Render pagination buttons */}
        <div className="flex justify-center mt-4 p-2.5 rounded-lg mr-[27.5]">
          {Array.from({ length: Math.ceil(users.length / usersItemsPerPage) }, (_, index) => (
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
      </div>
    </div>
  );
};

export default Dashboard;