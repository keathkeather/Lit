package com.CSIT321.backend.Repository;
import com.CSIT321.backend.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    Optional<UserEntity> findById(int userId);
} 
