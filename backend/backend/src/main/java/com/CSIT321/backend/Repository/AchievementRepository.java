package com.CSIT321.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AchievementEntity;
public interface AchievementRepository extends JpaRepository<AchievementEntity, Integer> {

    
}
