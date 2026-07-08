package com.xebia.finance.exception;

import java.time.LocalDateTime;

/**
 * Standard error response model returned by the Finance Service.
 *
 * Encapsulates API error details including timestamp, HTTP status,
 * error type, descriptive message and request path. This ensures
 * consistent error responses across all REST endpoints.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */

public record ApiError(

        LocalDateTime timestamp,

        int status,

        String error,

        String message,

        String path

) {
}