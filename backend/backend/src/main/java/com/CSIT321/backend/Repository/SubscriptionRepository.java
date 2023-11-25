package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CSIT321.backend.Entity.SubscriptionEntity;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, Integer> {
  
}
