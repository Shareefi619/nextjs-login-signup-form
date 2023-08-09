import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/app/database/conn";
import { Ilogin } from "@/app/interface/interface";
import User, { UserDocument } from "@/app/models/schema";
import { compare } from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.json();
  const { email, password } = body as Ilogin;

  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  try {
    const existingUser: UserDocument | null = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const passwordMatched = await compare(password, existingUser.password);

    if (!passwordMatched) {
      return new NextResponse(JSON.stringify({ message: "Invalid Password" }), {
        status: 401,
      });
    }
    // create a TokenData
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      firstName: existingUser.firstName,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as Secret, {
      expiresIn: "1h",
    });
    const response = new NextResponse(
      JSON.stringify({ message: "Login successful", token }),
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, { httpOnly: true });
   response.cookies.set("email", email, { httpOnly: true });
    return response;
  } catch (error) {
    JSON.stringify({ message: "Internal Server Error" }), { status: 500 };
  }
}
