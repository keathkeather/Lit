import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useBook } from './BookContext';

interface Quiz {
  quizId: number;
  quizName: string;
}

interface Achievement {
  achievementId: number;
  achievementName: string;
}

interface BookScreenProps {}

const BookScreen: React.FC<BookScreenProps> = () => {
  const navigate = useNavigate();
  const { book, setBookId } = useBook(); // Obtain setBookId from useBook hook
  const [quests, setQuests] = useState<Quiz[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    console.log(book?.bookId);
    // Fetch quests for the current book when bookId changes
    if (book && book.bookId) {
      fetchQuests(book.bookId);
      fetchAchievements(book.bookId);
    }
  }, [book?.bookId]); // Only re-run the effect if book?.bookId changes

  const fetchQuests = async (bookId: number) => {
    try {
      console.log(`Fetching quests for bookId: ${bookId}`);
      const response = await fetch(`http://localhost:8080/book/getQuiz/${bookId}`);
  
      if (!response.ok) {
        console.error(`Error fetching quests. Status: ${response.status}`);
        return;
      }
  
      const data = await response.json();
      console.log('Server Response:', data);
  
      // Use data as the array of quizzes directly
      const fetchedQuests = data || [];
      setQuests(fetchedQuests);
    } catch (error) {
      console.error('Error fetching quests:', error);
    }
  };  

  const fetchAchievements = async (bookId: number) => {
    try {
      console.log(`Fetching achievements for bookId: ${bookId}`);
      const response = await fetch(`http://localhost:8080/book/getAchievementPerBook/${bookId}`);

      if (!response.ok) {
        console.error(`Error fetching achievements. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log('Server Response (Achievements):', data);

      // Use data as the array of achievements directly
      const fetchedAchievements = data || [];
      setAchievements(fetchedAchievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };
  
  const handleGame = () => {
    navigate('/game');
  };

  const handleQuests = () => {
    // Assuming bookId is available in your book object, otherwise, adjust accordingly
    if (book?.bookId) {
      setBookId(book.bookId); // Set bookId in context
      navigate('/questlist'); // Navigate to QuestList screen
    }
  };

  return (
    <div className="overflow-y-full">
      <Header />

      <div className="ml-32 mt-[7rem]">
        <div className="mt-10">
          <div className="flex items">
            {/* Image */}
            <img src="litimg/adarna1.png" alt="Adarna 1" className="w-[500px] h-[300px]" />

            {/* Text and Button beside the image */}
            <div className="text-black mt-6 ml-4 flex flex-col">
              <div>
                <p className="text-4xl font-bold mb-4">{book?.bookName}</p>
                <p className="text-xl text-[#5C83C4] mb-4">
                  Isinulat ni {book?.author.firstName} {book?.author.lastName}
                </p>
                <p className="text-xl text-black leading-relaxed mb-4 mr-32">{book?.bookDescription}</p>
              </div>

              {/* Progress Bar */}
              <div className="bg-gray bg-opacity-50 rounded-full h-4 mb-4 dark:bg-gray dark:bg-opacity-50 mr-32">
                <div
                  className="bg-dblue h-4 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full dark:bg-dblue"
                  style={{ width: '45%' }}
                >
                  45%
                </div>
              </div>

              {/* Button */}
              <div className="ml-[30rem] mr-32 -mt-[12rem]">
                <button onClick={handleGame}>
                  <img src="litimg/playbtn.svg" alt="playbtn" className="w-30 lg:w-48 mr-2 lg:mr-3" style={{ width: '300px' }} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-crow mt-8 mb-12">
            {/* Quests Box */}
            <div
              className="quest-achievements-box mr-20"
              style={{
                border: '3px solid #ccc',
                borderRadius: '10px',
                padding: '16px',
                width: '45%', // Adjust the width as needed
              }}
            >
              <div className="flex flex-row">
                <h2
                  className="box-title"
                  style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                >
                  Quests
                </h2>
                <div className="mt-2 text-lblue font-bold text-xl ml-auto mr-4">
                  <button onClick={handleQuests}>VIEW ALL</button>
                </div>
              </div>
              <ul className="list">
                {quests.map((quiz, index) => (
                  <li
                    key={index}
                    className="list-item flex flex-col"
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    <div className="flex flex-row items-center mt-4">
                      <img
                        src="/litimg/questicon.svg" // Update the path accordingly
                        alt="Quest Icon"
                        className="w-12 h-12 mr-4 ml-8 mt-2" // Adjust the width and height as needed
                      />
                      <div className="flex flex-col">
                        <span className="text-xl font-bold mb-2 mt-2">{quiz.quizName}</span>
                        <div className="flex flex-row items-center">
                          <div className="bg-lgray h-4 rounded-full" style={{ width: '410px'}}>
                            <div className="bg-lightg h-full rounded-full" style={{ width: '0%' }}></div>
                          </div>
                          <div className="text-lgray text-lg fond-bold mb-1 ml-4">0/10</div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements Box */}
            <div
              className="quest-achievements-box"
              style={{
                border: '3px solid #ccc',
                borderRadius: '10px',
                padding: '16px',
                width: '40%', // Adjust the width as needed
              }}
            >
              <h2
                className="box-title"
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                Achievements
              </h2>
              <ul className="list flex flex-wrap">
              {achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="list-item flex flex-col w-1/3 p-2"
                  style={{
                    marginBottom: '8px',
                  }}
                >
                  <div className="flex flex-col items-center justify-center mt-4">
                    <img
                      src="/litimg/achievementicon.svg" // Update the path accordingly
                      alt="Achievement Icon"
                      className="w-32 h-32 mt-2" // Adjust the width and height as needed
                    />
                    <span className="text-xs font-bold mb-2 mt-2 text-center">{achievement.achievementName}</span>
                  </div>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookScreen;
