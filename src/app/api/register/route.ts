import { db } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { verifyEmail } from '@/utils/verifyEmail';
import { NextResponse } from 'next/server';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface RegisterProps {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface RegisterResponse {
  error?: string;
  user?: User;
}

export async function POST(req: Request) {
  const body = (await req.json()) as RegisterProps;
  const { name, email, password, confirmedPassword } = body;

  if (!name || !email || !password || !confirmedPassword) {
    return NextResponse.json(
      { error: 'missing required fields' },
      { status: 400 },
    );
  }

  if (name.length < 3) {
    return NextResponse.json({ error: 'invalid username.' }, { status: 400 });
  }

  if (!verifyEmail(email)) {
    return NextResponse.json({ error: 'invalid email.' }, { status: 400 });
  }

  if (password.length < 8 || password !== confirmedPassword) {
    return NextResponse.json({ error: 'invalid password.' }, { status: 400 });
  }

  const hash = bcrypt.hashSync(password, 12);

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'user already exists' },
          { status: 400 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
