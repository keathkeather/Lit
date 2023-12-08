package com.CSIT321.backend.Service;

public interface EmailSendService{
    void sendEmail(String name, String email, String message);
}