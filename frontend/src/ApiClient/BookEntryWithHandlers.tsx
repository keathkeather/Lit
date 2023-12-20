import React,{useState, useEffect} from 'react';
import {fetchBooks,Book} from '../Home/BookService';
import BookEntry from '../Home/BookEntry';
import { useNavigate } from 'react-router-dom';
import { useHandleBookList } from './handleBookList';
import { useAccount } from '../Home/AccountContext';
import { useBook } from '../Home/BookContext';
import { useBookList } from './BookListContext';
interface BookEntryWithHandlersProps {
  book: Book;
  
}




const BookEntryWithHandlers: React.FC<BookEntryWithHandlersProps> = ({ book }) => {
  const {setBook} = useBook();    
    const navigate = useNavigate();
    const {account} = useAccount();
    const {bookList, setBookList} = useBookList();
    const {handleBookList} = useHandleBookList();
    
    const isBookInList = (book: Book): boolean => {
      const inList = bookList.some(listBook => listBook.bookId === book.bookId); 
      console.log(inList);
      return bookList.some(listBook => listBook.bookId === book.bookId);
        
    };

  const handlePlus = () => {
    if (isBookInList(book)) {
      handleBookList('removeBook', account?.accountId ?? 0, book.bookId);
      setBookList(bookList.filter(listBook => listBook.bookId !== book.bookId));
    } else {
      handleBookList('addBook', account?.accountId ?? 0, book.bookId);
      setBookList([...bookList, book]);
    }
  };

  const handlePlay = () => {
    setBook(book);
    navigate("/book");
  };

  return (
    <BookEntry
      key={book.bookId}
      bookId={book.bookId}
      title={book.bookName}
      genre={book.genre}
      author={book.author}
      onPlusClick={handlePlus}
      onPlayClick={handlePlay}
      inList={isBookInList(book)}
    />
  );
};

export default  BookEntryWithHandlers;