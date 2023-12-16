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

import com.CSIT321.backend.Entity.FeedbackEntity;
import com.CSIT321.backend.Service.FeedbackService;
import java.util.List;
@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<FeedbackEntity> createFeedback(@RequestBody FeedbackEntity feedback){
        try{
            FeedbackEntity createdFeedback = feedbackService.createFeedback(feedback);
            return new ResponseEntity<>(createdFeedback,HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @GetMapping("/getAllFeedbacks")
    public ResponseEntity<List<FeedbackEntity>>getAllFeedBack(){
        try{
            List<FeedbackEntity> feedbackList = feedbackService.getAllFeedbacks();
            return new ResponseEntity<>(feedbackList,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @CrossOrigin
    @GetMapping("/getAllAvailableFeedback")
    public ResponseEntity<List<FeedbackEntity>>getAllAvailableFeedback(){
        try{
            List<FeedbackEntity> feedbackList = feedbackService.getAllAvailableFeedback();
            return new ResponseEntity<>(feedbackList,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @CrossOrigin
    @PutMapping("/deleteFeedback/{feedbackId}")
    public ResponseEntity<FeedbackEntity>deleteFeedback(@PathVariable int feedbackId){
        try{
            FeedbackEntity deletedFeedback = feedbackService.deleteFeedback(feedbackId);
            return new ResponseEntity<>(deletedFeedback,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @PutMapping("/restoreFeedback/{feedbackId}")
    public ResponseEntity<FeedbackEntity>restoreFeedback(@PathVariable int feedbackId){
        try{
            FeedbackEntity restoredFeedback = feedbackService.restoreFeedback(feedbackId);
            return new ResponseEntity<>(restoredFeedback,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @DeleteMapping("/deleteFeedBackPermanently/{feedbackId}")
    public ResponseEntity<String>deleteFeedBackPermanently(@PathVariable int feedbackId){
        try{
            feedbackService.deleteFeedbackPermanently(feedbackId);
            return new ResponseEntity<>("Feedback deleted  successfully",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Deletion unsuccessful",HttpStatus.CONFLICT);
        }
    }
}
