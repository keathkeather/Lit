package com.CSIT321.backend.Controller;

import java.util.List;

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

import com.CSIT321.backend.Entity.SubscriptionEntity;
import com.CSIT321.backend.Service.SubscriptionService;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {
    
    @Autowired
    SubscriptionService subscriptionService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<SubscriptionEntity> createSubscription(@RequestBody SubscriptionEntity subscription){
        SubscriptionEntity createdSubscription = subscriptionService.createSubscription(subscription);
        return new ResponseEntity<>(createdSubscription , HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<SubscriptionEntity>> getSubscriptions(){
        List<SubscriptionEntity> subscriptionList = subscriptionService.getAllSubsciptions();
        return new ResponseEntity<>(subscriptionList,HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/update/{subscriptionId}")
    public ResponseEntity<SubscriptionEntity> updateSubscription(@PathVariable int subscriptionId, @RequestBody SubscriptionEntity newSubscription){
        SubscriptionEntity subscription = subscriptionService.updateSubscription(subscriptionId, newSubscription);
        if(subscription != null){
            return new ResponseEntity<>(subscription,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin 
    @PutMapping("/deleteSubscription/{subscriptionId}")
    public ResponseEntity<SubscriptionEntity> deleteSubscription(@PathVariable int subscriptionId){
        SubscriptionEntity subscription = subscriptionService.deleteSubscription(subscriptionId);
        if(subscription != null){
            return new ResponseEntity<>(subscription,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @PutMapping("/restoreSubscription/{subscriptionId}")
    public ResponseEntity<SubscriptionEntity>restoreSubscription(@PathVariable int subscriptionId){
        SubscriptionEntity subscription = subscriptionService.restoreSubscription(subscriptionId);
        if(subscription != null){
            return new ResponseEntity<>(subscription,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @DeleteMapping("/deletePermanently/{subscriptionId}")
    public void deletePermanently(@PathVariable int  subscriptionId){
        subscriptionService.deleteSubscriptionPermanently(subscriptionId);
    }
    

}
