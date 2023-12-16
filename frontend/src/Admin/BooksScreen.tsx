import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

interface BookEntity {
  bookId: number;
  bookRequestId: number;
  bookName: string;
  genre: string;
  author: {
    firstName: string;
    lastName: string;
    bookList: {
      books: [];
    };
  };
}

interface BooksScreenProps {}

const BooksScreen: React.FC<BooksScreenProps> = () => {
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [pendingBooks, setPendingBooks] = useState<BookEntity[]>([]);
  
  // Pagination settings
  const itemsPerPage = 3;
  const [booksCurrentPage, setBooksCurrentPage] = useState(1);
  const [pendingBooksCurrentPage, setPendingBooksCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalBooksPages = Math.ceil(books.length / itemsPerPage);
  const totalPendingBooksPages = Math.ceil(pendingBooks.length / itemsPerPage);

  // Get the current items to display based on the current page
  const getBooksForCurrentPage = () => {
    const startIndex = (booksCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return books.slice(startIndex, endIndex);
  };

  const getPendingBooksForCurrentPage = () => {
    const startIndex = (pendingBooksCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pendingBooks.slice(startIndex, endIndex);
  };

  // Fetch books and pending books data from your API
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksResponse = await fetch(`http://localhost:8080/book/allAvailableBooks`);
        const booksData: BookEntity[] = await booksResponse.json();
        setBooks(booksData);

        const pendingBooksResponse = await fetch(`http://localhost:8080/bookRequest/pending`);
        const pendingBooksData: BookEntity[] = await pendingBooksResponse.json();
        setPendingBooks(pendingBooksData);
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };

    fetchBooksData();
  }, []);

  const handleDeleteBook = async (bookId: number) => {
    try {
      // Send a request to delete the book
      const deleteResponse = await fetch(`http://localhost:8080/book/delete/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!deleteResponse.ok) {
        console.error('Failed to delete the book:', deleteResponse.statusText);
        return;
      }

      console.log('Book successfully deleted');

      // Fetch the updated list of books
      const updatedBooksResponse = await fetch(`http://localhost:8080/book/allAvailableBooks`);
      const updatedBooksData: BookEntity[] = await updatedBooksResponse.json();

      // Update the state with the updated list of books
      setBooks(updatedBooksData);
    } catch (error) {
      console.error('Error handling book deletion:', error);
    }
  };

  const handleApproveBook = async (bookRequestId: number) => {
    try {
      // Send a request to approve the book request
      const approveResponse = await fetch(`http://localhost:8080/bookRequest/approveRequest/${bookRequestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!approveResponse.ok) {
        console.error('Failed to approve book request:', approveResponse.statusText);
        return;
      }

      console.log('Book request successfully approved');

      // Fetch the updated list of books after approval
      const updatedBooksResponse = await fetch(`http://localhost:8080/book/allAvailableBooks`);
      const updatedBooksData: BookEntity[] = await updatedBooksResponse.json();
      setBooks(updatedBooksData);

      // Fetch the updated list of pending book requests
      const updatedPendingBooksResponse = await fetch(`http://localhost:8080/bookRequest/pending`);
      const updatedPendingBooksData: BookEntity[] = await updatedPendingBooksResponse.json();

      // Update the state with the updated list of pending book requests
      setPendingBooks(updatedPendingBooksData);
    } catch (error) {
      console.error('Error handling book approval:', error);
    }
  };

  const handleDeclineBook = async (bookRequestId: number) => {
    try {
      // Send a request to approve the book request
      const approveResponse = await fetch(`http://localhost:8080/bookRequest/denyRequest/${bookRequestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!approveResponse.ok) {
        console.error('Failed to approve book request:', approveResponse.statusText);
        return;
      }

      console.log('Book request successfully denied');

      // Fetch the updated list of pending book requests
      const updatedPendingBooksResponse = await fetch(`http://localhost:8080/bookRequest/pending`);
      const updatedPendingBooksData: BookEntity[] = await updatedPendingBooksResponse.json();

      // Update the state with the updated list of pending book requests
      setPendingBooks(updatedPendingBooksData);
    } catch (error) {
      console.error('Error handling book denial:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-4">
        {/* Books Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray">Books</h2>
          <hr className="border-[#eee]"></hr>
          <br></br>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Book ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Genre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {getBooksForCurrentPage().map((book, index) => (
                  <tr
                    key={book.bookId}
                    className={`${index % 2 === 0 ? 'bg-[#ffffff] dark:bg-gray-800' : 'bg-[#10235d08] dark:bg-gray-900'} ${
                      index !== books.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">{book.bookId}</td>
                    <td className="px-6 py-4">{book.bookName}</td>
                    <td className="px-6 py-4">{book.genre}</td>
                    <td className="px-6 py-4">{`${book.author.firstName} ${book.author.lastName}`}</td>
                    <td className="py-2 flex items-center justify-center">
                      <Link
                        to={`/editbook/${book.bookId}`}
                        className="ml-5 focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                      >
                        Edit
                      </Link>
                      <span className="mx-2">|</span>
                      <button
                        onClick={() => handleDeleteBook(book.bookId)}
                        className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-2 me-2 mb-1 mt-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            {/* Pagination for Books */}
            <div className="flex justify-center mt-4">
            {Array.from({ length: totalBooksPages }, (_, index) => (
                <button
                key={index + 1}
                className={`mx-1 px-3 py-1 rounded-full ${
                    booksCurrentPage === index + 1 ? 'bg-[#10235d] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#10235d] hover:text-white'
                }`}
                onClick={() => setBooksCurrentPage(index + 1)}
                >
                {index + 1}
                </button>
            ))}
            </div>
        </div>

        {/* Pending Books Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray">Pending Books</h2>
          <hr className="border-[#eee]"></hr>
          <br></br>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#10235d12] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Book ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Genre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {getPendingBooksForCurrentPage().map((pendingBook, index) => (
                  <tr
                    key={pendingBook.bookId}
                    className={`${index % 2 === 0 ? 'bg-[#ffffff] dark:bg-gray-800' : 'bg-[#10235d08] dark:bg-gray-900'} ${
                      index !== pendingBooks.length - 1 ? 'border-b-[#000] dark:border-b-[#000]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">{pendingBook.bookRequestId}</td>
                    <td className="px-6 py-4">{pendingBook.bookName}</td>
                    <td className="px-6 py-4">{pendingBook.genre}</td>
                    <td className="px-6 py-4">{`${pendingBook.author.firstName} ${pendingBook.author.lastName}`}</td>
                    <td className="py-2 flex items-center justify-center">
                      <button
                        onClick={() => handleApproveBook(pendingBook.bookRequestId)}
                        className="focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                      >
                        Approve
                      </button>
                      <span className="mx-2">|</span>
                      <button
                        onClick={() => handleDeclineBook(pendingBook.bookRequestId)}
                        className="focus:outline-none text-xs text-[#c72b2b] bg-[#c72b2b28] hover:bg-[#c72b2b] hover:text-white font-medium rounded-lg px-5 py-2 me-2 mb-1 mt-1"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* Pagination for Pending Books */}
            <div className="flex justify-center mt-4">
            {Array.from({ length: totalPendingBooksPages }, (_, index) => (
                <button
                key={index + 1}
                className={`mx-1 px-3 py-1 rounded-full ${
                    pendingBooksCurrentPage === index + 1 ? 'bg-[#10235d] text-white' : 'bg-[#E6E6E6] text-[#4C4C4C] hover:bg-[#10235d] hover:text-white'
                }`}
                onClick={() => setPendingBooksCurrentPage(index + 1)}
                >
                {index + 1}
                </button>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BooksScreen;
