package com.CSIT321.backend.Entity;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "question")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "questionId")
public class QuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;

    @Column(name = "question_text")
    private String questionText;

    @ElementCollection
    @Column(name = "choices")
    private List<String> choices;

    @ElementCollection
    @Column(name = "answers")
    private List<String> answers;

    @ManyToOne
    private QuizEntity quiz;

    // other fields and methods

    public int getQuestionId() {
        return this.questionId;
    }

    public String getQuestionText() {
        return this.questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<String> getChoices() {
        return this.choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public List<String> getAnswers() {
        return this.answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public void setQuiz(QuizEntity quiz) {
        this.quiz = quiz;
    }

    public void setQuestionFromJson(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            QuestionEntity parsedQuestion = objectMapper.readValue(json, QuestionEntity.class);
            this.questionText = parsedQuestion.getQuestionText();
            this.choices = parsedQuestion.getChoices();
            this.answers = parsedQuestion.getAnswers();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
    
}
