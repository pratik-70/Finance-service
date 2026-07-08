package com.xebia.finance.billing.dto;

import com.xebia.finance.billing.entity.BillingType;
import com.xebia.finance.billing.entity.DiscountType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * ------------------------------------------------------------------------
 * Finance Service - Learning Management System (LMS)
 * Module      : Billing Rules
 * Class       : UpdateBillingRuleRequest
 *
 * Description :
 * DTO used for updating an existing Billing Rule.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 * ------------------------------------------------------------------------
 */
public record UpdateBillingRuleRequest(

        @NotBlank(message = "Rule Name is required")
        String ruleName,

        @NotNull(message = "Billing Type is required")
        BillingType billingType,

        @NotNull
        @Positive
        BigDecimal baseAmount,

        @NotBlank
        String currency,

        @NotNull
        @DecimalMin("0.0")
        BigDecimal gstPercentage,

        @NotNull
        DiscountType discountType,

        @NotNull
        @DecimalMin("0.0")
        BigDecimal discountValue,

        @NotNull
        Boolean emiAllowed,

        Integer maximumInstallments,

        @DecimalMin("0.0")
        BigDecimal lateFee,

        @NotNull
        LocalDate effectiveFrom,

        @NotNull
        LocalDate effectiveTo,

        @NotNull
        Boolean active

) {
}