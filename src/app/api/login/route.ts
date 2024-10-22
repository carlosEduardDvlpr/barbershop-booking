import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/app/_lib/prisma';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  session: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as LoginProps;
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json<LoginResponse>({ session: '' }, { status: 200 });
  }

  try {
    const user = await db.user.findUniqueOrThrow({
      where: { email },
    });
    const userPassword = user.password;

    const passwordResult = bcrypt.compareSync(password, userPassword);

    if (!passwordResult) {
      return NextResponse.json<LoginResponse>({ session: '' }, { status: 400 });
    } else {
      return NextResponse.json<LoginResponse>(
        { session: 'AAA' },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json<LoginResponse>({ session: '' }, { status: 400 });
  } finally {
    await db.$disconnect();
  }
}
