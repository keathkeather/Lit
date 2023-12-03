import React from 'react';

interface BookEntryProps {
  title: string;
  genre: string;
  onPlusClick: () => void;
  onPlayClick: () => void;
}

const BookEntry: React.FC<BookEntryProps> = ({ title, genre, onPlusClick, onPlayClick }) => {
  return (
    <div className="mb-5">
      <div className="ml-12 font-bold text-sm mb-3">{genre}</div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col ml-8">
          <div className="relative">
            <img src={`litimg/${title}.svg`} alt={title} className="w-72" />
            <button onClick={onPlusClick} className="absolute bottom-5 right-4">
              <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
            </button>
          </div>
          <div className="ml-5 mb-3 text-lg font-semibold">{title}</div>
          {/* Render author as text directly */}
          {/* <div className="ml-5 mb-3 font-medium text-sm text-lblue">{author}</div> */}
          <button onClick={onPlayClick} className="mx-auto mb-5">
            <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookEntry;
