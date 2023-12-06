package com.CSIT321.backend.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
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

    private String requestStatus;

    public AuthorRequestEntity() {
        super();
        this.requestStatus = "pending";
    }

    public AuthorRequestEntity(AccountEntity account, String request, String portfolioLink) {
        this.account = account;
        this.request = request;
        this.portfolioLink = portfolioLink;
        this.requestStatus = "pending"; 
    }
    

    public int getAuthorReqId() {
        return authorReqId;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getPortfolioLink() {
        return portfolioLink;
    }

    public void setPortfolioLink(String portfolioLink) {
        this.portfolioLink = portfolioLink;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }
}
