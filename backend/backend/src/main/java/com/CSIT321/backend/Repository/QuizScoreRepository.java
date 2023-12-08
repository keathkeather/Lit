package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.QuizScoreEntity;

public interface QuizScoreRepository extends JpaRepository<QuizScoreEntity, Integer> {
    
}
