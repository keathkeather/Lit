package com.CSIT321.backend.Entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "account_subscription")
public class AccountSubscriptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int account_subscription_id;

    @OneToOne
    @JoinColumn(name = "accountId")
    private AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private SubscriptionEntity subscription;

    @Column(name = "start_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Timestamp start_date;

    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Timestamp end_date;
    
    @Column(name = "is_Subscribed")
    private boolean isSubscribed;

    public AccountSubscriptionEntity(){
        super();
    }
    public AccountSubscriptionEntity(AccountEntity account,SubscriptionEntity subscription){
        this.account = account;
        this.subscription = subscription;
        this.start_date = Timestamp.valueOf(LocalDateTime.now());
        this.end_date = calculateEndDate(start_date.toLocalDateTime(),subscription.getSubscriptionDuration());
        this.isSubscribed = true;
    }
    public Timestamp calculateEndDate(LocalDateTime startDate, int duration){
        LocalDateTime endDate = startDate.plusDays(duration);
        return Timestamp.valueOf(endDate);
        
    }
    public int  getAccountSubscriptionId(){
        return this.account_subscription_id;
    }
    public AccountEntity getAccount(){
        return this.account;
    } 
    public SubscriptionEntity getSubscription(){
        return this.subscription;
    }
    public Timestamp getStartDate(){
        return this.start_date;
    }
    public Timestamp getEndDate(){
        return this.end_date;
    }
    public boolean isSubscribed(){
        return this.isSubscribed;
    }
    public void subscribe(){
        this.isSubscribed = true;
    }
    public void unsubscribe(){
        this.isSubscribed = false;
    }
    
    public void setIsSubscribed(){
        this.isSubscribed = true;
    }
    public void setUnsubscribed(){
        this.isSubscribed = false;
    }
    public void setUser(AccountEntity account){
        this.account = account;
    }
    public void setSubscription(SubscriptionEntity subscription){
        this.subscription = subscription;
    }
    public void setStartDate(Timestamp start){
        this.start_date = start;
    }
    public void setEndDate(Timestamp end){
        this.end_date = end;
    }


}
