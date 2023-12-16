package com.CSIT321.backend.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.BookEntity;
import com.CSIT321.backend.Entity.BookListEntity;
import com.CSIT321.backend.Repository.AccountRepository;
import com.CSIT321.backend.Repository.BookListRepository;
import com.CSIT321.backend.Repository.BookRepository;
import com.CSIT321.backend.Exceptions.AlreadyExistOnListException;
import javax.persistence.NoResultException;
import java.util.List;

@Service
public class BookListService {

    @Autowired
     BookListRepository bookListRepository;
    @Autowired
    BookRepository bookRepository;
    @Autowired
    AccountRepository accountRepository;
    //* this function creates an instance of a bookList */
    // @param bookList (BookListEntity) - the bookList to be created
    public BookListEntity createList(BookListEntity bookList) {
        return bookListRepository.save(bookList);
    }
    //* this function returns a list of all the booklist of all accounts */
    public List<BookListEntity> getAllAccountLists() {
        return bookListRepository.findAll();
    }
    //* this function returns a list of all the books in a booklist of an account */
    // @param accountId (int) - the id of the account
    public List<BookEntity> getAllBooksInList(int accountId) {
        AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
        BookListEntity bookList = bookListRepository.findByAccount(account).orElseThrow(() -> new NoResultException("BookList with accountId " + accountId + " does not exist"));
        return bookList.getBooks();
    }
    //* this function adds a book to a booklist of an account */
    // @param accountId (int) - the id of the account and bookId (int) - the id of the book
    public BookListEntity addBookToList(int accountId, int  bookId) {
        AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
        BookListEntity bookList = bookListRepository.findByAccount(account).orElseThrow(() -> new NoResultException("BookList with accountId " + accountId + " does not exist"));
    
        List<BookEntity> books = bookList.getBooks();
        BookEntity book  = bookRepository.findById(bookId).orElseThrow(() -> new NoResultException("Book " + bookId + " does not exist"));
       
        //* check if book already exists in the list */ 
        if (books.stream().anyMatch(b -> b.getBookId() == book.getBookId())) {
            throw new AlreadyExistOnListException("Book " + bookId + " already exists in the list");
        }
    
        books.add(book);
        bookList.setBooks(books);
    
        return bookListRepository.save(bookList);
    }

    public BookListEntity removeBookFromList(int accountId, int bookId) {
        AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new NoResultException("Account " + accountId + " does not exist"));
        BookListEntity bookList = bookListRepository.findByAccount(account).orElseThrow(() -> new NoResultException("BookList with accountId " + accountId + " does not exist"));

        List<BookEntity> books = bookList.getBooks();
        books.removeIf(book -> book.getBookId()==(bookId));
        bookList.setBooks(books);

        return bookListRepository.save(bookList);
    }
}
