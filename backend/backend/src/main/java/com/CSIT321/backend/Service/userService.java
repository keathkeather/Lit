package com.CSIT321.backend.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.RolesEntity;
import com.CSIT321.backend.Entity.UserEntity;
import com.CSIT321.backend.Entity.DTO.UserDTO;
import com.CSIT321.backend.Repository.RolesRepository;
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

    @Autowired
    RolesRepository rolesRepository;
    public UserEntity insertUser(UserDTO userDTO) {

        UserEntity user = new UserEntity();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        RolesEntity defaultRole = rolesRepository.findById(1).orElseThrow();
        AccountEntity account = new AccountEntity();
        account.setUser(user);
        account.setEmail(userDTO.getAccount().getEmail());
        account.setRole(defaultRole);
        user.setAccount(account);
        
        userRepository.save(user);
         
    
        return user;
    }
    
    public List<UserEntity> getAllUserEntities() {
        return userRepository.findAll();
    }

    public UserEntity updateUserRoleToAuthor(int uid){
        try{
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));
            RolesEntity authorRole = rolesRepository.findById(2).orElseThrow();
            user.getAccount().setRole(authorRole);
            return userRepository.save(user);
        }catch(NoSuchElementException ex){
            throw ex;
        }
    }

    public UserEntity updateUser(int uid, UserDTO newUserDTO) {
        try {
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));

            user.setUsername(newUserDTO.getUsername());
            user.setPassword(newUserDTO.getPassword());

            AccountEntity account = user.getAccount();
            if (account != null) {
                account.setEmail(newUserDTO.getAccount().getEmail());
            }

            return userRepository.save(user);
        } catch (NoSuchElementException ex) {
            throw ex;
        }
    }
    public UserEntity deleteUser(int uid) {
        try {
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));
            user.setDeleted(true);
            return userRepository.save(user);
        } catch (NoSuchElementException ex) {
            throw ex;
        }
    }
    public UserEntity restoreUser(int uid){
        try{
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));
            user.setDeleted(false);
            return userRepository.save(user);
        }catch(NoSuchElementException ex){
            throw ex;
        }
    }

    public String deleteUserPermanently(int uid) {
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
