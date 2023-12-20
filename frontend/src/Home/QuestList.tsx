import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useBook } from './BookContext';

interface QuestListProps {}

const QuestList: React.FC<QuestListProps> = () => {
    const navigate = useNavigate();
    const { bookId, setBookId } = useBook(); // Access bookId from context
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); //Track user login status

    console.log('Extracted bookId:', bookId);

    const handleBackIcon = () => {
      navigate('/book');
    };

    const handleAttemptQuiz = (quizId: number) => {
      if (isLoggedIn) {
        const confirmation = window.confirm('Attempt Quiz?');
        if (confirmation) {
          navigate(`/quiz`);
        }
      } else {
        const confirmation = window.confirm('You must be logged in to attempt a quiz. Do you want to log in?');
         if (confirmation) {
          // Redirect to the login page or show a message for the user to log in
          navigate('/login'); // Modify this to your login page route
        }
      }
    };

    // * KEATH AKO GIADDAN OG SESSION KAY DI MAN MAG AGAD SI QUESTLIST NI USER. MAG AGAD MAN SHAS BOOK.
    useEffect(() => {
      const storedBookId = sessionStorage.getItem('bookId');
      if (storedBookId) {
        setBookId(Number(storedBookId));
      }

      // Check if user is logged in
      const userLoggedIn = sessionStorage.getItem('userLoggedIn');
      if (userLoggedIn) {
        // Convert the string value from sessionStorage to a boolean
        setIsLoggedIn(userLoggedIn === 'true'); // Convert string to boolean
      }
    }, [setBookId]);

    useEffect(() => {
      if (bookId !== null && bookId !== undefined) {
        sessionStorage.setItem('bookId', String(bookId)); // Store bookId in sessionStorage
        // Rest of your code for fetching quizzes based on bookId remains unchanged
        fetch(`http://localhost:8080/book/getQuiz/${bookId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log('Fetched data:', data); // Log the fetched data
            if (Array.isArray(data)) {
              setQuizzes(data); // Update state with quizzes data
            } else {
              setQuizzes([]); // Set empty array if data format is unexpected
            }
          })
          .catch((error) => {
            console.error('Error fetching quizzes:', error);
            setQuizzes([]); // Set empty array in case of error
          });
      }
    }, [bookId, setBookId]);

    console.log('Quizzes:', quizzes);

    return (
      <div className="overflow-y-auto">
        <Header />
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="relative">
            <img src="litimg/QuestListHeaderbg.svg" alt="Home" className="w-screen h-full" />
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-left" style={{ width: '1200px', marginLeft: '400px' }}>
                <div className="mt-8">
                  <button onClick={handleBackIcon}>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white ml-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                  </svg>
                </button>
                </div>
                <div className="text-white text-3xl font-bold mt-14 ml-20 mr-24" style={{ width: '600px' }}>
                  Let's Ace the Day! Embark on quests and unleash your potential.
                </div>
                <img src="litimg/litsy.png" alt="Litsy" className="ml-4" style={{ width: '200px', height: '200px', transform: 'scaleX(-1)' }}/>
              </div>
            </div>
          </div>
          {/* Display Quizzes */}
      <div className="mt-8 space-y-4">
        {quizzes.map((quiz, index) => (
          <div key={index} onClick={() => handleAttemptQuiz(quiz.quizId)} style={{ cursor: 'pointer' }}>
            <div className="w-[1000px] bg-white border border-[#ABAAA8] p-6 rounded-md flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img src="litimg/Quest.svg" alt="Lit Logo 3" className="w-10 ml-10 mr-4" />
                <div className="text-[#3C3934] font-bold ml-2">{quiz.quizName}</div>
              </div>
              <div className="text-[#B7B6BA] mr-10">0/{quiz.perfectScore}</div>
            </div>
          </div>
        ))}
      </div>
        </div>
      </div>
      );
  };

export default QuestList;