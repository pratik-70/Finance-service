package com.xebia.finance.billing.dto;

import com.xebia.finance.billing.entity.BillingType;
import com.xebia.finance.billing.entity.DiscountType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Response DTO for Billing Rule.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public record BillingRuleResponse(

        UUID id,

        UUID contractId,

        String ruleName,

        BillingType billingType,

        BigDecimal baseAmount,

        String currency,

        BigDecimal gstPercentage,

        DiscountType discountType,

        BigDecimal discountValue,

        Boolean emiAllowed,

        Integer maximumInstallments,

        BigDecimal lateFee,

        LocalDate effectiveFrom,

        LocalDate effectiveTo,

        Boolean active

) {
}