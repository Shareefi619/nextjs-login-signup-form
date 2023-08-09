import { Iregister } from "./../../interface/interface";
import User, { UserDocument } from "./../../models/schema";
import connectMongo from "@/app/database/conn";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  await connectMongo()
  const body = await req.json();
  const {
    firstName,
    lastName,
    gender,
    contactNumber,
    address,
    email,
    password,
  } = body as Iregister;

  if (
    !firstName ||
    !lastName ||
    !gender ||
    !contactNumber ||
    !address ||
    !email ||
    !password
  ) {
    return new NextResponse(
      JSON.stringify({ message: "All Fields must be provided" }),
      { status: 400 }
    );
  }
  if (firstName.length < 3 || lastName.length < 3) {
    return new NextResponse(
      JSON.stringify({
        message: "First Name  or Last Name must be at least 3 characters",
      }),
      { status: 400 }
    );
  }
  try {
    const existingUser: UserDocument | null = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 409 }
      );
    }

    const hashed = await hash(password, 12);

    const newUser: UserDocument = new User({
      firstName,
      lastName,
      gender,
      contactNumber,
      address,
      email,
      password: hashed,
    });

    const savedUser: UserDocument = await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User Created Successfully", savedUser }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
