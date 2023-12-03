package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import com.CSIT321.backend.Repository.AchievementRepository;
import com.CSIT321.backend.Repository.BookRepository;
import com.CSIT321.backend.Repository.QuizRepository;
import com.CSIT321.backend.Entity.BookEntity;
@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    QuizRepository quizRepository;
    @Autowired
    AchievementRepository achievementRepository;

    public BookEntity createBook(BookEntity book) {

        return bookRepository.save(book);

       
    }
    public List<BookEntity> getAllBooks(){
        return bookRepository.findAll();
    }

    public  BookEntity updateBook(int bookId, BookEntity newbook){
        try{
            BookEntity  book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.setBookName(newbook.getBookName());
            book.setBookDescription(newbook.getBookDescription());
            book.setAuthor(newbook.getAuthor());
            book.setGenre(newbook.getGenre());
            book.setAchievement(newbook.getAchievement());
            book.setQuiz(newbook.getQuiz());
            return bookRepository.save(book);
        }catch(DataAccessException e){
            throw e;
        }
    }
    public BookEntity deleteBook(int bookId){
        try{
            BookEntity  book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.delete();
            return bookRepository.save(book);
        }catch(DataAccessException e){
            throw e;
        }
    }
    public BookEntity recoverBook(int bookId){
        try{
            BookEntity  book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.recover();
            return bookRepository.save(book);
        }catch(DataAccessException e){
            throw e;
        }
    }

    public void deleteBookPermanently(int bookId){    
        try{
            bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            bookRepository.deleteById(bookId);
        }catch(DataAccessException e){
            throw e;
        }
    }
    public BookEntity approveBook(int bookId){
        try{
            BookEntity book =bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.approve();
            return book;
        }catch(DataAccessException e){
            throw e;
        }
    }
    public BookEntity dissapproveBook(int bookId){
        try{
            BookEntity book =bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.disapprove();
            return book;
        }catch(DataAccessException e){
            throw e;
        }
    }

    
    
}
