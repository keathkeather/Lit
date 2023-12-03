package com.CSIT321.backend.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
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

    private boolean isDeleted;
    public ReportEntity(){
        super();
        this.isDeleted = false;
    }
    public ReportEntity( AccountEntity account,String report){
        this.account = account;
        this.report = report;
        this.isDeleted = false;
    }
    public int getReportId(){
        return this.reportId;
    }
    public AccountEntity getAccount(){
        return this.account;
    }
    public String getReport(){
        return this.report;
    }
    public void setAccount(AccountEntity account){
        this.account = account;
    }
    public void setReport(String report){
        this.report = report;
    }
    public void delete(){
        this.isDeleted = true;
    }
    public void restore(){
        this.isDeleted = false;
    }
    public boolean getIsDeleted(){
        return this.isDeleted;
    }
}
