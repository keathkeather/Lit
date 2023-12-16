import Header from './Header'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import BookEntry from './BookEntry';
import { fetchBooks, Book } from './BookService';
import addBookListService from '../ApiClient/addBookListService';
import { useAccount } from './AccountContext';
import { useBook } from './BookContext';

const ExploreScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);
  const {account} = useAccount();
  const {setBook} = useBook();
  useEffect(() => {
    if(account){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);
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

  const handlePlay = (book:Book) => {
    setBook(book);
    navigate('/book');  
  };

  const handlePlus = (bookId: number) => {
    // logic here...
    // addBookListService(account?.accountId??0 , bookId);
    console.log(`BookId:"+${bookId}`);
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

        <div className="mt-5 ml-16 flex flex-wrap items-left"
             style={{width: '1400px'}}>
          {books.map((book) => (
            <BookEntry
              bookId={book.bookId}
              title={book.bookName}
              genre={book.genre}
              author={book.author}
              onPlusClick={() => handlePlus(book.bookId)}
              onPlayClick={()=>handlePlay(book)}
            />
          ))}
        </div>

        </div>
    </div>
  );
};

export default ExploreScreen;