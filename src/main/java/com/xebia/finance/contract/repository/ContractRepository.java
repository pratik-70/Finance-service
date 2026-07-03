package com.xebia.finance.contract.repository;

import com.xebia.finance.contract.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for Contract entity.
 *
 * Provides CRUD operations and custom query methods
 * for managing finance contracts.
 */
@Repository
public interface ContractRepository extends JpaRepository<Contract, UUID> {

    /**
     * Finds a contract by its unique contract number.
     *
     * @param contractNumber contract number
     * @return matching contract
     */
    Optional<Contract> findByContractNumber(String contractNumber);

    /**
     * Checks if a contract already exists.
     *
     * @param contractNumber contract number
     * @return true if exists
     */
    boolean existsByContractNumber(String contractNumber);
}