package com.CSIT321.backend.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="feedback")
public class FeedbackEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int feedbackId;
    
    @OneToOne
    @JoinColumn(name = "account")
    private AccountEntity account;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Builder.Default
    private boolean isDeleted = false;
   
  
}
