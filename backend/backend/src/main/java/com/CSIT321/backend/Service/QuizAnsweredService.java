package com.CSIT321.backend.Service;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.QuizAnsweredEntity;
import com.CSIT321.backend.Entity.QuizEntity;
import com.CSIT321.backend.Entity.QuizScoreEntity;
import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.QuizAnsweredRepository;
import com.CSIT321.backend.Repository.QuizRepository;

import java.util.List;
@Service
public class QuizAnsweredService {
    @Autowired
    QuizAnsweredRepository quizAnsweredRepository;

    @Autowired 
    AccountRepository accountRepository;
    @Autowired
    QuizRepository quizRepository;
    public QuizAnsweredEntity create(QuizAnsweredEntity quizAnswered){
        return quizAnsweredRepository.save(quizAnswered);
    }
    public QuizAnsweredEntity addQuizAnswered(int accountId, QuizScoreEntity quizScore) {
        try{
            AccountEntity account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new EntityNotFoundException("Account " + accountId + " does not exist"));

            QuizAnsweredEntity quizAnswered = quizAnsweredRepository.findByAccount(account)
                .orElseThrow(() -> new EntityNotFoundException("QuizAnsweredEntity for Account " + accountId + " not found"));

            quizAnswered.addQuizScore(quizScore);
            return quizAnsweredRepository.save(quizAnswered);
        }catch(Exception e){
            throw e;
        }
    }

    public void removeQuizScore(int accountId,  int quizId) {
        try{
            AccountEntity account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));

            QuizAnsweredEntity quizAnswered = quizAnsweredRepository.findByAccount(account).get();
            List<QuizScoreEntity> quizScoreList = quizAnswered.getQuizScores();
            QuizEntity quiz = quizRepository.findById(quizId)
             .orElseThrow(() -> new NoResultException("Quiz " + quizId + " does not exist"));
            quizScoreList.removeIf(quizScore -> quizScore.getQuiz().equals(quiz));
            quizAnswered.setQuizScores(quizScoreList);

            quizAnsweredRepository.save(quizAnswered);
        }catch(Exception e){
            throw e;
        }
    }
}
