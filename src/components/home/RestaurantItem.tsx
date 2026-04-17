import { Clock, Star, MapPin, Edit3 } from "lucide-react";

interface RestaurantItemProps {
    name: string;
    emoji: string;
    waitingTime: number; // em minutos
    foodRating: number;  // de 0 a 5
    status?: "Vazio" | "Moderado" | "Longo" | "Muito Longo";
    onEvaluate?: () => void;
}

export default function RestaurantItem({
    name,
    emoji,
    waitingTime,
    foodRating,
    status,
    onEvaluate
}: RestaurantItemProps) {

    const getStatusColor = () => {
        if (waitingTime < 15) return "bg-green-500/10 text-green-400 border-green-500/20";
        if (waitingTime < 30) return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
        return "bg-red-500/10 text-red-400 border-red-500/20";
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:shadow-lg hover:border-slate-700 transition-all group gap-4">
            
            {/* Lado Esquerdo: Informações do Restaurante */}
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-slate-950 rounded-xl text-3xl group-hover:scale-110 transition-transform">
                    {emoji}
                </div>

                <div>
                    <h3 className="font-bold text-slate-50 text-xl">{name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-1 text-sm font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/20">
                            <Star className="w-4 h-4 fill-current" />
                            {foodRating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            Campus Capital
                        </div>
                    </div>
                </div>
            </div>

            {/* Lado Direito: Status e o BOTÃO GIGANTE */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 border-slate-800 pt-4 sm:pt-0">
                
                {/* Tempo e Status (agora lado a lado no mobile) */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor()}`}>
                        {status || (waitingTime < 15 ? "Vazio" : waitingTime < 30 ? "Moderado" : "Longo")}
                    </span>
                    <div className="flex items-center justify-end gap-1 sm:mt-1.5 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">{waitingTime} min</span>
                    </div>
                </div>

                {/* Botão de Avaliação Gigante */}
                <button 
                    onClick={onEvaluate}
                    className="flex items-center justify-center gap-2 text-base font-bold text-white bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition-colors shadow-lg shadow-orange-900/20"
                >
                    <Edit3 className="w-5 h-5" />
                    Avaliar
                </button>
            </div>
            
        </div>
    );
}