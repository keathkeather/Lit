package com.CSIT321.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AuthorRequestEntity;

public interface AuthorRequestRepository extends JpaRepository<AuthorRequestEntity , Integer> {
    Optional<AuthorRequestEntity>findByAccount(AccountEntity account);  
}
