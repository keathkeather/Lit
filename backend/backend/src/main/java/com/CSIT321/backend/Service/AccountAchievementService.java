package com.CSIT321.backend.Service;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountAchievementEntity;
import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AchievementEntity;
import com.CSIT321.backend.Repository.AccountAchievementRepository;
import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.AchievementRepository;

import java.util.List;
@Service
public class AccountAchievementService {
    @Autowired
    AccountAchievementRepository accountAchievementRepository;    

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AchievementRepository achievementRepository;

    public AccountAchievementEntity addAchievement(int accountId, int achievementId){
        try{
            AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
    
            // Retrieve or create an AccountAchievementEntity for the account
            AccountAchievementEntity accountAchievement = accountAchievementRepository.findByAccount(account)
                    .orElse(new AccountAchievementEntity(account));
    
            List<AchievementEntity> achievements = accountAchievement.getAchievements();
            AchievementEntity achieved = achievementRepository.findById(achievementId).orElseThrow(() -> new NoResultException("Achievement " + achievementId + " does not exist"));
            achievements.add(achieved);
            accountAchievement.setAchievements(achievements);
            return accountAchievementRepository.save(accountAchievement);
        } catch(Exception e){
            throw e;
        }
    }
    
    
    
    public AccountAchievementEntity removeAchievement(int accountId, int achievementId) {
        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
        
        AccountAchievementEntity accountAchievement = accountAchievementRepository.findByAccount(account)
                .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
    
        List<AchievementEntity> achievements = accountAchievement.getAchievements();
        achievements.removeIf(achievement -> achievement.getAchivementId() == achievementId);
        accountAchievement.setAchievements(achievements);
    
        return accountAchievementRepository.save(accountAchievement);
    }
    

}
