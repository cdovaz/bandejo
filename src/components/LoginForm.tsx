'use client';

import Button from './Button';
import { signInWithGoogle } from '../lib/firebase';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onLogin();
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-white">Bem-vindo de volta!</h2>
      <Button type="button" onClick={handleGoogleLogin} fullWidth variant="secondary">
        Entrar com Google
      </Button>
    </div>
  );
}
