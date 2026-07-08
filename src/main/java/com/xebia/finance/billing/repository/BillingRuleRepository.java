package com.xebia.finance.billing.repository;

import com.xebia.finance.billing.entity.BillingRule;
import com.xebia.finance.contract.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository interface for BillingRule entity.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
@Repository
public interface BillingRuleRepository extends JpaRepository<BillingRule, UUID> {

    /**
     * Returns all billing rules associated with a contract.
     *
     * @param contract Contract entity
     * @return list of billing rules
     */
    List<BillingRule> findByContract(Contract contract);

    /**
     * Returns only active billing rules of a contract.
     *
     * @param contract Contract entity
     * @return active billing rules
     */
    List<BillingRule> findByContractAndActiveTrue(Contract contract);

    /**
     * Checks whether a billing rule with the same name already exists
     * for the given contract.
     */
    boolean existsByContractAndRuleName(
            Contract contract,
            String ruleName
    );
}