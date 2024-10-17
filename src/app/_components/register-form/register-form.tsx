'use client';

import React from 'react';

export const RegisterForm = () => {
  const [formError, setFormError] = React.useState('');

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const telInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const pass1InputRef = React.useRef<HTMLInputElement>(null);
  const pass2InputRef = React.useRef<HTMLInputElement>(null);

  const handleRegisterClick = React.useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setFormError('');

     const EMAIL_REGEXP = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
      );
      const TEL_REGEXP = new RegExp('^[0-9]{2}[0-9]{9}$');

      if (
        nameInputRef.current &&
        telInputRef.current &&
        emailInputRef.current &&
        pass1InputRef.current &&
        pass2InputRef.current
      ) {
        const name = nameInputRef.current.value;
        const tel = telInputRef.current.value;
        const email = emailInputRef.current.value;
        const pass1 = pass1InputRef.current.value;
        const pass2 = pass2InputRef.current.value;

        if (!name || name.length < 3) {
          setFormError('Insira seu nome! (minimo 3 letras)');
          return;
        }

        if (!TEL_REGEXP.test(tel)) {
          setFormError('Digite um número de telefone válido!');
          return;
        }

        if (!EMAIL_REGEXP.test(email)) {
          setFormError('Digite um email válido!');
          return;
        }

        if (pass1.length < 8) {
          setFormError('A senha precisa de pelo 8 caracteres!');
          return;
        }

        if (pass1 !== pass2) {
          setFormError('As senhas não são iguais!');
          return;
        }
      }
    },
    [],
  );

  return (
    <form onSubmit={(ev) => handleRegisterClick(ev)}>
      <label htmlFor="name">Nome</label>
      <input type="text" required ref={nameInputRef} id="name" />
      <label htmlFor="tel">Tel</label>
      <input type="text" required ref={telInputRef} id="tel" />
      <label htmlFor="email">Email</label>
      <input type="email" required ref={emailInputRef} id="email" />
      <label htmlFor="password">Senha</label>
      <input type="password" required ref={pass1InputRef} id="password" />
      <label htmlFor="password2">Repita a senha</label>
      <input type="password" required ref={pass2InputRef} id="password2" />
      {formError && (
        <div>
          <p>Erro no formulário</p>
          <p>{formError}</p>
        </div>
      )}
      <button className="bg-blue-400 mt-2">Enviar</button>
    </form>
  );
};
