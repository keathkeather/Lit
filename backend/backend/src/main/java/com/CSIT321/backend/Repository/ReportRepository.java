package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.ReportEntity;

public interface ReportRepository extends JpaRepository<ReportEntity, Integer>{
    
}
