# Next.js 数据库管理应用

这是一个基于 Next.js 15 的现代化 Web 应用，提供完整的数据库 CRUD 操作功能。

## ? 项目特性

- **现代化架构**: 使用 Next.js 15 App Router 和 React 19
- **数据库集成**: 集成 MySQL 数据库，支持完整的 CRUD 操作
- **响应式设计**: 使用 Tailwind CSS 构建美观的用户界面
- **错误处理**: 完善的错误处理和用户友好的错误提示
- **连接池管理**: 优化的数据库连接池配置

## ? 功能列表

### 1. 用户管理 (CRUD)
- **创建用户**: POST `/api/database` - 添加新用户
- **查询用户**: GET `/api/database` - 获取所有用户
- **更新用户**: PUT `/api/database` - 修改用户信息
- **删除用户**: DELETE `/api/database?id={id}` - 删除指定用户

### 2. 数据库连接测试
- **连接状态**: GET `/api/database/test` - 测试数据库连接状态

### 3. 前端界面
- **数据展示**: 表格形式展示用户数据
- **错误处理**: 友好的错误提示和重试机制
- **加载状态**: 优雅的加载动画

## ?? 技术栈

- **前端框架**: Next.js 15, React 19
- **样式框架**: Tailwind CSS 4
- **数据库**: MySQL 8.0+
- **数据库驱动**: mysql2
- **HTTP 客户端**: Axios
- **开发工具**: ESLint, PostCSS

## ? 安装和运行

### 前置要求
- Node.js 18+ 
- MySQL 8.0+
- npm 或 yarn

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd my-app
```

### 2. 安装依赖
```bash
npm install
# 或
yarn install
```

### 3. 配置数据库
在项目根目录创建 `.env.local` 文件：
```env
# 数据库配置
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=test_db
DB_PORT=3306

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**快速配置**:
```bash
# 复制配置示例文件
cp config-example.txt .env.local
# 编辑 .env.local 文件，填入实际的数据库密码
```

### 4. 创建数据库表
在 MySQL 中执行以下 SQL：
```sql
CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 插入示例数据
INSERT INTO users (name, email, age) VALUES 
  ('张三', 'zhangsan@example.com', 25),
  ('李四', 'lisi@example.com', 30),
  ('王五', 'wangwu@example.com', 28);
```

**或者使用提供的脚本**:
```bash
# 在 MySQL 中执行
mysql -u root -p < database-init.sql
```

### 5. 测试数据库连接
```bash
# 测试数据库连接
node test-db.js
```

### 6. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

**Windows 用户可以使用**:
```bash
start-dev.bat
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

## ? API 接口文档

### 用户管理接口

#### 获取所有用户
```http
GET /api/database
```

**响应示例**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com",
      "age": 25,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 创建用户
```http
POST /api/database
Content-Type: application/json

{
  "name": "新用户",
  "email": "newuser@example.com",
  "age": 25
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "用户创建成功",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "insertId": 2,
    "affectedRows": 1,
    "user": {
      "name": "新用户",
      "email": "newuser@example.com",
      "age": 25
    }
  }
}
```

#### 更新用户
```http
PUT /api/database
Content-Type: application/json

