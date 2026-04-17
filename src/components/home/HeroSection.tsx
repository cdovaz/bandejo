"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ArrowRight, User, Calendar } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
      
      {/* Conteúdo Principal */}
      <div className="relative z-10">
        <h1 className="text-3xl font-black mb-2">Bem-vindo ao Bandejo</h1>
        <p className="text-blue-100 max-w-sm mb-8">
          O radar oficial do ecossistema USP. Acompanhe as filas em tempo real e descubra o que está rolando no campus.
        </p>
        
        {/* GRUPO DE BOTÕES */}
        <div className="flex flex-wrap gap-4">
          
          {/* Botão de Autenticação (Ação Primária) */}
          <button 
            onClick={() => user ? router.push("/profile") : router.push("/")}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg"
          >
            {user ? (
              <>Meu Perfil <User className="w-5 h-5" /></>
            ) : (
              <>Entrar na Plataforma <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          {/* Botão de Eventos (Ação Secundária) */}
          <button 
            onClick={() => router.push("/events")}
            className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white px-6 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            Ver Eventos <Calendar className="w-5 h-5" />
          </button>

        </div>
      </div>
      
      {/* Decoração Visual (Círculos de fundo) */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
}