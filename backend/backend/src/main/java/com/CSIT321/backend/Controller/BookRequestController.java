package com.CSIT321.backend.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.CSIT321.backend.Entity.BookRequestEntity;
import com.CSIT321.backend.Exceptions.UnauthorizedAccountException;
import com.CSIT321.backend.Service.BookRequestService;
import com.CSIT321.backend.Exceptions.AlreadyProcessedRequestException;
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
import java.util.List;

import javax.persistence.NoResultException;

@RestController
@RequestMapping("/bookRequest")
public class BookRequestController {
    @Autowired
    BookRequestService bookRequestService;
    
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<BookRequestEntity> createBookRequest(@RequestBody BookRequestEntity bookRequestEntity){
        try{
            BookRequestEntity request = bookRequestService.createRequest(bookRequestEntity);
            return new ResponseEntity<>(request, HttpStatus.OK);


        }catch(UnauthorizedAccountException e){
           return new  ResponseEntity <>(HttpStatus.UNAUTHORIZED);
        }
        catch(Exception e){
            return new  ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<BookRequestEntity>> getAllBookRequest(){
        try{
            List<BookRequestEntity> request = bookRequestService.getALlBookRequest();
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(Exception e){
            return new  ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @GetMapping("/pending")
    public ResponseEntity<List<BookRequestEntity>> getAllPendingBookRequest(){
        try{
            List<BookRequestEntity> request = bookRequestService.getAllPendingBookRequest();
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new  ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @CrossOrigin
    @GetMapping("/perAccount/{accountId}")
    public ResponseEntity<List<BookRequestEntity>> getBookRequestPerAccount(@PathVariable int accountId){
        try{
            List<BookRequestEntity> request = bookRequestService.getAllRequestPerAccount(accountId);
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(NoResultException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @GetMapping("/perBookRequest/{bookRequestId}")
    public ResponseEntity<BookRequestEntity> getBookRequest(@PathVariable int bookRequestId){
        try{
            BookRequestEntity request = bookRequestService.getBookRequest(bookRequestId);
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(NoResultException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PutMapping("/approveRequest/{bookRequestId}")
    public ResponseEntity<BookRequestEntity> approveRequest(@PathVariable int bookRequestId){
        try{
            BookRequestEntity request = bookRequestService.approveBookRequest(bookRequestId);
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(NoResultException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }catch(AlreadyProcessedRequestException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PutMapping("/denyRequest/{bookRequestId}")
    public ResponseEntity<BookRequestEntity> denyRequest(@PathVariable int bookRequestId){
        try{
            BookRequestEntity request = bookRequestService.denyBookRequest(bookRequestId);
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(NoResultException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }catch(AlreadyProcessedRequestException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @DeleteMapping("/delete/{bookRequestId}")
    public ResponseEntity<String> deleteBookRequest(@PathVariable int bookRequestId){
        try{
            bookRequestService.deleteBookRequest(bookRequestId);
            return new ResponseEntity<>("Book request" + bookRequestId+" deleted succesfully", HttpStatus.OK);
        }catch(NoResultException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
