package com.CSIT321.backend.Exceptions;
public class AlreadyProcessedRequestException extends RuntimeException {
    public AlreadyProcessedRequestException(String message) {
        super(message);
    }
}
