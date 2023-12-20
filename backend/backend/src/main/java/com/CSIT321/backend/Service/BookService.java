package com.CSIT321.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.EntityNotFoundException;

import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.AchievementRepository;
import com.CSIT321.backend.Repository.BookRepository;
import com.CSIT321.backend.Repository.QuizRepository;
import com.CSIT321.backend.Entity.BookEntity;
import com.CSIT321.backend.Entity.QuizEntity;
import com.CSIT321.backend.Exceptions.UnauthorizedAccountException;
import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AchievementEntity;
@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    QuizRepository quizRepository;
    @Autowired
    AchievementRepository achievementRepository;
    @Autowired
    AccountRepository accountRepository;
    public BookEntity createBook(BookEntity book) {
        try{
            AccountEntity account = accountRepository.findById(book.getAuthor().getAccountId()).orElseThrow(() -> new NoSuchElementException("Account " +book.getAuthor().getAccountId() + " does not exist"));;
            if(account.getRole().getRole_id()==2){
                return bookRepository.save(book);
            }else{
                throw new UnauthorizedAccountException("Account "+account.getAccountId() + "Is not authorized to create a book" );
            }
        }catch(Exception e){
            throw e;
        }
        

    }

    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll();
    }

    public BookEntity getBookById(int bid) {
        return bookRepository.findById(bid)
                .orElseThrow(() -> new NoSuchElementException("book " + bid + " does not exist"));
    }
    public List<BookEntity>getAllAvailableBooks(){
        return bookRepository.findByIsDeleted(false).get();
    }

    public List<BookEntity>getAllBookByAuthor(int accountId){
        try{
            AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoSuchElementException("Account " +accountId + " does not exist"));;
            List<BookEntity> publishedBooks = bookRepository.findByAuthor(account).get();
            return publishedBooks;
        }catch(Exception e){
            throw e;
        }
    }
    public int getBookCountByAuthor(int accountId){
        try{
            AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoSuchElementException("Account " +accountId + " does not exist"));;
            List<BookEntity> publishedBooks = bookRepository.findByAuthor(account).get();
            return publishedBooks.size();
        }catch(Exception e){
            throw e;
        }
    }


    public BookEntity updateBook(int bookId, BookEntity newbook) {
        try {
            BookEntity book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.setBookName(newbook.getBookName());
            book.setBookDescription(newbook.getBookDescription());
            book.setAuthor(newbook.getAuthor());
            book.setGenre(newbook.getGenre());
            book.setAchievement(newbook.getAchievement());
            book.setQuiz(newbook.getQuiz());
            return bookRepository.save(book);
        } catch (Exception e) {
            throw e;
        }
    }

    public BookEntity deleteBook(int bookId) {
        try {
            BookEntity book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.delete();
            return bookRepository.save(book);
        } catch (Exception e) {
            throw e;
        }
    }

    public BookEntity recoverBook(int bookId) {
        try {
            BookEntity book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            book.recover();
            return bookRepository.save(book);
        } catch (Exception e) {
            throw e;
        }
    }

    public void deleteBookPermanently(int bookId) {
        try {
            bookRepository.findById(bookId)
                    .orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            bookRepository.deleteById(bookId);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<QuizEntity> getQuiz(int bookId) {
        try {
            BookEntity book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            return book.getQuiz();
        } catch (Exception e) {
            throw e;
        }
    }
    public List<AchievementEntity> getAchievements(int bookId) {
        try {
            BookEntity book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new EntityNotFoundException("book " + bookId + " does not exist"));
            return book.getAchievement();
        } catch (Exception e) {
            throw e;
        }
    }

}
