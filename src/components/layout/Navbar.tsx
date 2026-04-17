"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 mb-6">
      {/* Sua Logo / Título aqui */}
      <Link href="/home" className="text-2xl font-black text-slate-50">
        Bandejo<span className="text-blue-500">.</span>
      </Link>

      {/* Ícone Inteligente do Canto da Tela */}
      <button 
        onClick={() => user ? router.push("/profile") : router.push("/")}
        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-all border border-slate-700"
      >
        {/* Se tiver foto do Google, mostra a foto. Senão, mostra o ícone de usuário */}
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Perfil" className="w-6 h-6 rounded-full" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>
    </nav>
  );
}