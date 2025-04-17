import { NextResponse } from "next/server";
import { verifyToken, getAuthCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const token = await getAuthCookie();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        role: true,
        
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
