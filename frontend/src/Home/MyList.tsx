import React, { useState, useEffect } from 'react'; // Make sure to import useState
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccount } from './AccountContext';
import BookEntryWithHandlers from '../ApiClient/BookEntryWithHandlers';
import { useBookList } from '../ApiClient/BookListContext';

const MyList: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAccount();
  const {bookList} = useBookList();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="overflow-y-full">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        

        <div className="mt-10 flex items-center">
          <div className="text-black text-3xl font-bold mr-[69rem]">My List</div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Genre
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Folklore</a>
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Fable</a>
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">Mystery</a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-lgray text-2xl text-center">_________________________________________________________________________________________________________________________________</div>
              <div className="mt-5 ml-16 flex flex-wrap items-left" style={{width: '1400px'}}>
                {bookList.map((book)=>(
                    <BookEntryWithHandlers book={book}/>
                  ))}
              </div>
        </div>
    </div>
  );
};

export default MyList;