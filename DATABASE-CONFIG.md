# MySQL2 数据库配置说明

## 支持的配置选项

MySQL2 只支持以下配置选项，其他选项会导致警告或错误：

### 基本连接配置
- `host`: 数据库主机地址 (默认: 127.0.0.1)
- `user`: 数据库用户名 (默认: root)
- `password`: 数据库密码
- `database`: 数据库名称 (默认: test_db)
- `port`: 数据库端口 (默认: 3306)

### 连接池配置
- `connectionLimit`: 连接池最大连接数 (默认: 10)
- `waitForConnections`: 是否等待可用连接 (默认: true)
- `queueLimit`: 连接队列限制 (默认: 0)

## 不支持的配置选项

以下配置选项在 MySQL2 中不被支持，会导致警告：

? **不支持的选项**:
- `acquireTimeout` - 连接获取超时
- `timeout` - 连接超时
- `reconnect` - 重连配置
- `maxIdle` - 最大空闲连接数
- `idleTimeout` - 空闲超时

## 推荐配置

```javascript
const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "your_password",
  database: "test_db",
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
};
```

## 环境变量配置

在 `.env.local` 文件中设置：

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=test_db
DB_PORT=3306
```

## 故障排除

### 配置警告
如果看到 "Ignoring invalid configuration option" 警告：
1. 检查配置文件，移除不支持的选项
2. 只使用上述支持的配置选项
3. 重启应用

### 连接问题
- 确保 MySQL 服务正在运行
- 验证用户名和密码正确
- 检查数据库是否存在
- 确认用户有访问权限

## 测试连接

使用提供的测试脚本验证配置：

```bash
node test-db.js
```

这将测试数据库连接并显示详细的诊断信息。
