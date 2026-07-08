# 💰 Finance Service

Enterprise-grade **Finance Service** developed as part of the **Xebia Virtual Internship Program** for the Learning Management System (LMS).

The Finance Service is responsible for managing the complete financial lifecycle of an organization, including contract management, billing policies, invoice generation, installment payments, payment processing and financial reporting.

---

# 📌 Project Overview

The Finance Service acts as the financial backbone of the Learning Management System.

It manages financial agreements between organizations and the LMS while providing secure, scalable and enterprise-ready billing operations.

Current implementation includes:

- Contract Management
- Billing Rules Management
- Business Validation
- Global Exception Handling
- Database Migration using Flyway
- PostgreSQL Integration
- REST APIs
- Swagger API Documentation

Upcoming modules include Invoice Management, Payment Processing, Installment Management and Financial Reporting.

---

# 🏗 Project Architecture

The Finance Service follows a layered Spring Boot architecture based on the **Separation of Concerns (SoC)** principle.

```text
                         Client
                 (Postman / Swagger UI)
                            │
                            ▼
                    REST Controllers
                            │
                            ▼
                     Service Layer
                  (Business Logic)
                            │
                            ▼
              Validation & Mapper Layer
                            │
                            ▼
                   Repository Layer
                 (Spring Data JPA)
                            │
                            ▼
                  PostgreSQL Database
                            ▲
                            │
                    Flyway Migrations

──────────────────────────────────────────────────────────────

             Global Exception Handler
                      ▲
                      │
              Entire Application

──────────────────────────────────────────────────────────────

              Spring Security Layer
                      ▲
                      │
              Incoming HTTP Requests
```
## 💼 Finance Domain Architecture

```text
                           Contract
                               │
                               ▼
                        Billing Rules
                               │
                               ▼
                 Billing Calculation Engine
                               │
      ┌──────────┬─────────┬──────────┬──────────┬──────────┐
      ▼          ▼         ▼          ▼          ▼
    GST      Discount    EMI      Currency    Late Fee
      └──────────┴─────────┴──────────┴──────────┘
                               │
                               ▼
                        Invoice Generator
                               │
                               ▼
                            Invoice
                               │
                               ▼
                     Installment Manager
                               │
                               ▼
                       Payment Service
                     ┌─────────┴──────────┐
                     ▼                    ▼
          Payment Gateway Adapter    Retry Handler
                     │                    │
                     └─────────┬──────────┘
                               ▼
                     Payment Transaction
                               │
                               ▼
                  Reminder & Notification
                               │
                               ▼
                    Reports & Analytics
```
---

# 📂 Project Structure

```text
finance-service
│
├── src
│   ├── main
│   │
│   ├── java
│   │
│   ├── com.xebia.finance
│   │
│   ├── billing
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── mapper
│   │   ├── repository
│   │   ├── service
│   │   └── validation
│   │
│   ├── contract
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── mapper
│   │   ├── repository
│   │   ├── service
│   │   └── validation
│   │
│   ├── common
│   │   └── entity
│   │
│   ├── config
│   ├── exception
│   ├── security
│   ├── util
│   │
│   └── FinanceApplication.java
│
├── resources
│   ├── db
│   │   └── migration
│   │       ├── V1_create_contract_table.sql
│   │       └── V2_create_billing_rules_table.sql
│   │
│   └── application.yml
│
├── .env
├── pom.xml
└── README.md
```

---

# 🏛 Layer Responsibilities

| Layer | Responsibility |
|--------|----------------|
| Controller | Exposes REST APIs and handles HTTP requests and responses |
| DTO | Transfers request and response data between client and application |
| Service | Contains business logic and application workflow |
| Validation | Enforces business rules before processing |
| Mapper | Converts DTOs to Entities and vice versa |
| Repository | Handles database operations using Spring Data JPA |
| Entity | Represents database tables |
| Exception | Provides centralized exception handling |
| Security | Configures authentication and authorization |
| Config | Application configuration classes |
| Common | Shared reusable components |
| Util | Utility/helper classes |
| Resources | Configuration files and Flyway migrations |

---

