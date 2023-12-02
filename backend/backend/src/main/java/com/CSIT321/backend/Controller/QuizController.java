package com.CSIT321.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.CSIT321.backend.Entity.QuizEntity;
import com.CSIT321.backend.Service.QuizServices;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizServices quizServices;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<QuizEntity> createQuiz(@RequestBody QuizEntity quiz) {
        QuizEntity createdQuiz = quizServices.createQuiz(quiz);
        return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<QuizEntity>> getAllQuizzes() {
        List<QuizEntity> quizzes = quizServices.getAllQuizzes();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/{quizId}")
    public ResponseEntity<QuizEntity> getQuizById(@PathVariable int quizId) {
        QuizEntity quiz = quizServices.getQuizById(quizId);
        if (quiz != null) {
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @PutMapping("/update/{quizId}")
    public ResponseEntity<QuizEntity> updateQuiz(@PathVariable int quizId, @RequestBody QuizEntity newQuiz) {
        QuizEntity updatedQuiz = quizServices.updateQuiz(quizId, newQuiz);
        if (updatedQuiz != null) {
            return new ResponseEntity<>(updatedQuiz, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @DeleteMapping("/delete/{quizId}")
    public String deleteQuiz(@PathVariable int quizId) {
        return quizServices.deleteQuiz(quizId);
    }

}
