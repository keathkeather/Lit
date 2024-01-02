package com.CSIT321.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendEmailEntity {
    
    public String name;
    public String email;
    public String message;

}
