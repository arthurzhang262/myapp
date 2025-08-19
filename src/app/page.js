"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/database");
        setData(response.data.data);
        setError(null);
      } catch (error) {
        console.error("页面加载错误:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">欢迎使用 Next.js 应用</h1>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-lg text-gray-600">正在加载数据...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">页面加载失败</h1>
          <p className="text-lg text-gray-600 mb-4">
            抱歉，页面加载时出现了错误
          </p>
          <p className="text-sm text-gray-500 mb-4">错误信息: {error.message}</p>
          {error.code === 'ECONNREFUSED' && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              <p className="font-semibold">数据库连接失败</p>
              <p className="text-sm">请确保数据库服务正在运行，并且连接配置正确</p>
            </div>
          )}
          <button
            onClick={handleReload}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  // 检查是否有表格数据
  const hasTableData = data && Array.isArray(data) && data.length > 0;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎使用 Next.js 应用</h1>
        <p className="text-lg text-gray-600 mb-8">数据加载成功</p>

        {/* 显示API响应数据 */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">API 响应数据:</h2>
          {hasTableData ? (
            // 如果有表格数据，则显示为表格
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="py-2 px-4 border-b border-gray-200"
                        >
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // 如果没有表格数据，仍然显示原始JSON
            <pre className="text-sm bg-white p-3 rounded border">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
