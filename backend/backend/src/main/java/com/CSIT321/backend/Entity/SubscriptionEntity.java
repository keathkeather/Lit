package com.CSIT321.backend.Entity;

import javax.persistence.*;

@Entity
@Table(name  ="subscription")
public class SubscriptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subscriptionId;

    @Column(name = "subscription_name")
    private String subscriptionName;

    @Column(name  = "subscription_description")
    private String subscriptionDescription;
    
    @Column(name = "subscription_duration")
    private int subscriptionDuration;
  
    @Column(name = "cost")
    private double cost;

    @Column(name = "isDeleted")
    private boolean isDeleted;
    

    public SubscriptionEntity(){
        super();
    }
    public SubscriptionEntity( String subscriptionName, String subscriptionDescription,int subscriptionDuration ,double cost){
        this.subscriptionName = subscriptionName;
        this.subscriptionDescription = subscriptionDescription;
        this.cost = cost;
        this.subscriptionDuration = subscriptionDuration;
        this.isDeleted = false;
    }
    public void setCost(double cost){
        this.cost = cost;
    }
    public void setSubscriptionDescription(String subscriptionDescription){
         this.subscriptionDescription = subscriptionDescription;
    }
    public void setSubscriptionName(String subscriptionName){
        this.subscriptionName = subscriptionName;
    }
    public void setSubscriptionDuration(int subscriptionDuration){
        this.subscriptionDuration = subscriptionDuration;
    }
    public String getSubscriptionName(){
        return this.subscriptionName;
    }
    public String getSubscriptionDescription(){
        return this.subscriptionDescription;
    }
    public int getSubscriptionDuration(){
        return this.subscriptionDuration;
    }
    public double getCost(){
        return this.cost;
    }
    public boolean getIsDeleted(){
        return this.isDeleted;
    }
    public void setIsDeleted(boolean isDeleted){
        this.isDeleted = isDeleted;
    }
}
