package com.xebia.finance.billing.mapper;

import com.xebia.finance.billing.dto.BillingRuleResponse;
import com.xebia.finance.billing.dto.CreateBillingRuleRequest;
import com.xebia.finance.billing.dto.UpdateBillingRuleRequest;
import com.xebia.finance.billing.entity.BillingRule;
import com.xebia.finance.contract.entity.Contract;
import org.springframework.stereotype.Component;

/**
 * Mapper class for BillingRule.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Component
public class BillingRuleMapper {

    /**
     * Converts request DTO into BillingRule entity.
     *
     * @param request  billing rule request
     * @param contract associated contract
     * @return BillingRule entity
     */
    public BillingRule toEntity(
            CreateBillingRuleRequest request,
            Contract contract) {

        return BillingRule.builder()
                .contract(contract)
                .ruleName(request.ruleName())
                .billingType(request.billingType())
                .baseAmount(request.baseAmount())
                .currency(request.currency())
                .gstPercentage(request.gstPercentage())
                .discountType(request.discountType())
                .discountValue(request.discountValue())
                .emiAllowed(request.emiAllowed())
                .maximumInstallments(request.maximumInstallments())
                .lateFee(request.lateFee())
                .effectiveFrom(request.effectiveFrom())
                .effectiveTo(request.effectiveTo())
                .active(request.active())
                .build();
    }

    /**
     * Converts BillingRule entity into response DTO.
     */
    public BillingRuleResponse toResponse(BillingRule billingRule) {

        return new BillingRuleResponse(
                billingRule.getId(),
                billingRule.getContract().getId(),
                billingRule.getRuleName(),
                billingRule.getBillingType(),
                billingRule.getBaseAmount(),
                billingRule.getCurrency(),
                billingRule.getGstPercentage(),
                billingRule.getDiscountType(),
                billingRule.getDiscountValue(),
                billingRule.getEmiAllowed(),
                billingRule.getMaximumInstallments(),
                billingRule.getLateFee(),
                billingRule.getEffectiveFrom(),
                billingRule.getEffectiveTo(),
                billingRule.getActive()
        );
    }

    /**
     * Updates an existing Billing Rule entity.
     *
     * @param billingRule Existing Billing Rule
     * @param request     Update request
     */
    public void updateEntity(
            BillingRule billingRule,
            UpdateBillingRuleRequest request) {

        billingRule.setRuleName(request.ruleName());
        billingRule.setBillingType(request.billingType());
        billingRule.setBaseAmount(request.baseAmount());
        billingRule.setCurrency(request.currency());
        billingRule.setGstPercentage(request.gstPercentage());
        billingRule.setDiscountType(request.discountType());
        billingRule.setDiscountValue(request.discountValue());
        billingRule.setEmiAllowed(request.emiAllowed());
        billingRule.setMaximumInstallments(request.maximumInstallments());
        billingRule.setLateFee(request.lateFee());
        billingRule.setEffectiveFrom(request.effectiveFrom());
        billingRule.setEffectiveTo(request.effectiveTo());
        billingRule.setActive(request.active());

    }
}