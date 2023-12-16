package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.FeedbackEntity;
import java.util.List;
import java.util.Optional;
public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Integer> {

    Optional<List<FeedbackEntity>> findByIsDeleted(boolean isDeleted);
} 