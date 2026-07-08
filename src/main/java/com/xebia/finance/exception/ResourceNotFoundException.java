package com.xebia.finance.exception;

/**
 * Exception thrown when a requested resource cannot be found.
 *
 * Used whenever an entity such as a Contract or Billing Rule
 * does not exist for the supplied identifier.
 * Typically results in an HTTP 404 (Not Found) response.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

}