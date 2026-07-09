package com.xebia.finance.invoice.controller;

import com.xebia.finance.invoice.dto.CreateInvoiceRequest;
import com.xebia.finance.invoice.dto.InvoiceResponse;
import com.xebia.finance.invoice.dto.UpdateInvoiceRequest;
import com.xebia.finance.invoice.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST Controller for Invoice Management.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@RestController
@RequestMapping("/api/v1/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    /**
     * Create a new invoice.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InvoiceResponse createInvoice(
            @Valid @RequestBody CreateInvoiceRequest request) {

        return invoiceService.createInvoice(request);
    }

    /**
     * Get all invoices.
     */
    @GetMapping
    public List<InvoiceResponse> getAllInvoices() {

        return invoiceService.getAllInvoices();
    }

    /**
     * Get invoice by ID.
     */
    @GetMapping("/{id}")
    public InvoiceResponse getInvoiceById(
            @PathVariable UUID id) {

        return invoiceService.getInvoiceById(id);
    }

    /**
     * Get invoices by contract ID.
     */
    @GetMapping("/contract/{contractId}")
    public List<InvoiceResponse> getInvoicesByContractId(
            @PathVariable UUID contractId) {

        return invoiceService.getInvoicesByContractId(contractId);
    }

    /**
     * Get invoices by organization ID.
     */
    @GetMapping("/organization/{organizationId}")
    public List<InvoiceResponse> getInvoicesByOrganizationId(
            @PathVariable UUID organizationId) {

        return invoiceService.getInvoicesByOrganizationId(organizationId);
    }

    /**
     * Search invoices.
     */
    @GetMapping("/search")
    public List<InvoiceResponse> searchInvoices(
            @RequestParam String query) {

        return invoiceService.searchInvoices(query);
    }

    /**
     * Update an existing invoice.
     */
    @PutMapping("/{id}")
    public InvoiceResponse updateInvoice(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateInvoiceRequest request) {

        return invoiceService.updateInvoice(id, request);
    }

    /**
     * Delete invoice.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInvoice(
            @PathVariable UUID id) {

        invoiceService.deleteInvoice(id);
    }
}
