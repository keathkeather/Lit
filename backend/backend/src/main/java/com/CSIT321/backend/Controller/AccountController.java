package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Service.AccountService;

import java.util.List;


@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<AccountEntity> createAccount(@RequestBody AccountEntity question) {
        AccountEntity createdAccount = accountService.createAccount(question);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AccountEntity>> getAllAccounts() {
        List<AccountEntity> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountEntity> getAccountById(@PathVariable int accountId) {
        AccountEntity account = accountService.getAccountById(accountId);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/purchaseSub/{accountId}")
    public ResponseEntity<String> purchaseSubscription(
        @PathVariable int accountId, @RequestParam int subscriptionId) {
        AccountEntity account  = accountService.getAccountById(accountId);
        if(account != null){
            accountService.purchaseSubscription(account, subscriptionId);
            return new ResponseEntity<>("Subscription Purchased",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Account not found",HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/update/{accountId}")
    public ResponseEntity<AccountEntity> updateAccount( @PathVariable int accountId, @RequestBody AccountEntity updatedAccount)
     {
        AccountEntity updateAccount = accountService.updateAccount(accountId, updatedAccount);
        if (updateAccount != null) {
            return new ResponseEntity<>(updateAccount, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/unsubscribe/{accountId}")
    public ResponseEntity<String>unsubscribe(@PathVariable int accountId){
        try {
            accountService.cancelSubscription(accountId);
            return new ResponseEntity<>("Subscription Cancelled", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("account not found", HttpStatus.BAD_REQUEST);
        }
    }
}
