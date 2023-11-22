package com.CSIT321.backend.Entity.DTO;

public class AccountDTO {
    private String email;
    
    private UserDTO user;  // Include a UserDTO field
    private RoleDTO role;


    public AccountDTO() {
        // default constructor
    }

    public AccountDTO(String email, UserDTO user, RoleDTO role) {
        this.email = email;
        this.user = user;
        this.role = role;

    }
    public RoleDTO getRole() {
        return role;
    }
    
    // Getters and setters
    
    public String getEmail() {
        return email;
    }
    public void setRole(RoleDTO role) {
        this.role = role;
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
