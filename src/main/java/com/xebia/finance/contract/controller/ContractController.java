package com.xebia.finance.contract.controller;

import com.xebia.finance.contract.dto.ContractResponse;
import com.xebia.finance.contract.dto.UpdateContractRequest;
import com.xebia.finance.contract.dto.CreateContractRequest;
import com.xebia.finance.contract.service.ContractService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST Controller for Contract Management.
 */
@RestController
@RequestMapping("/api/v1/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    /**
     * Create a new contract.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContractResponse createContract(
            @Valid @RequestBody CreateContractRequest request) {

        return contractService.createContract(request);
    }

    /**
     * Get all contracts.
     */
    @GetMapping
    public List<ContractResponse> getAllContracts() {

        return contractService.getAllContracts();
    }

    /**
     * Get contract by ID.
     */
    @GetMapping("/{id}")
    public ContractResponse getContractById(
            @PathVariable UUID id) {

        return contractService.getContractById(id);
    }

    /**
     * Update an existing contract.
     */
    @PutMapping("/{id}")
    public ContractResponse updateContract(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateContractRequest request) {

        return contractService.updateContract(id, request);
    }

    /**
     * Delete contract.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContract(
            @PathVariable UUID id) {

        contractService.deleteContract(id);
    }
}