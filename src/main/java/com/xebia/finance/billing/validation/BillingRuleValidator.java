package com.xebia.finance.billing.validation;

import com.xebia.finance.billing.dto.CreateBillingRuleRequest;
import com.xebia.finance.billing.dto.UpdateBillingRuleRequest;
import com.xebia.finance.billing.entity.DiscountType;
import com.xebia.finance.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * ------------------------------------------------------------------------
 * Finance Service - Learning Management System (LMS)
 * Module      : Billing Rules
 * Class       : BillingRuleValidator
 *
 * Description :
 * Validates all business rules associated with Billing Rules.
 *
 * This validator is responsible for ensuring that every Billing Rule
 * follows the business constraints before it is persisted or updated.
 *
 * Responsibilities:
 * • Validate Effective Dates
 * • Validate GST Percentage
 * • Validate Discount Configuration
 * • Validate EMI Configuration
 * • Validate Maximum Installments
 * • Validate Late Fee
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 * ------------------------------------------------------------------------
 */
@Component
public class BillingRuleValidator {

    /**
     * Validates Billing Rule creation request.
     *
     * @param request Billing Rule creation request.
     */
    public void validate(CreateBillingRuleRequest request) {

        validateCommon(
                request.effectiveFrom().isAfter(request.effectiveTo()),
                request.emiAllowed(),
                request.maximumInstallments(),
                request.discountType(),
                request.discountValue(),
                request.gstPercentage(),
                request.lateFee()
        );
    }

    /**
     * Validates Billing Rule update request.
     *
     * @param request Billing Rule update request.
     */
    public void validate(UpdateBillingRuleRequest request) {

        validateCommon(
                request.effectiveFrom().isAfter(request.effectiveTo()),
                request.emiAllowed(),
                request.maximumInstallments(),
                request.discountType(),
                request.discountValue(),
                request.gstPercentage(),
                request.lateFee()
        );
    }

    /**
     * Performs common business validation shared between
     * Create and Update operations.
     *
     * @param invalidDateRange      true if Effective From is after Effective To
     * @param emiAllowed            EMI enabled or disabled
     * @param maximumInstallments   Maximum number of installments
     * @param discountType          Discount type
     * @param discountValue         Discount value
     * @param gstPercentage         GST percentage
     * @param lateFee               Late fee amount
     */
    private void validateCommon(
            boolean invalidDateRange,
            Boolean emiAllowed,
            Integer maximumInstallments,
            DiscountType discountType,
            BigDecimal discountValue,
            BigDecimal gstPercentage,
            BigDecimal lateFee) {

        // -----------------------------------------------------------------
        // Validate Effective Date Range.
        // Effective From date should never be after Effective To date.
        // -----------------------------------------------------------------
        if (invalidDateRange) {

            throw new BadRequestException(
                    "Effective From date cannot be after Effective To date.");
        }

        // -----------------------------------------------------------------
        // Validate EMI Configuration.
        // If EMI is disabled, maximum installments should not be provided.
        // -----------------------------------------------------------------
        if (!emiAllowed && maximumInstallments != null) {

            throw new BadRequestException(
                    "Maximum installments should be null when EMI is disabled.");
        }

        // -----------------------------------------------------------------
        // Validate Maximum Installments.
        // If EMI is enabled, installments must be greater than zero.
        // -----------------------------------------------------------------
        if (Boolean.TRUE.equals(emiAllowed)) {

            if (maximumInstallments == null || maximumInstallments <= 0) {

                throw new BadRequestException(
                        "Maximum installments must be greater than zero when EMI is enabled.");
            }
        }

        // -----------------------------------------------------------------
        // Validate Discount Configuration.
        // If Discount Type is NONE, Discount Value must always be zero.
        // -----------------------------------------------------------------
        if (discountType == DiscountType.NONE
                && discountValue.compareTo(BigDecimal.ZERO) != 0) {

            throw new BadRequestException(
                    "Discount value must be zero when Discount Type is NONE.");
        }

        // -----------------------------------------------------------------
        // Validate Percentage Discount.
        // Percentage discount cannot exceed 100%.
        // -----------------------------------------------------------------
        if (discountType == DiscountType.PERCENTAGE
                && discountValue.compareTo(new BigDecimal("100")) > 0) {

            throw new BadRequestException(
                    "Percentage discount cannot exceed 100%.");
        }

        // -----------------------------------------------------------------
        // Validate GST Percentage.
        // GST must always be between 0 and 100.
        // -----------------------------------------------------------------
        if (gstPercentage.compareTo(BigDecimal.ZERO) < 0
                || gstPercentage.compareTo(new BigDecimal("100")) > 0) {

            throw new BadRequestException(
                    "GST percentage must be between 0 and 100.");
        }

        // -----------------------------------------------------------------
        // Validate Late Fee.
        // Late fee should never be negative.
        // -----------------------------------------------------------------
        if (lateFee != null
                && lateFee.compareTo(BigDecimal.ZERO) < 0) {

            throw new BadRequestException(
                    "Late fee cannot be negative.");
        }
    }
}