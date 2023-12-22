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
    public ResponseEntity<List<UserEntity>> getAllUsers(){
        try{
            List<UserEntity> users = userService.getAllUserEntities();
            return new ResponseEntity<>(users,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @GetMapping("/getAllAvailableUsers")
    public ResponseEntity<List<UserEntity>> getAllAvailableUsers(){
        try{
            List<UserEntity> users = userService.getAllAvailableUsers();
            return new ResponseEntity<>(users,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    
    @CrossOrigin
    @GetMapping("/getUser/{uid}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int uid){
        try{
            UserEntity user = userService.getUserById(uid);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }

    @CrossOrigin
    @GetMapping("/getAllAuthors")
    public ResponseEntity<List<UserEntity>> getAllAuthors(){
        try{
            List<UserEntity> authors = userService.getAllAuthors();
            return new ResponseEntity<>(authors,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
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
    public ResponseEntity<UserEntity> updateUserRoleToAuthor(@PathVariable int user_id) {
        try {
            UserEntity updatedUser = userService.updateUserRoleToAuthor(user_id);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PutMapping("/updateUserRoleToAdmin/{user_id}")
    public ResponseEntity<UserEntity> updateUserRoleToAdmin(@PathVariable int user_id) {
        try {
            UserEntity updatedUser = userService.updateUserRoleToAdmin(user_id);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PutMapping("/deleteUser/{user_id}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable int user_id){
        try{
            UserEntity deletedUser =  userService.deleteUser(user_id);
            return new ResponseEntity<>(deletedUser, HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/restoreUser/{user_id}")
    public ResponseEntity<UserEntity> restoreUser(@PathVariable int user_id){
        try{
            UserEntity restoreUser = userService.restoreUser(user_id);
            return new ResponseEntity<>(restoreUser, HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
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
