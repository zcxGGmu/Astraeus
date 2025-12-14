# Astraeus - A general-purpose AI Agent Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116+-green.svg)](https://fastapi.tiangolo.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)

Astraeus is a comprehensive, production-ready AI Agent platform designed for local private deployment and global developer ecosystems. It enables the creation, deployment, and management of intelligent agents with powerful capabilities in a secure, scalable environment.

## 🌟 Key Features

- 🤖 **Multi-Model Support** - Integrates with various LLM providers (DeepSeek, GPT-4o, Qwen, etc.)
- 🛡️ **Sandboxed Execution** - PPIO-based isolation for secure agent operations
- 🌐 **Web Automation** - Built-in browser automation with Playwright
- 📦 **Rich Tool Ecosystem** - Computer use, web search, code interpreter, and more
- ⚡ **Background Processing** - Asynchronous task execution with Dramatiq
- 🔐 **Authentication & Security** - JWT-based auth with encrypted credentials
- 📊 **Observability** - Integrated logging with Structlog and Langfuse
- 🔧 **External Integrations** - Support for Composio, MCP, and Pipedream
- 🏠 **Local Deployment** - Complete private deployment with PostgreSQL and Redis
- 🇨🇳 **China Optimized** - Designed for Chinese developers and services

## 🏗️ System Architecture

Astraeus features a modern, distributed architecture designed for local private deployment:

### Key Architecture Components:
- ✅ **PostgreSQL** - Local data persistence storage
- ✅ **PPIO Sandbox Environment** - Secure agent execution environment
- ✅ **Google ADK Framework** - Unified LLM management interface
- ✅ **FastAPI** - High-performance asynchronous API service
- ✅ **Next.js 15** - Modern frontend framework

### System Architecture Overview

```mermaid
graph TB
    %% User Layer
    subgraph "User Interface Layer"
        WEB[Web Browser]
        UI[Next.js Frontend Application]
    end

    %% API Gateway Layer
    subgraph "API Gateway Layer"
        API[FastAPI Server]
        AUTH[JWT Authentication Middleware]
        CORS[CORS Middleware]
    end

    %% Business Service Layer
    subgraph "Business Service Layer"
        AGENT_SVC[Agent Service]
        PROJECT_SVC[Project Management Service]
        THREAD_SVC[Conversation Thread Service]
        BILLING_SVC[Billing Service]
        SANDBOX_SVC[Sandbox Management Service]
        TRIGGER_SVC[Trigger Service]
    end

    %% Core Component Layer
    subgraph "Core Component Layer"
        ADK[Google ADK Framework]
        LLM[LLM Manager]
        WORKFLOW[Workflow Engine]
        TOOL_REGISTRY[Tool Registry]
        MCP[MCP Integration]
    end

    %% Tool Execution Layer
    subgraph "Tool Execution Layer"
        COMPUTER[Computer Use Tool]
        BROWSER[Browser Automation Tool]
        SEARCH[Web Search Tool]
        CODE[Code Interpreter Tool]
        DATA[Data Provider Tool]
    end

    %% Sandbox Environment Layer
    subgraph "Sandbox Environment Layer"
        PPIO[PPIO Cloud Sandbox]
        DOCKER[Docker Container]
        VNC[VNC Remote Desktop]
    end

    %% Background Task Layer
    subgraph "Background Task Layer"
        DRAMATIQ[Dramatiq Task Queue]
        WORKER[Background Worker Process]
        SCHEDULER[Task Scheduler]
    end

    %% Data Storage Layer
    subgraph "Data Storage Layer"
        POSTGRES[(PostgreSQL Primary)]
        REDIS[(Redis Cache)]
        FILES[File Storage]
        SCREENSHOTS[Screenshot Storage]
    end

    %% External Integration Layer
    subgraph "External Integration Layer"
        DEEPSEEK[DeepSeek API]
        OPENAI[OpenAI API]
        QWEN[Qwen API]
        TAVILY[Tavily Search]
        FIRECRAWL[Firecrawl API]
        COMPOSIO[Composio Integration]
        LANGFUSE[Langfuse Monitoring]
    end

    %% Connections
    WEB --> UI
    UI -.->|HTTPS/WebSocket| API
    API --> AUTH
    AUTH --> CORS

    API --> AGENT_SVC
    API --> PROJECT_SVC
    API --> THREAD_SVC
    API --> BILLING_SVC
    API --> SANDBOX_SVC
    API --> TRIGGER_SVC

    AGENT_SVC --> ADK
    ADK --> LLM
    ADK --> WORKFLOW
    ADK --> TOOL_REGISTRY
    MCP --> TOOL_REGISTRY

    TOOL_REGISTRY --> COMPUTER
    TOOL_REGISTRY --> BROWSER
    TOOL_REGISTRY --> SEARCH
    TOOL_REGISTRY --> CODE
    TOOL_REGISTRY --> DATA

    COMPUTER --> PPIO
    BROWSER --> PPIO
    SANDBOX_SVC --> PPIO
    PPIO --> DOCKER
    PPIO --> VNC

    API -.->|Async Tasks| DRAMATIQ
    DRAMATIQ --> WORKER
    DRAMATIQ --> SCHEDULER

    AGENT_SVC --> POSTGRES
    PROJECT_SVC --> POSTGRES
    THREAD_SVC --> POSTGRES
    BILLING_SVC --> POSTGRES
    AUTH --> POSTGRES

    API --> REDIS
    DRAMATIQ --> REDIS
    WORKER --> REDIS

    LLM --> DEEPSEEK
    LLM --> OPENAI
    LLM --> QWEN
    SEARCH --> TAVILY
    BROWSER --> FIRECRAWL

    ADK --> COMPOSIO
    ADK --> LANGFUSE

    COMPUTER --> SCREENSHOTS
    BROWSER --> SCREENSHOTS
    API --> FILES

    style WEB fill:#e1f5fe
    style API fill:#f3e5f5
    style ADK fill:#e8f5e9
    style PPIO fill:#fff3e0
    style POSTGRES fill:#fce4ec
    style REDIS fill:#f1f8e9
```

