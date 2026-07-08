package com.xebia.finance.contract.dto;

import com.xebia.finance.contract.entity.ContractStatus;
import com.xebia.finance.contract.entity.ContractType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for updating an existing contract.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public record UpdateContractRequest(

        @NotBlank(message = "Organization name is required")
        String organizationName,

        @NotBlank(message = "Contract name is required")
        String contractName,

        @NotNull(message = "Contract type is required")
        ContractType contractType,

        @NotBlank(message = "Currency is required")
        String currency,

        @NotNull
        @Positive
        BigDecimal contractValue,

        @NotNull
        @DecimalMin("0.0")
        BigDecimal gstPercentage,

        @NotNull
        LocalDate startDate,

        @NotNull
        LocalDate endDate,

        @NotNull
        ContractStatus status,

        @NotNull
        UUID organizationId

) {
}