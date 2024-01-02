package com.CSIT321.backend.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "book")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "bookId")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;
    @Column(name = "bookName")
    private String bookName;

    @Column(name = "bookDescription")
    private String bookDescription;

    @Column(name = "genre")
    private String genre;

    @ManyToOne
    @JoinColumn(name = "author")
    AccountEntity author;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizEntity> quiz;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)   
    private List<AchievementEntity> achievement;

    @JsonIgnore
    @ManyToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookListEntity> bookList;
    
    @Builder.Default
    private boolean isDeleted = false;

    
}
