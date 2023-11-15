package com.CSIT321.backend.Service;
import com.CSIT321.backend.Entity.userEntity;
import com.CSIT321.backend.Repository.userRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException; 
@Service
public class userService {
    @Autowired
    userRepository userRepository;

    public userEntity insertUser(userEntity user){
        return userRepository.save(user);
    }
    public List<userEntity> getAllUserEntities(){
        return userRepository.findAll();
    }
    @SuppressWarnings("finally")
    public userEntity updateUser(int uid, userEntity newUserEntity){
        userEntity user = new userEntity();
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
        Optional<userEntity> optionalUser = userRepository.findById(uid);
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
