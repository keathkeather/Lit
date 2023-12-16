import React, { useEffect, useState } from 'react';
import BookEntry from './BookEntry';
import { fetchBooks, Book } from './BookService';

interface AuthorBooksProps {
  signedInUser: { firstName: string; lastName: string };
}

const AuthorBooks: React.FC<AuthorBooksProps> = ({ signedInUser }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const allBooks = await fetchBooks();

        // Filter books based on the signed-in author's name
        const authorBooks = allBooks.filter(
          (book) =>
            book.author.firstName === signedInUser.firstName && book.author.lastName === signedInUser.lastName
        );

        setBooks(authorBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooksData();
  }, [signedInUser]);

  const handlePlusClick = (bookId: number) => {
    // Handle the plus button click for the author's books
    console.log(`Clicked on Plus button for Book ID: ${bookId}`);
  };

  const handlePlayClick = () => {
    // Handle the play button click for the author's books
    console.log('Clicked on Play button');
  };

  return (
    <div className="mt-5 mr-7 flex flex-wrap justify-between" style={{ width: '1300px' }}>
      {books.length === 0 ? (
        <div className="flex items-center justify-center h-full ml-60 mb-10 mt-10">
            <p className="text-3xl text-lgray font-bold mx-auto ml-52 mt-10 mb-10">You haven't published any books.</p>
        </div>
      ) : (
        books.map((book) => (
          <BookEntry
            key={book.bookId}
            bookId={book.bookId}
            title={book.bookName}
            genre={book.genre}
            author={book.author}
            onPlusClick={() => handlePlusClick(book.bookId)}
            onPlayClick={() => handlePlayClick()}
          />
        ))
      )}
    </div>
  );
};

export default AuthorBooks;
