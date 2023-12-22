import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "./BookContext";
import { useAccount } from "./AccountContext";
import { useParams } from "react-router-dom";

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
  const { bookId } = useBook(); // Access bookId from context
  const { setBook } = useBook(); // Update to include setBookId from BookContext
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const { account, setAccount } = useAccount(); // State to hold account details
  const {quizId} = useParams();
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/questlist"); // Navigate to the QuestList screen
  };

  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  useEffect(() => {
  console.log("Current quizId:", quizId);

  if (quizId) {
    setQuiz(null); // Reset quiz state before fetching new data
    setUserAnswers([]); // Reset user answers

    // Fetch the quiz data based on quizId
    fetch(`http://localhost:8080/quizzes/${quizId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched quiz data:", data);

        // Assuming the received data structure matches the Quiz interface
        if (data) {
          setQuiz(data);
          setUserAnswers(Array(data?.questions.length || 0).fill(""));
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setQuiz(null);
        setUserAnswers([]);
      });
  }
}, [quizId]);


  console.log("Quiz:", quiz);
  useEffect(() => {
    // Add this useEffect to highlight selected answers when navigating between questions
    if (quiz) {
      const savedUserAnswers = sessionStorage.getItem(
        `userAnswers-${quiz.quizId}`
      );
      if (savedUserAnswers) {
        setUserAnswers(JSON.parse(savedUserAnswers));
      }
    }
  }, [quiz]);

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
    localStorage.setItem(
      `userAnswers-${quiz?.quizId}`,
      JSON.stringify(updatedUserAnswers)
    );
  };

  // * Calculate the score when the user FINISHES the quiz
  const handleFinishQuiz = () => {
    let totalScore = 0;
  
    // Calculate the score based on user answers
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === quiz?.questions[index].answers[0]) {
        totalScore += 1;
      }
    });
  
    setScore(totalScore);
    console.log("Quiz finished! Score:", totalScore);
  
  
    if (!(account?.accountId)) {
      console.error('Account ID not found in sessionStorage');
      return;
    } else {
      console.log('Account ID:', account.accountId);
    }
  
    // Prepare the data to send to the API endpoint
    const data = {
      quiz: {
        quizId: quiz?.quizId || 0, // Assuming quizId exists and is a number
      },
      accountScore: totalScore,
    };
  
    // Make a POST request to store the score
    fetch(`http://localhost:8080/quizAnswered/addAnswered/${account.accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to store quiz score');
        }
        return response.json();
      })
      .then(() => {
        // After storing the score successfully, navigate back to score screen
        console.log("Calculated totalScore:", totalScore);
        console.log("Perfect score:", quiz?.perfectScore);
        navigate(`/score/${totalScore}/${quiz?.perfectScore}`);
      })
      .catch((error) => {
        console.error('Error storing quiz score:', error);
      });

  };    

  const isLastQuestion =
    currentQuestionIndex === (quiz?.questions.length || 0) - 1;

  const progressPercentage = ((currentQuestionIndex + 1) / (quiz?.questions.length || 1)) * 100;


  return (
    <div className="mt-8 flex justify-center">
      {quiz ? (
        <div className="p-10 w-[1000px]">
          <h2
            className="text-[#C3C0C7] text-4xl font-bold mb-4"
            style={{ textAlign: "center" }}
          >
            {quiz.quizName}
          </h2>
          {quiz.questions.length > 0 && (
            <div>
              <p className="text-lg p-4 font-semibold text-[#bfbfbf]" style={{ textAlign: "right" }}>
               {currentQuestionIndex + 1} / {quiz.questions.length}
              </p>
              <div className="flex justify-between items-center">
                {/* Close button */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                {/* Linear Progress Bar */}
                <div className="w-full ml-4 h-6 bg-gray-200 rounded-full dark:bg-[#eee]">
                  <div
                    className="h-6 bg-[#1A3B70] rounded-full dark:bg-[#1A3B70]"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
    
              <div className="flex-1 mr-8 mt-4">
                <div className="flex">
                  <img src="/litimg/litsy.png" alt="Lit Logo 3" className="w-50.5 h-40 ml-10 mr-6 mb-4" />
                  <p className="mt-10 mb-8 font-semibold text-2xl">
                    {quiz.questions[currentQuestionIndex].questionText}
                  </p>
                </div>
                {/* Render choices for the current question */}
                <div>
                  {quiz.questions[currentQuestionIndex].choices.map(
                    (choice, index) => (
                      <button
                        className="shadow-md px-5 py-3 my-2"
                        key={index}
                        style={{
                          border: "1px solid black",
                          width: "950px",
                          textAlign: "left",
                          transition: "background-color 0.3s",
                          backgroundColor:
                            hoveredButton === index ||
                            userAnswers[currentQuestionIndex] === choice
                              ? "rgba(95, 219, 253, 0.50)"
                              : "transparent",
                        }}
                        onClick={() => handleAnswerSelection(choice)}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        {choice}
                      </button>
                    )
                  )}
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
                      className="mt-4 px-4 border border-[#068940] bg-[#068940] w-[150px] text-white font-bold"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  ) : null}
                  {/* Finish button */}
                  {isLastQuestion && (
                    <button
                      className="mt-4 px-2 border border-[#068940] bg-[#068940] w-[150px] text-white font-bold"
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
            <p>
              Your Score: {score} / {quiz.perfectScore}
            </p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizScreen;