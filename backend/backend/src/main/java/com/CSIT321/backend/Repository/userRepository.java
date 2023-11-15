package com.CSIT321.backend.Repository;
import com.CSIT321.backend.Entity.userEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface userRepository extends JpaRepository<userEntity, Integer>{
    Optional<userEntity> findById(int userId);
} 

