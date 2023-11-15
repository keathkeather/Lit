package com.CSIT321.backend.Repository;
import com.CSIT321.backend.Entity.UserLoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLoginRepository extends JpaRepository<UserLoginEntity,Integer>{

    
}