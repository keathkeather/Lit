package com.CSIT321.backend.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "account")
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserEntity user;


    @Column(name = "email")
    private String email;
    
    public AccountEntity(){
        super();
    }
    public AccountEntity(UserEntity user, String email){
        this.user = user;
        this.email = email;
      
    }

    public int getAccountId() {
        return this.accountId;
    }
    public UserEntity getUser(){
        return this.user;
    }
    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setUser(UserEntity user){
        this.user = user;
    }



}
