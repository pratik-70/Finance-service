package com.xebia.finance.invoice.mapper;

import com.xebia.finance.invoice.dto.CreateInvoiceRequest;
import com.xebia.finance.invoice.dto.InvoiceResponse;
import com.xebia.finance.invoice.entity.Invoice;
import org.springframework.stereotype.Component;

/**
 * Mapper for Invoice entity and DTOs.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Component
public class InvoiceMapper {

    /**
     * Convert CreateInvoiceRequest to Invoice entity.
     */
    public Invoice toEntity(CreateInvoiceRequest request) {
        if (request == null) {
            return null;
        }

        return Invoice.builder()
                .invoiceNumber(request.getInvoiceNumber())
                .organizationId(request.getOrganizationId())
                .organizationName(request.getOrganizationName())
                .invoiceDate(request.getInvoiceDate())
                .dueDate(request.getDueDate())
                .subtotal(request.getSubtotal())
                .gstAmount(request.getGstAmount())
                .discountAmount(request.getDiscountAmount())
                .totalAmount(request.getTotalAmount())
                .currency(request.getCurrency())
                .invoicePeriodFrom(request.getInvoicePeriodFrom())
                .invoicePeriodTo(request.getInvoicePeriodTo())
                .description(request.getDescription())
                .status(request.getStatus())
                .build();
    }

    /**
     * Convert Invoice entity to InvoiceResponse.
     */
    public InvoiceResponse toResponse(Invoice invoice) {
        if (invoice == null) {
            return null;
        }

        InvoiceResponse response = new InvoiceResponse();
        response.setId(invoice.getId());
        response.setInvoiceNumber(invoice.getInvoiceNumber());
        response.setContractId(invoice.getContract() != null ? invoice.getContract().getId() : null);
        response.setOrganizationId(invoice.getOrganizationId());
        response.setOrganizationName(invoice.getOrganizationName());
        response.setInvoiceDate(invoice.getInvoiceDate());
        response.setDueDate(invoice.getDueDate());
        response.setSubtotal(invoice.getSubtotal());
        response.setGstAmount(invoice.getGstAmount());
        response.setDiscountAmount(invoice.getDiscountAmount());
        response.setTotalAmount(invoice.getTotalAmount());
        response.setCurrency(invoice.getCurrency());
        response.setInvoicePeriodFrom(invoice.getInvoicePeriodFrom());
        response.setInvoicePeriodTo(invoice.getInvoicePeriodTo());
        response.setDescription(invoice.getDescription());
        response.setStatus(invoice.getStatus());
        response.setPaidDate(invoice.getPaidDate());
        response.setPaymentReference(invoice.getPaymentReference());
        response.setCreatedAt(invoice.getCreatedAt());
        response.setUpdatedAt(invoice.getUpdatedAt());

        return response;
    }
}
