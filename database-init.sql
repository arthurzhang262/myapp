-- 数据库初始化脚本
-- 请在 MySQL 中执行此脚本来创建必要的数据库和表

-- 创建数据库
CREATE DATABASE IF NOT EXISTS test_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE test_db;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT '用户姓名',
  email VARCHAR(100) UNIQUE NOT NULL COMMENT '用户邮箱',
  age INT COMMENT '用户年龄',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息表';

-- 插入示例数据
INSERT INTO users (name, email, age) VALUES 
  ('张三', 'zhangsan@example.com', 25),
  ('李四', 'lisi@example.com', 30),
  ('王五', 'wangwu@example.com', 28),
  ('赵六', 'zhaoliu@example.com', 35),
  ('钱七', 'qianqi@example.com', 27)
ON DUPLICATE KEY UPDATE 
  name = VALUES(name),
  age = VALUES(age),
  updated_at = CURRENT_TIMESTAMP;

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- 显示表结构
DESCRIBE users;

-- 显示示例数据
SELECT * FROM users;

-- 显示数据库信息
SELECT 
  DATABASE() as current_database,
  VERSION() as mysql_version,
  NOW() as current_time;
