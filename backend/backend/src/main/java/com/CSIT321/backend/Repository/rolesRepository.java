package com.CSIT321.backend.Repository;
import com.CSIT321.backend.Entity.RolesEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<RolesEntity, Integer> {
        Optional<RolesEntity> findById(int role_id);

}
