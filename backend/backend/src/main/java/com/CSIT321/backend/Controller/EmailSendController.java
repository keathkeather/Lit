package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Entity.SendEmailEntity;
import com.CSIT321.backend.Service.EmailSendService;

@RestController
@RequestMapping("/email")
public class EmailSendController {

    @Autowired
    EmailSendService emailSendService;
    @CrossOrigin
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody SendEmailEntity email) {
        try {
            emailSendService.sendEmail(email.getName(), email.getEmail(), email.getMessage());
            return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error in input", HttpStatus.BAD_REQUEST);
        }
    }

}
