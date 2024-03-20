import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { disconnect } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { realname, role, email, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    realname,
    role,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await disconnect();
  }
};

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}