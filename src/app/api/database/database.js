const mysql = require("mysql2/promise");

// 创建全局的 MySQL 连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1", // 服务器地址
  user: "root",
  password: "Zyzyld99.", // 密码
  database: "test_db",
});

/**
 * 执行查询语句
 * @param {string} sql - SQL查询语句
 * @param {Array} params - 查询参数（可选）
 * @returns {Promise<Array>} 返回查询结果
 */
async function executeQuery(sql, params = []) {
  let connection;
  try {
    // 从连接池中获取连接
    connection = await pool.getConnection();
    
    // 执行查询
    const [rows, fields] = await connection.query(sql, params);
    
    return rows;
  } catch (error) {
    console.error("数据库查询错误:", error);
    throw error;
  } finally {
    // 确保连接被释放回连接池
    if (connection) {
      connection.release();
    }
  }
}

/**
 * 执行插入、更新、删除操作
 * @param {string} sql - SQL语句
 * @param {Array} params - 参数数组
 * @returns {Promise<Object>} 返回操作结果
 */
async function executeUpdate(sql, params = []) {
  let connection;
  try {
    // 从连接池中获取连接
    connection = await pool.getConnection();
    
    // 执行更新操作
    const [result] = await connection.query(sql, params);
    
    return result;
  } catch (error) {
    console.error("数据库更新错误:", error);
    throw error;
  } finally {
    // 确保连接被释放回连接池
    if (connection) {
      connection.release();
    }
  }
}

/**
 * 获取数据库连接池状态
 * @returns {Object} 连接池状态信息
 */
function getPoolStatus() {
  return {
    threadId: pool.threadId,
    connectionLimit: pool.config.connectionLimit,
    acquireTimeout: pool.config.acquireTimeout,
    timeout: pool.config.timeout
  };
}

/**
 * 关闭数据库连接池
 */
async function closePool() {
  try {
    await pool.end();
    console.log("数据库连接池已关闭");
  } catch (error) {
    console.error("关闭连接池时出错:", error);
    throw error;
  }
}

module.exports = {
  executeQuery,
  executeUpdate,
  getPoolStatus,
  closePool,
  pool
};