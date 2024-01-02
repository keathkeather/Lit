package com.CSIT321.backend.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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


}
