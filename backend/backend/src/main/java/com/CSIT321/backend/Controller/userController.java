package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.UserEntity;
import com.CSIT321.backend.Entity.DTO.UserDTO;
import com.CSIT321.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
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
    @PostMapping("/createUser")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserDTO userDTO) {
        UserEntity createdUser = userService.insertUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers(){
        return userService.getAllUserEntities();
    }
    @PutMapping("/updateUser/{user_id}")
    public UserEntity updateUser(@PathVariable int user_id,@RequestBody UserDTO newUserDTO){
        return userService.updateUser(user_id, newUserDTO);
    }
    @PutMapping("/updateUserRoleToAuthor/{user_id}")
    public UserEntity updateUserRoleToAuthor(@PathVariable int user_id){
        return userService.updateUserRoleToAuthor(user_id);
    }
    @PutMapping("/deleteUser/{user_id}")
    public UserEntity deleteUser(@PathVariable int user_id){
        return userService.deleteUser(user_id);
    }
    @PutMapping("/restoreUser/{user_id}")
    public UserEntity restoreUser(@PathVariable int user_id){
        return userService.restoreUser(user_id);
    }

    @DeleteMapping("/deleteUserPermanently/{user_id}")
    public String deleteUserPermanently(@PathVariable int user_id){
        return userService.deleteUserPermanently(user_id);
    }
}
