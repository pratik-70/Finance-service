CREATE TABLE contracts (
    id UUID PRIMARY KEY,

    contract_number VARCHAR(50) NOT NULL UNIQUE,

    organization_id UUID NOT NULL,

    organization_name VARCHAR(255) NOT NULL,

    contract_name VARCHAR(255) NOT NULL,

    contract_type VARCHAR(50) NOT NULL,

    currency VARCHAR(10) NOT NULL,

    contract_value NUMERIC(15,2) NOT NULL,

    gst_percentage NUMERIC(5,2) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    status VARCHAR(30) NOT NULL,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL
);