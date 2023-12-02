package com.CSIT321.backend.Entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "roles")
public class RolesEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;

    @Column(name = "role_name")
    private String role_name;

    @Column(name = "role_description")
    private String role_description;


    public RolesEntity(){
        super();
    }
    public RolesEntity(String role_name, String role_description){
        super();
        this.role_name = role_name;
        this.role_description = role_description;
    }
    public int getRole_id() {
        return role_id;
    }
    public String getRole_name() {
        return this.role_name;
    }
    public String getRole_description() {
        return this.role_description;
    }
    public void setRole_name(String role_name){
        this.role_name = role_name;
    }
    public void setRole_id(int role_id){
        this.role_id = role_id;
    }
    public void setRole_description(String role_description){
        this.role_description = role_description;
    }
}
