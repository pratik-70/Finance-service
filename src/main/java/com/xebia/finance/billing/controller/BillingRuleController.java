package com.xebia.finance.billing.controller;

import com.xebia.finance.billing.dto.BillingRuleResponse;
import com.xebia.finance.billing.dto.CreateBillingRuleRequest;
import com.xebia.finance.billing.dto.UpdateBillingRuleRequest;
import com.xebia.finance.billing.service.BillingRuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * ------------------------------------------------------------------------
 * Finance Service - Learning Management System (LMS)
 * Module      : Billing Rules
 * Class       : BillingRuleController
 *
 * Description :
 * REST Controller responsible for managing Billing Rule APIs.
 *
 * Responsibilities:
 * • Create Billing Rules
 * • Retrieve Billing Rules
 * • Update Billing Rules
 * • Delete Billing Rules
 *
 *@author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 * ------------------------------------------------------------------------
 */
@RestController
@RequestMapping("/api/v1/billing-rules")
@RequiredArgsConstructor
public class BillingRuleController {

    /**
     * Service responsible for Billing Rule operations.
     */
    private final BillingRuleService billingRuleService;

//    public BillingRuleController(BillingRuleService billingRuleService) {
//        this.billingRuleService = billingRuleService;
//    }
    /**
     * Creates a new Billing Rule.
     *
     * @param request Billing Rule request.
     * @return Created Billing Rule.
     */
    @PostMapping
    public ResponseEntity<BillingRuleResponse> createBillingRule(
            @Valid @RequestBody CreateBillingRuleRequest request) {

        BillingRuleResponse response =
                billingRuleService.createBillingRule(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * Retrieves all Billing Rules.
     *
     * @return List of Billing Rules.
     */
    @GetMapping
    public ResponseEntity<List<BillingRuleResponse>> getAllBillingRules() {

        return ResponseEntity.ok(
                billingRuleService.getAllBillingRules());
    }

    /**
     * Retrieves Billing Rule by ID.
     *
     * @param id Billing Rule ID.
     * @return Billing Rule.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BillingRuleResponse> getBillingRuleById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                billingRuleService.getBillingRuleById(id));
    }

    /**
     * Updates an existing Billing Rule.
     *
     * @param id Billing Rule ID.
     * @param request Updated Billing Rule request.
     * @return Updated Billing Rule.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BillingRuleResponse> updateBillingRule(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateBillingRuleRequest request) {

        return ResponseEntity.ok(
                billingRuleService.updateBillingRule(id, request));
    }

    /**
     * Deletes a Billing Rule.
     *
     * @param id Billing Rule ID.
     * @return HTTP 204 No Content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillingRule(
            @PathVariable UUID id) {

        billingRuleService.deleteBillingRule(id);

        return ResponseEntity.noContent().build();
    }
}