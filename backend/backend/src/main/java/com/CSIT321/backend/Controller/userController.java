package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.userEntity;
import com.CSIT321.backend.Service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/user")
public class userController{
    @Autowired
    userService userService;
    @GetMapping("/print")
    public String printHello() {
        return "Hello, Keath Lavador!";
    }
    @PostMapping("/insertUser")
    public userEntity inserUser(@RequestBody userEntity user){
        return userService.insertUser(user);
    }
    @GetMapping("/getAllUsers")
    public List<userEntity> getAllUsers(){
        return userService.getAllUserEntities();
    }
    @PutMapping("/updateUser")
    public userEntity updateUser(@RequestParam("user_id") int user_id,@RequestBody userEntity newUserEntity){
        return userService.updateUser(user_id, newUserEntity);
    }
    @DeleteMapping("/deleteUser/{user_id}")
    public String deleteUser(@PathVariable int user_id){
        return userService.deleteUser(user_id);
    }
}
