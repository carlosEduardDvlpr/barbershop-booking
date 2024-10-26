'use client';
import { RegisterResponse } from '@/app/api/register/route';
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
import { verifyEmail } from '@/utils/verifyEmail';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export function RegisterForm() {
  const router = useRouter();

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const inputName = React.useRef<HTMLInputElement>(null);
  const inputEmail = React.useRef<HTMLInputElement>(null);
  const inputPassword = React.useRef<HTMLInputElement>(null);
  const inputConfirmedPassword = React.useRef<HTMLInputElement>(null);

  const handleSubmitForm = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    const name = inputName.current?.value;
    const email = inputEmail.current?.value;
    const password = inputPassword.current?.value;
    const confirmedPassword = inputConfirmedPassword.current?.value;

    if (!name || !email || !password || !confirmedPassword) {
      setError('Algum campo não foi preenchido.');
      return;
    }

    let shouldReturnError = false;

    if (name.length < 3) {
      setError('O nome do usuário deve ter no mínimo 3 letras.');
      shouldReturnError = true;
    }

    if (!verifyEmail(email)) {
      setError('O email informado não é válido.');
      shouldReturnError = true;
    }

    if (password.length < 8) {
      setError('A senha deve ter no minimo 8 caracteres.');
      shouldReturnError = true;
    }

    if (password !== confirmedPassword) {
      setError('As senhas não conferem!');
      shouldReturnError = true;
    }

    if (shouldReturnError) {
      setLoading(false);
      setSuccess(false);
      return;
    }

    try {
      const response = await axios.post<RegisterResponse>('/api/register', {
        name,
        email,
        password,
        confirmedPassword,
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.replace('/'), 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { error: errorMessage } = error.response
          ?.data as RegisterResponse;
        if (errorMessage === 'user already exists') {
          setError('Esse email já esta registrado, vá para o login.');
        } else {
          setError(error.message);
        }
      }
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registre-se</CardTitle>
        <CardDescription>
          Insira suas informações e cadastre-se em nossa aplicação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmitForm}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              ref={inputName}
              type="text"
              placeholder="seu nome"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              ref={inputEmail}
              type="email"
              placeholder="exemplo@exemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              ref={inputPassword}
              id="password"
              placeholder="minimo 8 caracteres"
              type="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmedPassword">Confirme a senha</Label>
            <Input
              ref={inputConfirmedPassword}
              id="confirmedPassword"
              placeholder="confirme a senha"
              type="text"
              required
            />
          </div>
          {success && (
            <div className="text-green-800">
              <h1 className="font-bold">Registro realizado com successo!</h1>
              <p>Você será redirecionado...</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {error && (
            <div className="text-red-600">
              <h1 className="font-bold">Erro no formulário</h1>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={loading || success}
          >
            {loading && <Loader2 size={16} className="animate-spin mr-2" />}
            Registrar-se
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Já possui uma conta?{' '}
          <Link href="/login" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
