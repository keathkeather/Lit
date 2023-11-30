package com.CSIT321.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Entity.BookEntity;
import com.CSIT321.backend.Service.BookService;

@RestController
@RequestMapping(value = "/book")
public class BookController {
    
    @Autowired
    BookService bookService;

    @PostMapping(value = "/create",consumes = "application/json;charset=UTF-8")
    public ResponseEntity<BookEntity> createBook(@RequestBody BookEntity book){
        try{
            BookEntity createdBook = bookService.createBook(book);
            return new ResponseEntity<>(createdBook , HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<BookEntity>> getAll(){
        List<BookEntity> result = bookService.getAllBooks();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PutMapping("/update/{bookId}")
    public ResponseEntity<BookEntity> updateBook(@PathVariable int bookId, @RequestBody BookEntity newBook){
        try{
            BookEntity updatedBook  = bookService.updateBook(bookId, newBook);
            return new ResponseEntity<>(updatedBook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @PutMapping("/delete/{bookId}")
    public ResponseEntity<BookEntity> deleteBook(@PathVariable int bookId){
        try{
            BookEntity deletedbook  = bookService.deleteBook(bookId);
            return new ResponseEntity<>(deletedbook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @PutMapping("/recover/{bookId}")
    public ResponseEntity<BookEntity> recoverBook(@PathVariable int bookId){
        try{
            BookEntity recoveredBook  = bookService.recoverBook(bookId);
            return new ResponseEntity<>(recoveredBook,HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }

    @DeleteMapping("/deletePermanently/{bookId}")
    public ResponseEntity<String> deleteBookPermanently(@PathVariable int bookId){
        try{
            bookService.deleteBookPermanently(bookId);
            return new ResponseEntity<>("bookdeleted",HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }



}
