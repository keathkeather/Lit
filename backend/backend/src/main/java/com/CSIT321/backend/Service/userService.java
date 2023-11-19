package com.CSIT321.backend.Service;
import com.CSIT321.backend.Entity.UserEntity;
import com.CSIT321.backend.Repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException; 
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserEntity insertUser(UserEntity user){
        return userRepository.save(user);
    }
    public List<UserEntity> getAllUserEntities(){
        return userRepository.findAll();
    }
    @SuppressWarnings("finally")
    public UserEntity updateUser(int uid, UserEntity newUserEntity){
        UserEntity user = new UserEntity();
        try{
            user  = userRepository.findById(uid).get();
            user.setUsername(newUserEntity.getUsername());
            user.setPassword(newUserEntity.getPassword());
           
        }catch(NoSuchElementException ex){
            throw new NoSuchElementException("User " + uid + "Does not exist");
        }finally{
            return userRepository.save(user);
        }
    }
    public String deleteUser(int uid){
        String msg="";
        Optional<UserEntity> optionalUser = userRepository.findById(uid);
        if(optionalUser.isPresent()){
            userRepository.deleteById(uid);
            msg = "User " + uid + " deleted";
        }
        else{
            msg = "User " + uid + " does not exist";
        }
        return msg;
    }
    
}
