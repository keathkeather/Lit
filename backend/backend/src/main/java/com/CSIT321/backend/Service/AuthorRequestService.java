package com.CSIT321.backend.Service;

import java.util.List;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AuthorRequestEntity;
import com.CSIT321.backend.Entity.RolesEntity;
import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.AuthorRequestRepository;
import com.CSIT321.backend.Repository.RolesRepository;

@Service
public class AuthorRequestService {
    @Autowired 
    AuthorRequestRepository authorRequestRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    RolesRepository roleRepository;
    public AuthorRequestEntity createAuthorRequest(AuthorRequestEntity request) {
        return authorRequestRepository.save(request);
    }
    public AuthorRequestEntity approveAuthorRequest(int accountId){
        try{
            AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            AuthorRequestEntity request = authorRequestRepository.findByAccount(account)
                .orElseThrow(() -> new NoResultException("Account does not exist"));
            RolesEntity newRole = roleRepository.findById(2).get();

            request.setRequestStatus("Approved");
            account.setRole(newRole);
            return authorRequestRepository.save(request);
        }catch(Exception e){
            throw e;
        }
    }
    public AuthorRequestEntity getRequestPerAccount(int accountId){
        try{
            AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            AuthorRequestEntity request = authorRequestRepository.findByAccount(account)
                .orElseThrow(() -> new NoResultException("Account does not exist"));
            return request;
        }catch(Exception e){
            throw e;
        }
    }
    public List<AuthorRequestEntity> getAllAuthorRequest(){
        return authorRequestRepository.findAll();
    }

    public AuthorRequestEntity denyAuthorRequest(int accountId){
        try{
            AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            AuthorRequestEntity request = authorRequestRepository.findByAccount(account)
                .orElseThrow(() -> new NoResultException("Account does not exist"));

            request.setRequestStatus("denied");
            return authorRequestRepository.save(request);
        }catch(Exception e){
            throw e;
        }

    }

    public void deleteAuthorRequest(int accountId){
        try{
            AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            AuthorRequestEntity request = authorRequestRepository.findByAccount(account)
                .orElseThrow(() -> new NoResultException("Account does not exist"));

            authorRequestRepository.deleteById(request.getAuthorReqId());
        }catch(Exception e){
            throw e;
        }
    }
    
}
