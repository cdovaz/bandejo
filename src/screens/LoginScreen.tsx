import LoginForm from '../components/LoginForm';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="mb-8 text-5xl font-extrabold text-white md:text-7xl">Bandejo</h1>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
}
