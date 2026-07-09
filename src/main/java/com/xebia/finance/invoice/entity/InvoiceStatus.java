package com.xebia.finance.invoice.entity;

/**
 * Enum representing the status of an invoice.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public enum InvoiceStatus {
    DRAFT,
    SENT,
    VIEWED,
    PARTIALLY_PAID,
    PAID,
    OVERDUE,
    CANCELLED
}
