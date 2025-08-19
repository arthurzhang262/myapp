const mysql = require("mysql2/promise");
const dbConfig = require("./config");

// 创建全局的 MySQL 连接池
const pool = mysql.createPool({
  ...dbConfig,
  // 移除无效的配置选项
  // 使用MySQL2支持的配置
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
    
    // 根据错误类型提供更详细的错误信息
    if (error.code === 'ECONNREFUSED') {
      throw new Error(`数据库连接被拒绝: ${error.message}. 请检查数据库服务是否正在运行，以及连接配置是否正确。`);
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      throw new Error(`数据库访问被拒绝: ${error.message}. 请检查用户名和密码是否正确。`);
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      throw new Error(`数据库不存在: ${error.message}. 请检查数据库名称是否正确。`);
    } else {
      throw new Error(`数据库查询失败: ${error.message}`);
    }
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
    
    // 根据错误类型提供更详细的错误信息
    if (error.code === 'ECONNREFUSED') {
      throw new Error(`数据库连接被拒绝: ${error.message}. 请检查数据库服务是否正在运行，以及连接配置是否正确。`);
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      throw new Error(`数据库访问被拒绝: ${error.message}. 请检查用户名和密码是否正确。`);
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      throw new Error(`数据库不存在: ${error.message}. 请检查数据库名称是否正确。`);
    } else {
      throw new Error(`数据库更新失败: ${error.message}`);
    }
  } finally {
    // 确保连接被释放回连接池
    if (connection) {
      connection.release();
    }
  }
}

/**
 * 测试数据库连接
 * @returns {Promise<boolean>} 连接是否成功
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error("数据库连接测试失败:", error);
    return false;
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
    // 只返回存在的配置选项
    waitForConnections: pool.config.waitForConnections,
    queueLimit: pool.config.queueLimit
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
  testConnection,
  getPoolStatus,
  closePool,
  pool
};