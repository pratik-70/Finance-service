# Finance Service - Learning Management System (LMS)

Backend microservice for the **Finance, Billing & Revenue (M11)** module of the Learning Management System (LMS).

This project is being developed as part of the **Xebia Virtual Internship Program**.

---

# 📖 Overview

The Finance Service is responsible for managing all financial operations within the Learning Management System. It provides APIs to manage contracts, billing rules, invoices, payments, reconciliation, and financial reports for organizations using the LMS platform.

The service is designed using a layered architecture following enterprise Spring Boot development practices.

---

# 🎯 Objectives

The Finance Service aims to:

- Manage organization contracts
- Configure billing rules
- Generate invoices
- Process payments
- Track payment history
- Handle reconciliation
- Generate financial reports
- Support EMI and full payment options
- Send payment reminders
- Integrate with JasperReports for invoice generation

---

# 🚀 Current Development Status

This project is under active development.

## ✅ Completed

- Spring Boot Project Setup
- PostgreSQL Integration
- Flyway Database Migration
- Layered Architecture
- Global Exception Handling
- Contract Management Module
- CRUD REST APIs
- Swagger Integration
- Postman API Testing
- Environment Configuration

## 🚧 In Progress

- Billing Rules Module

## 📌 Planned

- Billable Items
- Invoice Management
- Invoice Line Items
- Payment Management
- Payment History
- Reconciliation
- Credit Notes
- JasperReports Integration
- Email Notifications
- Revenue Analytics
- JWT Authentication

---

# 🏗️ Architecture

The project follows a layered architecture.

```
                  Client
                     │
                     ▼
              REST Controller
                     │
                     ▼
                 Service Layer
                     │
                     ▼
                 Mapper Layer
                     │
                     ▼
              Repository Layer
                     │
                     ▼
                 PostgreSQL
```

---

# 🛠️ Technology Stack

| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 3.3.2 |
| Spring Data JPA | Latest |
| PostgreSQL | 18 |
| Flyway | Latest |
| Spring Validation | Latest |
| Spring Security | Latest |
| Swagger / OpenAPI | Latest |
| Lombok | Latest |
| Maven | Latest |
| Git | Version Control |
| Postman | API Testing |

---

# 📂 Project Structure

```
finance-service
│
├── src
│   ├── main
│   │
│   ├── java
│   │   └── com.xebia.finance
│   │
│   │       ├── common
│   │       ├── config
│   │       ├── contract
│   │       │   ├── controller
│   │       │   ├── dto
│   │       │   ├── entity
│   │       │   ├── mapper
│   │       │   ├── repository
│   │       │   ├── service
│   │       │   └── validation
│   │       │
│   │       ├── exception
│   │       ├── security
│   │       └── util
│   │
│   └── resources
│       ├── application.yml
│       └── db
│           └── migration
│               └── V1__create_contract_table.sql
│
├── .env.example
├── .gitignore
├── pom.xml
└── README.md
```

---

# ✅ Implemented Features

## Contract Management

The Contract module provides complete CRUD operations.

### Features

- Create Contract
- Retrieve All Contracts
- Retrieve Contract By ID
- Update Contract
- Delete Contract

---

# 🌐 REST API Endpoints

## Create Contract

| Method | Endpoint |
|--------|----------|
| POST | `/api/v1/contracts` |

---

## Get All Contracts

| Method | Endpoint |
|--------|----------|
| GET | `/api/v1/contracts` |

---

## Get Contract By ID

| Method | Endpoint |
|--------|----------|
| GET | `/api/v1/contracts/{id}` |

---

## Update Contract

| Method | Endpoint |
|--------|----------|
| PUT | `/api/v1/contracts/{id}` |

---

## Delete Contract

| Method | Endpoint |
|--------|----------|
| DELETE | `/api/v1/contracts/{id}` |

---

# 🗄️ Database

Database: PostgreSQL

Database Name

```
finance_db
```

Database schema is maintained using **Flyway**.

Migration scripts are available in

```
src/main/resources/db/migration
```

Current Migration

```
V1__create_contract_table.sql
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

Example

```properties
DB_URL=jdbc:postgresql://localhost:5432/finance_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
SERVER_PORT=8080
```

---

# ▶️ Running the Application

## Clone Repository

```bash
git clone https://github.com/<your-username>/finance-service.git
```

```bash
cd finance-service
```

---

## Create Database

```sql
CREATE DATABASE finance_db;
```

---

## Build

```bash
mvn clean install
```

---

## Run

```bash
mvn spring-boot:run
```

Application will start on

```
http://localhost:8080
```

---

# 📚 API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

OpenAPI Documentation

```
http://localhost:8080/v3/api-docs
```

---

# 🧪 API Testing

Current APIs have been successfully tested using

- Postman
- Swagger UI

Verified Operations

- ✅ Create Contract
- ✅ Retrieve All Contracts
- ✅ Retrieve Contract By ID
- ✅ Update Contract
- ✅ Delete Contract

---

# 🛣️ Development Roadmap

## Phase 1 (Completed)

- [x] Spring Boot Setup
- [x] PostgreSQL Integration
- [x] Flyway Migration
- [x] Global Exception Handling
- [x] Contract Management Module

---

## Phase 2 (In Progress)

- [ ] Billing Rules
- [ ] Billable Items

---

## Phase 3

- [ ] Invoice Generation
- [ ] Invoice Line Items
- [ ] Payment Management

---

## Phase 4

- [ ] Reconciliation
- [ ] Credit Notes
- [ ] JasperReports

---

## Phase 5

- [ ] JWT Authentication
- [ ] Email Notifications
- [ ] Docker Support
- [ ] Kubernetes Deployment
- [ ] CI/CD Pipeline
- [ ] Unit & Integration Testing

---

# 💡 Future Improvements

- Automatic Contract Number Generation
- Soft Delete Support
- Audit Logging
- Role-Based Access Control (RBAC)
- Payment Gateway Integration
- Scheduled Payment Reminder Jobs
- PDF Invoice Generation
- Report Dashboard
- Performance Optimization

---

# 👨‍💻 Author

**Pratik Kumar**

Backend Developer Intern

Xebia Virtual Internship

---

# 📄 License

This project has been developed for educational and internship purposes as part of the **Xebia Virtual Internship Program**.