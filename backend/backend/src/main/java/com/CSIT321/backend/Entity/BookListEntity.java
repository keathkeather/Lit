package com.CSIT321.backend.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Table(name = "booklist")
@Entity
public class BookListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookListId;

    @OneToOne
    @JoinColumn(name = "account_id")
    @JsonBackReference
    private AccountEntity account;

    @JsonIgnore
    @OneToMany( orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "book_list_id")
    private List<BookEntity> books;




    public BookListEntity() {
        super();
    }
    public BookListEntity(AccountEntity account) {
        this.account = account;
    }

    public BookListEntity(AccountEntity account, List<BookEntity> books) {
        this.account = account;
        this.books = books;
    }
    public void addBook(BookEntity book) {
        if (book != null) {
            books.add(book);
        }
    }

    public void removeBook(BookEntity book) {
        if (book != null) {
            books.remove(book);
        }
    }

    public AccountEntity getAccount() {
        return this.account;
    }

    public List<BookEntity> getBooks() {
        return this.books;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public void setBooks(List<BookEntity> books) {
        this.books = books;
    }
}
