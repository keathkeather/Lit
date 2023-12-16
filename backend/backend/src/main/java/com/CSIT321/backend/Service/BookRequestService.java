package com.CSIT321.backend.Service;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CSIT321.backend.Entity.BookEntity;
import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.BookRequestEntity;
import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.BookRepository;
import com.CSIT321.backend.Repository.BookRequestRepository;
import com.CSIT321.backend.Exceptions.AlreadyProcessedRequestException;
import com.CSIT321.backend.Exceptions.UnauthorizedAccountException;
import java.util.List;
@Service
public class BookRequestService {
    @Autowired
    BookRequestRepository bookRequestRepository;
    
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    BookRepository bookRepository;
    // @param for this is is a BookRequest object called bookRequest   @param/
    //* creates a new BookRequest object and saves it on the db */
    public BookRequestEntity createRequest(BookRequestEntity bookRequest){
        try{
            AccountEntity author = accountRepository.findById(bookRequest.getAuthor().getAccountId())
                    .orElseThrow(() -> new NoResultException("Account " + bookRequest.getAuthor().getAccountId() + " does not exist"));
            if( author.getRole().getRole_id()== 2){
                return bookRequestRepository.save(bookRequest);
            
            }else{
                throw new UnauthorizedAccountException("Account "+author.getAccountId() + "Is not authorized to create a book" );
            }  
        }
        catch(Exception e){
            throw e;
        }
    }
    //* returns all request in a list */
    public List<BookRequestEntity> getALlBookRequest(){
        return bookRequestRepository.findAll();
    }
    
    //* returns all request of an author in a list */
    //@param for this is the author's accountId  @param/
    public List<BookRequestEntity> getAllRequestPerAccount(int accountId){
        try{
            AccountEntity author = accountRepository.findById(accountId)
                    .orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
            List<BookRequestEntity> bookRequestList =  bookRequestRepository.findByAccount(author).get();
            return bookRequestList; 
        }catch(Exception e){
            throw e;
        }
    }
    
    //*returns the bookRequest */
    //@param for this is the bookRequestId @param/
    public BookRequestEntity getBookRequest(int bookRequestId){
        try{
            BookRequestEntity request = bookRequestRepository.findById(bookRequestId)
                    .orElseThrow(() -> new NoResultException("Book Creation Request "  + bookRequestId + " does not exist"));
            return request;
        }catch(Exception e){
            throw e;
        }
    }
    public List<BookRequestEntity> getAllPendingBookRequest(){
            try{
                List<BookRequestEntity> requestList = bookRequestRepository.findByStatus("Pending").get();
                return requestList;     
            }catch(Exception e){
                throw e;
            }
    }




    // @param for this is is the bookRequestId @param/
    //* approves the bookRequest then creates a new book in the process */ 
    public BookRequestEntity approveBookRequest(int bookRequestId){
        try{
            BookRequestEntity request = bookRequestRepository.findById(bookRequestId)
                    .orElseThrow(() -> new NoResultException("Book Creation Request "  + bookRequestId + " does not exist"));

            if("Pending".equals(request.getStatus())){
                request.approve();//* changes the status of the request to Approved */
                BookEntity book = new BookEntity(   
                    request.getAuthor(),
                    request.getBookName(),
                    request.getBookDescription(),
                    request.getGenre()
                );
                bookRepository.save(book); //* saves the newsly created book  */
                return bookRequestRepository.save(request);
            }else{
                throw new AlreadyProcessedRequestException("Book Creation Request "  + bookRequestId + " is already processed");
            }
        }catch(Exception e){
            throw e;
        }
    }

    // * would be nice if comments were added why the book creation was denied will need to incure notifications system for it */
    // @param for this is is the bookRequestId @param/
    //* denies a bookRequest */ 
    public BookRequestEntity denyBookRequest(int bookRequestId){
        try{
            BookRequestEntity request = bookRequestRepository.findById(bookRequestId)
                    .orElseThrow(() -> new NoResultException("Book Creation Request "  + bookRequestId + " does not exist"));

            if("Pending".equals(request.getStatus())){
                request.reject();//* changes the status of the request to Rejected */
                return bookRequestRepository.save(request);
            }else{
                throw new AlreadyProcessedRequestException("Book Creation Request "  + bookRequestId + " is already processed");
            }
            
        }catch(Exception e){
            throw e;
        }  
    }
    // @param for this is is the bookRequestId @param/
    //* permanently deletes a bookRequest */
    public void deleteBookRequest(int bookRequestId){   
        try{
            BookRequestEntity request = bookRequestRepository.findById(bookRequestId)
                                    .orElseThrow(() -> new NoResultException("Book Creation Request "  + bookRequestId + " does not exist"));
            bookRequestRepository.delete(request);
        }catch(Exception e){
            throw e;
        }
    }

}
