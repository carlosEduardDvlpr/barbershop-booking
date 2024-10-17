import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface RegisterProps {
  name: string;
  tel: string;
  email: string;
  pass1: string;
  pass2: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as RegisterProps;
  const { email, tel, name, pass1, pass2 } = body;

  if (!name || !tel || !email || !pass1 || !pass2) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  const EMAIL_REGEXP = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
  );
  const TEL_REGEXP = new RegExp('^[0-9]{2}[0-9]{9}$');

  if (!TEL_REGEXP.test(tel)) {
    return NextResponse.json({ error: 'Invalid tel.' }, { status: 400 });
  }

  if (!EMAIL_REGEXP.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (pass1.length < 8 || pass1 !== pass2) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
  }

  const hash = bcrypt.hashSync(pass1, 12);
  
}
