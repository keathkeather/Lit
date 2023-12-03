import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; {/*will change this later*/}

interface QuizQuestion {
  questionId: number;
  questionText: string;
  choices: string[];
  answers: string[];
}

interface Quiz {
  quizId: number;
  quizName: string;
  questions: QuizQuestion[];
  perfectScore: number;
}

interface QuizScreenProps {}

const QuizScreen: React.FC<QuizScreenProps> = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/questlist'); // Navigate to the QuestList screen
  };

  useEffect(() => {
    fetch(`http://localhost:8080/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        setQuiz(null);
      });
  }, [quizId]);

  useEffect(() => {
    // Add this useEffect to highlight selected answers when navigating between questions
    if (quiz) {
      const savedUserAnswers = localStorage.getItem(`userAnswers-${quiz.quizId}`);
      if (savedUserAnswers) {
        setUserAnswers(JSON.parse(savedUserAnswers));
      }
    }
  }, [quiz]);

  const [userAnswers, setUserAnswers] = useState<string[]>(Array(quiz?.questions.length || 0).fill('')); // Track user answers
  const [score, setScore] = useState<number>(0); // Track user's score

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswerSelection = (selectedAnswer: string) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);
    localStorage.setItem(`userAnswers-${quiz?.quizId}`, JSON.stringify(updatedUserAnswers));
  };

  const handleFinishQuiz = () => {
    let totalScore = 0;

    // Calculate the score based on user answers
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === quiz?.questions[index].answers[0]) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    console.log('Quiz finished! Score:', totalScore);
  };

  const isLastQuestion = currentQuestionIndex === (quiz?.questions.length || 0) - 1;

  return (
    <div className="mt-8 flex justify-center h-screen overflow-y-auto">
      {quiz ? (
        <div className="p-6 w-[1000px]">
          <h2 className="text-[#C3C0C7] text-4xl font-bold mb-4" style={{ textAlign: 'center' }}>{quiz.quizName}</h2>
          {quiz.questions.length > 0 && (
            <div>
                <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={handleClose}
                  style={{ cursor: 'pointer' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p style={{ textAlign: 'right' }}>Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
              <div className="flex-1 mr-8">
                <p className="mt-10 mb-5 font-semibold text-2xl">{quiz.questions[currentQuestionIndex].questionText}</p>
                {/* Render choices for the current question */}
                <div> 
                  {quiz.questions[currentQuestionIndex].choices.map((choice, index) => (
                    <button
                    className="shadow-md px-5 py-3 my-2"
                    key={index}
                    style={{
                      border: '1px solid black',
                      width: '950px',
                      textAlign: 'left',
                      transition: 'background-color 0.3s',
                      backgroundColor: (hoveredButton === index || userAnswers[currentQuestionIndex] === choice) ? 'rgba(95, 219, 253, 0.50)' : 'transparent',
                    }}
                    onClick={() => handleAnswerSelection(choice)}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {choice}
                  </button>
                  ))}
                </div>
                <div className="flex justify-between w-[950px]">
  {/* Previous and Next buttons */}
  <button
    className="mt-4 px-4 py-2 border border-#0C2647 w-[150px] text-[#0C2647] font-bold"
    onClick={handlePreviousQuestion}
    disabled={currentQuestionIndex === 0}
  >
    Previous
  </button>
  {!isLastQuestion ? (
    <button
      className="mt-4 px-4 py-2 border border-[#068940] bg-[#068940] w-[150px] text-white font-bold"
      onClick={handleNextQuestion}
    >
      Next
    </button>
  ) : null}
  {/* Finish button */}
  {isLastQuestion && (
    <button
      className="mt-4 px-2 py-2 border border-[#068940] bg-[#068940] w-[150px] text-white font-bold"
      onClick={handleFinishQuiz}
    >
      Finish
    </button>
  )}
</div>
              </div>
            </div>
          )}
          {score > 0 && (
            <p>Your Score: {score} / {quiz.perfectScore}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default QuizScreen;