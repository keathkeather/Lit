package com.CSIT321.backend.Service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Service.EmailSendService;

@Service
public class EmailSendServiceImpl implements EmailSendService {
        
    private final JavaMailSender mailSender;
        
    public EmailSendServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String name, String fromEmail, String message) {
        // Format the email body with specific fields
        String formattedMessage = "From: " + name + "\n\n"
                               + "Email: " + fromEmail + "\n\n"
                               + "Message: " + message;

        // Create a new SimpleMailMessage
        SimpleMailMessage newMail = new SimpleMailMessage();
        newMail.setFrom("lit.filico@gmail.com");
        newMail.setTo("lit.filico@gmail.com"); // Send email to itself
        newMail.setSubject("Contact Form Submission");
        newMail.setText(formattedMessage);

        // Send the email
        this.mailSender.send(newMail);
    }   
}
