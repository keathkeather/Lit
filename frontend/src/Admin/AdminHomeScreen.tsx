import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useHandleAuthorApproval, Request } from '../ApiClient/handleAuthorApproval';

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

interface Book {
  bookId: number;
  bookName: string;
  bookDescription: string;
  genre: string;
  author: {
    firstName: string;
    lastName: string;
  };
  isDeleted: boolean;
}

interface AdminHomeScreenProps {}

const AdminHomeScreen: React.FC<AdminHomeScreenProps> = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [allUsersFetched, setAllUsersFetched] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [isDelUserModalVisible, setDelUserModalVisible] = useState(false);
  const [selectedDelUserId, setSelectedDelUserId] = useState<number | null>(null);
  const [isEditUserModalVisible, setEditUserModalVisible] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState<UserEntity | null>(null);
  const allUserModalVisible = isDelUserModalVisible || isEditUserModalVisible;
  const [editedUsername, setEditedUsername] = useState<string>('');
  const [editedEmail, setEditedEmail] = useState<string>('');
  const [isUsersTabVisible, setUsersTabVisible] = useState(true);
  const [isAuthorsTabVisible, setAuthorsTabVisible] = useState(false);
  const [usersItemsPerPage, setUsersItemsPerPage] = useState(7);
  const [authorsItemsPerPage, setAuthorsItemsPerPage] = useState(3); // You can set the desired value
  const [authorsTableHeight, setAuthorsTableHeight] = useState<number>(32.5); // Set the initial height as needed

  const [isViewBooksModalVisible, setViewBooksModalVisible] = useState(false);
  const [selectedAuthorAccountId, setSelectedAuthorAccountId] = useState<number | null>(null);
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);
  const [publishedBooks, setPublishedBooks] = useState<Record<number, number>>({});
  const [authorUsers, setAuthorUsers] = useState<UserEntity[]>([]);

  const {handleRequest, getRequest} = useHandleAuthorApproval(); // TODO handling author request
  const [request, setRequest] = useState<Request | null>(null);
  const [allRequest, setAllRequest] = useState<Request[]>([]);
  const[allRequestFetched, setAllRequestFetched] = useState<boolean>(false);

  // *Approve author request
  const handleApprove = async (accountId : number) => {
    handleRequest('approveRequest', accountId);
  }

  const handleDecline = async (accountId : number) => {
    handleRequest('denyRequest', accountId);
  }
  
  // Delete modal for user
  const toggleDelUserModal = (userId: number) => {
    setSelectedDelUserId(userId);
    setDelUserModalVisible(!isDelUserModalVisible);
  };

  // Modal for editing user
  const toggleEditUserModal = (user: UserEntity) => {
  // Initialize the state variables with the current user details
  setEditedUsername(user.username || '');
  setEditedEmail(user.account.email || '');

  setSelectedEditUser(user);
  setEditUserModalVisible(!isEditUserModalVisible);
  };

  // viewing books Modal
  const toggleViewBooksModal = (accountId: number | null = null) => {
    setSelectedAuthorAccountId(accountId);
    setViewBooksModalVisible(!isViewBooksModalVisible);
    if (accountId !== null) {
      fetchAuthorBooks(accountId);
    }
  };

  // getting all books published by an author
  const fetchAuthorBooks = async (accountId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/book/getBookByAuthor/${accountId}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch books');
      }

      const booksData: Book[] = await response.json();
    
      // Filter out books with isDeleted set to true
      const filteredBooks = booksData.filter((book) => !book.isDeleted);

      setAuthorBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching author books:', error);
    }
  };

  const fetchPublishedBooks = async () => {
    try {
      const bookCounts: Record<number, number> = {};
      const authorIds = authorUsers.map((author) => author.account.accountId);

      for (const authorId of authorIds) {
        const response = await fetch(`http://localhost:8080/book/getBookCountByAuthor/${authorId}`);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to fetch books');
        }

        const data = await response.json();
        const count = data; // Assuming the response is a single integer
        bookCounts[authorId] = count;
      }

      setPublishedBooks(bookCounts);
    } catch (error) {
      console.error('Error fetching published books count:', error);
    }
  };

  // Fetch published books count effect
  useEffect(() => {
    // Call fetchPublishedBooks here
    fetchPublishedBooks();
  }, [authorUsers]);
  
  // Close View Book Modal
  const closeViewBooksModal = () => {
    setSelectedAuthorAccountId(null);
    setAuthorBooks([]);
    setViewBooksModalVisible(false);
  };

  // Getting all user
const fetchUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8080/user/getAllAvailableUsers`);
    const data: UserEntity[] = await response.json();

    if (data.length === 0) {
      setAllUsersFetched(true);
      return;
    }

    setUsers((prevUsers) => [...prevUsers, ...data]);

    // Filter and set author users separately
    const authorUsers = data.filter((user) => user.account.role.role_name === 'Author');
    setAuthorUsers(authorUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

//* fetch pending authors
 const fetchAuthorPending = async () => {
    try {
      const response = await fetch(`http://localhost:8080/authorRequest/getAll`);
      const data: Request[] = await response.json();

      if (data.length === 0) {
        setAllRequestFetched(true);
        return;
      }

      const filteredRequest = data.filter((request) => request.requestStatus === 'pending');
      setAllRequest(filteredRequest);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
 };


  // Go to Author Panel (or tab)
  const handleFilter = (role: string | null) => {
    setFilter(role);
    // Set the visibility of tabs based on the selected role
    setUsersTabVisible(role === null);
    setAuthorsTabVisible(role === 'Author');
    
  };  

  // *for autor request
  useEffect(() => {
    if (!allRequestFetched) {
      fetchAuthorPending();
    }
  }, [allRequestFetched]);
    

  useEffect(() => {
    if (!allUsersFetched) {
      fetchUsers();
    }
  }, [allUsersFetched]);

  //deleted user. Used putmapping as we dont want to permanently delete.
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
  
  //Editting user through api
  const handleEditUser = async () => {
    try {
      if (!selectedEditUser) {
        console.error('Invalid user data for editing');
        return;
      }
  
      const response = await fetch(
        `http://localhost:8080/user/updateUser/${selectedEditUser.account.accountId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: editedUsername,
            email: editedEmail,
            // Add more fields as needed
          }),
        }
      );
  
      if (response.ok) {
        // Update the user in the state with the new details
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.account.accountId === selectedEditUser.account.accountId
              ? { ...user, username: editedUsername, account: { ...user.account, email: editedEmail } }
              : user
          )
        );
  
        console.log('User updated successfully');
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to update user');
      }
  
      setEditUserModalVisible(false); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const itemsPerPage = isAuthorsTabVisible ? authorsItemsPerPage : usersItemsPerPage;

  const getUsersForCurrentPage = () => {
    const startIndex = (usersCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter users based on the selected role
    const filteredUsers = filter
    ? users.filter((user) => user.account.role.role_name === filter)
    : users;

    //Dont include admin in display
    const filteredAndExcludedUsers =
      filter !== 'Admin' ? filteredUsers.filter((user) => user.account.role.role_name !== 'Admin') : filteredUsers;

    console.log('Filtered Users:', filteredAndExcludedUsers);

    return filteredAndExcludedUsers.slice(startIndex, endIndex);
  };

  //Displaying User table in User panel or tab
  const renderUsersTable = (usersToDisplay: UserEntity[]) => (
    <div className="p-5 pb-0 pt-4">
          <h2 className="text-2xl font-bold mb-4 text-gray">Authors</h2>
          <hr className="border-[#eee]"></hr>
          <br/>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                            <td className="px-6 py-2">{user.account.email}</td>
                            <td className="px-6 py-2"> {user.account.role.role_name} </td>
                            <td className="px-6 py-2">
                              <button
                                onClick={() => toggleEditUserModal(user)}
                                className="focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                              >
                                Edit
                              </button>
                              <span className="mx-2">|</span>
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
    </div>
  );

  // Displaying Author Table in author panel
  const renderAuthorsTable = () => {
    const authorUsers = users.filter((user) => user.account.role.role_name === 'Author');
    return (
      <div className="p-5 pb-0 pt-4">
          <h2 className="text-2xl font-bold mb-4 text-gray">Authors</h2>
          <hr className="border-[#eee]"></hr>
          <br/>
        <div
          id="authors"
          role="tabpanel"
          aria-labelledby="authors-tab"
        >
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Published Books
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {authorUsers.map((author, index) => (
                  <tr
                    key={author.account.accountId}
                    className={`${
                      index % 2 === 0
                        ? 'bg-[#ffffff] dark:bg-gray-800'
                        : 'bg-[#10235d08] dark:bg-gray-900'
                    } ${
                      index !== authorUsers.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {author.account.accountId}
                    </th>
                    <td className="px-6 py-2">{author.username}</td>
                    <td className="px-6 py-2">{publishedBooks[author.account.accountId]}</td>
                    <td className="px-6 py-2">
                      <button
                        className="focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                        onClick={() => {
                          setSelectedAuthorAccountId(author.account.accountId);
                          fetchAuthorBooks(author.account.accountId); // Fetch books when the button is clicked
                          toggleViewBooksModal();
                        }}
                      >
                        View Books
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
         
        {/*Waiting for Approval */}
        <div className="pb-0 pt-4">
          <h2 className="text-2xl font-bold mb-4 text-gray">Waiting For Approval</h2>
          <hr className="border-[#eee]"></hr>
          <br/>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Application
                </th>
                <th scope="col" className="px-6 py-3">
                  Approval
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allRequest.map((mapRequest, index) => (
                <tr
                  key={`additional-${mapRequest.account.accountId}`}
                  className={`${
                    index % 2 === 0
                      ? 'bg-[#ffffff] dark:bg-gray-800'
                      : 'bg-[#10235d08] dark:bg-gray-900'
                  } ${
                    index !== authorUsers.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {mapRequest.account.accountId}
                  </th>
                  <td className="px-6 py-2">{mapRequest.account.firstName}</td>
                  
                  <td className="px-6 py-2">
                  <button
                    className="focus:outline-none text-xs underline font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                  >
                    View Application
                  </button>
                  </td>
                  <td className="px-6 py-2">
                    <button onClick={() => handleApprove(mapRequest.account.accountId)}
                    className="focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                    >
                      Approve
                    </button>
                        <span className="mx-2">|</span>
                    <button onClick={() => handleDecline(mapRequest.account.accountId)}
                    className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Decline
                    </button>
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

  return (
    <div className="flex">
              {isDelUserModalVisible && <div className="bs-overlay"></div>}
              {isEditUserModalVisible && <div className="bs-edit-modal-overlay"></div>}
              {isViewBooksModalVisible && <div className="bs-viewbooks-modal-overlay"></div>} 
              <style>
                {`
                .bs-overlay,
                .bs-edit-modal-overlay,
                .bs-viewbooks-modal-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                  z-index: 100;
                }

                .bs-modal,
                .bs-edit-modal,
                .bs-viewbooks-modal {
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  z-index: 100;
                }

                .bs-modal-open,
                .bs-edit-modal-open,
                .bs-viewbooks-modal-open {
                  overflow: hidden;
                }
                `}
              </style>

      <Sidebar />
    <div className="flex-1 ml-64 p-4">
      <div className="mb-4 border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg ${isUsersTabVisible ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              id="users-tab"
              data-tabs-target="#users"
              type="button"
              role="tab"
              aria-controls="users"
              aria-selected={isUsersTabVisible}
              onClick={() => handleFilter(null)}
            >
              Users
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg ${isAuthorsTabVisible ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              id="authors-tab"
              data-tabs-target="#authors"
              type="button"
              role="tab"
              aria-controls="authors"
              aria-selected={isAuthorsTabVisible}
              onClick={() => handleFilter('Author')}
            >
              Authors
            </button>
          </li>
          {/* Add more tabs as needed */}
        </ul>
      </div>

      <div id="default-tab-content">

        {/* Authors tab content */}
        {isAuthorsTabVisible && (
          <div id="authors" role="tabpanel" aria-labelledby="authors-tab">
            {renderAuthorsTable()}
          </div>
        )}

      <div
        id="viewbooks-modal"
        className={`bs-modal ${isViewBooksModalVisible ? 'bs-modal-open' : 'hidden'}`}
      >
        <div className="w-full max-w-screen max-h-full bg-white rounded-lg" style={{ width: '740px', height: '660px' }}>
          <div className="bg-[#10235d] rounded-t-lg text-white p-4 mb-4 flex justify-between items-center">
            <h2 className="ml-2 text-lg font-semibold">Published Books</h2>
            <button
              type="button"
              onClick={closeViewBooksModal}
              className="focus:outline-none float-right"
            >
              <img src="/litimg/close.png" alt="xbtn" className="w-3.5 mr-1.5" />
            </button>
          </div>
          <div className="mt-5">
            <div className="ml-5 overflow-y-auto" style={{ width: '720px' }}>
              <ul className="grid grid-cols-4">
                {authorBooks.map((book) => (
                  <li key={book.bookId} className="mb-2">
                    <div className="flex flex-col items-center" style={{ width: '160px' }}>
                      <div className="relative mb-2">
                        <img src={`litimg/${book.bookName}.svg`} alt={book.bookName} className="w-40 rounded-md" />
                      </div>
                      <div className="text-sm font-medium text-center">{book.bookName}</div>
                      <div className="text-xs text-lblue mb-2">{`${book.author.firstName} ${book.author.lastName}`}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

        {isUsersTabVisible && (
        <div id="users" role="tabpanel" aria-labelledby="users-tab">
          {/* Render the Users table */}
          {renderUsersTable(getUsersForCurrentPage())}

        <div className="flex justify-center mt-2 p-2.5 rounded-lg">
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

          <div
            id="user-edit-modal"
            className={`bs-modal ${isEditUserModalVisible ? '' : 'hidden'}`}
          >
            <div className="w-full max-w-md max-h-full" style={{ width: '300px' }}>
              <div className="relative bg-white border border-white rounded-xl">
                <div className="flex flex-col items-center mt-4 mb-4 p-4">
                  <div className="mt-2 font-bold text-xl text-[#427A5B]">Edit User</div>
                  <div className="font-semibold text-md text-center p-4">
                    {/* Input fields for editing user details */}
                    <div className="mb-4">
                    <label htmlFor="edit-username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      id="edit-username"
                      name="edit-username"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="edit-email"
                      name="edit-email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                    </div>
                    {/* Add more input fields based on your user details */}
                  </div>
                  <div className="flex flex-row mt-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setEditUserModalVisible(false)}
                      className="mr-5 px-8 py-2 rounded bg-[#E6E6E6] text-black font-semibold cursor-pointer text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleEditUser}
                      className="px-8 py-2 rounded bg-[#427A5B] text-white font-semibold cursor-pointer text-sm"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
      )}
      </div>
    </div>
  </div>  
  );
};

export default AdminHomeScreen;