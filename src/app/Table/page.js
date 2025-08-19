"use client";

import { useState, useEffect } from "react";
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from "@tabler/icons-react";
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import axios from "axios";

// 表头组件
function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

// 数据过滤函数
function filterData(data, search) {
  const query = search.toLowerCase().trim();
  if (!Array.isArray(data) || data.length === 0) return [];
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

// 数据排序函数
function sortData(data, { sortBy, reversed, search }) {
  if (!Array.isArray(data)) return [];
  if (!sortBy) return filterData(data, search);
  return filterData(
    [...data].sort((a, b) => {
      if (reversed) return String(b[sortBy]).localeCompare(String(a[sortBy]));
      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    search
  );
}

// 主表格组件
export default function TableSort() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取用户数据
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:3000/api/database");
      setData(response.data.data || []);
      setSortedData(response.data.data || []);
    } catch (err) {
      console.error('获取用户数据失败:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 设置排序
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setSortBy(field);
    setReverseSortDirection(reversed);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  // 处理搜索变化
  const handleSearchChange = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchUsers();
  }, []);

  // 当数据变化时重新排序
  useEffect(() => {
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search }));
  }, [data, sortBy, reverseSortDirection, search]);

  // 渲染表格行
  const rows = Array.isArray(sortedData)
    ? sortedData.map((row) => (
        <Table.Tr key={row.id || row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>{row.email}</Table.Td>
          <Table.Td>{row.age}</Table.Td>
        </Table.Tr>
      ))
    : [];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Text>加载中...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Text color="red">错误: {error}</Text>
        <button onClick={fetchUsers} style={{ marginTop: '1rem' }}>
          重试
        </button>
      </div>
    );
  }

  return (
    <ScrollArea>
      <TextInput
        placeholder="搜索任何字段..."
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Thead>
          <Table.Tr>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              姓名
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              邮箱
            </Th>
            <Th
              sorted={sortBy === "age"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("age")}
            >
              年龄
            </Th>
          </Table.Tr>
        </Table.Thead>
        
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={3}>
                <Text fw={500} ta="center">
                  没有找到数据
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
