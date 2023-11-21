package com.CSIT321.backend.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.UserEntity;
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

    
    public UserEntity insertUser(UserEntity user) {
        // Create a new AccountEntity and associate it with the user
        AccountEntity account = new AccountEntity(user);
        user.setAccount(account);

        userRepository.save(user);

        return user;
    }
    public List<UserEntity> getAllUserEntities() {
        return userRepository.findAll();
    }

    public UserEntity updateUser(int uid, UserEntity newUserEntity) {
        UserEntity user;
        try {
            user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + "Does not exist"));
            user.setUsername(newUserEntity.getUsername());
            user.setPassword(newUserEntity.getPassword());
            user.setAccount(newUserEntity.getAccount());
            // Save the updated user only if everything is successful
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
