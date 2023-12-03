package com.CSIT321.backend.Controller;

import java.util.ArrayList;
import java.util.List;

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
import com.CSIT321.backend.Exceptions.UnauthorizedAccountException;
import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.BookEntity;
import com.CSIT321.backend.Entity.QuizEntity;
import com.CSIT321.backend.Entity.DTO.QuizDTO;
import com.CSIT321.backend.Service.BookService;
import com.CSIT321.backend.Service.AccountService;

@RestController
@RequestMapping(value = "/book")
public class BookController {
    
    @Autowired
    BookService bookService;
    
    @Autowired
    AccountService accountService;

    @CrossOrigin
    @PostMapping(value = "/create", consumes = "application/json;charset=UTF-8")
    public ResponseEntity<BookEntity> createBook(@RequestBody BookEntity book) {
        try {
            AccountEntity account = accountService.getAccountById(book.getAuthor().getAccountId());
            if (account.getRole().getRole_id() == 2) {
                
                BookEntity createdBook = bookService.createBook(book);
                return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
            }else{
                throw new UnauthorizedAccountException("User is not authorized for book creation");
            }
        } catch (UnauthorizedAccountException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); 
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<BookEntity>> getAll(){
        List<BookEntity> result = bookService.getAllBooks();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/update/{bookId}")
    public ResponseEntity<BookEntity> updateBook(@PathVariable int bookId, @RequestBody BookEntity newBook){
        try{
            BookEntity updatedBook  = bookService.updateBook(bookId, newBook);
            return new ResponseEntity<>(updatedBook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/delete/{bookId}")
    public ResponseEntity<BookEntity> deleteBook(@PathVariable int bookId){
        try{
            BookEntity deletedbook  = bookService.deleteBook(bookId);
            return new ResponseEntity<>(deletedbook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/recover/{bookId}")
    public ResponseEntity<BookEntity> recoverBook(@PathVariable int bookId){
        try{
            BookEntity recoveredBook  = bookService.recoverBook(bookId);
            return new ResponseEntity<>(recoveredBook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @DeleteMapping("/deletePermanently/{bookId}")
    public ResponseEntity<String> deleteBookPermanently(@PathVariable int bookId){
        try{
            bookService.deleteBookPermanently(bookId);
            return new ResponseEntity<>("bookdeleted",HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/approveBook/{bookId}")
    public ResponseEntity<BookEntity> approveBook(@PathVariable int bookId){
        try{
            BookEntity approvedBook = bookService.approveBook(bookId);
            return new ResponseEntity<>(approvedBook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/dissapprove/{bookId}")
    public ResponseEntity<BookEntity> disapproveBook(@PathVariable int bookId){
        try{
            BookEntity approvedBook = bookService.dissapproveBook(bookId);
            return new ResponseEntity<>(approvedBook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @GetMapping("/getQuiz/{bookId}")
    public ResponseEntity<List<QuizDTO>> getQuizPerBook(@PathVariable int bookId) {
        try {
            List<QuizEntity> quizzes = bookService.getQuiz(bookId);
            List<QuizDTO> quizDTOs = new ArrayList<>();

            for (QuizEntity quiz : quizzes) {
                QuizDTO quizDTO = new QuizDTO(
                    quiz.getQuizId(),
                    quiz.getQuizName(),
                    quiz.getQuestions(),  
                    quiz.getPerfectScore()
                );
                quizDTOs.add(quizDTO);
            }

            return new ResponseEntity<>(quizDTOs, HttpStatus.OK);
        } catch (Exception e) {
            throw e;
        }
    }

}
