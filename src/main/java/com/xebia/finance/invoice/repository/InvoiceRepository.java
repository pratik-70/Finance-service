package com.xebia.finance.invoice.repository;

import com.xebia.finance.invoice.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for Invoice entity.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    /**
     * Find invoices by contract ID.
     */
    List<Invoice> findByContractId(UUID contractId);

    /**
     * Find invoices by organization ID.
     */
    List<Invoice> findByOrganizationId(UUID organizationId);

    /**
     * Find invoice by invoice number.
     */
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

    /**
     * Find invoices by organization name (partial match).
     */
    List<Invoice> findByOrganizationNameContainingIgnoreCase(String organizationName);
}
