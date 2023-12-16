import React, { createContext, useContext, ReactNode } from 'react';

interface Book {
    bookId: number;
  // Add other properties as needed
}



interface BookContextProps {
  book: Book | null;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [book, setBook] = React.useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ book, setBook }}>
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
