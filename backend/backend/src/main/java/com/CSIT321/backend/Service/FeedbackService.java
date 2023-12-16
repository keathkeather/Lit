package com.CSIT321.backend.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.FeedbackEntity;
import com.CSIT321.backend.Repository.FeedbackRepository;

@Service
public class FeedbackService {
    @Autowired
    FeedbackRepository feedbackRepository;

    public FeedbackEntity createFeedback(FeedbackEntity feedback){
        return feedbackRepository.save(feedback);
    }
    public List<FeedbackEntity> getAllFeedbacks(){
        return feedbackRepository.findAll();
    }
    public List<FeedbackEntity> getAllAvailableFeedback(){
        try{
            return feedbackRepository.findByIsDeleted(false).get();
        }catch(Exception e){
            throw e;
        }
    }


    public FeedbackEntity deleteFeedback(int feedbackId){
        try{
            FeedbackEntity deletedFeedback = feedbackRepository.findById(feedbackId).orElseThrow(() -> new EntityNotFoundException("Feedback " + feedbackId + " does not exist"));
            deletedFeedback.delete();
            return feedbackRepository.save(deletedFeedback);
        }catch(Exception e){
            throw e;
        }
    }
    public FeedbackEntity restoreFeedback(int feedbackId){
        try{
            FeedbackEntity restoredFeedback = feedbackRepository.findById(feedbackId).orElseThrow(() -> new EntityNotFoundException("Feedback " + feedbackId + " does not exist"));
            restoredFeedback.restore();
            return feedbackRepository.save(restoredFeedback);
        }catch(Exception e){
            throw e;
        }
    }
    public void deleteFeedbackPermanently(int feedbackId){
        try{
            feedbackRepository.findById(feedbackId).orElseThrow(() -> new EntityNotFoundException("FeedBack " + feedbackId + " does not exist"));
            feedbackRepository.deleteById(feedbackId);
        }catch(Exception e){
            throw e;
        }
    }
}
