"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { ArrowLeft, Send, Loader2, Link as LinkIcon, User } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // 1. Novos campos adicionados ao estado
  const [formData, setFormData] = useState({
    title: "", entity: "", date: "", location: "", description: "", tagsRaw: "", href: "",
    contactName: "", contactEmail: "", contactPhone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Você precisa estar logado!");
    setLoading(true);

    try {
      const tagsArray = formData.tagsRaw.split(",").map(t => t.trim()).filter(t => t !== "");

      // Mantendo o envio para a fila de espera (pending_events)
      await addDoc(collection(db, "pending_events"), {
        // Dados Públicos
        title: formData.title,
        entity: formData.entity,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        tags: tagsArray,
        href: formData.href || "#",
        
        // Dados de Contato Interno (Novo)
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        
        // Metadados do Sistema
        createdBy: auth.currentUser.uid,
        status: "pending",
        createdAt: serverTimestamp()
      });
      
      alert("Evento enviado para análise! A moderação entrará em contato se necessário.");
      router.push("/events");
      
    } catch (error) {
      console.error("Erro ao publicar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <Link href="/events" className="flex items-center text-slate-400 mb-6 hover:text-slate-100 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Radar
      </Link>
      
      <h1 className="text-3xl font-black mb-2 text-slate-50">Divulgar Evento</h1>
      <p className="text-slate-400 mb-8">Preencha os dados abaixo. Seu evento passará por uma rápida curadoria antes de ir ao ar.</p>

      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        
        {/* --- SEÇÃO 1: DADOS DO EVENTO --- */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Informações do Evento</label>
            <input required placeholder="Título do Evento" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all" 
                   onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Entidade (ex: eLab, Poli, IME)" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
                   onChange={e => setFormData({...formData, entity: e.target.value})} />
            <input required placeholder="Tags (separadas por vírgula)" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
                   onChange={e => setFormData({...formData, tagsRaw: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Data (ex: 20 de Abril, 14h)" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
                   onChange={e => setFormData({...formData, date: e.target.value})} />
            <input required placeholder="Local (ex: InovaUSP)" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
                   onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1.5">
              <LinkIcon className="w-3 h-3" /> Link de Inscrição / Mais infos
            </label>
            <input type="url" placeholder="https://forms.gle/..." className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all text-blue-400"
                   onChange={e => setFormData({...formData, href: e.target.value})} />
          </div>

          <textarea required placeholder="Descrição do evento..." rows={4} className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all resize-none"
                    onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>

        {/* --- SEÇÃO 2: DADOS DO RESPONSÁVEL (CONTATO INTERNO) --- */}
        <div className="pt-6 border-t border-slate-800 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1.5">
              <User className="w-3 h-3" /> Contato do Responsável (Não será publicado)
            </label>
            <input required type="text" placeholder="Nome Completo" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all" 
                   onChange={e => setFormData({...formData, contactName: e.target.value})} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="email" placeholder="E-mail" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
                   onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
            <input required type="tel" placeholder="WhatsApp (com DDD)" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
                   onChange={e => setFormData({...formData, contactPhone: e.target.value})} />
          </div>
        </div>

        {/* BOTÃO SUBMIT */}
        <button type="submit" disabled={loading} className="w-full mt-4 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" /> : <><Send className="w-5 h-5" /> Enviar para Moderação</>}
        </button>

      </form>
    </div>
  );
}