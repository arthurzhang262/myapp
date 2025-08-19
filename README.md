# Next.js ���ݿ����Ӧ��

����һ������ Next.js 15 ���ִ��� Web Ӧ�ã��ṩ���������ݿ� CRUD �������ܡ�

## ? ��Ŀ����

- **�ִ����ܹ�**: ʹ�� Next.js 15 App Router �� React 19
- **���ݿ⼯��**: ���� MySQL ���ݿ⣬֧�������� CRUD ����
- **��Ӧʽ���**: ʹ�� Tailwind CSS �������۵��û�����
- **������**: ���ƵĴ�������û��ѺõĴ�����ʾ
- **���ӳع���**: �Ż������ݿ����ӳ�����

## ? �����б�

### 1. �û����� (CRUD)
- **�����û�**: POST `/api/database` - ������û�
- **��ѯ�û�**: GET `/api/database` - ��ȡ�����û�
- **�����û�**: PUT `/api/database` - �޸��û���Ϣ
- **ɾ���û�**: DELETE `/api/database?id={id}` - ɾ��ָ���û�

### 2. ���ݿ����Ӳ���
- **����״̬**: GET `/api/database/test` - �������ݿ�����״̬

### 3. ǰ�˽���
- **����չʾ**: �����ʽչʾ�û�����
- **������**: �ѺõĴ�����ʾ�����Ի���
- **����״̬**: ���ŵļ��ض���

## ?? ����ջ

- **ǰ�˿��**: Next.js 15, React 19
- **��ʽ���**: Tailwind CSS 4
- **���ݿ�**: MySQL 8.0+
- **���ݿ�����**: mysql2
- **HTTP �ͻ���**: Axios
- **��������**: ESLint, PostCSS

## ? ��װ������

### ǰ��Ҫ��
- Node.js 18+ 
- MySQL 8.0+
- npm �� yarn

### 1. ��¡��Ŀ
```bash
git clone <your-repo-url>
cd my-app
```

### 2. ��װ����
```bash
npm install
# ��
yarn install
```

### 3. �������ݿ�
����Ŀ��Ŀ¼���� `.env.local` �ļ���
```env
# ���ݿ�����
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=test_db
DB_PORT=3306

# Ӧ������
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**��������**:
```bash
# ��������ʾ���ļ�
cp config-example.txt .env.local
# �༭ .env.local �ļ�������ʵ�ʵ����ݿ�����
```

### 4. �������ݿ��
�� MySQL ��ִ������ SQL��
```sql
CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ����ʾ������
INSERT INTO users (name, email, age) VALUES 
  ('����', 'zhangsan@example.com', 25),
  ('����', 'lisi@example.com', 30),
  ('����', 'wangwu@example.com', 28);
```

**����ʹ���ṩ�Ľű�**:
```bash
# �� MySQL ��ִ��
mysql -u root -p < database-init.sql
```

### 5. �������ݿ�����
```bash
# �������ݿ�����
node test-db.js
```

### 6. ��������������
```bash
npm run dev
# ��
yarn dev
```

**Windows �û�����ʹ��**:
```bash
start-dev.bat
```

���� [http://localhost:3000](http://localhost:3000) �鿴Ӧ��

## ? API �ӿ��ĵ�

### �û�����ӿ�

#### ��ȡ�����û�
```http
GET /api/database
```

**��Ӧʾ��**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "����",
      "email": "zhangsan@example.com",
      "age": 25,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### �����û�
```http
POST /api/database
Content-Type: application/json

{
  "name": "���û�",
  "email": "newuser@example.com",
  "age": 25
}
```

**��Ӧʾ��**:
```json
{
  "success": true,
  "message": "�û������ɹ�",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "insertId": 2,
    "affectedRows": 1,
    "user": {
      "name": "���û�",
      "email": "newuser@example.com",
      "age": 25
    }
  }
}
```

#### �����û�
```http
PUT /api/database
Content-Type: application/json

