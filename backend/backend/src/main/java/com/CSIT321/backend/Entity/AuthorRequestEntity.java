package com.CSIT321.backend.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "author_req")
public class AuthorRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authorReqId;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccountEntity account;
    
    @Column(columnDefinition = "TEXT")
    private String request;

    private String portfolioLink;

    @Builder.Default
    private String requestStatus="pending";


}
