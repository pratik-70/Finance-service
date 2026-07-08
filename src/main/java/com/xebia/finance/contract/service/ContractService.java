package com.xebia.finance.contract.service;

import com.xebia.finance.contract.dto.ContractResponse;
import com.xebia.finance.contract.dto.CreateContractRequest;
import com.xebia.finance.contract.dto.UpdateContractRequest;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for managing contracts.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public interface ContractService {

    /**
     * Creates a new contract.
     */
    ContractResponse createContract(CreateContractRequest request);

    ContractResponse updateContract(UUID id, UpdateContractRequest request);

    /**
     * Retrieves all contracts.
     */
    List<ContractResponse> getAllContracts();

    /**
     * Retrieves a contract by ID.
     */
    ContractResponse getContractById(UUID id);

    /**
     * Deletes a contract.
     */
    void deleteContract(UUID id);
}