package com.CSIT321.backend.Entity.DTO;

public class RoleDTO {
    private int role_id;
    public String role_Name;
    public String role_Description;

    public RoleDTO() {
        // default constructor
    }
    public RoleDTO(int role_id,String role_Name, String role_Description) {
        this.role_id = role_id;
        this.role_Name = role_Name;
        this.role_Description = role_Description;
    }
    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }
    public int getRole_id() {
        return role_id;
    }
    
    public String getRole_Name() {
        return role_Name;
    }
    public void setRole_Name(String role_Name) {
        this.role_Name = role_Name;
    }
    public String getRole_Description() {
        return role_Description;
    }
    public void setRole_Description(String role_Description) {
        this.role_Description = role_Description;
    }

}