# 🚀 Technology Stack

| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 3.3.2 |
| Spring Data JPA | ✔ |
| Spring Validation | ✔ |
| Spring Security | ✔ |
| PostgreSQL | 18 |
| Flyway | ✔ |
| Maven | ✔ |
| Lombok | ✔ |
| Swagger OpenAPI | ✔ |

---

# ✅ Implemented Modules

## Contract Management

The Contract module manages financial agreements between organizations and the Learning Management System.

### Features

- Create Contract
- Retrieve Contract
- Update Contract
- Delete Contract
- Contract Validation
- Duplicate Contract Prevention

---

## Billing Rules Management

The Billing Rules module manages pricing policies associated with contracts.

### Features

- Billing Type
- GST Configuration
- Discount Configuration
- Currency Support
- EMI Configuration
- Late Fee Configuration
- Effective Date Validation
- Duplicate Billing Rule Prevention

---

# 🔜 Upcoming Modules

The following modules will be implemented during the internship.

- Billing Calculation Engine
- Invoice Management
- Invoice Generation
- Invoice History
- Installment Management
- Payment Processing
- Payment Gateway Integration
- Payment Retry Mechanism
- Payment Reminder Scheduler
- Revenue Dashboard
- Reports & Analytics

---

# 📡 REST APIs

## Contract APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/contracts` | Create Contract |
| GET | `/api/v1/contracts` | Retrieve All Contracts |
| GET | `/api/v1/contracts/{id}` | Retrieve Contract by ID |
| PUT | `/api/v1/contracts/{id}` | Update Contract |
| DELETE | `/api/v1/contracts/{id}` | Delete Contract |

---

## Billing Rule APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/billing-rules` | Create Billing Rule |
| GET | `/api/v1/billing-rules` | Retrieve All Billing Rules |
| GET | `/api/v1/billing-rules/{id}` | Retrieve Billing Rule by ID |
| PUT | `/api/v1/billing-rules/{id}` | Update Billing Rule |
| DELETE | `/api/v1/billing-rules/{id}` | Delete Billing Rule |

---

# ✔ Business Validations

## Contract

- Contract Number must be unique.
- Contract Value must be positive.
- Start Date must be before End Date.
- GST percentage must be valid.

## Billing Rules

- GST percentage must be between 0–100%.
- Effective From date must be before Effective To date.
- Maximum Installments allowed only when EMI is enabled.
- Discount validation.
- Duplicate Billing Rule prevention.

---

# 🗄 Database

**Database**

```
PostgreSQL
```

**Migration Tool**

```
Flyway
```

**Current Migrations**

```
V1_create_contract_table.sql

V2_create_billing_rules_table.sql
```

---

# 📖 API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

# ▶ Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/finance-service.git
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

---

## Build the Project

```bash
mvn clean install
```

---

## Run the Application

```bash
mvn spring-boot:run
```

Application starts on

```
http://localhost:8080
```

---

# 🧪 API Testing

The REST APIs can be tested using:

- Postman
- Swagger UI

---

# 📈 Current Development Status

| Module | Status |
|---------|--------|
| Project Setup | ✅ Completed |
| PostgreSQL Integration | ✅ Completed |
| Flyway Migration | ✅ Completed |
| Global Exception Handling | ✅ Completed |
| Spring Security | ✅ Completed |
| Contract Module | ✅ Completed |
| Billing Rules Module | ✅ Completed |
| CRUD APIs | ✅ Completed |
| Validation | ✅ Completed |
| Swagger Integration | ✅ Completed |
| Postman Testing | ✅ Completed |
| Billing Calculation Engine | 🚧 In Progress |
| Invoice Module | ⏳ Planned |
| Payment Module | ⏳ Planned |
| Installment Module | ⏳ Planned |
| Reports & Analytics | ⏳ Planned |

---

# 👨‍💻 Author

**Pratik Kumar**

Xebia Virtual Internship Program

Finance Service (Learning Management System)

70812345pratik@gmail.com

---

# 📄 License

This project was developed as part of the **Xebia Virtual Internship Program** for learning, demonstration and educational purposes.