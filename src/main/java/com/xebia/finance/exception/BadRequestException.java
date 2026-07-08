package com.xebia.finance.exception;

/**
 * Exception thrown when a client submits an invalid request that
 * violates business rules or input validation constraints.
 *
 * Typically results in an HTTP 400 (Bad Request) response.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

}