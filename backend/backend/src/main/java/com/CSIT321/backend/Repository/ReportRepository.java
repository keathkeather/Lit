package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.ReportEntity;
import java.util.List;
import java.util.Optional;
public interface ReportRepository extends JpaRepository<ReportEntity, Integer>{
    Optional<List<ReportEntity>> findByIsDeleted(boolean isDeleted);
}
