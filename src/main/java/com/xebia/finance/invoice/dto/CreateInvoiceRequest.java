package com.xebia.finance.invoice.dto;

import com.xebia.finance.invoice.entity.InvoiceStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for creating a new invoice.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public class CreateInvoiceRequest {

    @NotNull(message = "Invoice number is required")
    @NotBlank(message = "Invoice number cannot be blank")
    @Size(min = 3, max = 50)
    private String invoiceNumber;

    @NotNull(message = "Contract ID is required")
    private UUID contractId;

    @NotNull(message = "Organization ID is required")
    private UUID organizationId;

    @NotBlank(message = "Organization name is required")
    @Size(max = 255)
    private String organizationName;

    @NotNull(message = "Invoice date is required")
    private LocalDate invoiceDate;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotNull(message = "Subtotal is required")
    @DecimalMin("0.0")
    private BigDecimal subtotal;

    @NotNull(message = "GST amount is required")
    @DecimalMin("0.0")
    private BigDecimal gstAmount;

    @NotNull(message = "Discount amount is required")
    @DecimalMin("0.0")
    private BigDecimal discountAmount;

    @NotNull(message = "Total amount is required")
    @DecimalMin("0.0")
    private BigDecimal totalAmount;

    @NotBlank(message = "Currency is required")
    @Size(min = 2, max = 10)
    private String currency;

    @NotNull(message = "Invoice period from date is required")
    private LocalDate invoicePeriodFrom;

    @NotNull(message = "Invoice period to date is required")
    private LocalDate invoicePeriodTo;

    private String description;

    @NotNull(message = "Invoice status is required")
    private InvoiceStatus status;

    // Getters and Setters
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
}
