package com.CSIT321.backend.Service;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Repository.AccountRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;    
   
    public AccountEntity   createAccount(AccountEntity account) {
        return accountRepository.save(account);
    }
     public AccountEntity getAccountById(int accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findAll();
    }
    public AccountEntity updateAccount(int accountId, AccountEntity newAccount) {
        AccountEntity accountEntity = accountRepository.findById(accountId).orElse(null);
        if (accountEntity!= null) {
            accountEntity.setUser(newAccount.getUser());
            return accountRepository.save(accountEntity);
        }
        return null;
    }
   
    public void deleteAccount(int accountId) {
        accountRepository.deleteById(accountId);
    }

    
}
