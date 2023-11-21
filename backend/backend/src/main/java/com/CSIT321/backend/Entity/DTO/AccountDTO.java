package com.CSIT321.backend.Entity.DTO;

public class AccountDTO {
    private String email;
    
    private UserDTO user;  // Include a UserDTO field

    public AccountDTO() {
        // default constructor
    }

    public AccountDTO(String email, UserDTO user) {
        this.email = email;
        this.user = user;
    }

    // Getters and setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
