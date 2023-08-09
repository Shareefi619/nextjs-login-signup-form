import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/app/database/conn";
import { cookies } from "next/headers";
import User from "@/app/models/schema";

connectMongo();

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Token: ", token);
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "User not logged in" }), {
      status: 401,
    });
  }

  try {
    const email = cookieStore.get("email")?.value;
    console.log("Email: ", email);
    const user = await User.findOne({email});
    console.log(user)
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error while fetching user data" }),
      { status: 500 }
    );
  }
}
