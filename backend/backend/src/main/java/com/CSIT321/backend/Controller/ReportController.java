package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Entity.ReportEntity;
import com.CSIT321.backend.Service.ReportService;
import java.util.List;
@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    ReportService reportService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<ReportEntity> createReport(@RequestBody ReportEntity report){
        try{
            ReportEntity reportEntity = reportService.createReport(report);
            return new ResponseEntity<>(reportEntity,HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @GetMapping("/getAllReport")
    public ResponseEntity<List<ReportEntity>>getAllReport(){
        try{
            List<ReportEntity> reportList = reportService.getAllReports();
            return new ResponseEntity<>(reportList,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    
    @CrossOrigin
    @GetMapping("/getAllAvailableReport")
    public ResponseEntity<List<ReportEntity>>getAllAvailableReport(){
        try{
            List<ReportEntity> reportList = reportService.getAllAvailableReports();
            return new ResponseEntity<>(reportList,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @CrossOrigin
    @PutMapping("/deleteReport/{reportId}")
    public ResponseEntity<ReportEntity>deleteReport(@PathVariable int reportId){
        try{
            ReportEntity deletedReport = reportService.deleteReport(reportId);
            return new ResponseEntity<>(deletedReport,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @PutMapping("/retoreReport/{reportId}")
    public ResponseEntity<ReportEntity>restoreReport(@PathVariable int reportId){
        try{
            ReportEntity restoredReport = reportService.restoreReport(reportId);
            return new ResponseEntity<>(restoredReport,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @CrossOrigin
    @DeleteMapping("/deletedReportPermanently/{reportId}")
    public ResponseEntity<String>deleteReportPermanently(@PathVariable int reportId){
        try{
            reportService.deleteReportPermanently(reportId);
            return new ResponseEntity<>("Report deleted  successfully",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Deletion unsuccessful",HttpStatus.CONFLICT);
        }
    }
}
