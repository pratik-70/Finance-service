package com.xebia.finance.contract.mapper;

import com.xebia.finance.contract.dto.ContractResponse;
import com.xebia.finance.contract.dto.UpdateContractRequest;
import com.xebia.finance.contract.dto.CreateContractRequest;
import com.xebia.finance.contract.entity.Contract;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Mapper class for converting Contract Entity and DTOs.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Component
public class ContractMapper {

    /**
     * Converts CreateContractRequest DTO to Contract Entity.
     */
    public Contract toEntity(CreateContractRequest request) {

        return Contract.builder()
                .contractNumber(request.contractNumber())
                .organizationId(request.organizationId())
                .organizationName(request.organizationName())
                .contractName(request.contractName())
                .contractType(request.contractType())
                .currency(request.currency())
                .contractValue(request.contractValue())
                .gstPercentage(request.gstPercentage())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .status(request.status())
                .build();
    }

    /**
     * Converts Contract Entity to ContractResponse DTO.
     */
    public ContractResponse toResponse(Contract contract) {

        return new ContractResponse(
                contract.getId(),
                contract.getContractNumber(),
                contract.getOrganizationId(),
                contract.getOrganizationName(),
                contract.getContractName(),
                contract.getContractType(),
                contract.getCurrency(),
                contract.getContractValue(),
                contract.getGstPercentage(),
                contract.getStartDate(),
                contract.getEndDate(),
                contract.getStatus()
        );
    }

    /**
     * Updates an existing Contract entity from the request DTO.
     */
    public void updateEntity(Contract contract, UpdateContractRequest request) {

        contract.setOrganizationId(request.organizationId());
        contract.setOrganizationName(request.organizationName());
        contract.setContractName(request.contractName());
        contract.setContractType(request.contractType());
        contract.setCurrency(request.currency());
        contract.setContractValue(request.contractValue());
        contract.setGstPercentage(request.gstPercentage());
        contract.setStartDate(request.startDate());
        contract.setEndDate(request.endDate());
        contract.setStatus(request.status());
    }
}