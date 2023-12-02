package com.CSIT321.backend.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.List;
@Entity
@Table(name = "book")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "bookId")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;
    @Column(name = "bookName")
    private String bookName;

    @Column(name = "bookDescription")
    private String bookDescription;

    @Column(name = "genre")
    private String genre;

    @ManyToOne
    @JoinColumn(name = "author")
    AccountEntity author;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizEntity> quiz;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)   
    private List<AchievementEntity> achievement;

    
    private boolean isApproved;

    private boolean isDeleted;

    public BookEntity(){
        super();
        this.isDeleted = false;
        this.isApproved = false;
    }
    public BookEntity(String bookName, String bookDescription,List<AchievementEntity> achievement, List<QuizEntity> quiz){
        this.bookName = bookName;
        this.bookDescription = bookDescription;
        this.achievement = achievement;
        this.quiz = quiz;
        this.isDeleted = false;
        this.isApproved=false;
    }
    public int getBookId(){
        return this.bookId;
    }
    public String getBookName(){
        return this.bookName;
    }
    public String getBookDescription(){
        return this.bookDescription;
    }
    public String getGenre(){
        return this.genre;
    }
    public AccountEntity getAuthor(){
        return this.author;
    }
    public List<QuizEntity> getQuiz(){
        return this.quiz;
    }
    public List<AchievementEntity> getAchievement(){
        return this.achievement;
    }
    public void setBookName(String bookName){
         this.bookName = bookName;
    }
    public void setBookDescription(String bookDescription){
        this.bookDescription = bookDescription;
    }
    public void setGenre(String genre){
        this.genre = genre;
    }
    public void setAuthor(AccountEntity author){
        this.author = author;
    }
    public void setQuiz(List<QuizEntity> quiz){
        this.quiz = quiz;
    }
    public void setAchievement(List<AchievementEntity> achievement){
        this.achievement = achievement; 
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


}
