# MySQL2 ���ݿ�����˵��

## ֧�ֵ�����ѡ��

MySQL2 ֻ֧����������ѡ�����ѡ��ᵼ�¾�������

### ������������
- `host`: ���ݿ�������ַ (Ĭ��: 127.0.0.1)
- `user`: ���ݿ��û��� (Ĭ��: root)
- `password`: ���ݿ�����
- `database`: ���ݿ����� (Ĭ��: test_db)
- `port`: ���ݿ�˿� (Ĭ��: 3306)

### ���ӳ�����
- `connectionLimit`: ���ӳ���������� (Ĭ��: 10)
- `waitForConnections`: �Ƿ�ȴ��������� (Ĭ��: true)
- `queueLimit`: ���Ӷ������� (Ĭ��: 0)

## ��֧�ֵ�����ѡ��

��������ѡ���� MySQL2 �в���֧�֣��ᵼ�¾��棺

? **��֧�ֵ�ѡ��**:
- `acquireTimeout` - ���ӻ�ȡ��ʱ
- `timeout` - ���ӳ�ʱ
- `reconnect` - ��������
- `maxIdle` - ������������
- `idleTimeout` - ���г�ʱ

## �Ƽ�����

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

## ������������

�� `.env.local` �ļ������ã�

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=test_db
DB_PORT=3306
```

## �����ų�

### ���þ���
������� "Ignoring invalid configuration option" ���棺
1. ��������ļ����Ƴ���֧�ֵ�ѡ��
2. ֻʹ������֧�ֵ�����ѡ��
3. ����Ӧ��

### ��������
- ȷ�� MySQL ������������
- ��֤�û�����������ȷ
- ������ݿ��Ƿ����
- ȷ���û��з���Ȩ��

## ��������

ʹ���ṩ�Ĳ��Խű���֤���ã�

```bash
node test-db.js
```

�⽫�������ݿ����Ӳ���ʾ��ϸ�������Ϣ��
