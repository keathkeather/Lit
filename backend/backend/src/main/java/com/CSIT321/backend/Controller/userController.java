package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.UserEntity;
import com.CSIT321.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController{
    @Autowired
    UserService userService;
    @GetMapping("/print")
    public String printHello() {
        return "Hello, Keath Lavador!";
    }
    @PostMapping("/insertUser")
    public UserEntity inserUser(@RequestBody UserEntity user){
        return userService.insertUser(user);
    }
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers(){
        return userService.getAllUserEntities();
    }
    @PutMapping("/updateUser/{user_id}")
    public UserEntity updateUser(@PathVariable int user_id,@RequestBody UserEntity newUserEntity){
        return userService.updateUser(user_id, newUserEntity);
    }
    @DeleteMapping("/deleteUser/{user_id}")
    public String deleteUser(@PathVariable int user_id){
        return userService.deleteUser(user_id);
    }
}
