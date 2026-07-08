package com.xebia.finance.billing.entity;

/**
 * Defines the supported billing strategies.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */
public enum BillingType {

    /**
     * Fixed amount billing.
     */
    FIXED,

    /**
     * Charge based on the number of learners.
     */
    PER_LEARNER,

    /**
     * Charge based on the number of batches.
     */
    PER_BATCH,

    /**
     * Charge based on the number of sessions.
     */
    PER_SESSION,

    /**
     * Charge based on the number of training hours.
     */
    PER_HOUR,

    /**
     * Custom billing logic.
     */
    CUSTOM
}