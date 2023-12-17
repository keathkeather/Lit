package com.CSIT321.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    Optional<List<BookEntity>> findByIsDeleted(boolean isDeleted);
    Optional<List<BookEntity>> findByAuthor(AccountEntity account);
}
