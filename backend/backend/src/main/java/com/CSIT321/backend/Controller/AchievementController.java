package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.CSIT321.backend.Entity.AchievementEntity;
import com.CSIT321.backend.Service.AchievementService;

@RestController
@RequestMapping("/achievement")
public class AchievementController {
    @Autowired
    AchievementService achievementService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<AchievementEntity> createAchievement(@RequestBody AchievementEntity achievement){
        try{
            AchievementEntity createdAchievement =  achievementService.createAchievement(achievement);
            return new ResponseEntity<>(createdAchievement,HttpStatus.CREATED);
        }catch(Exception e){
            throw e;
        }
    }   
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<AchievementEntity>> getAllAchievments(){
        try{
            List<AchievementEntity> achievements = achievementService.getAllAchievements(); 
            return new ResponseEntity<>(achievements,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/update/{achievementId}")
    public ResponseEntity<AchievementEntity> updateAchievement(@PathVariable int achievementId, @RequestBody AchievementEntity newAchievement){
        try{
            AchievementEntity updatedAchievement = achievementService.updateAchievement(achievementId, newAchievement);
            return new ResponseEntity<>(updatedAchievement,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }        
    }
    @CrossOrigin
    @PutMapping("/delete/{achievementId}")
    public ResponseEntity<AchievementEntity> deleteAchievement(@PathVariable int achievementId){
        try{
            AchievementEntity deletedAchievement = achievementService.deleteAchievement(achievementId);
            return new ResponseEntity<>(deletedAchievement,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/recover/{achievementId}")
    public ResponseEntity<AchievementEntity> recoverAchievement(@PathVariable int achievementId){
        try{
            AchievementEntity deletedAchievement = achievementService.recoverAchievement(achievementId);
            return new ResponseEntity<>(deletedAchievement,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @DeleteMapping("/deletePermanently/{achievementId}")
    public ResponseEntity<String> deleteAchievementPermanently(@PathVariable int achievementId){
        try{
            achievementService.deleteAchievementPermanently(achievementId);
            return new ResponseEntity<>("Deleted acheivement" + achievementId, HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
}
