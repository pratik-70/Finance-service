package com.xebia.finance.invoice.dto;

import com.xebia.finance.invoice.entity.InvoiceStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for updating an existing invoice.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public class UpdateInvoiceRequest {

    @Size(min = 3, max = 50)
    private String invoiceNumber;

    @Size(max = 255)
    private String organizationName;

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    @DecimalMin("0.0")
    private BigDecimal subtotal;

    @DecimalMin("0.0")
    private BigDecimal gstAmount;

    @DecimalMin("0.0")
    private BigDecimal discountAmount;

    @DecimalMin("0.0")
    private BigDecimal totalAmount;

    private LocalDate invoicePeriodFrom;

    private LocalDate invoicePeriodTo;

    private String description;

    private InvoiceStatus status;

    private String paymentReference;

    // Getters and Setters
    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }

    public LocalDate getInvoiceDate() { return invoiceDate; }
    public void setInvoiceDate(LocalDate invoiceDate) { this.invoiceDate = invoiceDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getGstAmount() { return gstAmount; }
    public void setGstAmount(BigDecimal gstAmount) { this.gstAmount = gstAmount; }

    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public LocalDate getInvoicePeriodFrom() { return invoicePeriodFrom; }
    public void setInvoicePeriodFrom(LocalDate invoicePeriodFrom) { this.invoicePeriodFrom = invoicePeriodFrom; }

    public LocalDate getInvoicePeriodTo() { return invoicePeriodTo; }
    public void setInvoicePeriodTo(LocalDate invoicePeriodTo) { this.invoicePeriodTo = invoicePeriodTo; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public InvoiceStatus getStatus() { return status; }
    public void setStatus(InvoiceStatus status) { this.status = status; }

    public String getPaymentReference() { return paymentReference; }
    public void setPaymentReference(String paymentReference) { this.paymentReference = paymentReference; }
}
