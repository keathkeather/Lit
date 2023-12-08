package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Entity.QuizAnsweredEntity;
import com.CSIT321.backend.Entity.QuizScoreEntity;
import com.CSIT321.backend.Service.QuizAnsweredService;

@RestController
@RequestMapping("/quizAnswered")
public class QuizAnsweredController {
    @Autowired
    QuizAnsweredService quizAnsweredService;

    @CrossOrigin
    @PutMapping("/addAnswered/{accountId}")
    public ResponseEntity<QuizAnsweredEntity> addAnswered(@PathVariable int accountId, @RequestBody QuizScoreEntity quizScore){
        try{
            QuizAnsweredEntity quizAnswered = quizAnsweredService.addQuizAnswered(accountId, quizScore);
            return new  ResponseEntity<>(quizAnswered, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @PutMapping("/removeAnswered/{accountId}")
    public ResponseEntity<String> removeAnswered(@PathVariable int accountId, @RequestParam int quizId){
        try{
            quizAnsweredService.removeQuizScore(accountId,quizId);
            return new ResponseEntity<>("Removed Quiz"+quizId, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error ",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
