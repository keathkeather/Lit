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

import java.util.ArrayList;
import java.util.List;

@Entity
public class QuizAnsweredEntity {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quizAnsweredId;

    @OneToOne(cascade = {CascadeType.ALL, CascadeType.PERSIST})
    @JsonBackReference
    @JoinColumn(name = "account_id")
    private AccountEntity account;


    @OneToMany(mappedBy = "quizAnswered", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<QuizScoreEntity> quizScores;

    public QuizAnsweredEntity() {
        super();
        this.quizScores = new ArrayList<>();
    }

    public QuizAnsweredEntity(AccountEntity account) {
        this.account = account;
        this.quizScores = new ArrayList<>();
    }
    public QuizAnsweredEntity(AccountEntity account , List<QuizScoreEntity> quizScores) {
        this.account = account;
        this.quizScores = new ArrayList<>(quizScores);
    }

    public int getQuizAnsweredId() {
        return quizAnsweredId;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public List<QuizScoreEntity> getQuizScores() {
        return quizScores;
    }
    public void setQuizScores(List<QuizScoreEntity> quizScores){
        this.quizScores = quizScores;
    }
    public void setAccount(AccountEntity account) {
        this.account = account;
    }

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
