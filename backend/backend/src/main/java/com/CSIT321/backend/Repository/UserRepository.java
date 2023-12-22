package com.CSIT321.backend.Repository;
import com.CSIT321.backend.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import com.CSIT321.backend.Entity.AccountEntity;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    Optional<UserEntity> findById(int userId);
    Optional<List<UserEntity>> findByIsDeleted(boolean isDeleted);
   
} 

