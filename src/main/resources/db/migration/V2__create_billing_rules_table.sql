CREATE TABLE billing_rules (

    id UUID PRIMARY KEY,

    contract_id UUID NOT NULL,

    rule_name VARCHAR(100) NOT NULL,

    billing_type VARCHAR(30) NOT NULL,

    base_amount NUMERIC(15,2) NOT NULL,

    currency VARCHAR(10) NOT NULL,

    gst_percentage NUMERIC(5,2) NOT NULL DEFAULT 18.00,

    discount_type VARCHAR(20) NOT NULL,

    discount_value NUMERIC(10,2) NOT NULL DEFAULT 0,

    emi_allowed BOOLEAN NOT NULL DEFAULT FALSE,

    maximum_installments INTEGER,

    late_fee NUMERIC(10,2) DEFAULT 0,

    effective_from DATE NOT NULL,

    effective_to DATE NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_contract
        FOREIGN KEY (contract_id)
        REFERENCES contracts(id)
);