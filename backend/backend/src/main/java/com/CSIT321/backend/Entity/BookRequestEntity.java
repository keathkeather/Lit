package com.CSIT321.backend.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class BookRequestEntity {
    //* primary key */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookRequestId;

    //* Connects the account to this table  with a Many to one relationship */
    @ManyToOne
    @JoinColumn(name = "accoutId")
    private AccountEntity account;

    //* information about the book
    private String bookName;
    private String bookDescription;
    private String genre;
    private String status;



    //* Basic constructors */
    public BookRequestEntity(){
        super();
        this.status = "Pending";
    }
    public BookRequestEntity(AccountEntity account){
        this.account = account;
        this.status = "Pending";
    }
    public BookRequestEntity(AccountEntity account, String bookName, String bookDescription, String genre){
        this.account =account;
        this.bookName = bookName;
        this.bookDescription = bookDescription;
        this.genre = genre;
        this.status = "Pending";
    }
    
    //*  these are just getters and setters;

    public int getBookRequestId(){
        return this.bookRequestId;
    }
    public AccountEntity getAuthor(){
        return this.account;
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
    public void setAccount(AccountEntity account){
        this.account = account;
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
    public String getStatus(){
        return this.status;
    }
    public void approve(){
        this.status = "Approved";
    }
    public void reject(){
        this.status = "Rejected";
    }

}
