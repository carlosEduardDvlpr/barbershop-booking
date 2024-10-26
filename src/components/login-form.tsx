'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import axios from 'axios';
import { LoginResponse } from '@/app/api/login/route';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  async function handleLoginSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    setLoading(true);
    setError('');

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    try {
      const response = await axios.post<LoginResponse>('/api/login', {
        email,
        password,
      });
      const data = response.data;
      console.log(data)

      setLoading(false);

      if(data) {
        router.replace("/")
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Entre com seu email e acesse sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleLoginSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              ref={passwordInputRef}
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {loading && <Loader2 className="mr-2 animate-spin" />}
            Login
          </Button>
          {error && (
            <div>
              <h1 className="text-lg font-bold text-red-600">Erro no login.</h1>
              <p className="text-sm text-red-600">Senha ou email inválidos.</p>
            </div>
          )}
        </form>
        <div className="mt-4 text-center text-sm">
          Não possui uma conta?{' '}
          <Link href="/register" className="underline">
            Registre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
