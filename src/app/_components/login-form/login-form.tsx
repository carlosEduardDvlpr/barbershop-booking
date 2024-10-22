'use client';

import { LoginResponse } from '@/app/api/login/route';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const LoginForm = () => {
  const [formError, setFormError] = React.useState('');
  const [formLoading, setFormLoading] = React.useState(false);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passInputRef = React.useRef<HTMLInputElement>(null);

  const handleLoginSubmit = React.useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setFormError('');
      setFormLoading(true);

      if (emailInputRef.current && passInputRef.current) {
        const email = emailInputRef.current.value;
        const password = passInputRef.current.value;

        try {
          const response = await axios.post<LoginResponse>('api/login', {
            email,
            password: password,
          });
          setFormLoading(false);
        } catch (error) {
          setFormLoading(false);
        }
      }
    },
    [],
  );

  return (
    <form onSubmit={(ev) => handleLoginSubmit(ev)}>
      <label htmlFor="email">Email</label>
      <input type="email" required ref={emailInputRef} id="email" />
      <label htmlFor="password">Senha</label>
      <input type="password" required ref={passInputRef} id="password" />
      {formError && (
        <div>
          <p>Erro ao fazer login</p>
          <p>{formError}</p>
        </div>
      )}
      <button
        className="bg-blue-400 mt-2 flex items-center justify-center gap-2"
        disabled={formLoading}
      >
        {formLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
        Entrar
      </button>
      <div className="mt-5 underline">
        <Link href="/register">Ir para cadastro</Link>
      </div>
    </form>
  );
};
