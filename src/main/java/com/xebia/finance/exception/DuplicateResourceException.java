package com.xebia.finance.exception;

/**
 * Thrown when attempting to create a duplicate resource.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }

}