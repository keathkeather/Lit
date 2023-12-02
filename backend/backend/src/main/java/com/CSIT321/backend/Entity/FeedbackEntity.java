package com.CSIT321.backend.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="feedback")
public class FeedbackEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int feedbackId;
    
    @OneToOne
    @JoinColumn(name = "account")
    private AccountEntity account;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;

    private boolean isDeleted;
    public FeedbackEntity(){
        super();
        this.isDeleted = false;
    }
    public FeedbackEntity( AccountEntity account,String feedback){
        this.account = account;
        this.feedback = feedback;
        this.isDeleted = false;
    }
    public int getFeedBackId(){
        return this.feedbackId;
    }
    public AccountEntity getAccount(){
        return this.account;
    }
    public String getFeedback(){
        return this.feedback;
    }
    public void setAccount(AccountEntity account){
        this.account = account;
    }
    public void setFeedback(String feedback){
        this.feedback = feedback;
    }
    public void delete(){
        this.isDeleted = true;
    }
    public void restore(){
        this.isDeleted = false;
    }
    public boolean getIsDeleted(){
        return this.isDeleted;
    }
}
