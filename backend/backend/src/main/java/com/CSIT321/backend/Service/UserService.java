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
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    AccountService accountService;
    @Autowired
    RolesRepository rolesRepository;
    public UserEntity createUser(UserEntity user) {
        try{
            UserEntity createdUser = userRepository.save(user);
            AccountEntity account = accountService.createAccount(createdUser, createdUser.getAccount());
            createdUser.setAccount(account);
            return  userRepository.save(createdUser);   
        }catch(Exception e){
            throw e;
        } 
    }
    
    public List<UserEntity> getAllUserEntities() {
        return userRepository.findAll();
    }
    public List<UserEntity> getAllAvailableUsers(){
        return userRepository.findByIsDeleted(false).get();
    }


    public UserEntity getUserById(int uid){
        return userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));
    }
    //* this is my bruteforce way to implement getAllAuthors through accounts */
    //Todo : find a better way to implement this
    public List<UserEntity> getAllAuthors() {
        try {
            List<UserEntity> allUsers = userRepository.findAll();
            List<AccountEntity> authorAccounts = accountService.getAllAuthors();

            List<UserEntity> authors = allUsers.stream()
                .filter(user -> authorAccounts.contains(user.getAccount()))
                .collect(Collectors.toList());

            return authors;
        } catch (Exception e) {
            throw e;
        }
    }
    public UserEntity updateUserRoleToAuthor(int uid) {
        try {
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));

            RolesEntity authorRole = rolesRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Author role not found"));

            user.getAccount().setRole(authorRole);
            return userRepository.save(user);
        } catch (RuntimeException ex) {
            throw ex;
        }
    }
    public UserEntity updateUserRoleToAdmin(int uid){
        try{
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));

            RolesEntity adminRole = rolesRepository.findById(3).orElseThrow(() -> new RuntimeException("Author role not found"));

            user.getAccount().setRole(adminRole);
            return userRepository.save(user);
        }catch (RuntimeException ex) {
            throw ex;
        }
    }

    // ! there is an error when updating if a the passed is null it will update the values to null
    // ! also when list is being updated it will delete the other values 
    public UserEntity updateUser(int uid, UserDTO newUserDTO) {
        try {
            UserEntity user = userRepository.findById(uid).orElseThrow(() -> new NoSuchElementException("User " + uid + " does not exist"));

            user.setUsername(newUserDTO.getUsername());
            user.setPassword(newUserDTO.getPassword());

            AccountEntity account = user.getAccount();
            if (account != null) {
                account.setEmail(newUserDTO.getAccount().getEmail());
                account.setFirstName(newUserDTO.getAccount().getFirstName());
                account.setLastName(newUserDTO.getAccount().getLastName());
                account.setGender(newUserDTO.getAccount().getGender());
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

    public void deleteUserPermanently(int uid) {
        try{
            userRepository.deleteById(uid);

        }catch(NoSuchElementException ex){
            throw new NoSuchElementException("User " + uid + " does not exist");
        }
    }
}
