#!/usr/bin/env node

/**
 * 数据库连接测试脚本
 * 使用方法: node test-db.js
 */

const mysql = require("mysql2/promise");

// 数据库配置（从环境变量或默认值获取）
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Zyzyld99.",
  database: process.env.DB_NAME || "test_db",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0,
  // 移除所有不支持的配置选项
  // acquireTimeout, maxIdle, idleTimeout 等都不被支持
};

async function testDatabaseConnection() {
  console.log("? 开始测试数据库连接...");
  console.log("? 连接配置:");
  console.log(`   主机: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`   用户: ${dbConfig.user}`);
  console.log(`   数据库: ${dbConfig.database}`);
  console.log("");

  let pool;
  let connection;

  try {
    // 创建连接池
    console.log("? 创建数据库连接池...");
    pool = mysql.createPool(dbConfig);

    // 测试连接
    console.log("? 测试数据库连接...");
    connection = await pool.getConnection();
    
    // 测试 ping
    await connection.ping();
    console.log("? 数据库连接成功！");

    // 测试查询
    console.log("? 测试数据库查询...");
    const [rows] = await connection.query("SELECT 1 as test");
    console.log("? 数据库查询测试成功！");

    // 检查数据库是否存在
    console.log("??  检查数据库结构...");
    const [databases] = await connection.query("SHOW DATABASES");
    const dbExists = databases.some(db => db.Database === dbConfig.database);
    
    if (dbExists) {
      console.log(`? 数据库 '${dbConfig.database}' 存在`);
      
      // 检查表是否存在
      await connection.query(`USE ${dbConfig.database}`);
      const [tables] = await connection.query("SHOW TABLES");
      
      if (tables.length > 0) {
        console.log("? 数据库表存在:");
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
        
        // 检查用户表数据
        const [users] = await connection.query("SELECT COUNT(*) as count FROM users");
        console.log(`? 用户表中有 ${users[0].count} 条记录`);
      } else {
        console.log("??  数据库中没有表");
      }
    } else {
      console.log(`? 数据库 '${dbConfig.database}' 不存在`);
      console.log("? 请运行 database-init.sql 脚本来创建数据库和表");
    }

    // 显示数据库版本信息
    const [version] = await connection.query("SELECT VERSION() as version");
    console.log(`??  MySQL 版本: ${version[0].version}`);

  } catch (error) {
    console.error("? 数据库连接测试失败:");
    console.error(`   错误代码: ${error.code}`);
    console.error(`   错误信息: ${error.message}`);
    
    // 提供具体的解决建议
    if (error.code === 'ECONNREFUSED') {
      console.log("\n? 解决建议:");
      console.log("   1. 确保 MySQL 服务正在运行");
      console.log("   2. 检查主机地址和端口是否正确");
      console.log("   3. 检查防火墙设置");
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("\n? 解决建议:");
      console.log("   1. 检查用户名和密码是否正确");
      console.log("   2. 确认用户有访问数据库的权限");
      console.log("   3. 检查用户是否被允许从当前主机连接");
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log("\n? 解决建议:");
      console.log("   1. 创建指定的数据库");
      console.log("   2. 检查数据库名称拼写");
      console.log("   3. 确认用户有创建数据库的权限");
    }
    
    process.exit(1);
  } finally {
    // 清理资源
    if (connection) {
      connection.release();
    }
    if (pool) {
      await pool.end();
    }
  }

  console.log("\n? 所有测试通过！数据库配置正确。");
  console.log("? 现在可以启动 Next.js 应用了:");
  console.log("   npm run dev");
}

// 运行测试
testDatabaseConnection().catch(console.error);
