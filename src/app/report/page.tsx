import { Suspense } from 'react';
import ReportForm from '../../components/ReportForm';

export default function ReportPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/noise-texture.png)' }}></div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold">
            Reportar Fila
          </h1>
          <p className="mt-3 text-2xl md:text-3xl font-light text-gray-300">
            Ajude a comunidade a se manter informada sobre o tempo de fila.
          </p>
        </div>

        <div className="mt-16 w-full max-w-md">
          <Suspense fallback={<div>Loading...</div>}>
            <ReportForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
