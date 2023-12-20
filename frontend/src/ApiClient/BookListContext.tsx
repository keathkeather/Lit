import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Book } from '../Home/BookService';

// Inside BookContext
interface bookList {
  bookList: Book[];
  setBookList: React.Dispatch<React.SetStateAction<Book[] | null>>;
}

const BookListContext = createContext<bookList | undefined>(undefined);

// Update BookProvider component
export const BookListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookList, setBookList] = useState<Book[] | null>(null);

  return (
    <BookListContext.Provider value={{ bookList: bookList || [], setBookList }}>
      {children}
    </BookListContext.Provider>
  );
};

export const useBookList = () => {
  const context = useContext(BookListContext);
  if (!context) {
    throw new Error('useBook must be used within an BookProvider');
  }
  return context;
};