import React, { useEffect, useState } from 'react';
import {useAccount} from './AccountContext';
import { useNavigate } from 'react-router-dom';
import { fetchAuthorBooks } from '../ApiClient/fetchAuthorBooks';
import { useBook } from './BookContext';
import { Book } from './BookService';
import BookEntry from './BookEntry';
import { useHandleBookList} from '../ApiClient/handleBookList';
import BookEntryWithHandlers from '../ApiClient/BookEntryWithHandlers';
interface AuthorBooksProps {
}

const AuthorBooks: React.FC<AuthorBooksProps> = ( ) => {
  const [books, setBooks] = useState<Book[]>([]);
  const {account} = useAccount();
  const {setBook} = useBook();
  const navigate = useNavigate();
  const {getBookList} = useHandleBookList();

  const [bookList, setBookList] = useState<Book[]>(() => {
    const savedBookList = sessionStorage.getItem('bookList');
    try {
      return savedBookList ? JSON.parse(savedBookList) : [];
    } catch (error) {
      console.error('Failed to parse bookList from sessionStorage', error);
      return [];
    }
  });
  


  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const authorBooks = await fetchAuthorBooks(account?.accountId??0);

        // Filter books based on the signed-in author's name
        setBooks(authorBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooksData();
  }, [account?.accountId]);

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const list = await getBookList(account?.accountId ?? 0);
        setBookList(list);
        console.log('Accpunt booklist fetched successfully:', list);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error
      }
    }; 
    fetchBookList();
  }, [account?.accountId]);
  return (
    <div className="mt-5 ml-14 flex flex-wrap items-left" style={{ width: '1400px' }}>
      {books.length === 0 ? (
        <div className="flex items-center justify-center h-full ml-60 mb-10 mt-10">
            <p className="text-3xl text-lgray font-bold mx-auto ml-52 mt-10 mb-10">You haven't published any books.</p>
        </div>
      ) : (
        books.map((book) => (
          <BookEntryWithHandlers book={book}/>
        ))
      )}
    </div>
  );
};

export default AuthorBooks;
