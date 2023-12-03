package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.FeedbackEntity;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Integer> {

    
} 