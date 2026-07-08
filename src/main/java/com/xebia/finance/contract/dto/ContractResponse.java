package com.xebia.finance.contract.dto;

import com.xebia.finance.contract.entity.ContractStatus;
import com.xebia.finance.contract.entity.ContractType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Response DTO returned to API consumers.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
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