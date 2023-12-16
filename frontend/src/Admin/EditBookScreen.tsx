import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface EditBookScreenProps {}

const EditBookScreen: React.FC<EditBookScreenProps> = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookName: '',
    genre: '',
  });

  const fetchBookDetails = async () => {
    try {
       const response = await fetch(`http://localhost:8080/book/getBook/${bookId}`);
       const data = await response.json();
       setBook(data);
     } catch (error) {
       console.error('Error fetching book details:', error);
     }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/book/update/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        console.log('Book details successfully updated');
        navigate('/books');
      } else {
        console.error('Failed to update book details:', response.statusText);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating book details:', error.message);
      } else {
        console.error('Non-Error object thrown during update:', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <div className="flex">
      <div className="flex p-4">
        <div className="relative overflow-x shadow-md sm:rounded-lg bg-lgray">
          <form onSubmit={handleFormSubmit} className="w-full">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="bookName"
                  value={book.bookName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                  Genre:
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={book.genre}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="col-span-1 flex items-end">
                <button type="submit" className="bg-[#F88125] hover:bg-[#0C2467] text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookScreen;
