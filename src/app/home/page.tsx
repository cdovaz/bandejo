import ActionCard from '../../components/ActionCard';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/noise-texture.png)' }}></div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold">
            Bem-vindo ao <span className="text-indigo-500">Bandejo</span>
          </h1>

          <p className="mt-3 text-2xl md:text-3xl font-light text-gray-300">
            Sua vida universitária, simplificada.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            headline="Bandejão Central"
            queueTime="1h40min"
            reportCount="56 pessoas"
          />
          <ActionCard
            headline="Bandejão da Quimica"
            queueTime="25min"
            reportCount="12 pessoas"
          />
          <ActionCard
            headline="Bandejão da Fisica"
            queueTime="35min"
            reportCount="23 pessoas"
          />
          <ActionCard
            headline="Bandejão da Puc"
            queueTime="15min"
            reportCount="8 pessoas"
          />
        </div>
      </main>
    </div>
  );
}
