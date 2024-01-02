package com.CSIT321.backend.Entity;

import javax.persistence.*;

import lombok.Data;

import java.util.List;

@Entity
@Data
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

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
        for (QuestionEntity question : questions) {
            question.setQuiz(this);
        }
    }
 
   
}
