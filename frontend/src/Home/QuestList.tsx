import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useBook } from './BookContext';
import { useAccount } from './AccountContext';

interface QuestListProps {}

const QuestList: React.FC<QuestListProps> = () => {
  const navigate = useNavigate();
  const { bookId, setBookId } = useBook(); // Access bookId from context
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track user login status
  const { account } = useAccount(); // Accessing account details from context
  // modals
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  // Log when bookId changes
  useEffect(() => {
    console.log('Extracted bookId:', bookId);
    console.log('Extracted accountId:', account?.accountId);
  }, [bookId, account]);

  const handleBackIcon = () => {
    navigate('/book');
  };

  const handleAttemptQuiz = (quizId: number) => {
    console.log('Attempting quiz:', quizId);
    if (isLoggedIn) {
      setSelectedQuizId(quizId);
      setShowQuizModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleConfirmQuiz = () => {
    setShowQuizModal(false);
    if (selectedQuizId !== null) {
      navigate(`/quiz/${selectedQuizId}`); // Navigate to the selected quiz ID
    } else {
      console.error('No quiz ID selected');
    }
  };

  const handleCancelQuiz = () => {
    setShowQuizModal(false);
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  useEffect(() => {
    const storedBookId = sessionStorage.getItem('bookId');
    if (storedBookId) {
      setBookId(Number(storedBookId));
    }

    const userLoggedIn = sessionStorage.getItem('userLoggedIn');
    if (userLoggedIn) {
      setIsLoggedIn(userLoggedIn === 'true');
    }
  }, [setBookId]);

  useEffect(() => {
    if (bookId !== null && bookId !== undefined) {
      sessionStorage.setItem('bookId', String(bookId));
      fetch(`http://localhost:8080/book/getQuiz/${bookId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data);
          if (Array.isArray(data)) {
            setQuizzes(data); // Update state with quizzes data

            // Fetch user's scores for each quiz and update quizzes state
            if (account) {
              data.forEach((quiz: any) => {
                fetch(`http://localhost:8080/account/${account?.accountId}`)
                  .then((response) => response.json())
                  .then((userData) => {
                    const quizScores = userData.quizAnswered?.quizScores || [];
                    const userQuizScore = quizScores.find((s: any) => s.quiz.quizId === quiz.quizId);

                    // Update quizzes state with user's score for each specific quiz
                    if (userQuizScore) {
                      setQuizzes((prevQuizzes) =>
                        prevQuizzes.map((prevQuiz) =>
                          prevQuiz.quizId === quiz.quizId ? { ...prevQuiz, userScore: userQuizScore.accountScore } : prevQuiz
                        )
                      );
                    }
                  })
                  .catch((error) => {
                    console.error('Error fetching user score:', error);
                  });
              });
            }
          } else {
            setQuizzes([]); // Set empty array if data format is unexpected
          }
        })
        .catch((error) => {
          console.error('Error fetching quizzes:', error);
          setQuizzes([]); // Set empty array in case of error
        });
    }
  }, [bookId, setBookId, account]);


    // Log when quizzes change
    useEffect(() => {
      console.log('Quizzes:', quizzes);
    }, [quizzes]);
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
              <div className="text-[#B7B6BA] mr-10">{quiz.userScore ?? '0'}/{quiz.perfectScore}</div>
            </div>
          </div>
        ))}
      </div>
        </div>
        {/* Quiz Attempt Modal */}
      {showQuizModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-[#000] bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-[300px] h-[230px]">
            <h2 className='text-[24px] pb-2 text-center font-bold'>Attempt Quiz</h2>
            <p className='text-center pb-2'>You want to attempt quiz <br/>now?</p>
            <div className="flex justify-center mt-4">
              <button className="mr-4 px-4 py-2 w-[100px] bg-[#10235d12] text-[#10235d] border border-[#cacaca] transition duration-300 ease-in-out hover:border-[#10235d] hover:font-semibold rounded-md" onClick={handleCancelQuiz}>
                Cancel
              </button>
              <button className="px-4 py-2 w-[100px] bg-[#10235d] hover:bg-bgc2 text-white rounded-md" onClick={handleConfirmQuiz}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-[#000] bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-[300px] h-[250px]">
            <h1 className='text-[24px] mb-2 text-center font-bold text-[#c72b2b]'>Oops!</h1>
            <p className='text-center pb-2 font-semibold'>You must be logged in to attempt a quiz. Do you<br/> want to log in?</p>
            <div className="flex justify-center mt-4">
              <button className="mr-4 px-4 py-2 w-[100px] bg-[#10235d12] text-[#10235d] border border-[#cacaca] transition duration-300 ease-in-out hover:border-[#10235d] hover:font-semibold rounded-md" onClick={() => setShowLoginModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 w-[100px] bg-[#10235d] hover:bg-bgc2 text-white rounded-md" onClick={handleLogin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      );
  };

export default QuestList;