import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Book } from '../Home/BookService';

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
    const [isEdiModalVisible, setEdiModalVisible] = useState(false);
    const [isDelModalVisible, setDelModalVisible] = useState(false);
    const [isAppModalVisible, setAppModalVisible] = useState(false);
    const [isDecModalVisible, setDecModalVisible] = useState(false);
    const [selectedDelBookId, setSelectedDelBookId] = useState<number | null>(null);
    const [selectedAppBookId, setSelectedAppBookId] = useState<number | null>(null);
    const [selectedDecBookId, setSelectedDecBookId] = useState<number | null>(null);
    const allBSModalVisible = isDelModalVisible || isAppModalVisible || isDecModalVisible || isEdiModalVisible;
    const [bookId, setBookId] = useState<number | null>(null);

    const [editedBook, setEditedBook] = useState({
        bookName: '',
        genre: '',
    });
    
    const toggleEdiModal = async (selectedBookId: number) => {
        try {
          // Fetch book details
          const response = await fetch(`http://localhost:8080/book/getBook/${selectedBookId}`);
          const data = await response.json();
    
          // Set the bookId
          setBookId(selectedBookId);
    
          // Set the edited book details
          setEditedBook({
            bookName: data.bookName || '',
            genre: data.genre || '',
            // Add more fields if needed
          });
    
          // Toggle the modal visibility
          setEdiModalVisible(!isEdiModalVisible);
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      };

      const handleEditBook = async () => {
        try {
            if (bookId === null) {
                console.error('No bookId available for editing');
                return;
            }
        
            // Fetch the existing book details
            const existingBookResponse = await fetch(`http://localhost:8080/book/getBook/${bookId}`);
            const existingBookData = await existingBookResponse.json();
        
            // Prepare the updated book details
            const updatedBook = {
                ...existingBookData, // Copy existing details
                bookName: editedBook.bookName,
                genre: editedBook.genre,
                // Add more fields if needed
            };
        
            // Send a request to update the book details using the stored bookId
            const response = await fetch(`http://localhost:8080/book/update/${bookId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });
        
            if (response.ok) {
                console.log('Book details successfully updated');
        
                // Close the edit modal
                setEdiModalVisible(false);
        
                // Fetch the updated list of books and update the state
                const updatedBooksResponse = await fetch(`http://localhost:8080/book/allAvailableBooks`);
                const updatedBooksData = await updatedBooksResponse.json();
                setBooks(updatedBooksData);
            } else {
                console.error('Failed to update book details:', response.statusText);
            }
            } catch (error) {
            if (error instanceof Error) {
                console.error('Error updating book details:', error.message);
            } else {
                console.error('Non-Error object thrown during update:', error);
            }
        }
    };
      

    const toggleDelModal = (bookId: number) => {
        setSelectedDelBookId(bookId);
        setDelModalVisible(!isDelModalVisible);
    };

    const toggleAppModal = (bookRequestId: number) => {
        setSelectedAppBookId(bookRequestId);
        setAppModalVisible(!isDelModalVisible);
    };

    const toggleDecModal = (bookRequestId: number) => {
        setSelectedDecBookId(bookRequestId);
        setDecModalVisible(!isDelModalVisible);
    };
    
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

    const handleDeleteBook = async () => {
        try {
        // Send a request to delete the book
        const deleteResponse = await fetch(`http://localhost:8080/book/delete/${selectedDelBookId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!deleteResponse.ok) {
            console.error('Failed to delete the book:', deleteResponse.statusText);
            return;
        }

        if(isDelModalVisible) {
            setDelModalVisible(false);
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

    const handleApproveBook = async () => {
        try {
        // Send a request to approve the book request
        const approveResponse = await fetch(`http://localhost:8080/bookRequest/approveRequest/${selectedAppBookId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!approveResponse.ok) {
            console.error('Failed to approve book request:', approveResponse.statusText);
            return;
        }

        if(isAppModalVisible) {
            setAppModalVisible(false);
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

    const handleDeclineBook = async () => {
        try {
        // Send a request to approve the book request
        const approveResponse = await fetch(`http://localhost:8080/bookRequest/denyRequest/${selectedDecBookId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!approveResponse.ok) {
            console.error('Failed to approve book request:', approveResponse.statusText);
            return;
        }

        if(isDecModalVisible) {
            setDecModalVisible(false);
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
        <div className="flex overflow-y-auto">

            {allBSModalVisible && (
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
                    z-index: 101;
                }

                .bs-modal-open {
                    overflow: hidden;
                }
                `}
            </style>

            <Sidebar />

            <div
            id="bs-modal"
            className={`bs-modal ${isEdiModalVisible ? '' : 'hidden'}`}
            >
            <div className="w-full max-w-md max-h-full" style={{ width: '300px' }}>
                <div className="relative bg-white border border-white rounded-xl">
                <div className="flex flex-col items-center mt-4 mb-4 p-4">
                    <div className="mt-2 font-bold text-xl text-[#427A5B]">Edit Book</div>
                    <div className="font-semibold text-md text-center p-4">
                    {/* Input fields for editing book details */}
                    <div className="mb-4">
                        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                        Title
                        </label>
                        <input
                        type="text"
                        id="edit-title"
                        name="edit-title"
                        value={editedBook.bookName}
                        onChange={(e) => setEditedBook((prev) => ({ ...prev, bookName: e.target.value }))}
                        className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="edit-genre" className="block text-sm font-medium text-gray-700">
                        Genre
                        </label>
                        <input
                        type="text"
                        id="edit-genre"
                        name="edit-genre"
                        value={editedBook.genre}
                        onChange={(e) => setEditedBook((prev) => ({ ...prev, genre: e.target.value }))}
                        className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    {/* Add more input fields based on your book details */}
                    </div>
                    <div className="flex flex-row mt-2 mb-2">
                    <button
                        type="button"
                        onClick={() => setEdiModalVisible(false)}
                        className="mr-5 px-8 py-2 rounded bg-[#E6E6E6] text-black font-semibold cursor-pointer text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => handleEditBook()}
                        className="px-8 py-2 rounded bg-[#427A5B] text-white font-semibold cursor-pointer text-sm"
                    >
                        Update
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div
            id="bs-modal"
            className={`bs-modal ${isDelModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 font-bold text-xl text-[#c72b2b]">Delete Book</div>
                            <div className="font-semibold text-md text-center p-4">Are you sure you want to delete the book?</div>
                            <div className="flex flex-row mt-2 mb-2">
                                <button type="button" onClick={() => setDelModalVisible(false)} className="mr-5 px-8 py-2 rounded bg-[#E6E6E6] text-black font-semibold cursor-pointer text-sm">
                                    Cancel
                                </button>
                                <button type="button" onClick={() => handleDeleteBook()} className="px-8 py-2 rounded bg-[#c72b2b] text-white font-semibold cursor-pointer text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
            id="bs-modal"
            className={`bs-modal ${isAppModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 mb-2 font-bold text-xl text-[#427A5B]">Approve Book</div>
                            <div className="font-semibold text-md text-center p-2">Are you sure you want to approve the book?</div>
                            <div className="flex flex-row mt-4 mb-2">
                                <button type="button" onClick={() => setAppModalVisible(false)} className="mr-5 px-8 py-2 rounded bg-[#E6E6E6] text-black font-semibold cursor-pointer text-sm">
                                    Cancel
                                </button>
                                <button type="button" onClick={() => handleApproveBook()} className="px-8 py-2 rounded bg-[#427A5B] text-white font-semibold cursor-pointer text-sm">
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
            id="bs-modal"
            className={`bs-modal ${isDecModalVisible ? '' : 'hidden'}`}
            >
                <div className="w-full max-w-md max-h-full"
                    style={{width: '300px'}}>
                    <div className="relative bg-white border border-white rounded-xl">
                        <div className="flex flex-col items-center mt-4 mb-4 p-4">
                            <div className="mt-2 mb-2 font-bold text-xl text-[#c72b2b]">Decline Book</div>
                            <div className="font-semibold text-md text-center p-2">Are you sure you want to decline the book?</div>
                            <div className="flex flex-row mt-4 mb-2">
                                <button type="button" onClick={() => setDecModalVisible(false)} className="mr-5 px-8 py-2 rounded bg-[#E6E6E6] text-black font-semibold cursor-pointer text-sm">
                                    Cancel
                                </button>
                                <button type="button" onClick={() => handleDeclineBook()} className="px-8 py-2 rounded bg-[#c72b2b] text-white font-semibold cursor-pointer text-sm">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                            <td className="px-6 py-4">
                                {/* Check if the author object exists before accessing its properties */}
                                {book.author ? `${book.author.firstName} ${book.author.lastName}` : 'N/A'}
                            </td>
                            <td className="py-2 flex items-center justify-center">
                            <button
                                onClick={() => toggleEdiModal(book.bookId)}
                                className="ml-5 focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                            >
                                Edit
                            </button>
                            <span className="mx-2">|</span>
                            <button
                                onClick={() => toggleDelModal(book.bookId)}
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
                            <td className="px-6 py-4">
                                {/* Check if the author object exists before accessing its properties */}
                                {pendingBook.author ? `${pendingBook.author.firstName} ${pendingBook.author.lastName}` : 'N/A'}</td>
                            <td className="py-2 flex items-center justify-center">
                            <button
                                onClick={() => toggleAppModal(pendingBook.bookRequestId)}
                                className="focus:outline-none text-xs text-[#427A5B] bg-[#DEEDE5] hover:bg-[#427A5B] hover:text-white font-medium rounded-lg px-5 py-2 mb-1 mt-1"
                            >
                                Approve
                            </button>
                            <span className="mx-2">|</span>
                            <button
                                onClick={() => toggleDecModal(pendingBook.bookRequestId)}
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
