package com.CSIT321.backend.Entity;

public class SendEmailEntity {
    
    public String name;
    public String email;
    public String message;

    public SendEmailEntity(){
        super();
    }
    public SendEmailEntity(String name, String email, String message){
        this.name = name;
        this.email = email;
        this.message = message;
    }
    public String getName(){
        return this.name;
    }
    public String getEmail(){
        return this.email;
    }
    public String getMessage(){
        return this.message;
    }

    public void setName(String name){
        this.name = name;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setMessage(String message){
        this.message = message;
    }


}
