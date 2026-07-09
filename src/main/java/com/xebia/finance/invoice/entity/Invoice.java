package com.xebia.finance.invoice.entity;

import com.xebia.finance.common.entity.BaseEntity;
import com.xebia.finance.contract.entity.Contract;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity representing an invoice generated for a contract.
 *
 * Invoices are created based on billing rules and represent
 * the amount due from an organization for contract services.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "invoice_number", nullable = false, unique = true, length = 50)
    private String invoiceNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Column(name = "organization_name", nullable = false, length = 255)
    private String organizationName;

    @Column(name = "invoice_date", nullable = false)
    private LocalDate invoiceDate;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "subtotal", nullable = false, precision = 15, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "gst_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal gstAmount;

    @Column(name = "discount_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "total_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false, length = 10)
    private String currency;

    @Column(name = "invoice_period_from", nullable = false)
    private LocalDate invoicePeriodFrom;

    @Column(name = "invoice_period_to", nullable = false)
    private LocalDate invoicePeriodTo;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private InvoiceStatus status;

    @Column(name = "paid_date")
    private LocalDateTime paidDate;

    @Column(name = "payment_reference", length = 100)
    private String paymentReference;

}
