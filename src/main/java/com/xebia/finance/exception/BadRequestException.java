package com.xebia.finance.exception;

/**
 * Thrown when business validation fails.
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

}