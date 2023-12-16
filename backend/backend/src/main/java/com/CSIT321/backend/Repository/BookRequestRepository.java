package com.CSIT321.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.BookRequestEntity;
import java.util.List;

public interface BookRequestRepository extends JpaRepository<BookRequestEntity,Integer> {
    Optional<List<BookRequestEntity>> findByAccount(AccountEntity account);
    Optional<List<BookRequestEntity>> findByStatus(String status);
} 
