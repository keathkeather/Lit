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
    
    private Boolean isDeleted;
    @ManyToOne
    private BookEntity book;
    @Transient
    private int bookId;
    public AchievementEntity(){
        super();
        this.isDeleted = false;
    }
    public AchievementEntity(String achievementName, String achievementDescription,int achievementValue, BookEntity book){
        this.achievementName = achievementName;
        this.achievementDescription = achievementDescription;
        this.achievementValue = achievementValue;
        this.isDeleted = false;
        this.book = book;

    }
   
    public int getAchivementId(){
        return this.achievementId;
    }
    public String getAchievementName(){
        return this.achievementName;
    }
    public String getachievementDescription(){
        return this.achievementDescription;
    }
    public int getAchievementValue(){
        return this.achievementValue;
    }
    public BookEntity getBook(){
        return this.book;
    }
    public void setAchievementName(String achievementName){
         this.achievementName = achievementName;
    }
    public void setAchievementDescription(String achievementDescription){
        this.achievementDescription = achievementDescription;
    }
    public boolean getIsDeleted(){
        return this.isDeleted;
    }
    public void delete(){
        this.isDeleted = true;
    }
    public void recover(){
        this.isDeleted = false;
    }
    public void setAchievementValue(int achievementValue){
        this.achievementValue = achievementValue;
    }
    public void setBook(BookEntity book){
        this.book = book;
    }
    public void setBookId(int bookId){
        this.bookId = bookId;
    }
    public int getBookId(){
        return this.bookId;
    }

}
