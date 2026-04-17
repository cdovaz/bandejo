import { Clock, Calendar, ChevronRight, Zap, User } from "lucide-react";
import Link from "next/link";

export default function HeroSection(){

    return(
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Bem-vindo ao Bandejo
          </h1>
          <p className="text-blue-100 max-w-xl">
            Seu portal para eventos e tempo de espera do Bandejão 😉😉
          </p>
        </div>
        
        {/* Botões Principais */}
        <div className="flex gap-3 w-full md:w-auto">
          <Link 
            href="/events" 
            className="flex-1 bg-slate-900 border border-slate-800 text-slate-50 px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Eventos
          </Link>
          <Link 
            href="/login" 
            className="bg-blue-600 border border-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-500 transition flex items-center justify-center shadow-lg shadow-blue-900/30"
            title="Acessar conta"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </section>
      )
}