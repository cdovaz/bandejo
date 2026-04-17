"use client";

import { useState } from "react";
import { X, Clock, Star, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

// Importações do Firebase
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AvaliarModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantData: { id: string; name: string };
}

type ModalView = "menu" | "fila" | "comida" | "sucesso";

export default function EvaluateModal({ isOpen, onClose, restaurantData }: AvaliarModalProps) {
  const [view, setView] = useState<ModalView>("menu");
  const [rating, setRating] = useState(0);
  
  // Estados de controle do Backend
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setTimeout(() => {
      setView("menu");
      setRating(0);
      setErrorMsg("");
    }, 300);
    onClose();
  };

  // Função Mestre de Envio para o Firebase (Agora super rápida e sem GPS)
  const handleFirebaseSubmit = async (
    type: "fila" | "comida", 
    filaParams?: { status: string; minutes: number }
  ) => {
    setErrorMsg("");
    
    if (!auth.currentUser) {
      setErrorMsg("Você precisa estar logado para avaliar.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Formata a data para a sua Série Histórica (Ex: "2026-04-16")
      const today = new Date().toISOString().split('T')[0];

      // 2. Salva a avaliação na coleção 'evaluations'
      await addDoc(collection(db, "evaluations"), {
        userId: auth.currentUser.uid,
        restaurantId: restaurantData.id,
        type: type,
        queueStatus: filaParams ? filaParams.status : null,
        queueEstimatedMinutes: filaParams ? filaParams.minutes : null,
        foodRating: type === "comida" ? rating : null,
        timestamp: serverTimestamp(),
        dateString: today
      });


      setView("sucesso");
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      setErrorMsg("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl shadow-black/50 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-800">
        
        {/* Cabeçalho Dinâmico */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            {(view === "fila" || view === "comida") && (
              <button 
                onClick={() => setView("menu")}
                disabled={isLoading}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-xl font-bold text-slate-50">
              Avaliar <span className="text-blue-500">{restaurantData.name}</span>
            </h2>
          </div>
          <button 
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Caixa de Erro Global */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-medium text-red-300">{errorMsg}</p>
          </div>
        )}

        {/* --- TELA 1: MENU --- */}
        {view === "menu" && (
          <div className="p-6 space-y-4 animate-in slide-in-from-left-4">
            <p className="text-slate-400 text-sm mb-2 text-center">
              O que você deseja reportar agora?
            </p>

            <button 
              onClick={() => setView("fila")}
              className="w-full flex items-center p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-slate-900 text-orange-500 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-50 text-lg">Tamanho da Fila</h3>
                <p className="text-sm text-slate-500">Atualizar o tempo de espera.</p>
              </div>
            </button>

            <button 
              onClick={() => setView("comida")}
              className="w-full flex items-center p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-slate-900 text-yellow-500 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-50 text-lg">Nota da Comida</h3>
                <p className="text-sm text-slate-500">Avaliar o cardápio de hoje.</p>
              </div>
            </button>
          </div>
        )}

        {/* --- TELA 2: FILA --- */}
        {view === "fila" && (
          <div className="p-6 space-y-3 animate-in slide-in-from-right-4 relative">
            
            {isLoading && (
              <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-b-3xl">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
              </div>
            )}

            <p className="text-slate-400 font-medium mb-4 text-center">
              Como está a fila neste momento?
            </p>
            
            <button onClick={() => handleFirebaseSubmit("fila", { status: "Vazio", minutes: 10 })} className="w-full p-4 rounded-xl font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-colors flex justify-between items-center">
              <span>Vazia a Suave</span>
              <span className="text-sm font-normal opacity-80">~ 5 a 15 min</span>
            </button>
            <button onClick={() => handleFirebaseSubmit("fila", { status: "Moderado", minutes: 25 })} className="w-full p-4 rounded-xl font-bold text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 transition-colors flex justify-between items-center">
              <span>Moderada</span>
              <span className="text-sm font-normal opacity-80">~ 20 a 30 min</span>
            </button>
            <button onClick={() => handleFirebaseSubmit("fila", { status: "Longo", minutes: 40 })} className="w-full p-4 rounded-xl font-bold text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 transition-colors flex justify-between items-center">
              <span>Longa</span>
              <span className="text-sm font-normal opacity-80">~ 35 a 45 min</span>
            </button>
            <button onClick={() => handleFirebaseSubmit("fila", { status: "Muito Longo", minutes: 55 })} className="w-full p-4 rounded-xl font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors flex justify-between items-center">
              <span>Dando a volta</span>
              <span className="text-sm font-normal opacity-80">50+ min</span>
            </button>
          </div>
        )}

        {/* --- TELA 3: COMIDA --- */}
        {view === "comida" && (
          <div className="p-6 flex flex-col items-center animate-in slide-in-from-right-4 relative">
            
            {isLoading && (
              <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-b-3xl">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              </div>
            )}

            <p className="text-slate-400 font-medium mb-6 text-center">
              Que nota você dá para o prato principal hoje?
            </p>
            
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-full transition-all ${rating >= star ? 'text-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-slate-700 hover:text-slate-500'}`}
                >
                  <Star className={`w-10 h-10 ${rating >= star ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>

            <button 
              onClick={() => handleFirebaseSubmit("comida")}
              disabled={rating === 0 || isLoading} 
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
            >
              Enviar Avaliação
            </button>
          </div>
        )}

        {/* --- TELA 4: SUCESSO --- */}
        {view === "sucesso" && (
          <div className="p-10 flex flex-col items-center justify-center text-center animate-in zoom-in-90 duration-300">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-50 mb-2">Valeu!</h3>
            <p className="text-slate-400">Sua avaliação ajuda a comunidade toda.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}