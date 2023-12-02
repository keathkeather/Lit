package com.CSIT321.backend.Exceptions;
public class UnauthorizedAccountException extends RuntimeException {
    public UnauthorizedAccountException(String message) {
        super(message);
    }
}
