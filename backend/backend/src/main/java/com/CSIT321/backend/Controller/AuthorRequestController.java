package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.CSIT321.backend.Exceptions.AlreadyAuthorizedAccountException;
import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AuthorRequestEntity;
import com.CSIT321.backend.Service.AccountService;
import com.CSIT321.backend.Service.AuthorRequestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@RestController
@RequestMapping("/authorRequest")
public class AuthorRequestController {
    @Autowired
    AuthorRequestService authorRequestService;
    @Autowired
    AccountService accountService;
    
    @CrossOrigin
    @PostMapping("/create")
    public  ResponseEntity<AuthorRequestEntity> createAuthorRequest(@RequestBody AuthorRequestEntity authorRequest){
        try{
            AccountEntity account = accountService.getAccountById(authorRequest.getAccount().getAccountId());
            if(account.getRole().getRole_id()  != 2 ){
                AuthorRequestEntity request = authorRequestService.createAuthorRequest(authorRequest);
                return new ResponseEntity<>(request,HttpStatus.CREATED);    
            }else{
                throw new AlreadyAuthorizedAccountException("Account "+authorRequest.getAccount().getAccountId()+" is already an author");
            }
            
        }catch(AlreadyAuthorizedAccountException e){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @GetMapping("/getByAccount/{accountId}")
    public ResponseEntity<AuthorRequestEntity> getMethodName(@RequestParam int accountId) {
        try{
            AuthorRequestEntity request = authorRequestService.getRequestPerAccount(accountId);
            return new ResponseEntity<>(request, HttpStatus.OK); 
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @GetMapping("/getAll")
    public ResponseEntity<List<AuthorRequestEntity>> approveAuthorRequest(){
        try{
            List<AuthorRequestEntity> request = authorRequestService.getAllAuthorRequest();
            return new ResponseEntity<>(request,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @CrossOrigin
    @PutMapping("/approveRequest/{accountId}")
    public ResponseEntity<AuthorRequestEntity> approveAuthorRequest(@PathVariable int accountId ){
        try{
            AuthorRequestEntity request = authorRequestService.approveAuthorRequest(accountId);
            return new ResponseEntity<>(request,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @CrossOrigin
    @PutMapping("/denyRequest/{accountId}")
    public ResponseEntity<AuthorRequestEntity> denyAuthorRequest(@PathVariable int accountId ){
        try{
            AuthorRequestEntity request = authorRequestService.denyAuthorRequest(accountId);
            return new ResponseEntity<>(request,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @DeleteMapping("/approveRequest/{accountId}")
    public ResponseEntity<String> deleteAuthorRequest(@PathVariable int accountId ){
        try{
            authorRequestService.deleteAuthorRequest(accountId);
            return new ResponseEntity<>("author request deleted",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error in account deletion",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
