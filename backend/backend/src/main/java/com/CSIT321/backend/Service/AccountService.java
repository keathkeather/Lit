package com.CSIT321.backend.Service;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AccountSubscriptionEntity;
import com.CSIT321.backend.Entity.SubscriptionEntity;
import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.AccountSubscriptionRepository;
import com.CSIT321.backend.Repository.SubscriptionRepository;

import java.util.List;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;    
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private AccountSubscriptionRepository accountSubscriptionRepository;
   
    public AccountEntity   createAccount(AccountEntity account) {
        return accountRepository.save(account);
    }
     public AccountEntity getAccountById(int accountId) {
        return accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
    }
    
    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findAll();
    }
    public List<AccountEntity> getAllAuthors(){
        return accountRepository.findByRole(2).get();
    }

    public AccountEntity updateAccount(int accountId, AccountEntity newAccount) {
        AccountEntity accountEntity = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
        if (accountEntity!= null) {
            accountEntity.setUser(newAccount.getUser());
            accountEntity.setEmail(newAccount.getEmail());
            accountEntity.setFirstName(newAccount.getFirstName());
            accountEntity.setLastName(newAccount.getLastName());
            accountEntity.setGender(newAccount.getGender());

            return accountRepository.save(accountEntity);
        }
        return null;
    }
    public AccountEntity deleteAccount(int accountId){
        try{
            AccountEntity deletedAccount  = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            deletedAccount.delete();
            return accountRepository.save(deletedAccount);
        }catch (Exception e){
            throw e;
        }
    }
    public AccountEntity recoverAccount(int accountId){
        try{
            AccountEntity recoveredAccount  = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            recoveredAccount.recover();
            return accountRepository.save(recoveredAccount);
        }catch (Exception e){
            throw e;
        }
    }
    

    public void deleteAccountPermanently(int accountId) {
        accountRepository.deleteById(accountId);
    }

    public void purchaseSubscription(int  accountId , int subscriptionId ){
        AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));;
        SubscriptionEntity subscription = subscriptionRepository.findById(subscriptionId).get();

        if(accountSubscriptionRepository.existsByAccount(account)){
            throw new IllegalStateException("Account already Subscribed");
        }
        AccountSubscriptionEntity accountSubscription = new AccountSubscriptionEntity(account , subscription);
        accountSubscriptionRepository.save(accountSubscription);
    }
    public void cancelSubscription(int accountId) {
        AccountEntity account = getAccountById(accountId);

        if (account != null) {
            List<AccountSubscriptionEntity> subscriptions = accountSubscriptionRepository.findByAccount(account);

            if (!subscriptions.isEmpty()) {
                for (AccountSubscriptionEntity subscription : subscriptions) {
                    subscription.setUnsubscribed();
                    accountSubscriptionRepository.save(subscription);
                }
            } else {
                throw new IllegalStateException("No subscriptions found for the account");
            }
        } else {
            throw new IllegalStateException("Account not found");
        }
    }
}
