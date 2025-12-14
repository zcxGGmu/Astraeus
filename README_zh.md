# Astraeus - AI智能体平台

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116+-green.svg)](https://fastapi.tiangolo.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)

**语言:** [English](README.md) | [中文](README_zh.md)

Astraeus 是一个综合性、生产就绪的 AI 智能体平台，专为本地私有化部署和全球开发者生态系统设计。能够在安全、可扩展的环境中创建、部署和管理具有强大能力的智能体。

## 🌟 核心特性

- 🤖 **多模型支持** - 集成多种 LLM 提供商（DeepSeek、GPT-4o、通义千问等）
- 🛡️ **沙箱执行** - 基于 PPIO 的安全隔离智能体操作环境
- 🌐 **Web 自动化** - 内置 Playwright 浏览器自动化
- 📦 **丰富的工具生态** - 计算机使用、网络搜索、代码解释器等
- ⚡ **后台处理** - 使用 Dramatiq 进行异步任务执行
- 🔐 **认证与安全** - 基于 JWT 的认证和加密凭据
- 📊 **可观测性** - 集成 Structlog 和 Langfuse 日志记录
- 🔧 **外部集成** - 支持 Composio、MCP 和 Pipedream
- 🏠 **本地部署** - 完整的 PostgreSQL 和 Redis 私有化部署
- 🇨🇳 **中国优化** - 专为中国开发者和服务设计

## 🏗️ 系统架构

Astraeus 采用现代化的分布式架构设计，专为本地私有部署优化：

### 核心架构组件：
- ✅ **PostgreSQL** - 本地数据持久化存储
- ✅ **PPIO 沙箱环境** - 安全的智能体执行环境
- ✅ **Google ADK 框架** - 统一的 LLM 管理接口
- ✅ **FastAPI** - 高性能异步 API 服务
- ✅ **Next.js 15** - 现代化前端框架

### 系统整体架构图

```mermaid
graph TB
    %% 用户层
    subgraph "用户界面层"
        WEB[Web 浏览器]
        UI[Next.js 前端应用]
    end

    %% API 网关层
    subgraph "API 网关层"
        API[FastAPI 服务器]
        AUTH[JWT 认证中间件]
        CORS[CORS 中间件]
    end

    %% 业务服务层
    subgraph "业务服务层"
        AGENT_SVC[智能体服务]
        PROJECT_SVC[项目管理服务]
        THREAD_SVC[对话线程服务]
        BILLING_SVC[计费服务]
        SANDBOX_SVC[沙箱管理服务]
        TRIGGER_SVC[触发器服务]
    end

    %% 核心组件层
    subgraph "核心组件层"
        ADK[Google ADK 框架]
        LLM[LLM 管理器]
        WORKFLOW[工作流引擎]
        TOOL_REGISTRY[工具注册表]
        MCP[MCP 集成]
    end

    %% 工具执行层
    subgraph "工具执行层"
        COMPUTER[计算机使用工具]
        BROWSER[浏览器自动化工具]
        SEARCH[网络搜索工具]
        CODE[代码解释器工具]
        DATA[数据提供者工具]
    end

    %% 沙箱环境层
    subgraph "沙箱环境层"
        PPIO[PPIO 云沙箱]
        DOCKER[Docker 容器]
        VNC[VNC 远程桌面]
    end

    %% 后台任务层
    subgraph "后台任务层"
        DRAMATIQ[Dramatiq 任务队列]
        WORKER[后台工作进程]
        SCHEDULER[任务调度器]
    end

    %% 数据存储层
    subgraph "数据存储层"
        POSTGRES[(PostgreSQL 主库)]
        REDIS[(Redis 缓存)]
        FILES[文件存储]
        SCREENSHOTS[截图存储]
    end

    %% 外部集成层
    subgraph "外部集成层"
        DEEPSEEK[DeepSeek API]
        OPENAI[OpenAI API]
        QWEN[通义千问 API]
        TAVILY[Tavily 搜索]
        FIRECRAWL[Firecrawl API]
        COMPOSIO[Composio 集成]
        LANGFUSE[Langfuse 监控]
    end

    %% 连接关系
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

    API -.->|异步任务| DRAMATIQ
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

### 技术栈概览

```mermaid
pie title 技术栈分布
    "前端技术" : 25
    "后端服务" : 30
    "数据存储" : 15
    "AI/LLM" : 20
    "DevOps" : 10
```

## 🚀 快速开始

### 系统要求

- **后端**: Python 3.11+
- **前端**: Node.js 18+
- **数据库**: PostgreSQL 17+, Redis 7+
- **Docker** (可选，用于容器化部署)
- **PPIO 账户** (用于沙箱环境)

### 安装步骤

#### 1. 克隆仓库
```bash
git clone https://github.com/zcxGGmu/Astraeus.git
cd Astraeus
```

#### 2. 前端设置
```bash
cd frontend  # 进入前端目录
npm install  # 或使用: npm ci 进行清洁安装
npm run dev  # 在 http://localhost:3000 启动前端
```

#### 3. 后端设置
```bash
cd backend  # 进入后端目录

# 创建虚拟环境
conda create -n astraeus python=3.11
conda activate astraeus

# 安装依赖
pip install -r requirements.txt
```

#### 4. 数据库设置
```bash
# 启动 PostgreSQL 和 Redis 服务
# (参见下面的详细设置说明)

# 配置数据库
python scripts/01_setup_database.py  # 配置 PostgreSQL
python scripts/02_setup_redis.py     # 配置 Redis
python scripts/03_init_astraeus_table.py  # 初始化表
```

#### 5. 环境配置
在后端目录创建 `.env` 文件：

```env
# 数据库配置
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=astraeus
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# PPIO 沙箱配置
E2B_DOMAIN=sandbox.ppio.cn
E2B_API_KEY=your_ppio_api_key
SANDBOX_TEMPLATE_CODE=br263f8awvhrqd7ss1ze
SANDBOX_TEMPLATE_DESKTOP=4imxoe43snzcxj95hvha
SANDBOX_TEMPLATE_BROWSER=7xvs3snis3tkuq3y8u96
SANDBOX_TEMPLATE_BASE=txi15v1zt0q72i1gcyqb

# LLM 配置
# DeepSeek
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_API_BASE=https://api.deepseek.com
MODEL_TO_USE=deepseek/deepseek-chat

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1
# MODEL_TO_USE=gpt-4o

# 其他 API 密钥
TAVILY_API_KEY=your_tavily_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key

# 应用设置
ENV_MODE=local
LOGGING_LEVEL=INFO
```

#### 6. 启动服务
```bash
# 终端 1: 启动 FastAPI 服务器
python api.py

# 终端 2: 启动后台工作进程
dramatiq run_agent_background
```

#### 7. 访问应用
- 前端: http://localhost:3000
- API: http://localhost:8000
- API 文档: http://localhost:8000/docs

## 📋 环境配置

### 数据库设置

#### PostgreSQL 安装

**Windows:**
1. 从 [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) 下载
2. 使用默认设置运行安装程序
3. 设置 postgres 用户密码
4. 安装 pgAdmin 进行数据库管理

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

创建数据库：
```sql
CREATE DATABASE astraeus;
CREATE USER astraeus WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE astraeus TO astraeus;
```

#### Redis 安装

**Windows:**
1. 从 [redis-windows](https://github.com/redis-windows/redis-windows/releases) 下载
2. 解压并运行: `redis-server redis.conf`

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install redis-server

# 或从源码编译
wget http://download.redis.io/releases/redis-7.0.4.tar.gz
tar -zxvf redis-7.0.4.tar.gz
cd redis-7.0.4
make
make install
redis-server redis.conf
```

### PPIO 沙箱设置

1. 在 [PPIO Console](https://ppio.com/console) 注册
2. 从仪表板获取 API 密钥
3. 记下沙箱模板的模板 ID

## 🔧 核心功能模块架构

### 1. 智能体执行系统架构

```mermaid
sequenceDiagram
    participant User as 用户
    participant Frontend as 前端应用
    participant API as FastAPI服务
    participant Agent as 智能体服务
    participant ADK as Google ADK
    participant LLM as LLM服务
    participant Tool as 工具系统
    participant Sandbox as 沙箱环境
    participant DB as 数据库

    User->>Frontend: 发送任务请求
    Frontend->>API: POST /api/agents/{id}/run
    API->>Agent: 创建智能体执行实例
    Agent->>DB: 保存执行记录

    loop 智能体执行循环
        Agent->>ADK: 处理用户输入
        ADK->>LLM: 获取模型响应
        LLM-->>ADK: 返回响应/工具调用
        alt 需要工具调用
            ADK->>Tool: 执行工具
            Tool->>Sandbox: 在沙箱中执行
            Sandbox-->>Tool: 返回执行结果
            Tool-->>ADK: 返回结果
        end
        ADK-->>Agent: 返回执行状态
        Agent->>DB: 更新执行状态
        Agent-->>Frontend: 流式返回结果
    end

    Agent-->>API: 执行完成
    API-->>Frontend: 返回最终结果
    Frontend-->>User: 显示任务结果
```

### 2. 数据流架构

```mermaid
flowchart LR
    %% 数据输入
    subgraph "数据输入层"
        USER_INPUT[用户输入]
        FILE_UPLOAD[文件上传]
        API_INPUT[API 调用]
        WEBHOOK[Webhook 触发]
    end

    %% 数据处理
    subgraph "数据处理层"
        VALIDATOR[数据验证器]
        TRANSFORMER[数据转换器]
        ENRICHER[数据增强器]
        SANITIZER[数据清理器]
    end

    %% 业务逻辑
    subgraph "业务逻辑层"
        AGENT_LOGIC[智能体处理逻辑]
        WORKFLOW_ENGINE[工作流引擎]
        RULE_ENGINE[规则引擎]
        STATE_MACHINE[状态机]
    end

    %% 数据存储
    subgraph "数据存储层"
        POSTGRES_DB[(PostgreSQL)]
        REDIS_CACHE[(Redis)]
        FILE_STORAGE[文件系统]
        VECTOR_STORE[向量数据库]
    end

    %% 数据输出
    subgraph "数据输出层"
        STREAM_RESPONSE[流式响应]
        FILE_RESULT[文件结果]
        DASHBOARD[仪表板]
        NOTIFICATION[通知系统]
    end

    %% 数据流
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

### 3. 沙箱环境架构

```mermaid
graph TB
    subgraph "沙箱管理层"
        SANDBOX_MGR[沙箱管理器]
        RESOURCE_MGR[资源管理器]
        LIFECYCLE[生命周期管理]
        MONITOR[监控系统]
    end

    subgraph "沙箱类型"
        DOCKER_SANDBOX[Docker 容器沙箱]
        VNC_SANDBOX[VNC 桌面沙箱]
        BROWSER_SANDBOX[浏览器沙箱]
        CLI_SANDBOX[命令行沙箱]
    end

    subgraph "执行环境"
        PYTHON_ENV[Python 环境]
        NODE_ENV[Node.js 环境]
        SYSTEM_TOOLS[系统工具]
        BROWSER_ENG[浏览器引擎]
    end

    subgraph "安全隔离"
        NETWORK_ISOLATION[网络隔离]
        FILE_SYSTEM_ISOLATION[文件系统隔离]
        PROCESS_ISOLATION[进程隔离]
        RESOURCE_LIMITS[资源限制]
    end

    subgraph "工具支持"
        PLAYWRIGHT[Playwright]
        SELENIUM[Selenium]
        PUPPETEER[Puppeteer]
        CUSTOM_TOOLS[自定义工具]
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

### 4. LLM 集成架构

```mermaid
graph LR
    subgraph "LLM 接口层"
        ADK_WRAPPER[ADK 包装器]
        LITE_LLM[LiteLLM 统一接口]
        MODEL_ROUTER[模型路由器]
        FALLBACK[故障转移]
    end

    subgraph "模型提供者"
        DEEPSEEK_MODEL[DeepSeek]
        OPENAI_MODEL[OpenAI]
        QWEN_MODEL[通义千问]
        LOCAL_MODEL[本地模型]
    end

    subgraph "模型管理"
        MODEL_CACHE[模型缓存]
        TOKEN_COUNTER[Token 计数器]
        RATE_LIMITER[速率限制器]
        COST_TRACKER[成本追踪]
    end

    subgraph "功能增强"
        PROMPT_TEMPLATES[提示词模板]
        CONTEXT_MANAGER[上下文管理]
        MEMORY_SYSTEM[记忆系统]
        TOOL_INTEGRATION[工具集成]
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

### 5. 工具系统架构

```mermaid
mindmap
  root((工具系统))
    内置工具
      Computer Use
        VNC 远程控制
        桌面自动化
        文件操作
      Browser Use
        Playwright 驱动
        页面交互
        数据抓取
      Web Search
        Tavily 集成
        多搜索引擎
        结果过滤
      Code Interpreter
        Python 执行
        数据分析
        可视化

    外部集成
      MCP 工具
        自定义协议
        第三方服务
        扩展接口
      Composio
        500+ 工具
        SaaS 集成
        API 连接器
      Pipedream
        工作流自动化
        事件触发
        数据管道

    数据提供者
        Amazon
        LinkedIn
        Twitter
        Yahoo Finance
        Zillow

    开发框架
        工具注册表
        参数验证
        结果解析
        错误处理
        日志记录
```

### 6. 数据库架构

```mermaid
erDiagram
    %% 用户认证相关表
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

    %% 项目相关表
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

    %% 智能体相关表
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

    %% ADK 框架相关表
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

    %% 外部集成表
    api_keys {
        string id PK
        string user_id FK
        string name
        string key_hash
        json permissions
        timestamp created_at
        timestamp last_used
    }

    %% 关系定义
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

### 7. 安全架构

```mermaid
graph TB
    subgraph "认证层"
        JWT_AUTH[JWT 认证]
        REFRESH_TOKEN[刷新令牌]
        SESSION_MGR[会话管理]
        OAUTH[OAuth 集成]
    end

    subgraph "授权层"
        RBAC[基于角色的访问控制]
        PERMISSION_CHECKER[权限检查器]
        RESOURCE_POLICY[资源策略]
        API_LIMITER[API 限流]
    end

    subgraph "数据安全"
        ENCRYPTION[数据加密]
        KEY_MGR[密钥管理]
        DATA_MASKING[数据脱敏]
        AUDIT_LOG[审计日志]
    end

    subgraph "网络安全"
        HTTPS[HTTPS 传输]
        CORS_POLICY[CORS 策略]
        RATE_LIMITING[速率限制]
        IP_WHITELIST[IP 白名单]
    end

    subgraph "沙箱安全"
        CONTAINER_ISOLATION[容器隔离]
        NETWORK_ISOLATION[网络隔离]
        FILE_ISOLATION[文件隔离]
        RESOURCE_QUOTAS[资源配额]
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

### 8. 部署架构

```mermaid
graph TB
    subgraph "本地开发环境"
        DEV_FRONTEND[前端开发服务器<br/>:3000]
        DEV_API[API 开发服务器<br/>:8000]
        DEV_DB[(本地 PostgreSQL)]
        DEV_REDIS[(本地 Redis)]
    end

    subgraph "Docker 容器化部署"
        subgraph "前端容器"
            NGINX[Nginx 反向代理]
            NEXTJS[Next.js 应用]
        end

        subgraph "后端容器"
            FASTAPI[FastAPI 服务]
            WORKER1[Worker 进程 1]
            WORKER2[Worker 进程 2]
            WORKERN[Worker 进程 N]
        end

        subgraph "数据容器"
            PG_CONTAINER[(PostgreSQL)]
            REDIS_CONTAINER[(Redis)]
        end
    end

    subgraph "生产环境"
        subgraph "负载均衡层"
            LB[负载均衡器]
            CDN[CDN 加速]
        end

        subgraph "应用层"
            APP1[应用实例 1]
            APP2[应用实例 2]
            APPN[应用实例 N]
        end

        subgraph "数据库集群"
            PG_MASTER[(PostgreSQL 主库)]
            PG_SLAVE[(PostgreSQL 从库)]
            REDIS_CLUSTER[(Redis 集群)]
        end

        subgraph "监控与日志"
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

### 9. 监控与可观测性架构

```mermaid
graph LR
    subgraph "数据收集层"
        LOG_COLLECTOR[日志收集器]
        METRICS_COLLECTOR[指标收集器]
        TRACE_COLLECTOR[链路追踪收集器]
        EVENT_COLLECTOR[事件收集器]
    end

    subgraph "数据处理层"
        LOG_PROCESSOR[日志处理器]
        METRICS_PROCESSOR[指标处理器]
        TRACE_PROCESSOR[链路处理器]
        ALERT_PROCESSOR[告警处理器]
    end

    subgraph "存储层"
        ELASTICSEARCH[(Elasticsearch)]
        PROMETHEUS_DB[(Prometheus TSDB)]
        JAEGER[Jaeger 存储]
        EVENT_STORE[(事件存储)]
    end

    subgraph "可视化层"
        KIBANA[Kibana 日志分析]
        GRAFANA_DASH[Grafana 仪表板]
        JAEGER_UI[Jaeger 追踪界面]
        ALERT_MANAGER[AlertManager]
    end

    subgraph "数据源"
        APPLICATION_LOGS[应用日志]
        SYSTEM_LOGS[系统日志]
        API_METRICS[API 指标]
        BUSINESS_METRICS[业务指标]
        ERROR_TRACKING[错误追踪]
        PERFORMANCE_TRACES[性能追踪]
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

## 🎯 核心功能与模块

### 1. 用户认证模块
- 用户注册、登录和登出
- 权限管理
- 会话管理
- 对话历史管理

### 2. LLM 服务集成
- 在线模型：DeepSeek-chat、通义千问3、GPT-4o
- 本地模型：vLLM、Ollama REST API 集成
- 通过 Google ADK 框架统一管理

### 3. 智能体沙箱环境
- 创建、销毁和管理智能体沙箱环境
- 管理对话线程和文件资源
- 在隔离环境中执行外部工具

### 4. 外部工具集成
- 预建工具：
  - 网络搜索
  - 计算机使用（桌面自动化）
  - 浏览器使用（网络自动化）
  - 代码解释器
- 自定义 MCP 服务集成
- 自定义外部工具服务集成

## 📚 API 文档

### 认证

所有 API 端点都需要 JWT 认证：

```python
import requests

# 登录
response = requests.post("http://localhost:8000/auth/login", json={
    "email": "user@example.com",
    "password": "password"
})
token = response.json()["access_token"]

# 使用 token
headers = {"Authorization": f"Bearer {token}"}
```

### 主要端点

#### 认证
```http
POST   /auth/register          # 用户注册
POST   /auth/login             # 用户登录
POST   /auth/logout            # 用户登出
GET    /auth/me                # 获取当前用户信息
```

#### 项目
```http
GET    /api/projects           # 列出项目
POST   /api/projects           # 创建项目
GET    /api/projects/{id}      # 获取项目详情
PUT    /api/projects/{id}      # 更新项目
DELETE /api/projects/{id}      # 删除项目
```

#### 对话线程
```http
GET    /api/threads            # 列出线程
POST   /api/threads            # 创建线程
GET    /api/threads/{id}       # 获取线程消息
POST   /api/threads/{id}/messages  # 发送消息
```

#### 智能体
```http
GET    /api/agents             # 列出智能体
POST   /api/agents             # 创建智能体
GET    /api/agents/{id}        # 获取智能体详情
POST   /api/agents/{id}/run    # 执行智能体
```

## 🔧 开发

### 本地开发设置

1. **前端开发**
```bash
cd frontend
npm install
npm run dev    # 带热重载的开发服务器
npm run build  # 生产构建
```

2. **后端开发**
```bash
cd backend
pip install -r requirements.txt
python api.py    # 启动开发服务器
```

3. **代码结构**
```
├── agent/                # 智能体执行系统
│   ├── run.py           # 核心智能体运行器
│   ├── tools/           # 智能体工具目录
│   └── config/          # 智能体配置
├── auth/                # 认证系统
├── composio_integration/ # 第三方集成
├── sandbox/             # 沙箱环境
├── services/            # 核心服务（数据库、Redis 等）
├── triggers/            # 事件触发器
├── utils/               # 共享工具
└── api.py              # FastAPI 应用入口
```

### 测试

```bash
# 运行所有测试
pytest

# 运行特定测试
python tests/03_test_simple_browser.py
```

## 🐳 Docker 部署

### 开发 Docker

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 生产 Docker

1. **构建镜像**
```bash
docker build -t astraeus:latest .
```

2. **使用 Docker Compose 部署**
```bash
docker-compose -f docker-compose.yml up -d
```

3. **扩展工作进程**
```bash
docker-compose up -d --scale worker=4
```

## 📊 监控与可观测性

### 日志记录
平台使用 Structlog 进行结构化日志记录：
```python
from utils.logger import logger

logger.info("智能体已执行", agent_id="123", duration=5.2)
```

### 使用 Langfuse 进行指标追踪
追踪智能体性能和用户交互：
```python
from services.langfuse import langfuse

# 自动追踪智能体运行
```

### 使用 Sentry 进行错误追踪
```python
import sentry_sdk

# 如果配置了 SENTRY_DSN，错误会自动报告
```

## 🔐 安全考虑

- 所有凭据使用 AES-256 加密存储
- API 密钥安全存储在环境变量中
- 沙箱提供与主机系统的完全隔离
- 可配置过期时间的 JWT 令牌
- Web 应用程序的 CORS 保护
- API 端点速率限制
- 通过 SQLAlchemy ORM 防止 SQL 注入

## 🌟 平台优势

Astraeus 为 AI 智能体开发提供了几个关键优势：

- **本地优先架构** - 完整的数据隐私和控制
- **灵活的 LLM 集成** - 通过 Google ADK 支持多个提供商
- **安全沙箱环境** - 使用 PPIO 进行隔离执行
- **可扩展设计** - 专为开发和生产环境构建
- **开发者友好** - 易于设置和全面的文档

## 🛠️ 可用工具

| 工具 | 描述 | 使用场景 |
|------|-------------|----------|
| **Computer Use** | 通过 VNC 进行桌面自动化 | GUI 交互、系统任务 |
| **Browser Tool** | 使用 Playwright 进行网络自动化 | 爬虫、表单填充、测试 |
| **Web Search** | Tavily API 集成 | 信息收集 |
| **Code Interpreter** | Python 代码执行 | 数据分析、计算 |
| **Task List** | 项目管理 | 任务跟踪和组织 |
| **MCP Tools** | 自定义工具集成 | 可扩展功能 |

## 🤝 贡献

我们欢迎贡献！请遵循以下步骤：

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 打开 Pull Request

### 开发指南

- Python 代码遵循 PEP 8
- 尽可能使用类型提示
- 为新功能编写单元测试
- 更新 API 更改的文档
- 确保 CI/CD 流程通过

## 📄 许可证

本项目在 MIT 许可证下授权 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Google ADK](https://github.com/google/agent-development-kit) - 智能体开发框架
- [LiteLLM](https://github.com/BerriAI/litellm) - 统一 LLM 接口
- [FastAPI](https://fastapi.tiangolo.com/) - 现代 Web 框架
- [Dramatiq](https://dramatiq.io/) - 可靠的任务处理
- [Playwright](https://playwright.dev/) - 浏览器自动化
- [PPIO](https://ppio.com/) - 云沙箱平台

## 📞 支持

如需支持和问题：

- 🐛 [报告 Bug](https://github.com/zcxGGmu/Astraeus/issues)
- 💬 [讨论](https://github.com/zcxGGmu/Astraeus/discussions)
- 📧 邮箱: support@astraeus.ai
- 📱 微信群: 扫描文档中的二维码

---

用 ❤️ 为全球 AI 开发者社区构建