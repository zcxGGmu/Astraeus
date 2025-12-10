// 本地 PostgreSQL 数据库客户端
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

// 从环境变量读取数据库配置
const config: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'kortix',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
};

class DatabaseClient {
  private config: DatabaseConfig;
  public auth: any; // 模拟认证接口

  constructor(config: DatabaseConfig) {
    this.config = config;
    
    // 创建模拟的认证对象
    this.auth = {
      getSession: async () => ({ 
        data: { session: null }, 
        error: null 
      }),
      getUser: async () => ({ 
        data: { user: null }, 
        error: null 
      }),
      onAuthStateChange: (callback: any) => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
      signOut: async () => ({ error: null }),
      mfa: {
        enroll: async () => ({ data: null, error: null }),
        challenge: async () => ({ data: null, error: null }),
        verify: async () => ({ data: null, error: null }),
        challengeAndVerify: async () => ({ data: null, error: null }),
        unenroll: async () => ({ data: null, error: null }),
        getAuthenticatorAssuranceLevel: async () => ({ data: null, error: null })
      }
    };
  }

  // 模拟 Supabase 的查询接口
  from(table: string) {
    return new TableQuery(table, this.config);
  }

  // 添加 storage 模拟
  storage = {
    from: () => ({
      upload: async () => ({ data: null, error: null }),
      download: async () => ({ data: null, error: null }),
      remove: async () => ({ data: null, error: null }),
      createSignedUrl: async () => ({ data: null, error: null })
    })
  };

  // 直接执行 SQL 查询
  async query(sql: string, params: any[] = []) {
    try {
      // 在浏览器环境中，通过 API 路由调用
      const response = await fetch('/api/db/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params })
      });
      
      if (!response.ok) {
        throw new Error(`Database error: ${response.statusText}`);
      }
      
      const result = await response.json();
      return { data: result.rows, error: null };
    } catch (error) {
      console.error('Database query error:', error);
      return { data: null, error };
    }
  }

  // 🔧 添加 RPC 方法支持 (兼容 Supabase API)
  async rpc(functionName: string, params: any = {}) {
    try {
      // 对于 get_personal_account，返回模拟数据
      if (functionName === 'get_personal_account') {
        return {
          data: {
            id: 'personal-account-id',
            name: 'Personal Account',
            email: 'user@example.com',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          error: null
        };
      }
      
      // 对于 get_account_by_slug，返回模拟数据
      if (functionName === 'get_account_by_slug') {
        return {
          data: {
            id: 'account-id',
            slug: params.slug || 'default-account',
            name: 'Account Name',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          error: null
        };
      }
      
      // 其他RPC调用的通用处理
      console.warn(`RPC function '${functionName}' not implemented, returning null`);
      return { data: null, error: null };
    } catch (error) {
      console.error(`RPC error for '${functionName}':`, error);
      return { data: null, error };
    }
  }
}

class TableQuery {
  private table: string;
  private config: DatabaseConfig;
  private selectFields: string = '*';
  private whereConditions: string[] = [];
  private orderBy: string = '';
  private limitValue: number | null = null;
  private offsetValue: number | null = null;

  constructor(table: string, config: DatabaseConfig) {
    this.table = table;
    this.config = config;
  }

  select(fields: string = '*') {
    this.selectFields = fields;
    return this;
  }

  eq(column: string, value: any) {
    this.whereConditions.push(`${column} = '${value}'`);
    return this;
  }

  neq(column: string, value: any) {
    this.whereConditions.push(`${column} != '${value}'`);
    return this;
  }

  like(column: string, value: string) {
    this.whereConditions.push(`${column} LIKE '${value}'`);
    return this;
  }

  in(column: string, values: any[]) {
    const valueStr = values.map(v => `'${v}'`).join(',');
    this.whereConditions.push(`${column} IN (${valueStr})`);
    return this;
  }

  order(column: string, { ascending = true }: { ascending?: boolean } = {}) {
    this.orderBy = `ORDER BY ${column} ${ascending ? 'ASC' : 'DESC'}`;
    return this;
  }

  limit(count: number) {
    this.limitValue = count;
    return this;
  }

  range(from: number, to: number) {
    this.limitValue = to - from + 1;
    this.offsetValue = from;
    return this;
  }

  // 添加 single 方法
  single() {
    this.limitValue = 1;
    return this;
  }

  // 执行查询 - 兼容 Supabase 的直接调用方式
  async execute() {
    return await this._executeQuery();
  }

  // 内部查询执行方法
  private async _executeQuery() {
    let sql = `SELECT ${this.selectFields} FROM ${this.table}`;
    
    if (this.whereConditions.length > 0) {
      sql += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    
    if (this.orderBy) {
      sql += ` ${this.orderBy}`;
    }
    
    if (this.limitValue) {
      sql += ` LIMIT ${this.limitValue}`;
    }
    
    if (this.offsetValue) {
      sql += ` OFFSET ${this.offsetValue}`;
    }

    try {
      const response = await fetch('/api/db/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params: [] })
      });
      
      if (!response.ok) {
        throw new Error(`Database error: ${response.statusText}`);
      }
      
      const result = await response.json();
      const data = this.limitValue === 1 ? result.rows[0] : result.rows;
      return { data, error: null };
    } catch (error) {
      console.error('Database query error:', error);
      return { data: null, error };
    }
  }

  // 添加兼容属性 - 让对象可以直接访问 data 和 error
  get data() {
    return this._executeQuery().then(result => result.data);
  }

  get error() {
    return this._executeQuery().then(result => result.error);
  }

  // 兼容 Supabase 的 Promise-like 行为
  then(onfulfilled?: any, onrejected?: any) {
    return this._executeQuery().then(onfulfilled, onrejected);
  }

  // 插入数据
  async insert(data: Record<string, any>) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(v => `'${v}'`).join(', ');
    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING *`;
    
    try {
      const response = await fetch('/api/db/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params: [] })
      });
      
      const result = await response.json();
      return { data: result.rows[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // 更新数据
  async update(data: Record<string, any>) {
    const setClause = Object.entries(data)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(', ');
    
    let sql = `UPDATE ${this.table} SET ${setClause}`;
    
    if (this.whereConditions.length > 0) {
      sql += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    
    sql += ' RETURNING *';
    
    try {
      const response = await fetch('/api/db/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params: [] })
      });
      
      const result = await response.json();
      return { data: result.rows, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // 删除数据
  async delete() {
    let sql = `DELETE FROM ${this.table}`;
    
    if (this.whereConditions.length > 0) {
      sql += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    
    try {
      const response = await fetch('/api/db/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params: [] })
      });
      
      const result = await response.json();
      return { data: result.rows, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

// 创建数据库客户端实例
export const db = new DatabaseClient(config);

// 兼容原有的 createClient 函数
export function createClient() {
  return db;
} 