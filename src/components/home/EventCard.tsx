import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface EventCardProps {
  title: string;
  entity: string;
  date: string;
  description: string;
  category?: string;
  location?: string;
  href?: string;
}

export default function EventCard({
  title,
  entity,
  date,
  description,
  category = "Evento",
  location = "A definir",
  href = "#"
}: EventCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <div className="flex flex-col h-full p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 hover:shadow-lg shadow-black/30 transition-all duration-300">
        
        {/* Cabeçalho do Card */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
            {category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {date}
          </div>
        </div>

        {/* Título e Entidade */}
        <div className="mb-2">
          <h3 className="font-bold text-slate-50 text-xl group-hover:text-blue-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm font-medium text-slate-400 mt-0.5">
            por <span className="text-slate-300 font-semibold">{entity}</span>
          </p>
        </div>

        {/* Descrição */}
        <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Rodapé do Card com o Botão de Inscrição */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="truncate max-w-[130px]">{location}</span>
          </div>
          
          {/* O Botão de Inscrever-se (Usando span para não quebrar a tag Link principal) */}
          <span className="flex items-center gap-1.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-900/20">
            Inscrever-se <ArrowRight className="w-4 h-4" />
          </span>
        </div>
        
      </div>
    </Link>
  );
}