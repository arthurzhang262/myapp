#!/usr/bin/env node

/**
 * ���ݿ����Ӳ��Խű�
 * ʹ�÷���: node test-db.js
 */

const mysql = require("mysql2/promise");

// ���ݿ����ã��ӻ���������Ĭ��ֵ��ȡ��
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Zyzyld99.",
  database: process.env.DB_NAME || "test_db",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0,
  // �Ƴ����в�֧�ֵ�����ѡ��
  // acquireTimeout, maxIdle, idleTimeout �ȶ�����֧��
};

async function testDatabaseConnection() {
  console.log("? ��ʼ�������ݿ�����...");
  console.log("? ��������:");
  console.log(`   ����: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`   �û�: ${dbConfig.user}`);
  console.log(`   ���ݿ�: ${dbConfig.database}`);
  console.log("");

  let pool;
  let connection;

  try {
    // �������ӳ�
    console.log("? �������ݿ����ӳ�...");
    pool = mysql.createPool(dbConfig);

    // ��������
    console.log("? �������ݿ�����...");
    connection = await pool.getConnection();
    
    // ���� ping
    await connection.ping();
    console.log("? ���ݿ����ӳɹ���");

    // ���Բ�ѯ
    console.log("? �������ݿ��ѯ...");
    const [rows] = await connection.query("SELECT 1 as test");
    console.log("? ���ݿ��ѯ���Գɹ���");

    // ������ݿ��Ƿ����
    console.log("??  ������ݿ�ṹ...");
    const [databases] = await connection.query("SHOW DATABASES");
    const dbExists = databases.some(db => db.Database === dbConfig.database);
    
    if (dbExists) {
      console.log(`? ���ݿ� '${dbConfig.database}' ����`);
      
      // �����Ƿ����
      await connection.query(`USE ${dbConfig.database}`);
      const [tables] = await connection.query("SHOW TABLES");
      
      if (tables.length > 0) {
        console.log("? ���ݿ�����:");
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
        
        // ����û�������
        const [users] = await connection.query("SELECT COUNT(*) as count FROM users");
        console.log(`? �û������� ${users[0].count} ����¼`);
      } else {
        console.log("??  ���ݿ���û�б�");
      }
    } else {
      console.log(`? ���ݿ� '${dbConfig.database}' ������`);
      console.log("? ������ database-init.sql �ű����������ݿ�ͱ�");
    }

    // ��ʾ���ݿ�汾��Ϣ
    const [version] = await connection.query("SELECT VERSION() as version");
    console.log(`??  MySQL �汾: ${version[0].version}`);

  } catch (error) {
    console.error("? ���ݿ����Ӳ���ʧ��:");
    console.error(`   �������: ${error.code}`);
    console.error(`   ������Ϣ: ${error.message}`);
    
    // �ṩ����Ľ������
    if (error.code === 'ECONNREFUSED') {
      console.log("\n? �������:");
      console.log("   1. ȷ�� MySQL ������������");
      console.log("   2. ���������ַ�Ͷ˿��Ƿ���ȷ");
      console.log("   3. ������ǽ����");
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("\n? �������:");
      console.log("   1. ����û����������Ƿ���ȷ");
      console.log("   2. ȷ���û��з������ݿ��Ȩ��");
      console.log("   3. ����û��Ƿ�����ӵ�ǰ��������");
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log("\n? �������:");
      console.log("   1. ����ָ�������ݿ�");
      console.log("   2. ������ݿ�����ƴд");
      console.log("   3. ȷ���û��д������ݿ��Ȩ��");
    }
    
    process.exit(1);
  } finally {
    // ������Դ
    if (connection) {
      connection.release();
    }
    if (pool) {
      await pool.end();
    }
  }

  console.log("\n? ���в���ͨ�������ݿ�������ȷ��");
  console.log("? ���ڿ������� Next.js Ӧ����:");
  console.log("   npm run dev");
}

// ���в���
testDatabaseConnection().catch(console.error);
