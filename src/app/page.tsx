'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(/noise-texture.png)' }}></div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
