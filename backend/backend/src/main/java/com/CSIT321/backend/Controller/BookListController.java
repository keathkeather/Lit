package com.CSIT321.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Service.BookListService;
import com.CSIT321.backend.Entity.BookEntity;
import com.CSIT321.backend.Entity.BookListEntity;
import com.CSIT321.backend.Exceptions.AlreadyExistOnListException;

@RestController
@RequestMapping("/booklist")
public class BookListController {

    @Autowired
    BookListService bookListService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<BookListEntity> createBookList(@RequestBody BookListEntity list) {
        try {
            BookListEntity createdList = bookListService.createList(list);
            return new ResponseEntity<>(createdList, HttpStatus.CREATED);
        } catch (Exception e) {
            throw e;
        }
    }
    @CrossOrigin
    @PostMapping("/addBook/{accountId}")
    public ResponseEntity<BookListEntity> addBookToList(@PathVariable int accountId, @RequestParam int bookId){
        try{
            BookListEntity bookList = bookListService.addBookToList(accountId, bookId);
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @GetMapping("/getAllBookInList/{accountId}")
    public ResponseEntity<List<BookEntity>> getAllBooksInList(@PathVariable int accountId){
        try{
            List<BookEntity> bookList = bookListService.getAllBooksInList(accountId);
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
    @CrossOrigin
    @PutMapping("/addBook/{accountId}")
    public ResponseEntity<BookListEntity> addBooktoList(@PathVariable int accountId, @RequestParam int bookId){
        try{
            BookListEntity bookList = bookListService.addBookToList(accountId, bookId);
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }catch(AlreadyExistOnListException e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PutMapping("/removeBook/{accountId}")
    public ResponseEntity<BookListEntity> removeBookfromList(@PathVariable int accountId, @RequestParam int bookId){
        try{
            BookListEntity bookList = bookListService.removeBookFromList(accountId, bookId);
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }catch(Exception e){
            throw e;
        }
    }
}