{
  "id": 1,
  "name": "���º������",
  "email": "updated@example.com",
  "age": 26
}
```

#### ɾ���û�
```http
DELETE /api/database?id=1
```

### ���ݿ����Ӳ��Խӿ�

#### ��������״̬
```http
GET /api/database/test
```

**��Ӧʾ��**:
```json
{
  "success": true,
  "message": "���ݿ����ӳɹ�",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "connection": "success",
    "poolStatus": {
      "threadId": 123,
      "connectionLimit": 10,
      "waitForConnections": true,
      "queueLimit": 0
    }
  }
}
```

## ? �����ų�

### �������󼰽������

#### 1. ECONNREFUSED ����
**������Ϣ**: `���ݿ����ӱ��ܾ�`
**ԭ��**: ���ݿ����δ�������������ô���
**�������**:
- ȷ�� MySQL ������������
- ������ݿ�������ַ�Ͷ˿�
- ��֤����ǽ����

#### 2. ER_ACCESS_DENIED_ERROR ����
**������Ϣ**: `���ݿ���ʱ��ܾ�`
**ԭ��**: �û������������
**�������**:
- ��� `.env.local` �е����ݿ�ƾ��
- ȷ���û��з������ݿ��Ȩ��
- ��֤���ݿ��û��Ƿ����

#### 3. ER_BAD_DB_ERROR ����
**������Ϣ**: `���ݿⲻ����`
**ԭ��**: ָ�������ݿ����Ʋ�����
**�������**:
- ����ָ�������ݿ�
- ������ݿ�����ƴд
- ȷ���û��д������ݿ��Ȩ��

#### 4. ����ʱԤ��Ⱦ����
**������Ϣ**: `Error occurred prerendering page`
**ԭ��**: ҳ���ڹ���ʱ�޷��������ݿ�
**�������**:
- ��ҳ�������Ϊ�ͻ��������ʹ�� `"use client"`��
- �� `useEffect` �л�ȡ����
- ����ʵ��ļ���״̬�ʹ�����

#### 5. MySQL2 ���þ���
**������Ϣ**: `Ignoring invalid configuration option`
**ԭ��**: ʹ���� MySQL2 ��֧�ֵ�����ѡ��
**�������**:
- ���޸������ļ����Ƴ�����Чѡ��
- ʹ�� `test-db.js` �ű���������
- ��� MySQL �汾������
- �ο� `DATABASE-CONFIG.md` �˽�֧�ֵ�����ѡ��

#### 6. ����ѡ�����
**����**: ĳЩ����ѡ���� MySQL2 �в���֧��
**�������**:
- ֻʹ�� MySQL2 ֧�ֵ�����ѡ��
- �ο� `DATABASE-CONFIG.md` �ĵ�
- �Ƴ� `acquireTimeout`, `timeout`, `reconnect` ����Чѡ��

### ���Բ���

1. **������ݿ�����**:
   ```bash
   # ʹ�ò��Խű�
   node test-db.js
   
   # ��ʹ�� API �˵�
   curl http://localhost:3000/api/database/test
   ```

2. **�鿴Ӧ����־**:
   ```bash
   npm run dev
   # �۲����̨����Ĵ�����Ϣ
   ```

3. **��֤��������**:
   - ȷ�� `.env.local` �ļ�����
   - ������ֵ�Ƿ���ȷ
   - ��������������

4. **�������ݿ�����**:
   ```bash
   mysql -h 127.0.0.1 -u root -p
   # ����������������
   ```

5. **��� MySQL ����״̬**:
   ```bash
   # Windows
   net start | findstr MySQL
   
   # Linux/Mac
   sudo systemctl status mysql
   ```

### ������Ϲ���

��Ŀ�ṩ�˶����Ϲ��ߣ�

- **`test-db.js`**: ���������ݿ����Ӳ��Խű�
- **`/api/database/test`**: API �˵�������ݿ�����
- **`database-init.sql`**: ���ݿ��ʼ���ű�
- **`start-dev.bat`**: Windows ���������ű�
- **`DATABASE-CONFIG.md`**: MySQL2 ����ѡ��˵���ĵ�

## ? ��Ŀ�ṹ

```
my-app/
������ src/
��   ������ app/
��   ��   ������ api/
��   ��   ��   ������ database/
��   ��   ��       ������ config.js          # ���ݿ�����
��   ��   ��       ������ database.js        # ���ݿ��������
��   ��   ��       ������ route.js           # �û�����API
��   ��   ��       ������ test/
��   ��   ��           ������ route.js       # ���Ӳ���API
��   ��   ������ globals.css                # ȫ����ʽ
��   ��   ������ layout.js                  # Ӧ�ò���
��   ��   ������ page.js                    # ��ҳ��
��   ������ ...
������ public/                             # ��̬��Դ
������ database-init.sql                   # ���ݿ��ʼ���ű�
������ test-db.js                         # ���ݿ����Ӳ��Խű�
������ start-dev.bat                      # Windows ���������ű�
������ config-example.txt                 # ������������ʾ��
������ DATABASE-CONFIG.md                 # MySQL2 ����˵���ĵ�
������ package.json                        # ��Ŀ����
������ README.md                          # ��Ŀ�ĵ�
```

## ? ����

### ������������
1. ���������������ݿ�����
2. ���û�������
3. ����Ӧ��: `npm run build`
4. ��������������: `npm start`

### ��������
- `DB_HOST`: ���ݿ�������ַ
- `DB_USER`: ���ݿ��û���
- `DB_PASSWORD`: ���ݿ�����
- `DB_NAME`: ���ݿ�����
- `DB_PORT`: ���ݿ�˿�

## ? ����

��ӭ�ύ Issue �� Pull Request��

## ? ���֤

MIT License

## ? ֧��

����������⣬�룺
1. �鿴���ĵ��Ĺ����ų�����
2. ���� `node test-db.js` �������ݿ�����
3. ��� GitHub Issues
4. �����µ� Issue ��������

---

**ע��**: ����һ�������е���Ŀ��������������ʹ��ǰ���г�ֲ��ԡ�
