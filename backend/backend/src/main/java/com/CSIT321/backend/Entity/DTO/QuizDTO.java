package com.CSIT321.backend.Entity.DTO;

import com.CSIT321.backend.Entity.QuestionEntity;

import java.util.List;

public class QuizDTO {
    private int quizId;
    private String quizName;
    private List<QuestionEntity> questions;
    private int perfectScore;

    public QuizDTO() {
        // Default constructor
    }

    public QuizDTO(int quizId, String quizName, List<QuestionEntity> questions, int perfectScore) {
        this.quizId = quizId;
        this.quizName = quizName;
        this.questions = questions;
        this.perfectScore = perfectScore;
    }

    public int getQuizId() {
        return quizId;
    }

    public void setQuizId(int quizId) {
        this.quizId = quizId;
    }

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public List<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
    }

    public int getPerfectScore() {
        return perfectScore;
    }

    public void setPerfectScore(int perfectScore) {
        this.perfectScore = perfectScore;
    }
}
