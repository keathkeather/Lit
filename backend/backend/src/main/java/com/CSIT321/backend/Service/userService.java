package com.CSIT321.backend.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.UserEntity;
import com.CSIT321.backend.Entity.DTO.UserDTO;
import com.CSIT321.backend.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    
    public UserEntity insertUser(UserDTO userDTO) {

        UserEntity user = new UserEntity();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        AccountEntity account = new AccountEntity();
        account.setUser(user);
        account.setEmail(userDTO.getAccount().getEmail());
        
        user.setAccount(account);
        
        userRepository.save(user);
    
        return user;
    }
    
    public List<UserEntity> getAllUserEntities() {
        return userRepository.findAll();
    }

    public UserEntity updateUser(int uid, UserDTO newUserDTO) {
        try {
            // Fetch the existing UserEntity from the database
            UserEntity user = userRepository.findById(uid)
                    .orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));

            // Update user details from the DTO
            user.setUsername(newUserDTO.getUsername());
            user.setPassword(newUserDTO.getPassword());

            // Update AccountEntity details from the DTO
            AccountEntity account = user.getAccount();
            if (account != null) {
                account.setEmail(newUserDTO.getAccount().getEmail());
            }

            // Save the updated UserEntity (which cascades to save associated entities)
            return userRepository.save(user);
        } catch (NoSuchElementException ex) {
            throw ex;
        }
    }
    

    public String deleteUser(int uid) {
        String msg = "";
        Optional<UserEntity> optionalUser = userRepository.findById(uid);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(uid);
            msg = "User " + uid + " deleted";
        } else {
            msg = "User " + uid + " does not exist";
        }
        return msg;
    }
}
