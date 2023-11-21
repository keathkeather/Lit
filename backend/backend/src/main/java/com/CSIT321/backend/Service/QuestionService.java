package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.CSIT321.backend.Entity.QuestionEntity;
import com.CSIT321.backend.Repository.QuestionRepository;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    public QuestionEntity createQuestion(QuestionEntity question) {
        return questionRepository.save(question);
    }

    public List<QuestionEntity> getAllQuestions() {
        return questionRepository.findAll();
    }

    public QuestionEntity getQuestionById(int questionId) {
        return questionRepository.findById(questionId).orElse(null);
    }

    public QuestionEntity updateQuestion(int questionId, QuestionEntity newQuestion) {
        QuestionEntity questionEntity = questionRepository.findById(questionId).orElse(null);
        if (questionEntity != null) {
            questionEntity.setQuestionText(newQuestion.getQuestionText());
            questionEntity.setChoices(newQuestion.getChoices());
            questionEntity.setAnswers(newQuestion.getAnswers());
            // You might want to handle quiz association here if needed
            return questionRepository.save(questionEntity);
        }
        return null;
    }
}
