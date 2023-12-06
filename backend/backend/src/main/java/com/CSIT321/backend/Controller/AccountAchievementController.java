package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Entity.AccountAchievementEntity;
import com.CSIT321.backend.Service.AccountAchievementService;

@RestController
@RequestMapping("/accountAchievement")
public class AccountAchievementController {
    @Autowired
    AccountAchievementService accountAchievementService;
    
    @CrossOrigin
    @PutMapping("/addAchievement/{accountId}")
    public ResponseEntity<AccountAchievementEntity> addAchievement(@PathVariable int accountId, @RequestParam int achievementId){
        try{
            AccountAchievementEntity achievementList = accountAchievementService.addAchievement(accountId, achievementId);
            return new ResponseEntity<>(achievementList,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PutMapping("/removeAchievement/{accountId}")
    public ResponseEntity<AccountAchievementEntity> removeAchievement(@PathVariable int accountId, @RequestParam int achievementId){
        try{
            AccountAchievementEntity achievementList = accountAchievementService.removeAchievement(accountId, achievementId);
            return new ResponseEntity<>(achievementList,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
