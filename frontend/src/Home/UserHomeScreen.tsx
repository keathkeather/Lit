import React, { useEffect, useState } from 'react';
import Header from './Header'
import { useNavigate} from 'react-router-dom';
import { useAccount } from './AccountContext';
import { fetchBooks,Book} from './BookService';
import BookEntryWithHandlers from '../ApiClient/BookEntryWithHandlers';
const UserHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const {account} = useAccount();
  const [books, setBooks] = useState<Book[]>([]);
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);

  function getRandomElements(arr: any[], n: number) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  }
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

  const randomBooks = getRandomElements(books, 4);



  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        <div className="relative">
          <img src="litimg/home.png" alt="Home" className="w-screen h-full" />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center"
            style={{ width: '620px', marginRight: '100px' }}>
              <img src="litimg/litsy.png" alt="Litsy" className="w-40 mr-4" />
              {account && (
              <div className="text-white text-3xl font-semibold mt-2">Welcome, {account.firstName}! May you have a wondrous adventure to the World of Filipino Literature</div>
              )}
              </div>
          </div>
        </div>

        <div className="mt-5 mb-7">
          <div className="text-black text-xl font-bold absolute left-36">Recommendations</div>
        </div>

        <div>
          <div className="flex flex-row items-center">
          <div className="mt-5 ml-16 flex flex-wrap items-left" style={{width: '1400px'}}>
            {randomBooks.map((book) => (
              <BookEntryWithHandlers
                key={book.bookId}
                book={book}
              />
            ))}
              
        </div>
          </div>
        </div>

        </div>
    </div>
  );
};

export default UserHomeScreen;