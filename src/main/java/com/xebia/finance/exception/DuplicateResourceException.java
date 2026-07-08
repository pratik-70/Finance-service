package com.xebia.finance.exception;

/**
 * Exception thrown when attempting to create a resource that
 * already exists in the system.
 *
 * Used to prevent duplicate business entities such as contracts,
 * billing rules or other uniquely constrained resources.
 * Typically results in an HTTP 409 (Conflict) response.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }

}