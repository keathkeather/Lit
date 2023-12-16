package com.CSIT321.backend.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.ReportEntity;
import com.CSIT321.backend.Repository.ReportRepository;

@Service
public class ReportService {
    @Autowired
    ReportRepository reportRepository;

    public ReportEntity createReport(ReportEntity report){
        return reportRepository.save(report);
    }
    public List<ReportEntity> getAllReports(){
        return reportRepository.findAll();
    }
    
    public List<ReportEntity> getAllAvailableReports(){
        try{
            return reportRepository.findByIsDeleted(false).get();
        }catch(Exception e){
            throw e;
        }
    }
    public ReportEntity deleteReport(int reportId){
        try{
            ReportEntity deletedReport = reportRepository.findById(reportId).orElseThrow(() -> new EntityNotFoundException("Report " + reportId + " does not exist"));
            deletedReport.delete();
            return reportRepository.save(deletedReport);
        }catch(Exception e){
            throw e;
        }
    }
    public ReportEntity restoreReport(int reportId){
        try{
            ReportEntity retoredReport = reportRepository.findById(reportId).orElseThrow(() -> new EntityNotFoundException("Report " + reportId + " does not exist"));
            retoredReport.restore();
            return reportRepository.save(retoredReport);
        }catch(Exception e){
            throw e;
        }
    }
    public void deleteReportPermanently(int reportId){
        try{
            reportRepository.findById(reportId).orElseThrow(() -> new EntityNotFoundException("Report " + reportId + " does not exist"));
            reportRepository.deleteById(reportId);
        }catch(Exception e){
            throw e;
        }
    }
}
