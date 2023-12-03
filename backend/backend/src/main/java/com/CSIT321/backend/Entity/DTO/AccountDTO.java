package com.CSIT321.backend.Entity.DTO;

public class AccountDTO {

    private int accountId;
    private int userId; 
    private int roleId; 
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private boolean isDeleted;

    public AccountDTO() {
        
    }

    public AccountDTO(int accountId, int userId, int roleId, String email, String firstName, String lastName, String gender, boolean isDeleted) {
        this.accountId = accountId;
        this.userId = userId;
        this.roleId = roleId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.isDeleted = isDeleted;
    }

    // Getters and setters

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
