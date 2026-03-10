'use client';

import Button from './Button';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in...');
    onLogin();
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Logging in with Google...');
    onLogin();
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-white">Bem-vindo de volta!</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Endereço de e-mail"
            required
            className="w-full rounded-md border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            required
            className="w-full rounded-md border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <Button type="submit" fullWidth>
          Entrar
        </Button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="mx-4 flex-shrink text-sm text-gray-500">OU</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      <Button type="button" onClick={handleGoogleLogin} fullWidth variant="secondary">
        Entrar com Google
      </Button>
    </div>
  );
}
