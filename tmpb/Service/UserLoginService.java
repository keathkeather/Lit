package com.CSIT321.backend.Service;
import com.CSIT321.backend.Entity.UserLoginEntity;
import com.CSIT321.backend.Repository.UserLoginRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import java.util.NoSuchElementException; 
@Service
public class UserLoginService {
    @Autowired
    UserLoginRepository userLoginRepository;
    
    public UserLoginEntity insertUserLogin(UserLoginEntity user){
        return userLoginRepository.save(user);
    }
    public List<UserLoginEntity> getAllUserLoginEntities(){
        return userLoginRepository.findAll();
    }
    @SuppressWarnings("finally")
    public UserLoginEntity updateUserlogin(int uid, UserLoginEntity newUserDetails){
        UserLoginEntity user = new UserLoginEntity();
        try{
            user = userLoginRepository.findById(uid).get();
            user.setUsername(newUserDetails.getUsername());
            user.setPassword(newUserDetails.getPassword());
        }catch(NoSuchElementException ex){
            throw new NoSuchElementException("User " + uid + "Does not exist");
        }finally{
            return userLoginRepository.save(user);
        }
    }
    public String deleteUserLogin(int uid){
        String msg="";
        if(userLoginRepository.findById(uid)!=null){
            userLoginRepository.deleteById(uid);
            msg = "User " + uid + " deleted";
        }
        else{
            msg = "User " + uid + " does not exist";
        }
        return msg;
    }
}
