package com.CSIT321.backend.Entity.DTO;



public class UserDTO {
    private String username;
    private String password;
    private AccountDTO account;
    private RoleDTO role;
    public UserDTO() {
        // default constructor
    }

    public UserDTO(String username, String password, AccountDTO account , RoleDTO role) {
        this.username = username;
        this.password = password;
        this.account = account;
        this.role = role;
    }

    // Getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public RoleDTO getRole() {
        return this.role;
    }
    public void setRole(RoleDTO role) {
        this.role = role;
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