### Technology Stack Overview

```mermaid
pie title Technology Stack Distribution
    "Frontend Technology" : 25
    "Backend Services" : 30
    "Data Storage" : 15
    "AI/LLM" : 20
    "DevOps" : 10
```

## 🚀 Quick Start

### Prerequisites

- **Backend**: Python 3.11+
- **Frontend**: Node.js 18+
- **Databases**: PostgreSQL 17+, Redis 7+
- **Docker** (optional for containerized deployment)
- **PPIO Account** (for sandbox environments)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/zcxGGmu/Astraeus.git
cd Astraeus
```

#### 2. Frontend Setup
```bash
cd frontend  # Navigate to frontend directory
npm install  # or use: npm ci for clean install
npm run dev  # Start frontend on http://localhost:3000
```

#### 3. Backend Setup
```bash
cd backend  # Navigate to backend directory

# Create virtual environment
conda create -n astraeus python=3.11
conda activate astraeus

# Install dependencies
pip install -r requirements.txt
```

#### 4. Database Setup
```bash
# Start PostgreSQL and Redis services
# (See detailed setup instructions below)

# Configure database
python scripts/01_setup_database.py  # Configure PostgreSQL
python scripts/02_setup_redis.py     # Configure Redis
python scripts/03_init_astraeus_table.py  # Initialize tables
```

#### 5. Environment Configuration
Create a `.env` file in the backend directory:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=astraeus
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# PPIO Sandbox Configuration
E2B_DOMAIN=sandbox.ppio.cn
E2B_API_KEY=your_ppio_api_key
SANDBOX_TEMPLATE_CODE=br263f8awvhrqd7ss1ze
SANDBOX_TEMPLATE_DESKTOP=4imxoe43snzcxj95hvha
SANDBOX_TEMPLATE_BROWSER=7xvs3snis3tkuq3y8u96
SANDBOX_TEMPLATE_BASE=txi15v1zt0q72i1gcyqb

# LLM Configuration
# For DeepSeek
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_API_BASE=https://api.deepseek.com
MODEL_TO_USE=deepseek/deepseek-chat

# For OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1
# MODEL_TO_USE=gpt-4o

# Other API Keys
TAVILY_API_KEY=your_tavily_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Application Settings
ENV_MODE=local
LOGGING_LEVEL=INFO
```

#### 6. Start Services
```bash
# Terminal 1: Start FastAPI server
python api.py

# Terminal 2: Start background workers
dramatiq run_agent_background
```

#### 7. Access the Application
- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📋 Environment Configuration

### Database Setup

#### PostgreSQL Installation

