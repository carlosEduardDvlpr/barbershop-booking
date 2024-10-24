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

export function RegisterForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registre-se</CardTitle>
        <CardDescription>
          Insira suas informações e cadastre-se em nossa aplicação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="seu nome" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@exemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="minimo 8 caracteres"
              type="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmedPassword">Confirme a senha</Label>
            <Input
              id="confirmedPassword"
              placeholder="confirme a senha"
              type="text"
              required
            />
          </div>
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
