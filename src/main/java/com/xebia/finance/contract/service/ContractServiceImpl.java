package com.xebia.finance.contract.service;

import com.xebia.finance.contract.dto.ContractResponse;
import com.xebia.finance.contract.dto.UpdateContractRequest;
import com.xebia.finance.contract.dto.CreateContractRequest;
import com.xebia.finance.contract.entity.Contract;
import com.xebia.finance.contract.mapper.ContractMapper;
import com.xebia.finance.contract.repository.ContractRepository;
import com.xebia.finance.exception.DuplicateResourceException;
import com.xebia.finance.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Implementation of ContractService.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final ContractMapper contractMapper;

    @Override
    public ContractResponse createContract(CreateContractRequest request) {

        if (contractRepository.existsByContractNumber(request.contractNumber())) {
            throw new DuplicateResourceException(
                    "Contract number already exists.");
        }

        Contract contract = contractMapper.toEntity(request);

        Contract savedContract = contractRepository.save(contract);

        return contractMapper.toResponse(savedContract);
    }

    @Override
    public ContractResponse updateContract(UUID id, UpdateContractRequest request) {

        Contract contract = contractRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contract not found with id : " + id));

        contractMapper.updateEntity(contract, request);

        Contract updatedContract = contractRepository.save(contract);

        return contractMapper.toResponse(updatedContract);
    }

    @Override
    public List<ContractResponse> getAllContracts() {

        return contractRepository.findAll()
                .stream()
                .map(contractMapper::toResponse)
                .toList();
    }

    @Override
    public ContractResponse getContractById(UUID id) {

        Contract contract = contractRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contract not found with id : " + id));

        return contractMapper.toResponse(contract);
    }

    @Override
    public void deleteContract(UUID id) {

        Contract contract = contractRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contract not found with id : " + id));

        contractRepository.delete(contract);
    }
}