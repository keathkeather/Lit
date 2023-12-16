import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

interface BookEntity {
  bookId: number;
  bookRequestId: number;
  bookName: string;
  genre: string;
  author: {
    accountId: number;
    role: {
      role_id: number;
      role_name: string;
      role_description: string;
    };
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    bookList: {
      books: [];
    };
    accountAchievement: {
      accountAchievementId: number;
      achievements: [];
      isDeleted: boolean;
    };
    quizAnswered: {
      quizAnsweredId: number;
      quizScores: [];
    };
    isDeleted: boolean;
  };
}

interface BooksScreenProps {}

const BooksScreen: React.FC<BooksScreenProps> = () => {
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [pendingBooks, setPendingBooks] = useState<BookEntity[]>([]);

  // Fetch books and pending books data from your API
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksResponse = await fetch(`http://localhost:8080/book/all`);
        const booksData: BookEntity[] = await booksResponse.json();
        setBooks(booksData);

        const pendingBooksResponse = await fetch(`http://localhost:8080/bookRequest/all`);
        const pendingBooksData: BookEntity[] = await pendingBooksResponse.json();
        setPendingBooks(pendingBooksData);
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };

    fetchBooksData();
  }, []); // Run once on component mount

  const handleDeleteBook = async (bookId: number) => {
    // Your implementation here
  };
  
  const handleApproveBook = async (bookId: number) => {
    // Your implementation here
  };
  
  const handleDeclineBook = async (bookId: number) => {
    // Your implementation here
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        {/* Books Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Books</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Book ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Genre</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId}>
                  <td className="border p-2">{book.bookId}</td>
                  <td className="border p-2">{book.bookName}</td>
                  <td className="border p-2">{book.genre}</td>
                  <td className="border p-2">{book.author.firstName} {book.author.lastName}</td>
                  <td className="border p-2">
                    <Link to={`/editbook/${book.bookId}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                    <span className="mx-2">|</span>
                    <button onClick={() => handleDeleteBook(book.bookId)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending Books Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pending Books</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Book ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Genre</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingBooks.map((pendingBook) => (
                <tr key={pendingBook.bookId}>
                  <td className="border p-2">{pendingBook.bookRequestId}</td>
                  <td className="border p-2">{pendingBook.bookName}</td>
                  <td className="border p-2">{pendingBook.genre}</td>
                  <td className="border p-2">
                    {`${pendingBook.author.firstName} ${pendingBook.author.lastName}`}
                  </td>
                  <td className="border p-2">
                    <button onClick={() => handleApproveBook(pendingBook.bookId)} className="text-green-500 hover:underline">
                      Approve
                    </button>
                    <span className="mx-2">|</span>
                    <button onClick={() => handleDeclineBook(pendingBook.bookId)} className="text-red-500 hover:underline">
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

export default BooksScreen;
