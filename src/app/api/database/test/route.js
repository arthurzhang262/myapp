import { NextResponse } from "next/server";
import { testConnection, getPoolStatus } from "../database";

export async function GET(request) {
  try {
    // 测试数据库连接
    const isConnected = await testConnection();
    
    if (isConnected) {
      const poolStatus = getPoolStatus();
      return NextResponse.json({
        success: true,
        message: "数据库连接成功",
        timestamp: new Date().toISOString(),
        data: {
          connection: "success",
          poolStatus
        }
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: "数据库连接失败",
        timestamp: new Date().toISOString(),
        data: {
          connection: "failed"
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error("数据库连接测试错误:", error);
    return NextResponse.json({
      success: false,
      message: "数据库连接测试失败",
      error: error.message,
      timestamp: new Date().toISOString(),
      data: {
        connection: "error",
        errorCode: error.code || "UNKNOWN_ERROR"
      }
    }, { status: 500 });
  }
}
