package com.CSIT321.backend.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookRequestEntity {
    //* primary key */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookRequestId;

    //* Connects the account to this table  with a Many to one relationship */
    @ManyToOne
    @JoinColumn(name = "accoutId")
    private AccountEntity account;

    //* information about the book
    private String bookName;
    private String bookDescription;
    private String genre;
    @Builder.Default
    private String status = "Pending";

    
   

}
