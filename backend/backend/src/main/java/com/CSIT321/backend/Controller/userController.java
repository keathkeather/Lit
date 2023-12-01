package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.UserEntity;
import com.CSIT321.backend.Entity.DTO.UserDTO;
import com.CSIT321.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class UserController{
    @Autowired
    UserService userService;
    
    @CrossOrigin
    @PostMapping("/createUser")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserDTO userDTO) {
        UserEntity createdUser = userService.insertUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers(){
        return userService.getAllUserEntities();
    }
    @CrossOrigin
    @PutMapping("/updateUser/{user_id}")
    public ResponseEntity<Object> updateUser(@PathVariable int user_id,@RequestBody UserDTO newUserDTO){
        UserEntity updateUser  = userService.updateUser(user_id, newUserDTO);
        try{
            if(updateUser != null){
                return new ResponseEntity<>("user updated", HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>("An error has occured", HttpStatus.INTERNAL_SERVER_ERROR);
        }

         
    }
    @CrossOrigin
    @PutMapping("/updateUserRoleToAuthor/{user_id}")
    public UserEntity updateUserRoleToAuthor(@PathVariable int user_id){
        return userService.updateUserRoleToAuthor(user_id);
    }
    @CrossOrigin
    @PutMapping("/deleteUser/{user_id}")
    public UserEntity deleteUser(@PathVariable int user_id){
        return userService.deleteUser(user_id);
    }
    @CrossOrigin
    @PutMapping("/restoreUser/{user_id}")
    public UserEntity restoreUser(@PathVariable int user_id){
        return userService.restoreUser(user_id);
    }
    @CrossOrigin
    @DeleteMapping("/deleteUserPermanently/{user_id}")
    public ResponseEntity<String> deleteUserPermanently(@PathVariable int user_id){
        try{
            userService.deleteUserPermanently(user_id);
            return new ResponseEntity<>("User deleted permanently",HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
        }catch(NullPointerException e){
            return new ResponseEntity<>("An error has occured", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
