// export async function GET(request: Request) {}

// export async function HEAD(request: Request) {}

// export async function POST(request: Request) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request: Request) {}

export function POST() {
  return Response.json(
    { message: "POST request received" },
     { status: 200 });
}
export function GET() {
  return Response.json(
    { message: "GET request received" }, 
    { status: 200 });
}
