package com.CSIT321.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.QuizAnsweredEntity;

public interface QuizAnsweredRepository extends JpaRepository<QuizAnsweredEntity,Integer> {
    Optional<QuizAnsweredEntity> findByAccount(AccountEntity account);
}
