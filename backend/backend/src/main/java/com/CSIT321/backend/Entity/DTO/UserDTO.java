package com.CSIT321.backend.Entity.DTO;



public class UserDTO {
    private String username;
    private String password;
    private AccountDTO account;

    public UserDTO() {
        // default constructor
    }

    public UserDTO(String username, String password, AccountDTO account) {
        this.username = username;
        this.password = password;
        this.account = account;
    }

    // Getters and setters

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

    public AccountDTO getAccount() {
        return account;
    }

    public void setAccount(AccountDTO account) {
        this.account = account;
    }
}
