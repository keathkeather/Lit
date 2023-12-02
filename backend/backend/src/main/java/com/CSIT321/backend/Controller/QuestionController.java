package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.CSIT321.backend.Entity.QuestionEntity;
import com.CSIT321.backend.Service.QuestionService;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionServices;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<QuestionEntity> createQuestion(@RequestBody QuestionEntity question) {
        QuestionEntity createdQuestion = questionServices.createQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<QuestionEntity>> getAllQuestions() {
        List<QuestionEntity> questions = questionServices.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionEntity> getQuestionById(@PathVariable int questionId) {
        QuestionEntity question = questionServices.getQuestionById(questionId);
        if (question != null) {
            return new ResponseEntity<>(question, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @PutMapping("/update/{questionId}")
    public ResponseEntity<QuestionEntity> updateQuestion(
            @PathVariable int questionId, @RequestBody QuestionEntity newQuestion) {QuestionEntity updatedQuestion = questionServices.updateQuestion(questionId, newQuestion);
        if (updatedQuestion != null) {
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
