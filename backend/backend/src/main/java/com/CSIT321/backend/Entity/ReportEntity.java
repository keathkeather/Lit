package com.CSIT321.backend.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="report")
public class ReportEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int reportId;
    
    @OneToOne
    @JoinColumn(name = "account")
    private AccountEntity account;
    
    @Column(columnDefinition = "TEXT")
    private String report;

    @Builder.Default
    private boolean isDeleted = false;
    
}
