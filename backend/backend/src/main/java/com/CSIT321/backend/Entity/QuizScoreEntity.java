package com.CSIT321.backend.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.JoinColumn;

@Entity
public class QuizScoreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quizScoreId;

    @ManyToOne
    @JoinColumn(name = "quiz_answered_id")
    @JsonBackReference
    private QuizAnsweredEntity quizAnswered;

    @OneToOne
    @JoinColumn(name = "quiz_id")
    private QuizEntity quiz;

    private int accountScore;

    public QuizScoreEntity() {
        super();
    }

    public QuizScoreEntity(QuizAnsweredEntity quizAnswered, QuizEntity quiz, int accountScore) {
        this.quizAnswered = quizAnswered;
        this.quiz = quiz;
        this.accountScore = accountScore;
    }

    public int getQuizScoreId() {
        return quizScoreId;
    }

    public QuizAnsweredEntity getQuizAnswered() {
        return quizAnswered;
    }

    public void setQuizAnswered(QuizAnsweredEntity quizAnswered) {
        this.quizAnswered = quizAnswered;
    }

    public QuizEntity getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizEntity quiz) {
        this.quiz = quiz;
    }

    public int getAccountScore() {
        return accountScore;
    }

    public void setAccountScore(int accountScore) {
        this.accountScore = accountScore;
    }

}
