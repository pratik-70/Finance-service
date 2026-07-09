package com.xebia.finance.invoice.service;

import com.xebia.finance.invoice.dto.CreateInvoiceRequest;
import com.xebia.finance.invoice.dto.InvoiceResponse;
import com.xebia.finance.invoice.dto.UpdateInvoiceRequest;
import com.xebia.finance.invoice.entity.Invoice;
import com.xebia.finance.invoice.mapper.InvoiceMapper;
import com.xebia.finance.invoice.repository.InvoiceRepository;
import com.xebia.finance.contract.repository.ContractRepository;
import com.xebia.finance.contract.entity.Contract;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementation of InvoiceService.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ContractRepository contractRepository;
    private final InvoiceMapper invoiceMapper;

    @Override
    public InvoiceResponse createInvoice(CreateInvoiceRequest request) {
        log.info("Creating new invoice: {}", request.getInvoiceNumber());

        // Get contract
        Contract contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new RuntimeException("Contract not found"));

        // Create invoice
        Invoice invoice = invoiceMapper.toEntity(request);
        invoice.setContract(contract);

        Invoice savedInvoice = invoiceRepository.save(invoice);
        log.info("Invoice created with ID: {}", savedInvoice.getId());

        return invoiceMapper.toResponse(savedInvoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> getAllInvoices() {
        log.info("Fetching all invoices");
        return invoiceRepository.findAll().stream()
                .map(invoiceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceResponse getInvoiceById(UUID id) {
        log.info("Fetching invoice by ID: {}", id);
        return invoiceRepository.findById(id)
                .map(invoiceMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> getInvoicesByContractId(UUID contractId) {
        log.info("Fetching invoices for contract ID: {}", contractId);
        return invoiceRepository.findByContractId(contractId).stream()
                .map(invoiceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> getInvoicesByOrganizationId(UUID organizationId) {
        log.info("Fetching invoices for organization ID: {}", organizationId);
        return invoiceRepository.findByOrganizationId(organizationId).stream()
                .map(invoiceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponse updateInvoice(UUID id, UpdateInvoiceRequest request) {
        log.info("Updating invoice ID: {}", id);

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        // Update fields if provided
        if (request.getInvoiceNumber() != null) {
            invoice.setInvoiceNumber(request.getInvoiceNumber());
        }
        if (request.getOrganizationName() != null) {
            invoice.setOrganizationName(request.getOrganizationName());
        }
        if (request.getInvoiceDate() != null) {
            invoice.setInvoiceDate(request.getInvoiceDate());
        }
        if (request.getDueDate() != null) {
            invoice.setDueDate(request.getDueDate());
        }
        if (request.getSubtotal() != null) {
            invoice.setSubtotal(request.getSubtotal());
        }
        if (request.getGstAmount() != null) {
            invoice.setGstAmount(request.getGstAmount());
        }
        if (request.getDiscountAmount() != null) {
            invoice.setDiscountAmount(request.getDiscountAmount());
        }
        if (request.getTotalAmount() != null) {
            invoice.setTotalAmount(request.getTotalAmount());
        }
        if (request.getInvoicePeriodFrom() != null) {
            invoice.setInvoicePeriodFrom(request.getInvoicePeriodFrom());
        }
        if (request.getInvoicePeriodTo() != null) {
            invoice.setInvoicePeriodTo(request.getInvoicePeriodTo());
        }
        if (request.getDescription() != null) {
            invoice.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            invoice.setStatus(request.getStatus());
        }
        if (request.getPaymentReference() != null) {
            invoice.setPaymentReference(request.getPaymentReference());
        }

        Invoice updatedInvoice = invoiceRepository.save(invoice);
        log.info("Invoice updated successfully");

        return invoiceMapper.toResponse(updatedInvoice);
    }

    @Override
    public void deleteInvoice(UUID id) {
        log.info("Deleting invoice ID: {}", id);
        invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        invoiceRepository.deleteById(id);
        log.info("Invoice deleted successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> searchInvoices(String query) {
        log.info("Searching invoices with query: {}", query);

        if (query == null || query.isEmpty()) {
            return getAllInvoices();
        }

        // Search by invoice number or organization name
        List<Invoice> results = invoiceRepository.findByInvoiceNumber(query)
                .map(List::of)
                .orElseGet(() -> invoiceRepository.findByOrganizationNameContainingIgnoreCase(query));

        return results.stream()
                .map(invoiceMapper::toResponse)
                .collect(Collectors.toList());
    }
}
