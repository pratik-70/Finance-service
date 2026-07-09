-- Create invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    contract_id UUID NOT NULL REFERENCES contracts(id),
    organization_id UUID NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL,
    gst_amount DECIMAL(15, 2) NOT NULL,
    discount_amount DECIMAL(15, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    invoice_period_from DATE NOT NULL,
    invoice_period_to DATE NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL,
    paid_date TIMESTAMP,
    payment_reference VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Create index for common queries
CREATE INDEX idx_invoices_contract_id ON invoices(contract_id);
CREATE INDEX idx_invoices_organization_id ON invoices(organization_id);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_invoice_date ON invoices(invoice_date);
