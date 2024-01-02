package com.CSIT321.backend.Entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizAnsweredEntity {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quizAnsweredId;

    @OneToOne(cascade = {CascadeType.ALL, CascadeType.PERSIST})
    @JsonBackReference
    @JoinColumn(name = "account_id")
    private AccountEntity account;


    @Builder.Default
    @OneToMany(mappedBy = "quizAnswered", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<QuizScoreEntity> quizScores = new ArrayList<>();

  

    public void addQuizScore(QuizScoreEntity quizScore) {
        if (quizScore != null) {
            quizScore.setQuizAnswered(this);
            this.quizScores.add(quizScore);
        }
    }

    public void removeQuizScore(QuizScoreEntity quizScore) {
        if (quizScore != null) {
            quizScore.setQuizAnswered(null);
            this.quizScores.remove(quizScore);
        }
    }
}