{
  "id": 1,
  "name": "更新后的姓名",
  "email": "updated@example.com",
  "age": 26
}
```

#### 删除用户
```http
DELETE /api/database?id=1
```

### 数据库连接测试接口

#### 测试连接状态
```http
GET /api/database/test
```

**响应示例**:
```json
{
  "success": true,
  "message": "数据库连接成功",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "connection": "success",
    "poolStatus": {
      "threadId": 123,
      "connectionLimit": 10,
      "waitForConnections": true,
      "queueLimit": 0
    }
  }
}
```

## ? 故障排除

### 常见错误及解决方案

#### 1. ECONNREFUSED 错误
**错误信息**: `数据库连接被拒绝`
**原因**: 数据库服务未启动或连接配置错误
**解决方案**:
- 确保 MySQL 服务正在运行
- 检查数据库主机地址和端口
- 验证防火墙设置

#### 2. ER_ACCESS_DENIED_ERROR 错误
**错误信息**: `数据库访问被拒绝`
**原因**: 用户名或密码错误
**解决方案**:
- 检查 `.env.local` 中的数据库凭据
- 确认用户有访问数据库的权限
- 验证数据库用户是否存在

#### 3. ER_BAD_DB_ERROR 错误
**错误信息**: `数据库不存在`
**原因**: 指定的数据库名称不存在
**解决方案**:
- 创建指定的数据库
- 检查数据库名称拼写
- 确认用户有创建数据库的权限

#### 4. 构建时预渲染错误
**错误信息**: `Error occurred prerendering page`
**原因**: 页面在构建时无法访问数据库
**解决方案**:
- 将页面组件改为客户端组件（使用 `"use client"`）
- 在 `useEffect` 中获取数据
- 添加适当的加载状态和错误处理

#### 5. MySQL2 配置警告
**警告信息**: `Ignoring invalid configuration option`
**原因**: 使用了 MySQL2 不支持的配置选项
**解决方案**:
- 已修复配置文件，移除了无效选项
- 使用 `test-db.js` 脚本测试连接
- 检查 MySQL 版本兼容性
- 参考 `DATABASE-CONFIG.md` 了解支持的配置选项

#### 6. 配置选项不兼容
**问题**: 某些配置选项在 MySQL2 中不被支持
**解决方案**:
- 只使用 MySQL2 支持的配置选项
- 参考 `DATABASE-CONFIG.md` 文档
- 移除 `acquireTimeout`, `timeout`, `reconnect` 等无效选项

### 调试步骤

1. **检查数据库连接**:
   ```bash
   # 使用测试脚本
   node test-db.js
   
   # 或使用 API 端点
   curl http://localhost:3000/api/database/test
   ```

2. **查看应用日志**:
   ```bash
   npm run dev
   # 观察控制台输出的错误信息
   ```

3. **验证环境变量**:
   - 确保 `.env.local` 文件存在
   - 检查变量值是否正确
   - 重启开发服务器

4. **测试数据库连接**:
   ```bash
   mysql -h 127.0.0.1 -u root -p
   # 输入密码后测试连接
   ```

5. **检查 MySQL 服务状态**:
   ```bash
   # Windows
   net start | findstr MySQL
   
   # Linux/Mac
   sudo systemctl status mysql
   ```

### 快速诊断工具

项目提供了多个诊断工具：

- **`test-db.js`**: 独立的数据库连接测试脚本
- **`/api/database/test`**: API 端点测试数据库连接
- **`database-init.sql`**: 数据库初始化脚本
- **`start-dev.bat`**: Windows 快速启动脚本
- **`DATABASE-CONFIG.md`**: MySQL2 配置选项说明文档

## ? 项目结构

```
my-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── database/
│   │   │       ├── config.js          # 数据库配置
│   │   │       ├── database.js        # 数据库操作函数
│   │   │       ├── route.js           # 用户管理API
│   │   │       └── test/
│   │   │           └── route.js       # 连接测试API
│   │   ├── globals.css                # 全局样式
│   │   ├── layout.js                  # 应用布局
│   │   └── page.js                    # 主页面
│   └── ...
├── public/                             # 静态资源
├── database-init.sql                   # 数据库初始化脚本
├── test-db.js                         # 数据库连接测试脚本
├── start-dev.bat                      # Windows 快速启动脚本
├── config-example.txt                 # 环境变量配置示例
├── DATABASE-CONFIG.md                 # MySQL2 配置说明文档
├── package.json                        # 项目依赖
└── README.md                          # 项目文档
```

## ? 部署

### 生产环境配置
1. 设置生产环境数据库连接
2. 配置环境变量
3. 构建应用: `npm run build`
4. 启动生产服务器: `npm start`

### 环境变量
- `DB_HOST`: 数据库主机地址
- `DB_USER`: 数据库用户名
- `DB_PASSWORD`: 数据库密码
- `DB_NAME`: 数据库名称
- `DB_PORT`: 数据库端口

## ? 贡献

欢迎提交 Issue 和 Pull Request！

## ? 许可证

MIT License

## ? 支持

如果遇到问题，请：
1. 查看本文档的故障排除部分
2. 运行 `node test-db.js` 测试数据库连接
3. 检查 GitHub Issues
4. 创建新的 Issue 描述问题

---

**注意**: 这是一个开发中的项目，请在生产环境使用前进行充分测试。
