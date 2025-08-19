-- ���ݿ��ʼ���ű�
-- ���� MySQL ��ִ�д˽ű���������Ҫ�����ݿ�ͱ�

-- �������ݿ�
CREATE DATABASE IF NOT EXISTS test_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ʹ�����ݿ�
USE test_db;

-- �����û���
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT '�û�����',
  email VARCHAR(100) UNIQUE NOT NULL COMMENT '�û�����',
  age INT COMMENT '�û�����',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '����ʱ��',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '����ʱ��'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='�û���Ϣ��';

-- ����ʾ������
INSERT INTO users (name, email, age) VALUES 
  ('����', 'zhangsan@example.com', 25),
  ('����', 'lisi@example.com', 30),
  ('����', 'wangwu@example.com', 28),
  ('����', 'zhaoliu@example.com', 35),
  ('Ǯ��', 'qianqi@example.com', 27)
ON DUPLICATE KEY UPDATE 
  name = VALUES(name),
  age = VALUES(age),
  updated_at = CURRENT_TIMESTAMP;

-- ��������
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ��ʾ��ṹ
DESCRIBE users;

-- ��ʾʾ������
SELECT * FROM users;

-- ��ʾ���ݿ���Ϣ
SELECT 
  DATABASE() as current_database,
  VERSION() as mysql_version,
  NOW() as current_time;
