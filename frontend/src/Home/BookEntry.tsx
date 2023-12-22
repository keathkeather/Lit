import React, { useState } from 'react';

interface BookEntryProps {
  bookId: number;
  title: string;
  genre: string;
  author: {
    firstName: string;
    lastName: string;
  } | undefined; // Add undefined to the type to handle potential absence
  
  onPlusClick: () => void;
  onPlayClick: (bookId: number) => void;
  inList:boolean;
}



const BookEntry: React.FC<BookEntryProps> = ({ bookId, title, genre, author, onPlusClick, onPlayClick,inList}) => {
  // const isBookInList = bookList.some(book => book.bookId === bookId);
  
  return (
    <div className="mb-5 mr-2">
      <div className="ml-12 font-bold text-sm mb-3">{genre}</div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col ml-8">
          <div className="relative">
            <img src={`litimg/${title}.svg`} alt={title} className="w-72" />
            <button onClick={onPlusClick} className="absolute bottom-5 right-4">
            <img src={`litimg/${inList ? 'finalCheckWhite.svg' : 'plusbtn.svg'}`} alt="button" className="w-15" />
            </button>
          </div>
          <div className="ml-5 text-lg font-semibold">{title}</div>
          <div className="ml-5 mb-3 font-medium text-sm text-lblue">{author ? `${author.firstName} ${author.lastName}` : 'Unknown Author'}</div>
          <button onClick={() => onPlayClick(bookId)} className="mx-auto mb-5">
            <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookEntry;
