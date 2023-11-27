package com.CSIT321.backend.Entity;

import javax.persistence.*;

@Entity
@Table(name="achievement")
public class AchievementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int achievementId;
    
    @Column(name = "achievementName")
    private String achievementName;

    @Column(name = "achievementDescription")
    private String achievementDescription;

    @Column(name = "achievementValue")
    private int achievementValue;

    @ManyToOne
    private BookEntity book;

    public AchievementEntity(){
        super();
    }
    public AchievementEntity(String achievementName, String achievementDescription,int achievementValue, BookEntity book){
        this.achievementName = achievementName;
        this.achievementDescription = achievementDescription;
        this.achievementValue = achievementValue;
        this.book = book;
    }
    public String getachievementName(){
        return this.achievementName;
    }
    public String getachievementDescription(){
        return this.achievementDescription;
    }
    public int getAchievementValue(){
        return this.achievementValue;
    }
    public BookEntity getBookEntity(){
        return this.book;
    }
    public void setAchievementName(String achievementName){
         this.achievementName = achievementName;
    }
    public void getAchievementDescription(String achievementDescription){
        this.achievementDescription = achievementDescription;
    }
    public void setAchievementValue(int achievementValue){
        this.achievementValue = achievementValue;
    }
    public void setBook(BookEntity book){
        this.book = book;
    }

}
