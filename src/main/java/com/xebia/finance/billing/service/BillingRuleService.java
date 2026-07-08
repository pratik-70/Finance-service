package com.xebia.finance.billing.service;

import com.xebia.finance.billing.dto.BillingRuleResponse;
import com.xebia.finance.billing.dto.CreateBillingRuleRequest;
import com.xebia.finance.billing.dto.UpdateBillingRuleRequest;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for Billing Rules.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public interface BillingRuleService {

    BillingRuleResponse createBillingRule(CreateBillingRuleRequest request);

    List<BillingRuleResponse> getAllBillingRules();

    BillingRuleResponse getBillingRuleById(UUID id);

    BillingRuleResponse updateBillingRule(
            UUID id,
            UpdateBillingRuleRequest request);

    void deleteBillingRule(UUID id);
}