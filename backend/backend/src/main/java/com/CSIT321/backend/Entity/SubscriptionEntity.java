package com.CSIT321.backend.Entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
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
  
    private double cost;

    @Builder.Default
    private boolean isDeleted = false;
}
