import { NextResponse } from "next/server";
import { executeQuery, executeUpdate, getPoolStatus } from "./database";

export async function GET(request) {
  try {
    const rows = await executeQuery("SELECT * FROM users");
    
    // const jsonData = JSON.parse(JSON.stringify(rows));
    // const responseData = {
    //   success: true,
    //   count: jsonData.length,
    //   timestamp: new Date().toISOString(),
    //   data: jsonData
    // };
    return NextResponse.json({data:rows}, { status: 200 });
    // return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, age } = body;
    
    const result = await executeUpdate(
      "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
      [name, email, age]
    );
    
    // 格式化返回的JSON数据
    const responseData = {
      success: true,
      message: "用户创建成功",
      timestamp: new Date().toISOString(),
      data: {
        insertId: result.insertId,
        affectedRows: result.affectedRows,
        user: { name, email, age }
      }
    };
    
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, email, age } = body;
    
    const result = await executeUpdate(
      "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, id]
    );
    
    const responseData = {
      success: true,
      message: "用户更新成功",
      timestamp: new Date().toISOString(),
      data: {
        affectedRows: result.affectedRows,
        updatedUser: { id, name, email, age }
      }
    };
    
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "缺少用户ID参数" },
        { status: 400 }
      );
    }
    

    const result = await executeUpdate(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    
    const responseData = {
      success: true,
      message: "用户删除成功",
      timestamp: new Date().toISOString(),
      data: {
        affectedRows: result.affectedRows,
        deletedUserId: id
      }
    };
    
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
