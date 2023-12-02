package com.CSIT321.backend.Entity;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
@Table(name ="User")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonManagedReference
    private AccountEntity account;
    @Column(name ="isDeleted")
    private boolean isDeleted;
    
    public UserEntity(){
        super();
        this.isDeleted = false;
    }
    public UserEntity(String username, String password, AccountEntity account){
        super();
        this.username = username;
        this.password = password;
        this.account = account;
        this.isDeleted = false;
        
    }
    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    public AccountEntity getAccount(){
        return this.account;
    }
    public void setAccount(AccountEntity account){
        this.account = account;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isDeleted() {
        return isDeleted;
    }
    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }


}
