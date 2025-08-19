This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/nextjs/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API: Database Operations

### Database Configuration

数据库连接配置位于 `src/app/api/database/database.js` 文件中：

```javascript
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root", 
  password: "Zyzyld99.",
  database: "test_db",
});
```

### Database Functions

`database.js` 提供了以下可复用的数据库操作函数：

#### 1. executeQuery(sql, params)
- **用途**: 执行查询语句（SELECT）
- **参数**: 
  - `sql`: SQL查询语句
  - `params`: 查询参数数组（可选）
- **返回**: 查询结果数组
- **示例**: `const users = await executeQuery("SELECT * FROM users WHERE age > ?", [18]);`

#### 2. executeUpdate(sql, params)
- **用途**: 执行更新操作（INSERT, UPDATE, DELETE）
- **参数**:
  - `sql`: SQL语句
  - `params`: 参数数组
- **返回**: 操作结果对象（包含affectedRows, insertId等）
- **示例**: `const result = await executeUpdate("INSERT INTO users (name, email) VALUES (?, ?)", ["John", "john@example.com"]);`

#### 3. getPoolStatus()
- **用途**: 获取连接池状态信息
- **返回**: 连接池配置信息

#### 4. closePool()
- **用途**: 关闭数据库连接池
- **返回**: Promise

### Database API Endpoints

#### GET /api/database
- **用途**: 获取所有用户数据
- **返回**: 用户数据数组
- **示例响应**:
```json
{
  "data": [
    {"id": 1, "name": "John", "email": "john@example.com", "age": 25}
  ]
}
```

#### POST /api/database
- **用途**: 创建新用户
- **请求体**:
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "age": 25
}
```
- **返回**: 创建成功信息和插入ID

#### PUT /api/database
- **用途**: 更新用户信息
- **请求体**:
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "age": 26
}
```
- **返回**: 更新成功信息和影响行数

#### DELETE /api/database?id=1
- **用途**: 删除指定用户
- **参数**: `id` - 用户ID
- **返回**: 删除成功信息和影响行数

### 数据库操作最佳实践

1. **连接管理**: 使用连接池自动管理数据库连接，避免连接泄漏
2. **错误处理**: 所有数据库操作都包含完整的错误处理和日志记录
3. **参数化查询**: 使用参数化查询防止SQL注入攻击
4. **资源释放**: 自动确保数据库连接被正确释放回连接池
5. **事务支持**: 可以扩展支持数据库事务操作

## API: JWT Login

Endpoints implemented under App Router:

- `POST /api/login` ¡ª issue a JWT token
- `GET /api/login` ¡ª verify a JWT token

### Environment

- Create `.env.local` in the project root and set a secret (recommended):

```
NEXT_PUBLIC_ACCESS_TOKEN_SECRET=your-strong-secret
```

If not provided, a development fallback secret is used (`dev-secret`). Do not use fallback in production.

### POST /api/login

- Request (JSON):

```
{
  "id": 123,
  "username": "john",
  "expiresIn": "1d" // optional, e.g. "1h", "7d"
}
```

- Response (JSON):

```
{
  "token": "<JWT>"
}
```

### GET /api/login

Verifies the JWT from the Authorization header.

- Headers:
  - `Authorization: Bearer <JWT>`

- Successful Response (JSON):

```
{
  "valid": true,
  "payload": { /* decoded claims */ }
}
```

- Failure Response (JSON):

```
{
  "valid": false,
  "message": "Token not provided" | "jwt expired" | ...
}
```

### Quick test with cURL

```
# 1) Issue token
curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"id":1,"username":"john"}'

# 2) Verify token (replace <JWT>)
curl -s -X GET http://localhost:3000/api/login \
  -H "Authorization: Bearer <JWT>"
```

## 项目更新记录

### 2024年12月数据库重构

#### 主要改进
1. **代码分离**: 将MySQL连接和数据库操作逻辑从`route.js`提取到`database.js`
2. **函数化设计**: 创建了可复用的数据库操作函数（executeQuery, executeUpdate）
3. **连接池管理**: 统一的连接池配置和连接管理
4. **错误处理**: 完善的错误处理和资源释放机制
5. **API扩展**: 新增了完整的CRUD操作（创建、读取、更新、删除）

#### 技术特点
1. **模块化设计**: 数据库操作逻辑独立，便于维护和测试
2. **连接安全**: 自动连接管理，防止连接泄漏
3. **参数化查询**: 防止SQL注入攻击
4. **统一接口**: 所有数据库操作使用统一的函数接口
5. **扩展性**: 易于添加新的数据库操作功能

#### 架构优势
- 遵循SOLID原则，单一职责和开闭原则
- 使用设计模式（工厂模式）管理数据库连接
- 代码复用性高，减少重复代码
- 便于单元测试和集成测试

#### 未来改进方向
1. 添加数据库事务支持
2. 实现数据库连接池监控
3. 支持多种数据库类型
4. 添加数据库迁移功能
5. 实现数据库查询性能优化

### 2024年早期版本

#### 主要问题
1. **API响应处理**：前端使用axios或fetch API时，需要调用`response.json()`来解析数据
2. **错误处理机制**：缺少统一的错误处理和用户提示机制
3. **状态管理**：前端状态管理不够完善，可能导致数据不一致
4. **性能优化**：缺少必要的性能优化措施

#### 改进计划
1. **统一API接口**：建议使用fetch API或axios，并统一错误处理
2. **错误处理优化**：完善try-catch机制，提供用户友好的错误提示
3. **状态管理优化**：实现更完善的前端状态管理，确保数据一致性
4. **性能优化**：添加必要的性能优化措施，提升用户体验
5. **代码质量**：提高代码可读性和可维护性

#### 技术栈
- 基于Next.js 15，支持async/await语法
- 使用App Router架构
- 支持服务器端渲染
- 集成Tailwind CSS样式框架

#### 待解决问题
1. 数据库连接管理优化
2. 用户认证流程完善
3. 数据验证机制
4. 前端React Suspense集成
5. 移动端响应式设计优化
