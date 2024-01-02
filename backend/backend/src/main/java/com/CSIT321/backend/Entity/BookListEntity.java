package com.CSIT321.backend.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "booklist")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookListId;

    @OneToOne
    @JoinColumn(name = "account_id")
    @JsonBackReference
    private AccountEntity account;

    @ManyToMany
    @JoinTable(
      name = "booklist_book", 
      joinColumns = @JoinColumn(name = "booklist_id"), 
      inverseJoinColumns = @JoinColumn(name = "book_id"))
    private List<BookEntity> book;
}
