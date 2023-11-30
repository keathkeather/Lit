package com.CSIT321.backend.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountSubscriptionEntity;
import com.CSIT321.backend.Repository.AccountSubscriptionRepository;

@Service
public class AccountSubscriptionService{
    @Autowired
    AccountSubscriptionRepository accountSubscriptionRepository;
    

    public AccountSubscriptionEntity createSubscription(AccountSubscriptionEntity accountSubscription){
        return accountSubscriptionRepository.save(accountSubscription);
    }
    
    
}