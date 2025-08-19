import jwt from "jsonwebtoken";

function resolveSecret() {
  return (
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET ||
    process.env.ACCESS_TOKEN_SECRET ||
    "dev-secret"
  );
}

export async function createAccessToken(payload, expiresIn = "1d") {
  return jwt.sign(payload, resolveSecret(), { expiresIn });
}

export async function verifyToken(request) {
  const rawHeader =
    request.headers.get("authorization") || request.headers.get("Authorization");
  if (!rawHeader) {
    throw new Error("Token not provided");
  }

  const token = rawHeader.startsWith("Bearer ")
    ? rawHeader.slice(7).trim()
    : rawHeader.trim();

  const decoded = jwt.verify(token, resolveSecret());
  return decoded;
}

export function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (_err) {
    return null;
  }
}

export async function jwtMiddleware(request) {
  try {
    const decoded = await verifyToken(request);
    return decoded;
  } catch (error) {
    throw error;
  }
}