import Button from './Button';

interface ActionCardProps {
  headline: string;
  queueTime: string;
  reportCount: string;
}

export default function ActionCard({ headline, queueTime, reportCount }: ActionCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-gray-800 p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
      <h3 className="mb-2 text-xl font-bold">{headline}</h3>
      <div className="mb-4 flex-grow text-left text-gray-300">
        <p><span className="font-semibold">Tempo de fila:</span> {queueTime}</p>
        <p><span className="font-semibold">Relatos dos &uacute;ltimos 10min:</span> {reportCount}</p>
      </div>
      <Button type="button">
        avaliar situação
      </Button>
    </div>
  );
}
