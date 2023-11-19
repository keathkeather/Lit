package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.CSIT321.backend.Entity.QuestionEntity;
import com.CSIT321.backend.Entity.QuizEntity;
import com.CSIT321.backend.Repository.QuestionRepository;
import com.CSIT321.backend.Repository.QuizRepository;

@Service
public class QuizServices {

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    QuestionRepository questionRepository;

    public QuizEntity createQuiz(QuizEntity quiz) {
        return quizRepository.save(quiz);
    }

    public List<QuizEntity> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public QuizEntity getQuizById(int quizId) {
        return quizRepository.findById(quizId).orElse(null);
    }

    public QuizEntity updateQuiz(int quizId, QuizEntity newQuiz) {
        QuizEntity quizEntity = quizRepository.findById(quizId).orElse(null);
        if (quizEntity != null) {
            quizEntity.setQuizName(newQuiz.getQuizName());
            quizEntity.setPerfectScore(newQuiz.getPerfectScore());
    
            // Update questions
            if (newQuiz.getQuestions() != null) {
                for (QuestionEntity newQuestion : newQuiz.getQuestions()) {
                    QuestionEntity existingQuestion = questionRepository.findById(newQuestion.getQuestionId()).orElse(null);
                    if (existingQuestion != null) {
                        existingQuestion.setQuestionText(newQuestion.getQuestionText());
                        existingQuestion.setChoices(newQuestion.getChoices());
                        existingQuestion.setAnswers(newQuestion.getAnswers());
    
                        questionRepository.save(existingQuestion);
                    } else {
                        newQuestion.setQuiz(quizEntity);
                        questionRepository.save(newQuestion);
                    }
                }
            }
    
            // Save the updated quiz
            return quizRepository.save(quizEntity);
        }
        return null;
    }

    public String deleteQuiz(int quizId) {
        String msg = "";
        Optional<QuizEntity> optionalQuiz = quizRepository.findById(quizId);
        if (optionalQuiz.isPresent()) {
            quizRepository.deleteById(quizId);
            msg = "Role " + quizId + " deleted";
        } else {
            msg = "Role " + quizId + " does not exist";
        }
        return msg;
    }
}
