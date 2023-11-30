package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import org.springframework.stereotype.Service;
import java.util.*;

import javax.persistence.EntityNotFoundException;

import com.CSIT321.backend.Entity.AchievementEntity;
import com.CSIT321.backend.Repository.AchievementRepository;
import com.CSIT321.backend.Repository.BookRepository;
import com.CSIT321.backend.Entity.BookEntity;
@Service
public class AchievementService {
    @Autowired
    AchievementRepository achievementRepository;
    @Autowired
    BookRepository bookRepository;

    public AchievementEntity createAchievement(AchievementEntity achievement){
        int bookId = achievement.getBookId();
        BookEntity existingBook = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book " + bookId + " does not exist"));
        achievement.setBook(existingBook);
        return achievementRepository.save(achievement);
    }
    public List<AchievementEntity> getAllAchievements(){
        return achievementRepository.findAll();
    }
    public AchievementEntity updateAchievement(int achievementId, AchievementEntity newAchievement) {
        try {
            AchievementEntity achievement = achievementRepository.findById(achievementId).orElseThrow(() -> new EntityNotFoundException("Achievement " + achievementId + " does not exist"));
            achievement.setAchievementDescription(newAchievement.getachievementDescription());
            achievement.setAchievementName(newAchievement.getAchievementName());
            achievement.setAchievementValue(newAchievement.getAchievementValue());
            achievement.setBook(newAchievement.getBook());

            return achievementRepository.save(achievement);
        } catch (DataAccessException ex) {
            throw ex;
        }
    }
    public AchievementEntity deleteAchievement(int achievementId){
        try{
            AchievementEntity achievement = achievementRepository.findById(achievementId).orElseThrow(() -> new EntityNotFoundException("Achievement " + achievementId + " does not exist"));
            achievement.delete();
            return achievementRepository.save(achievement);

        }catch (DataAccessException ex){
            throw ex;
        }
    }
    public AchievementEntity recoverAchievement(int achievementId){
        try{
            AchievementEntity achievement = achievementRepository.findById(achievementId).orElseThrow(() -> new EntityNotFoundException("Achievement " + achievementId + " does not exist"));
            achievement.recover();
            return achievementRepository.save(achievement);

        }catch (DataAccessException ex){
            throw ex;
        }
    }

    public void  deleteAchievementPermanently(int achievementId){
        try{
            achievementRepository.findById(achievementId).orElseThrow(() -> new EntityNotFoundException("Achievement " + achievementId + " does not exist"));
            achievementRepository.deleteById(achievementId);
        }catch(DataAccessException e){}
    }

}

