package com.xebia.finance.invoice.dto;

import com.xebia.finance.invoice.entity.InvoiceStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for invoice response.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public class InvoiceResponse {

    private UUID id;
    private String invoiceNumber;
    private UUID contractId;
    private UUID organizationId;
    private String organizationName;

    @JsonFormat(pattern = "dd MMM yyyy")
    private LocalDate invoiceDate;

    @JsonFormat(pattern = "dd MMM yyyy")
    private LocalDate dueDate;

    private BigDecimal subtotal;
    private BigDecimal gstAmount;
    private BigDecimal discountAmount;
    private BigDecimal totalAmount;
    private String currency;

    @JsonFormat(pattern = "dd MMM yyyy")
    private LocalDate invoicePeriodFrom;

    @JsonFormat(pattern = "dd MMM yyyy")
    private LocalDate invoicePeriodTo;

    private String description;
    private InvoiceStatus status;

    @JsonFormat(pattern = "dd MMM yyyy HH:mm:ss")
    private LocalDateTime paidDate;

    private String paymentReference;

    @JsonFormat(pattern = "dd MMM yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "dd MMM yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public UUID getContractId() { return contractId; }
    public void setContractId(UUID contractId) { this.contractId = contractId; }

    public UUID getOrganizationId() { return organizationId; }
    public void setOrganizationId(UUID organizationId) { this.organizationId = organizationId; }

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

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public LocalDate getInvoicePeriodFrom() { return invoicePeriodFrom; }
    public void setInvoicePeriodFrom(LocalDate invoicePeriodFrom) { this.invoicePeriodFrom = invoicePeriodFrom; }

    public LocalDate getInvoicePeriodTo() { return invoicePeriodTo; }
    public void setInvoicePeriodTo(LocalDate invoicePeriodTo) { this.invoicePeriodTo = invoicePeriodTo; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public InvoiceStatus getStatus() { return status; }
    public void setStatus(InvoiceStatus status) { this.status = status; }

    public LocalDateTime getPaidDate() { return paidDate; }
    public void setPaidDate(LocalDateTime paidDate) { this.paidDate = paidDate; }

    public String getPaymentReference() { return paymentReference; }
    public void setPaymentReference(String paymentReference) { this.paymentReference = paymentReference; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
