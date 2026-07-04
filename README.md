# Name - Arijit Dutta Contact Number - 7686093274 email - arijitdutta691999@gmail.com

# Credential Issuance and Verification System

A microservices-based application for issuing and verifying digital credentials, built with Node.js, TypeScript, React, and Docker.

## 🚀 Live Demo

- **Application**: http://16.171.129.176
- **Issuance API**: http://16.171.129.176:3001
- **Verification API**: http://16.171.129.176:3002

## 📋 Features

- **Issue Credentials**: Create and store digital credentials with unique IDs
- **Verify Credentials**: Validate credential authenticity and retrieve details
- **Microservices Architecture**: Independent, scalable backend services
- **Dockerized Deployment**: Containerized for easy deployment and scaling
- **Worker Identification**: Each service instance reports its worker ID
- **Persistent Storage**: SQLite databases for credential and verification data

## 🏗️ Architecture

```text
          Frontend (React + TypeScript)
                      │
                      ▼
                  [ Nginx :80 ]
                      │
          ┌───────────┴───────────┐
          │                       │
    Issuance API            Verification API
     (Port 3001)              (Port 3002)
          │                       │
      SQLite DB               SQLite DB
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js 22
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Containerization**: Docker & Docker Compose

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Infrastructure
- **Cloud Provider**: AWS EC2 (t3.micro)
- **Web Server**: Nginx
- **OS**: Ubuntu 22.04 LTS

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

**1. Clone the repository**

```bash
git clone https://github.com/Arijit19999/credential-system.git
cd credential-system
```

**2. Start the backend APIs**

```bash
docker-compose up --build
```

**3. Set up the frontend**

```bash
cd frontend
npm install
npm run dev
```

**4. Access the application**

| Service          | URL                     |
| ---------------- | ----------------------- |
| Frontend         | http://localhost:3000   |
| Issuance API     | http://localhost:3001   |
| Verification API | http://localhost:3002   |

## 📖 API Documentation

### 🪄 Issuance API

**Issue a credential**

```http
POST /api/issue
Content-Type: application/json
```

Request body:

```json
{
  "id": "CRED001",
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science"
}
```

Response:

```json
{
  "success": true,
  "message": "credential issued by worker-1",
  "workerId": "worker-1",
  "credentialId": "CRED001",
  "timestamp": "2025-10-13T10:30:00.000Z"
}
```

## ☁️ AWS Deployment

### 🚀 Quick Deploy Steps

**1. Launch an EC2 instance**

- **Instance Type**: `t2.micro`
- **OS**: Ubuntu 22.04 LTS
- **Security Groups**: Allow inbound ports `22`, `80`, `3001`, `3002`

**2. Install dependencies**

```bash
sudo apt update
sudo apt install -y docker.io docker-compose git nginx nodejs npm
```

**3. Deploy the application**

```bash
git clone https://github.com/Arijit19999/credential-system.git
cd credential-system
docker-compose up -d --build
```

## 🗂️ Project Structure

```text
credential-system/
├── issuance-api/                 # Credential issuance microservice
│   ├── src/
│   │   ├── index.ts
│   │   ├── database.ts
│   │   ├── routes/
│   │   │   └── credentials.ts
│   │   └── utils/
│   │       └── workerId.ts
│   ├── Dockerfile
│   ├── nodemon.json
│   └── package.json
│
├── verification-api/             # Credential verification microservice
│   ├── src/
│   │   ├── index.ts
│   │   ├── database.ts
│   │   ├── routes/
│   │   │   └── verify.ts
│   │   └── utils/
│   │       ├── issuanceClient.ts
│   │       └── workerId.ts
│   ├── Dockerfile
│   ├── nodemon.json
│   └── package.json
│
├── frontend/                     # React + Vite frontend
│   ├── src/
│   │   ├── pages/                # IssuancePage, VerificationPage
│   │   ├── components/           # Navbar, Alert
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── docker-compose.yml
├── credentials-system.service    # systemd unit for auto-start
├── docker-README.md
└── README.md
```
