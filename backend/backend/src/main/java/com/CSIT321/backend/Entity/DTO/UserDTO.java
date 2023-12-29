package com.CSIT321.backend.Entity.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String password;
    private AccountDTO account;
    private RoleDTO role;
  
}
