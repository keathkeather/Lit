package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    
}
