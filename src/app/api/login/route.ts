import { db } from '@/lib/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  session: string | Omit<User, 'password' | 'id'>;
}

export async function POST(req: Request) {
  const body = (await req.json()) as LoginProps;
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json<LoginResponse>({ session: '' }, { status: 400 });
  }

  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    const userPassword = user.password;
    const comparePassword = bcrypt.compareSync(password, userPassword);

    if (!comparePassword) {
      return NextResponse.json<LoginResponse>({ session: '' }, { status: 400 });
    }

    return NextResponse.json<LoginResponse>(
      { session: { name: user.name, email: user.email } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json<LoginResponse>({ session: '' }, { status: 400 });
  }
}
