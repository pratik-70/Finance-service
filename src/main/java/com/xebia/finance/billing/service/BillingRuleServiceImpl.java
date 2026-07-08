package com.xebia.finance.billing.service;

import com.xebia.finance.billing.dto.BillingRuleResponse;
import com.xebia.finance.billing.dto.CreateBillingRuleRequest;
import com.xebia.finance.billing.dto.UpdateBillingRuleRequest;
import com.xebia.finance.billing.entity.BillingRule;
import com.xebia.finance.billing.mapper.BillingRuleMapper;
import com.xebia.finance.billing.repository.BillingRuleRepository;
import com.xebia.finance.contract.entity.Contract;
import com.xebia.finance.contract.repository.ContractRepository;
import com.xebia.finance.exception.DuplicateResourceException;
import com.xebia.finance.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.xebia.finance.billing.validation.BillingRuleValidator;

import java.util.List;
import java.util.UUID;

/**
 * ------------------------------------------------------------------------
 * Finance Service - Learning Management System (LMS)
 * Module      : Billing Rules
 * Class       : BillingRuleServiceImpl
 *
 * Description :
 * Service implementation responsible for managing Billing Rules.
 *
 * This class contains the complete business logic related to Billing Rules.
 * It validates business constraints, communicates with repositories,
 * maps DTOs to Entities and vice versa, and returns appropriate responses
 * to the Controller layer.
 *
 * Responsibilities:
 * • Create Billing Rules
 * • Retrieve Billing Rules
 * • Update Billing Rules
 * • Delete Billing Rules
 * • Validate Contract existence
 * • Prevent duplicate Billing Rules
 * • Coordinate business validation
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 * ------------------------------------------------------------------------
 */
@Service
@RequiredArgsConstructor
public class BillingRuleServiceImpl implements BillingRuleService {

    /**
     * Repository responsible for Billing Rule database operations.
     */
    private final BillingRuleRepository billingRuleRepository;

    /**
     * Repository responsible for Contract database operations.
     */
    private final ContractRepository contractRepository;

    /**
     * Mapper responsible for converting DTOs into Entities
     * and Entities into Response DTOs.
     */
    private final BillingRuleMapper billingRuleMapper;

    /**
     * Validator responsible for validating Billing Rule business logic.
     */
    private final BillingRuleValidator billingRuleValidator;

    /**
     * Creates a new Billing Rule.
     *
     * Workflow:
     * <ol>
     *     <li>Verify Contract exists.</li>
     *     <li>Prevent duplicate Billing Rule names.</li>
     *     <li>Validate business rules.</li>
     *     <li>Convert DTO to Entity.</li>
     *     <li>Save Entity.</li>
     *     <li>Return Response DTO.</li>
     * </ol>
     *
     * @param request Billing Rule creation request.
     * @return Created Billing Rule response.
     */
    @Override
    public BillingRuleResponse createBillingRule(CreateBillingRuleRequest request) {

        // ---------------------------------------------------------------
        // Step 1 : Verify Contract exists.
        // ---------------------------------------------------------------
        Contract contract = contractRepository.findById(request.contractId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contract not found with id : "
                                        + request.contractId()));

        // ---------------------------------------------------------------
        // Step 2 : Prevent duplicate Billing Rule names
        // for the same Contract.
        // ---------------------------------------------------------------
        if (billingRuleRepository.existsByContractAndRuleName(
                contract,
                request.ruleName())) {

            throw new DuplicateResourceException(
                    "Billing Rule already exists for this Contract.");
        }

        // ---------------------------------------------------------------
        // Step 3 : Validate business rules.
        // ---------------------------------------------------------------
        billingRuleValidator.validate(request);

        // ---------------------------------------------------------------
        // Step 4 : Convert DTO into Entity.
        // ---------------------------------------------------------------
        BillingRule billingRule =
                billingRuleMapper.toEntity(request, contract);

        // ---------------------------------------------------------------
        // Step 5 : Persist Billing Rule.
        // ---------------------------------------------------------------
        BillingRule savedRule =
                billingRuleRepository.save(billingRule);

        // ---------------------------------------------------------------
        // Step 6 : Convert Entity into Response DTO.
        // ---------------------------------------------------------------
        return billingRuleMapper.toResponse(savedRule);
    }

    /**
     * Retrieves all Billing Rules available in the system.
     *
     * @return List of Billing Rule responses.
     */
    @Override
    public List<BillingRuleResponse> getAllBillingRules() {

        return billingRuleRepository.findAll()
                .stream()
                .map(billingRuleMapper::toResponse)
                .toList();
    }

    /**
     * Retrieves a Billing Rule by its unique identifier.
     *
     * @param id Billing Rule ID.
     * @return Billing Rule response.
     */
    @Override
    public BillingRuleResponse getBillingRuleById(UUID id) {

        BillingRule billingRule =
                billingRuleRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Billing Rule not found with id : " + id));

        return billingRuleMapper.toResponse(billingRule);
    }

    /**
     * Updates an existing Billing Rule.
     *
     * Workflow:
     * <ol>
     *     <li>Retrieve Billing Rule.</li>
     *     <li>Validate business rules.</li>
     *     <li>Update Entity.</li>
     *     <li>Save Entity.</li>
     *     <li>Return updated response.</li>
     * </ol>
     *
     * @param id Billing Rule ID.
     * @param request Updated Billing Rule request.
     * @return Updated Billing Rule response.
     */
    @Override
    public BillingRuleResponse updateBillingRule(
            UUID id,
            UpdateBillingRuleRequest request) {

        // ---------------------------------------------------------------
        // Step 1 : Retrieve Billing Rule.
        // ---------------------------------------------------------------
        BillingRule billingRule =
                billingRuleRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Billing Rule not found with id : " + id));

        // ---------------------------------------------------------------
        // Step 2 : Validate business rules.
        // ---------------------------------------------------------------
        billingRuleValidator.validate(request);

        // ---------------------------------------------------------------
        // Step 3 : Update Entity fields.
        // ---------------------------------------------------------------
        billingRuleMapper.updateEntity(
                billingRule,
                request);

        // ---------------------------------------------------------------
        // Step 4 : Save updated Billing Rule.
        // ---------------------------------------------------------------
        BillingRule updatedRule =
                billingRuleRepository.save(billingRule);

        // ---------------------------------------------------------------
        // Step 5 : Convert updated Entity into Response DTO.
        // ---------------------------------------------------------------
        return billingRuleMapper.toResponse(updatedRule);
    }

    /**
     * Deletes an existing Billing Rule.
     *
     * @param id Billing Rule ID.
     */
    @Override
    public void deleteBillingRule(UUID id) {

        // ---------------------------------------------------------------
        // Step 1 : Verify Billing Rule exists.
        // ---------------------------------------------------------------
        BillingRule billingRule =
                billingRuleRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Billing Rule not found with id : " + id));

        // ---------------------------------------------------------------
        // Step 2 : Delete Billing Rule.
        // ---------------------------------------------------------------
        billingRuleRepository.delete(billingRule);
    }
}