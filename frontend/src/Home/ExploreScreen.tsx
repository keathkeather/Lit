import Header from './Header'
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import { fetchBooks, Book } from './BookService';
import { useAccount } from './AccountContext';
import BookEntryWithHandlers from '../ApiClient/BookEntryWithHandlers';
import { useBookList } from '../ApiClient/BookListContext';
import { useHandleBookList } from '../ApiClient/handleBookList';
const ExploreScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);
  const {account} = useAccount();
  const {bookList, setBookList} = useBookList();
  const {getBookList} =  useHandleBookList();
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
      }
    }; 
  
    fetchBooksData();
  }, []);
  useEffect(() => {
    const fetchBookList = async () => {
      const bookList = await getBookList(account?.accountId ?? 0);
      setBookList(bookList);
    };

    fetchBookList();
  }, []); 
  
 
  const handleSearch = () => {
    const filteredBooks = originalBooks.filter((book) =>
      book.bookName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setBooks(filteredBooks);
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

        <div className="mt-5 ml-16 flex flex-wrap items-left" style={{width: '1400px'}}>
        {books.map((book) => (
              <BookEntryWithHandlers
                key={book.bookId}
                book={book}
              />
            ))}
              
        </div>
      </div>
    </div>
  );
};

export default ExploreScreen;