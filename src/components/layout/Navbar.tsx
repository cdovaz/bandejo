"use client";

import Link from "next/link";
import { User, Calendar, LogOut, Utensils  } from "lucide-react";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase";
import { useState, useEffect} from "react"

export default function Navbar() {
  
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      })
      return () => unsubscribe();
    }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo - Visível em todas as telas */}
        <Link href="/home" className="font-bold text-2xl tracking-tight text-blue-500">
          Bandejo
        </Link>

        {/* Container de Navegação */}
        <div className="flex items-center gap-4">
          
          {/* Botão Eventos - Aparece APENAS no PC (hidden no mobile, md:flex no PC) */}
          <Link
            href="/events"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-50 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Eventos
          </Link>

          {/* Botão Login - Visível em todas as telas */}
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-blue-900/20"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Entrar</span> {/* Opcional: Oculta a palavra "Entrar" em telas MUITO pequenas, deixando só o ícone */}
          </Link>
          
        </div>
      </div>
    </header>
  );
}