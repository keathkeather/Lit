import React, { createContext, useContext, ReactNode } from 'react';

interface Book {
    bookId: number;
    bookName: string;
    bookDescription: string;
    author: {
      firstName: string;
      lastName: string;
    };
    quizzes: Quiz[];
}

interface Quiz {
    quizId: number;
}

// Inside BookContext
interface BookContextProps {
  book: Book | null;
  bookId: number | null; // Add bookId property
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
  setBookId: React.Dispatch<React.SetStateAction<number | null>>; // Function to set bookId
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

// Update BookProvider component
export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [book, setBook] = React.useState<Book | null>(null);
  const [bookId, setBookId] = React.useState<number | null>(null);

  return (
    <BookContext.Provider value={{ book, setBook, bookId, setBookId }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within an BookProvider');
  }
  return context;
};
