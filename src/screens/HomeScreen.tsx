import ActionCard from '../components/ActionCard';

export default function HomeScreen() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
        <h1 className="text-5xl font-extrabold md:text-7xl">Bandejo</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          Never waste time in line again. Get real-time queue information for your university's restaurant.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            headline="Bandejão Central"
            queueTime="1h40min"
            reportCount="56 pessoas"
          />
          <ActionCard
            headline="Bandejão Central"
            queueTime="1h40min"
            reportCount="56 pessoas"
          />
          <ActionCard
            headline="Bandejão Central"
            queueTime="1h40min"
            reportCount="56 pessoas"
          />
          <ActionCard
            headline="Bandejão Central"
            queueTime="1h40min"
            reportCount="56 pessoas"
          />
        </div>
      </div>
    </section>
  );
}
