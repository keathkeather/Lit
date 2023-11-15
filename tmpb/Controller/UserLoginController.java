package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.UserLoginEntity;
import com.CSIT321.backend.Service.UserLoginService;
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
@RequestMapping("/userlogin")
public class UserLoginController {
    @Autowired
    UserLoginService userLoginService;
    @GetMapping("print")
    public String printTest(){
        return "Hello the server is working";
    
    }



}