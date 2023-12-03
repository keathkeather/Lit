import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Quiz {
  quizId: number;
  quizName: string;
  perfectScore: number;
  // Other quiz properties...
}

interface QuizScreenProps {}

const QuizScreen: React.FC<QuizScreenProps> = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

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

  return (
    <div className="mt-8">
      {quiz ? (
        <div className="w-[1000px] bg-white border border-[#ABAAA8] p-6 rounded-md">
          <h2 className="text-[#3C3934] font-bold mb-4">{quiz.quizName}</h2>
          <p>Total Score: {quiz.perfectScore}</p>
          {/* Display other quiz details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizScreen;