package com.CSIT321.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountAchievementEntity;
import com.CSIT321.backend.Entity.AccountEntity;

public interface AccountAchievementRepository extends JpaRepository<AccountAchievementEntity , Integer> {
    Optional<AccountAchievementEntity>  findByAccount(AccountEntity account);  
}
