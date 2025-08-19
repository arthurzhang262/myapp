// 数据库配置文件
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Zyzyld99.",
  database: process.env.DB_NAME || "test_db",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,

};

module.exports = dbConfig;
