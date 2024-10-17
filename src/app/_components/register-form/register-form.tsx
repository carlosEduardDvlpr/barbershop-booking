export const RegisterForm = () => {
  return <form>
    <label htmlFor="name">Nome</label>
    <input type="text" id="name" />
    <label htmlFor="tel">Tel</label>
    <input type="text" id="tel" />
    <label htmlFor="email">Email</label>
    <input type="email" id="email" />
    <label htmlFor="password">Senha</label>
    <input type="password" id="password" />
    <label htmlFor="password2">Repita a senha</label>
    <input type="password2" id="password2" />
  </form>;
};
