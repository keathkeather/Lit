package com.CSIT321.backend.Repository;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.BookListEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookListRepository extends JpaRepository<BookListEntity, Integer> {
      Optional<BookListEntity> findByAccount(AccountEntity account);
}
