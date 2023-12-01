package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import javax.persistence.NoResultException;

import com.CSIT321.backend.Entity.SubscriptionEntity;
import com.CSIT321.backend.Repository.SubscriptionRepository;

@Service
public class SubscriptionService {
    @Autowired
    SubscriptionRepository subscriptionRepository;

    public SubscriptionEntity createSubscription(SubscriptionEntity subscription) {
        return subscriptionRepository.save(subscription);
    }

    public List<SubscriptionEntity> getAllSubsciptions() {
        return subscriptionRepository.findAll();
    }

    public SubscriptionEntity updateSubscription(int subscriptionId, SubscriptionEntity newSubscription) {
        try {
            SubscriptionEntity subscription = subscriptionRepository.findById(subscriptionId).get();
            subscription.setSubscriptionName(newSubscription.getSubscriptionName());
            subscription.setSubscriptionDescription(newSubscription.getSubscriptionDescription());
            subscription.setCost(newSubscription.getCost());
            subscription.setIsDeleted(newSubscription.getIsDeleted());
            return subscriptionRepository.save(subscription);
        } catch (NoResultException ex) {
            throw new NoResultException("Subscription " + subscriptionId + " does not exist");
        }
    }

    public SubscriptionEntity restoreSubscription(int subscriptionId) {
        try {
            SubscriptionEntity subscription = subscriptionRepository.findById(subscriptionId).orElseThrow();
            subscription.setIsDeleted(false);
            return subscriptionRepository.save(subscription);
        } catch (NoResultException e) {
            throw new NoResultException("Subscription " + subscriptionId + " does not exist");
        }
    }

    public SubscriptionEntity deleteSubscription(int subscriptionId) {
        try {
            SubscriptionEntity subscription = subscriptionRepository.findById(subscriptionId).orElseThrow();
            subscription.setIsDeleted(true);
            return subscriptionRepository.save(subscription);
        } catch (NoResultException e) {
            throw new NoResultException("Subscription " + subscriptionId + " does not exist");
        }
    }

    public void deleteSubscriptionPermanently(int subscriptionId) {
        try {
            subscriptionRepository.deleteById(subscriptionId);
        } catch (NoResultException e) {
            throw new NoResultException("Subscription " + subscriptionId + " does not exist");
        }
    }

}
