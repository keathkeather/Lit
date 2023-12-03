import Header from './Header'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import BookEntry from './BookEntry';
import { fetchBooks, Book } from './BookService';

const ExploreScreen: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksData = await fetchBooks();
        setOriginalBooks(booksData);
        setBooks(booksData);
        console.log('Books fetched successfully:', booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error
      }
    }; 
  
    fetchBooksData();
  }, []);

  const handleSearch = () => {
    // Filter books based on search input
    const filteredBooks = originalBooks.filter((book) =>
      book.bookName.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the books state with the filtered books
    setBooks(filteredBooks);
  };

  const handlePlay = () => {
    navigate('/book');
  };

  const handlePlus = (bookId: number) => {
    // logic here...
    console.log(`Clicked on Plus button for Book ID: ${bookId}`);
  };

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        <div className="mt-12 mb-4">
            <Carousel />
        </div>

        <div className="mt-5 mb-5 relative"
             style={{ width: '600px' }}>
            <div className="relative">
                <input
                type="text"
                placeholder="Search a title or an author"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border rounded-xl p-1 py-2 px-3 text-lg text-left"
                />
                <button onClick={handleSearch}>
                    <img
                    src="litimg/search.svg"
                    alt="Search"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8"
                    />
                </button>
            </div>
        </div>

        <div className="mt-5 mr-7 flex flex-wrap justify-between"
             style={{width: '1300px'}}>
          {books.map((book) => (
            <BookEntry
              key={book.bookId}
              title={book.bookName}
              genre={book.genre}
              // author={book.author}
              // Add other fields as needed
              onPlusClick={() => handlePlus(book.bookId)}
              onPlayClick={handlePlay}
            />
          ))}
        </div>

        </div>
    </div>
  );
};

export default ExploreScreen;