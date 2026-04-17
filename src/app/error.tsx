"use client"; // Obrigatório para componentes de erro

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aqui você pode logar o erro em um serviço como Sentry no futuro
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Ops! Algo deu errado.</h2>
      <p className="text-gray-600">Não conseguimos carregar as informações no momento.</p>
      <button
        onClick={() => reset()} // Tenta renderizar a rota novamente
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}