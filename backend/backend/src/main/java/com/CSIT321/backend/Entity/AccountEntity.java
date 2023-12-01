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

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RolesEntity role;

    @Column(name = "email")
    private String email;
    
    private String firstName;
    private String lastName;
    private String gender;
    private boolean isDeleted;
    
    public AccountEntity(){
        super();
        this.isDeleted = false;
    }
    public AccountEntity(UserEntity user, String email,RolesEntity role,String firstName , String lastName , String gender){
        this.user = user;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.isDeleted = false;

    }
    public RolesEntity getRole(){
        return this.role;
    }
    public void setRole(RolesEntity role){
        this.role = role;
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
    public String  getFirstName(){
        return this.firstName;
    }
    public String getLastName(){
        return this.lastName;
    }
    public String getGender(){
        return this.gender;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }
    public void setGender(String gender){
        this.gender = gender;
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
