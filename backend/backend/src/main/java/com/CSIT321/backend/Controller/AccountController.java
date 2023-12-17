package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Service.AccountService;

import java.util.List;

import javax.persistence.NoResultException;


@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;
    
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<AccountEntity> createAccount(@RequestBody AccountEntity question) {
        AccountEntity createdAccount = accountService.createAccount(question);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<AccountEntity>> getAllAccounts() {
        List<AccountEntity> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/{accountId}")
    public ResponseEntity<AccountEntity> getAccountById(@PathVariable int accountId) {
        try{
        AccountEntity account = accountService.getAccountById(accountId);
            return new ResponseEntity<>(account, HttpStatus.OK);
        } catch(NoResultException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping("/authors")
    public ResponseEntity<List<AccountEntity>> getAllAuthors() {
        try{ 
            List<AccountEntity> accounts = accountService.getAllAuthors();
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @PostMapping("/purchaseSub/{accountId}")
    public ResponseEntity<String> purchaseSubscription(
        @PathVariable int accountId, @RequestParam int subscriptionId) {
        try{
            accountService.purchaseSubscription(accountId, subscriptionId);
            return new ResponseEntity<>("Subscription Purchased",HttpStatus.OK);
        }catch(NoResultException e){
            return new ResponseEntity<>("Account not found",HttpStatus.NOT_FOUND);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @CrossOrigin
    @PutMapping("/update/{accountId}")
    public ResponseEntity<AccountEntity> updateAccount( @PathVariable int accountId, @RequestBody AccountEntity updatedAccount)
     {
        try{
            AccountEntity updateAccount = accountService.updateAccount(accountId, updatedAccount);
            return new ResponseEntity<>(updateAccount, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
       
    }
    @CrossOrigin
    @PutMapping("/unsubscribe/{accountId}")
    public ResponseEntity<String>unsubscribe(@PathVariable int accountId){
        try {
            accountService.cancelSubscription(accountId);
            return new ResponseEntity<>("Subscription Cancelled", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("account not found", HttpStatus.BAD_REQUEST);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
