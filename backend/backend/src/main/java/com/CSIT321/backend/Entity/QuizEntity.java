package com.CSIT321.backend.Entity;

import javax.persistence.*;


import java.util.List;

@Entity
@Table(name = "quiz")
public class QuizEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quizId;

    @Column(name = "quiz_name")
    private String quizName;

    @OneToMany(mappedBy = "quiz" ,cascade  = CascadeType.ALL)
    private List<QuestionEntity> questions;

    @Column(name = "perfectScore")
    private int perfectScore;
    @Transient
    private int bookId; 
    @ManyToOne
    private BookEntity book;

    public QuizEntity() {
        super();
    }

    public QuizEntity(String quizName, List<QuestionEntity> questions, int perfectScore, BookEntity book) {
        this.quizName = quizName;
        this.questions = questions;
        this.perfectScore = perfectScore;
        this.book = book;
    }


    public int getQuizId() {
        return this.quizId;
    }

    public String getQuizName() {
        return this.quizName;
    }

    public List<QuestionEntity> getQuestions() {
        return this.questions;
    }

    public int getPerfectScore() {
        return this.perfectScore;
    }

    public void setPerfectScore(int perfectScore) {
        this.perfectScore = perfectScore;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
        for (QuestionEntity question : questions) {
            question.setQuiz(this);
        }
    }
    public BookEntity getBook(){
        return this.book;
    }
    public void setBook(BookEntity book) {
        this.book = book;
    }
    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
    public int getBookId(){
        return this.bookId;
    }
}
