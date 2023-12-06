package com.CSIT321.backend.Exceptions;
public class AlreadyAuthorizedAccountException extends RuntimeException {
    public AlreadyAuthorizedAccountException(String message) {
        super(message);
    }
}
