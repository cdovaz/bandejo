interface CardProps {
  emoji: string;
  title: string;
}

export default function Card({ emoji, title }: CardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
      <span className="text-5xl">{emoji}</span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
    </div>
  );
}
