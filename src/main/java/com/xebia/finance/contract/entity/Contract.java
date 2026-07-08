package com.xebia.finance.contract.entity;

import com.xebia.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entity representing a finance contract between Xebia and an organization.
 *
 * This entity stores the contract details that will later be used
 * for billing, invoice generation, and payment processing.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Entity
@Table(name = "contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "contract_number", nullable = false, unique = true, length = 50)
    private String contractNumber;

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Column(name = "organization_name", nullable = false, length = 255)
    private String organizationName;

    @Column(name = "contract_name", nullable = false, length = 255)
    private String contractName;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type", nullable = false, length = 30)
    private ContractType contractType;

    @Column(nullable = false, length = 10)
    private String currency;

    @Column(name = "contract_value", nullable = false, precision = 15, scale = 2)
    private BigDecimal contractValue;

    @Column(name = "gst_percentage", nullable = false, precision = 5, scale = 2)
    private BigDecimal gstPercentage;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ContractStatus status;

}