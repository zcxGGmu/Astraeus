# Astraeus (FuFanManus) - AI Agent Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116+-green.svg)](https://fastapi.tiangolo.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)

Astraeus (also known as FuFanManus) is a comprehensive, production-ready AI Agent platform based on the Suna project, refactored to support local private deployment and the Chinese developer ecosystem. It enables the creation, deployment, and management of intelligent agents with powerful capabilities in a secure, scalable environment.

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

Astraeus is refactored from the Suna project with significant improvements for local deployment:

### Original Suna Architecture Dependencies Removed:
- ❌ Supabase cloud database → ✅ Local PostgreSQL
- ❌ Daytona sandbox service → ✅ PPIO sandbox environment
- ❌ Native LLM APIs → ✅ Google ADK framework unified management

### New Architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend/UI   │────│   FastAPI API   │────│  Background     │
│   (Next.js)     │    │   (Python)      │    │  Workers        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
            ┌───────▼──────┐ ┌───▼────┐ ┌───▼──────┐
            │ PostgreSQL   │ │ Redis  │ │  PPIO    │
            │  (Local DB)  │ │(Cache) │ │ Sandbox  │
            └──────────────┘ └────────┘ └──────────┘
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
conda create -n fufanmanus python=3.11
conda activate fufanmanus

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
python scripts/03_init_fufanmanus_table.py  # Initialize tables
```

#### 5. Environment Configuration
Create a `.env` file in the backend directory:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=fufanmanus
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
CREATE DATABASE fufanmanus;
CREATE USER fufanmanus WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE fufanmanus TO fufanmanus;
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
│   └── fufanmanus/      # Agent configuration
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

## 🆚 Comparison with Suna

| Feature | Suna | Astraeus (FuFanManus) |
|---------|------|----------------------|
| Database | Supabase (Cloud) | PostgreSQL (Local) |
| Sandbox | Daytona | PPIO |
| LLM Integration | Native APIs | Google ADK Framework |
| Deployment | Cloud Only | Local/Cloud |
| Chinese Support | Limited | Full Support |
| Localization | English | Chinese/English |
| Self-Hosting | Difficult | Easy |

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

- [Suna](https://github.com/kortix-ai/suna) - Original project foundation (Apache-2.0 License)
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