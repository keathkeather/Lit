package com.CSIT321.backend.Repository;
import com.CSIT321.backend.Entity.rolesEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface rolesRepository extends JpaRepository<rolesEntity, Integer> {
        Optional<rolesEntity> findById(int userId);

}
