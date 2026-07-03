package com.xebia.finance.contract.dto;

import com.xebia.finance.contract.entity.ContractStatus;
import com.xebia.finance.contract.entity.ContractType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Response DTO returned to API consumers.
 */
public record ContractResponse(

        UUID id,

        String contractNumber,

        UUID organizationId,

        String organizationName,

        String contractName,

        ContractType contractType,

        String currency,

        BigDecimal contractValue,

        BigDecimal gstPercentage,

        LocalDate startDate,

        LocalDate endDate,

        ContractStatus status

) {
}