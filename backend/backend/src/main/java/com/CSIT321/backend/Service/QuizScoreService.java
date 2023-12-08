package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.QuizScoreEntity;
import com.CSIT321.backend.Repository.QuizScoreRepository;

@Service
public class QuizScoreService {
    @Autowired
    QuizScoreRepository quizScoreRepository;

    public QuizScoreEntity createQuizScore(QuizScoreEntity quizScore){
        try{
            return quizScoreRepository.save(quizScore);
        }catch(Exception e){
            throw e;
        }
    }

}
