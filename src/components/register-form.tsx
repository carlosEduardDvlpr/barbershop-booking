'use client';
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
import Link from 'next/link';
import React from 'react';

export function RegisterForm() {
  const [error, setError] = React.useState('');

  const inputName = React.useRef<HTMLInputElement>(null);
  const inputEmail = React.useRef<HTMLInputElement>(null);
  const inputPassword = React.useRef<HTMLInputElement>(null);
  const inputConfirmedPassword = React.useRef<HTMLInputElement>(null);

  const handleSubmitForm = (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');

    const name = inputName.current?.value;
    const email = inputEmail.current?.value;
    const password = inputPassword.current?.value;
    const confirmedPassword = inputConfirmedPassword.current?.value;

    const REGEXP_EMAIL = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    );

    if (!name || !email || !password || !confirmedPassword) {
      setError('Algum campo não foi preenchido.');
      return;
    }

    if (name.length < 3) {
      setError('O nome do usuário deve ter no mínimo 3 letras.');
      return;
    }

    if (!REGEXP_EMAIL.test(email)) {
      setError('O email informado não é válido.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter no minimo 8 caracteres.');
      return;
    }

    if (password !== confirmedPassword) {
      setError('As senhas não conferem!');
      return;
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
          {error && (
            <div className="text-red-600">
              <h1 className="font-bold">Erro no formulário</h1>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <Button type="submit" className="w-full">
            Registrar-se
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Já possui uma conta?{' '}
          <Link href="#" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
