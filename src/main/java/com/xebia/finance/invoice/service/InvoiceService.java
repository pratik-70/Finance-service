package com.xebia.finance.invoice.service;

import com.xebia.finance.invoice.dto.CreateInvoiceRequest;
import com.xebia.finance.invoice.dto.InvoiceResponse;
import com.xebia.finance.invoice.dto.UpdateInvoiceRequest;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for invoice operations.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public interface InvoiceService {

    /**
     * Create a new invoice.
     */
    InvoiceResponse createInvoice(CreateInvoiceRequest request);

    /**
     * Get all invoices.
     */
    List<InvoiceResponse> getAllInvoices();

    /**
     * Get invoice by ID.
     */
    InvoiceResponse getInvoiceById(UUID id);

    /**
     * Get invoices by contract ID.
     */
    List<InvoiceResponse> getInvoicesByContractId(UUID contractId);

    /**
     * Get invoices by organization ID.
     */
    List<InvoiceResponse> getInvoicesByOrganizationId(UUID organizationId);

    /**
     * Update an existing invoice.
     */
    InvoiceResponse updateInvoice(UUID id, UpdateInvoiceRequest request);

    /**
     * Delete an invoice.
     */
    void deleteInvoice(UUID id);

    /**
     * Search invoices by invoice number, organization name, or other criteria.
     */
    List<InvoiceResponse> searchInvoices(String query);
}