**Windows:**
1. Download from [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. Run installer with default settings
3. Set password for postgres user
4. Install pgAdmin for database management

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Create database:
```sql
CREATE DATABASE astraeus;
CREATE USER astraeus WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE astraeus TO astraeus;
```

#### Redis Installation

**Windows:**
1. Download from [redis-windows](https://github.com/redis-windows/redis-windows/releases)
2. Extract and run: `redis-server redis.conf`

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install redis-server

# Or compile from source
wget http://download.redis.io/releases/redis-7.0.4.tar.gz
tar -zxvf redis-7.0.4.tar.gz
cd redis-7.0.4
make
make install
redis-server redis.conf
```

### PPIO Sandbox Setup

1. Register at [PPIO Console](https://ppio.com/console)
2. Get API key from dashboard
3. Note template IDs from your sandbox templates

## 🔧 Core Functional Module Architecture

### 1. Agent Execution System Architecture

```mermaid
sequenceDiagram
    participant User as User
    participant Frontend as Frontend App
    participant API as FastAPI Service
    participant Agent as Agent Service
    participant ADK as Google ADK
    participant LLM as LLM Service
    participant Tool as Tool System
    participant Sandbox as Sandbox Environment
    participant DB as Database

    User->>Frontend: Send task request
    Frontend->>API: POST /api/agents/{id}/run
    API->>Agent: Create agent execution instance
    Agent->>DB: Save execution record

    loop Agent Execution Loop
        Agent->>ADK: Process user input
        ADK->>LLM: Get model response
        LLM-->>ADK: Return response/tool call
        alt Tool call needed
            ADK->>Tool: Execute tool
            Tool->>Sandbox: Execute in sandbox
            Sandbox-->>Tool: Return execution result
            Tool-->>ADK: Return result
        end
        ADK-->>Agent: Return execution status
        Agent->>DB: Update execution status
        Agent-->>Frontend: Stream result
    end

    Agent-->>API: Execution complete
    API-->>Frontend: Return final result
    Frontend-->>User: Display task result
```

### 2. Data Flow Architecture

```mermaid
flowchart LR
    %% Data Input
    subgraph "Data Input Layer"
        USER_INPUT[User Input]
        FILE_UPLOAD[File Upload]
        API_INPUT[API Call]
        WEBHOOK[Webhook Trigger]
    end

    %% Data Processing
    subgraph "Data Processing Layer"
        VALIDATOR[Data Validator]
        TRANSFORMER[Data Transformer]
        ENRICHER[Data Enricher]
        SANITIZER[Data Sanitizer]
    end

    %% Business Logic
    subgraph "Business Logic Layer"
        AGENT_LOGIC[Agent Processing Logic]
        WORKFLOW_ENGINE[Workflow Engine]
        RULE_ENGINE[Rule Engine]
        STATE_MACHINE[State Machine]
    end

    %% Data Storage
    subgraph "Data Storage Layer"
        POSTGRES_DB[(PostgreSQL)]
        REDIS_CACHE[(Redis)]
        FILE_STORAGE[File System]
        VECTOR_STORE[Vector Database]
    end

    %% Data Output
    subgraph "Data Output Layer"
        STREAM_RESPONSE[Stream Response]
        FILE_RESULT[File Result]
        DASHBOARD[Dashboard]
        NOTIFICATION[Notification System]
    end

    %% Data Flow
    USER_INPUT --> VALIDATOR
    FILE_UPLOAD --> TRANSFORMER
    API_INPUT --> ENRICHER
    WEBHOOK --> SANITIZER

    VALIDATOR --> AGENT_LOGIC
    TRANSFORMER --> WORKFLOW_ENGINE
    ENRICHER --> RULE_ENGINE
    SANITIZER --> STATE_MACHINE

    AGENT_LOGIC --> POSTGRES_DB
    WORKFLOW_ENGINE --> REDIS_CACHE
    RULE_ENGINE --> FILE_STORAGE
    STATE_MACHINE --> VECTOR_STORE

    POSTGRES_DB --> STREAM_RESPONSE
    REDIS_CACHE --> FILE_RESULT
    FILE_STORAGE --> DASHBOARD
    VECTOR_STORE --> NOTIFICATION

    style USER_INPUT fill:#e3f2fd
    style AGENT_LOGIC fill:#e8f5e9
    style POSTGRES_DB fill:#fce4ec
    style STREAM_RESPONSE fill:#fff3e0
```

### 3. Sandbox Environment Architecture

```mermaid
graph TB
    subgraph "Sandbox Management Layer"
        SANDBOX_MGR[Sandbox Manager]
        RESOURCE_MGR[Resource Manager]
        LIFECYCLE[Lifecycle Management]
        MONITOR[Monitoring System]
    end

    subgraph "Sandbox Types"
        DOCKER_SANDBOX[Docker Container Sandbox]
        VNC_SANDBOX[VNC Desktop Sandbox]
        BROWSER_SANDBOX[Browser Sandbox]
        CLI_SANDBOX[Command Line Sandbox]
    end

    subgraph "Execution Environment"
        PYTHON_ENV[Python Environment]
        NODE_ENV[Node.js Environment]
        SYSTEM_TOOLS[System Tools]
        BROWSER_ENG[Browser Engine]
    end

    subgraph "Security Isolation"
        NETWORK_ISOLATION[Network Isolation]
        FILE_SYSTEM_ISOLATION[File System Isolation]
        PROCESS_ISOLATION[Process Isolation]
        RESOURCE_LIMITS[Resource Limits]
    end

    subgraph "Tool Support"
        PLAYWRIGHT[Playwright]
        SELENIUM[Selenium]
        PUPPETEER[Puppeteer]
        CUSTOM_TOOLS[Custom Tools]
    end

    SANDBOX_MGR --> DOCKER_SANDBOX
    SANDBOX_MGR --> VNC_SANDBOX
    SANDBOX_MGR --> BROWSER_SANDBOX
    SANDBOX_MGR --> CLI_SANDBOX

    RESOURCE_MGR --> RESOURCE_LIMITS
    LIFECYCLE --> DOCKER_SANDBOX
    MONITOR --> NETWORK_ISOLATION

    DOCKER_SANDBOX --> PYTHON_ENV
    VNC_SANDBOX --> BROWSER_ENG
    BROWSER_SANDBOX --> BROWSER_ENG
    CLI_SANDBOX --> SYSTEM_TOOLS

    PYTHON_ENV --> CUSTOM_TOOLS
    BROWSER_ENG --> PLAYWRIGHT
    BROWSER_ENG --> SELENIUM
    BROWSER_ENG --> PUPPETEER

    style SANDBOX_MGR fill:#e1f5fe
    style DOCKER_SANDBOX fill:#f3e5f5
    style NETWORK_ISOLATION fill:#ffebee
    style PLAYWRIGHT fill:#e8f5e9
```

### 4. LLM Integration Architecture

```mermaid
graph LR
    subgraph "LLM Interface Layer"
        ADK_WRAPPER[ADK Wrapper]
        LITE_LLM[LiteLLM Unified Interface]
        MODEL_ROUTER[Model Router]
        FALLBACK[Fallback]
    end

    subgraph "Model Providers"
        DEEPSEEK_MODEL[DeepSeek]
        OPENAI_MODEL[OpenAI]
        QWEN_MODEL[Qwen]
        LOCAL_MODEL[Local Model]
    end

    subgraph "Model Management"
        MODEL_CACHE[Model Cache]
        TOKEN_COUNTER[Token Counter]
        RATE_LIMITER[Rate Limiter]
        COST_TRACKER[Cost Tracker]
    end

    subgraph "Feature Enhancement"
        PROMPT_TEMPLATES[Prompt Templates]
        CONTEXT_MANAGER[Context Manager]
        MEMORY_SYSTEM[Memory System]
        TOOL_INTEGRATION[Tool Integration]
    end

    ADK_WRAPPER --> LITE_LLM
    LITE_LLM --> MODEL_ROUTER
    MODEL_ROUTER --> FALLBACK

    MODEL_ROUTER --> DEEPSEEK_MODEL
    MODEL_ROUTER --> OPENAI_MODEL
    MODEL_ROUTER --> QWEN_MODEL
    MODEL_ROUTER --> LOCAL_MODEL

    LITE_LLM --> MODEL_CACHE
    MODEL_ROUTER --> TOKEN_COUNTER
    MODEL_ROUTER --> RATE_LIMITER
    MODEL_ROUTER --> COST_TRACKER

    ADK_WRAPPER --> PROMPT_TEMPLATES
    ADK_WRAPPER --> CONTEXT_MANAGER
    ADK_WRAPPER --> MEMORY_SYSTEM
    ADK_WRAPPER --> TOOL_INTEGRATION

    style ADK_WRAPPER fill:#e3f2fd
    style MODEL_ROUTER fill:#e8f5e9
    style PROMPT_TEMPLATES fill:#fff3e0
```

### 5. Tool System Architecture

```mermaid
mindmap
  root((Tool System))
    Built-in Tools
      Computer Use
        VNC Remote Control
        Desktop Automation
        File Operations
      Browser Use
        Playwright Driver
        Page Interaction
        Data Scraping
      Web Search
        Tavily Integration
        Multi Search Engines
        Result Filtering
      Code Interpreter
        Python Execution
        Data Analysis
        Visualization

    External Integrations
      MCP Tools
        Custom Protocol
        Third-party Services
        Extension Interface
      Composio
        500+ Tools
        SaaS Integration
        API Connectors
      Pipedream
        Workflow Automation
        Event Triggers
        Data Pipeline

    Data Providers
        Amazon
        LinkedIn
        Twitter
        Yahoo Finance
        Zillow

    Development Framework
        Tool Registry
        Parameter Validation
        Result Parsing
        Error Handling
        Logging
```

## 🎯 Core Features & Modules

### 1. User Authentication Module
- User registration, login, and logout
- Permission management
- Session management
- Conversation history management

### 2. LLM Service Integration
- Online models: DeepSeek-chat, Qwen3, GPT-4o
- Local models: vLLM, Ollama REST API integration
- Unified management through Google ADK framework

### 3. Agent Sandbox Environment
- Create, destroy, and manage Agent sandbox environments
- Manage conversation threads and file resources
- External tool execution in isolated environments

### 4. External Tool Integration
- Pre-built tools:
  - Web Search
  - Computer Use (desktop automation)
  - Browser Use (web automation)
  - Code Interpreter
- Custom MCP service integration
- Custom external tool service integration

### 6. Database Architecture

```mermaid
erDiagram
    %% User Authentication Tables
    auth_users {
        string id PK
        string email UK
        string name
        string password_hash
        timestamp created_at
        timestamp updated_at
    }

    user_sessions {
        string id PK
        string user_id FK
        string session_token
        timestamp expires_at
        timestamp created_at
    }

    refresh_tokens {
        string id PK
        string user_id FK
        string token
        timestamp expires_at
        timestamp created_at
    }

    %% Project Related Tables
    projects {
        string id PK
        string account_id FK
        string name
        text description
        json metadata
        timestamp created_at
        timestamp updated_at
    }

    threads {
        string id PK
        string project_id FK
        string account_id FK
        string name
        string status
        json metadata
        timestamp created_at
        timestamp updated_at
    }

    messages {
        string id PK
        string thread_id FK
        string type
        text content
        json metadata
        timestamp created_at
    }

    %% Agent Related Tables
    agents {
        string id PK
        string account_id FK
        string name
        text instructions
        string model
        json metadata
        timestamp created_at
        timestamp updated_at
    }

    agent_versions {
        string id PK
        string agent_id FK
        integer version
        json config
        timestamp created_at
    }

    agent_workflows {
        string id PK
        string agent_id FK
        json workflow_data
        timestamp created_at
        timestamp updated_at
    }

    agent_runs {
        string id PK
        string agent_id FK
        string thread_id FK
        string status
        json input
        json output
        json metadata
        timestamp started_at
        timestamp completed_at
    }

    %% ADK Framework Related Tables
    app_states {
        string app_id PK
        json state
        timestamp updated_at
    }

    sessions {
        string session_id PK
        string user_id FK
        json state
        timestamp created_at
        timestamp updated_at
    }

    events {
        string id PK
        string session_id FK
        string event_type
        json data
        timestamp created_at
    }

    user_states {
        string user_id PK
        json state
        timestamp updated_at
    }

    %% External Integration Tables
    api_keys {
        string id PK
        string user_id FK
        string name
        string key_hash
        json permissions
        timestamp created_at
        timestamp last_used
    }

    %% Relationship Definitions
    auth_users ||--o{ user_sessions : has
    auth_users ||--o{ refresh_tokens : has
    auth_users ||--o{ projects : owns
    auth_users ||--o{ agents : creates
    auth_users ||--o{ api_keys : owns

    projects ||--o{ threads : contains
    threads ||--o{ messages : contains

    agents ||--o{ agent_versions : has
    agents ||--o{ agent_workflows : has
    agents ||--o{ agent_runs : executes

    agent_runs }o--|| threads : in
    sessions ||--o{ events : generates
    auth_users ||--|| user_states : has
```

### 7. Security Architecture

```mermaid
graph TB
    subgraph "Authentication Layer"
        JWT_AUTH[JWT Authentication]
        REFRESH_TOKEN[Refresh Token]
        SESSION_MGR[Session Management]
        OAUTH[OAuth Integration]
    end

    subgraph "Authorization Layer"
        RBAC[Role-Based Access Control]
        PERMISSION_CHECKER[Permission Checker]
        RESOURCE_POLICY[Resource Policy]
        API_LIMITER[API Rate Limiter]
    end

    subgraph "Data Security"
        ENCRYPTION[Data Encryption]
        KEY_MGR[Key Management]
        DATA_MASKING[Data Masking]
        AUDIT_LOG[Audit Log]
    end

    subgraph "Network Security"
        HTTPS[HTTPS Transmission]
        CORS_POLICY[CORS Policy]
        RATE_LIMITING[Rate Limiting]
        IP_WHITELIST[IP Whitelist]
    end

    subgraph "Sandbox Security"
        CONTAINER_ISOLATION[Container Isolation]
        NETWORK_ISOLATION[Network Isolation]
        FILE_ISOLATION[File Isolation]
        RESOURCE_QUOTAS[Resource Quotas]
    end

    JWT_AUTH --> RBAC
    REFRESH_TOKEN --> SESSION_MGR
    RBAC --> PERMISSION_CHECKER
    PERMISSION_CHECKER --> RESOURCE_POLICY

    ENCRYPTION --> KEY_MGR
    KEY_MGR --> DATA_MASKING
    DATA_MASKING --> AUDIT_LOG

    HTTPS --> CORS_POLICY
    CORS_POLICY --> RATE_LIMITING
    RATE_LIMITING --> IP_WHITELIST

    CONTAINER_ISOLATION --> NETWORK_ISOLATION
    NETWORK_ISOLATION --> FILE_ISOLATION
    FILE_ISOLATION --> RESOURCE_QUOTAS

    style JWT_AUTH fill:#e3f2fd
    style ENCRYPTION fill:#e8f5e9
    style HTTPS fill:#fff3e0
    style CONTAINER_ISOLATION fill:#fce4ec
```

## 📚 API Documentation

### Authentication

All API endpoints require JWT authentication:

```python
import requests

# Login
response = requests.post("http://localhost:8000/auth/login", json={
    "email": "user@example.com",
    "password": "password"
})
token = response.json()["access_token"]

# Use token
headers = {"Authorization": f"Bearer {token}"}
```

### Key Endpoints

#### Authentication
```http
POST   /auth/register          # User registration
POST   /auth/login             # User login
POST   /auth/logout            # User logout
GET    /auth/me                # Get current user info
```

#### Projects
```http
GET    /api/projects           # List projects
POST   /api/projects           # Create project
GET    /api/projects/{id}      # Get project details
PUT    /api/projects/{id}      # Update project
DELETE /api/projects/{id}      # Delete project
```

#### Threads
```http
GET    /api/threads            # List threads
POST   /api/threads            # Create thread
GET    /api/threads/{id}       # Get thread messages
POST   /api/threads/{id}/messages  # Send message
```

#### Agents
```http
GET    /api/agents             # List agents
POST   /api/agents             # Create agent
GET    /api/agents/{id}        # Get agent details
POST   /api/agents/{id}/run    # Execute agent
```

## 🔧 Development

### Local Development Setup

1. **Frontend Development**
```bash
cd frontend
npm install
npm run dev    # Development server with hot reload
npm run build  # Production build
```

2. **Backend Development**
```bash
cd backend
pip install -r requirements.txt
python api.py    # Start development server
```

3. **Code Structure**
```
├── agent/                # Agent execution system
│   ├── run.py           # Core agent runner
│   ├── tools/           # Agent tools directory
│   └── config/          # Agent configuration
├── auth/                # Authentication system
├── composio_integration/ # Third-party integrations
├── sandbox/             # Sandbox environment
├── services/            # Core services (DB, Redis, etc.)
├── triggers/            # Event triggers
├── utils/               # Shared utilities
└── api.py              # FastAPI application entry
```

### Testing

```bash
# Run all tests
pytest

# Run specific test
python tests/03_test_simple_browser.py
```

## 🐳 Docker Deployment

### Development Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker

1. **Build the image**
```bash
docker build -t astraeus:latest .
```

2. **Deploy with Docker Compose**
```bash
docker-compose -f docker-compose.yml up -d
```

3. **Scale Workers**
```bash
docker-compose up -d --scale worker=4
```

## 📊 Monitoring & Observability

### Logging
The platform uses Structlog for structured logging:
```python
from utils.logger import logger

logger.info("Agent executed", agent_id="123", duration=5.2)
```

### Metrics with Langfuse
Track agent performance and user interactions:
```python
from services.langfuse import langfuse

# Automatically tracks agent runs
```

### Error Tracking with Sentry
```python
import sentry_sdk

# Errors are automatically reported if SENTRY_DSN is configured
```

## 🔐 Security Considerations

- All credentials are encrypted at rest using AES-256
- API keys are stored securely in environment variables
- Sandboxes provide complete isolation from host system
- JWT tokens with configurable expiration times
- CORS protection for web applications
- Rate limiting on API endpoints
- SQL injection prevention through SQLAlchemy ORM

### 8. Deployment Architecture

```mermaid
graph TB
    subgraph "Local Development Environment"
        DEV_FRONTEND[Frontend Dev Server<br/>:3000]
        DEV_API[API Dev Server<br/>:8000]
        DEV_DB[(Local PostgreSQL)]
        DEV_REDIS[(Local Redis)]
    end

    subgraph "Docker Containerized Deployment"
        subgraph "Frontend Container"
            NGINX[Nginx Reverse Proxy]
            NEXTJS[Next.js Application]
        end

        subgraph "Backend Container"
            FASTAPI[FastAPI Service]
            WORKER1[Worker Process 1]
            WORKER2[Worker Process 2]
            WORKERN[Worker Process N]
        end

        subgraph "Data Container"
            PG_CONTAINER[(PostgreSQL)]
            REDIS_CONTAINER[(Redis)]
        end
    end

    subgraph "Production Environment"
        subgraph "Load Balancing Layer"
            LB[Load Balancer]
            CDN[CDN Acceleration]
        end

        subgraph "Application Layer"
            APP1[Application Instance 1]
            APP2[Application Instance 2]
            APPN[Application Instance N]
        end

        subgraph "Database Cluster"
            PG_MASTER[(PostgreSQL Master)]
            PG_SLAVE[(PostgreSQL Slave)]
            REDIS_CLUSTER[(Redis Cluster)]
        end

        subgraph "Monitoring & Logging"
            PROMETHEUS[Prometheus]
            GRAFANA[Grafana]
            ELK_STACK[ELK Stack]
        end
    end

    DEV_FRONTEND --> DEV_API
    DEV_API --> DEV_DB
    DEV_API --> DEV_REDIS

    NGINX --> NEXTJS
    FASTAPI --> WORKER1
    FASTAPI --> WORKER2
    FASTAPI --> WORKERN
    WORKER1 --> PG_CONTAINER
    WORKER2 --> PG_CONTAINER
    WORKERN --> PG_CONTAINER
    FASTAPI --> REDIS_CONTAINER

    LB --> APP1
    LB --> APP2
    LB --> APPN
    APP1 --> PG_MASTER
    APP2 --> PG_MASTER
    APPN --> PG_MASTER
    PG_MASTER --> PG_SLAVE
    APP1 --> REDIS_CLUSTER
    APP2 --> REDIS_CLUSTER
    APPN --> REDIS_CLUSTER

    PROMETHEUS --> APP1
    PROMETHEUS --> APP2
    PROMETHEUS --> APPN
    GRAFANA --> PROMETHEUS
    ELK_STACK --> APP1
    ELK_STACK --> APP2
    ELK_STACK --> APPN

    style DEV_FRONTEND fill:#e3f2fd
    style FASTAPI fill:#f3e5f5
    style PG_MASTER fill:#fce4ec
    style PROMETHEUS fill:#e8f5e9
```

### 9. Monitoring & Observability Architecture

```mermaid
graph LR
    subgraph "Data Collection Layer"
        LOG_COLLECTOR[Log Collector]
        METRICS_COLLECTOR[Metrics Collector]
        TRACE_COLLECTOR[Trace Collector]
        EVENT_COLLECTOR[Event Collector]
    end

    subgraph "Data Processing Layer"
        LOG_PROCESSOR[Log Processor]
        METRICS_PROCESSOR[Metrics Processor]
        TRACE_PROCESSOR[Trace Processor]
        ALERT_PROCESSOR[Alert Processor]
    end

    subgraph "Storage Layer"
        ELASTICSEARCH[(Elasticsearch)]
        PROMETHEUS_DB[(Prometheus TSDB)]
        JAEGER[Jaeger Storage]
        EVENT_STORE[(Event Store)]
    end

    subgraph "Visualization Layer"
        KIBANA[Kibana Log Analysis]
        GRAFANA_DASH[Grafana Dashboard]
        JAEGER_UI[Jaeger Tracing UI]
        ALERT_MANAGER[AlertManager]
    end

    subgraph "Data Sources"
        APPLICATION_LOGS[Application Logs]
        SYSTEM_LOGS[System Logs]
        API_METRICS[API Metrics]
        BUSINESS_METRICS[Business Metrics]
        ERROR_TRACKING[Error Tracking]
        PERFORMANCE_TRACES[Performance Traces]
    end

    APPLICATION_LOGS --> LOG_COLLECTOR
    SYSTEM_LOGS --> LOG_COLLECTOR
    API_METRICS --> METRICS_COLLECTOR
    BUSINESS_METRICS --> METRICS_COLLECTOR
    ERROR_TRACKING --> TRACE_COLLECTOR
    PERFORMANCE_TRACES --> TRACE_COLLECTOR

    LOG_COLLECTOR --> LOG_PROCESSOR
    METRICS_COLLECTOR --> METRICS_PROCESSOR
    TRACE_COLLECTOR --> TRACE_PROCESSOR
    EVENT_COLLECTOR --> ALERT_PROCESSOR

    LOG_PROCESSOR --> ELASTICSEARCH
    METRICS_PROCESSOR --> PROMETHEUS_DB
    TRACE_PROCESSOR --> JAEGER
    ALERT_PROCESSOR --> EVENT_STORE

    ELASTICSEARCH --> KIBANA
    PROMETHEUS_DB --> GRAFANA_DASH
    JAEGER --> JAEGER_UI
    EVENT_STORE --> ALERT_MANAGER

    style LOG_COLLECTOR fill:#e3f2fd
    style METRICS_COLLECTOR fill:#e8f5e9
    style ELASTICSEARCH fill:#fff3e0
    style KIBANA fill:#fce4ec
```

## 🌟 Platform Advantages

Astraeus offers several key advantages for AI agent development:

- **Local-First Architecture** - Complete data privacy and control
- **Flexible LLM Integration** - Support for multiple providers through Google ADK
- **Secure Sandbox Environment** - Isolated execution with PPIO
- **Scalable Design** - Built for both development and production
- **Developer Friendly** - Easy setup and comprehensive documentation

## 🛠️ Available Tools

| Tool | Description | Use Case |
|------|-------------|----------|
| **Computer Use** | Desktop automation via VNC | GUI interactions, system tasks |
| **Browser Tool** | Web automation with Playwright | Scraping, form filling, testing |
| **Web Search** | Tavily API integration | Information gathering |
| **Code Interpreter** | Python code execution | Data analysis, computation |
| **Task List** | Project management | Task tracking and organization |
| **MCP Tools** | Custom tool integrations | Extensible functionality |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use type hints where possible
- Write unit tests for new features
- Update documentation for API changes
- Ensure CI/CD pipeline passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google ADK](https://github.com/google/agent-development-kit) - Agent development framework
- [LiteLLM](https://github.com/BerriAI/litellm) - Unified LLM interface
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [Dramatiq](https://dramatiq.io/) - Reliable task processing
- [Playwright](https://playwright.dev/) - Browser automation
- [PPIO](https://ppio.com/) - Cloud sandbox platform

## 📞 Support

For support and questions:

- 🐛 [Report Bug](https://github.com/zcxGGmu/Astraeus/issues)
- 💬 [Discussions](https://github.com/zcxGGmu/Astraeus/discussions)
- 📧 Email: support@astraeus.ai
- 📱 WeChat Group: Scan QR code in documentation

---

Built with ❤️ for the global AI developer community