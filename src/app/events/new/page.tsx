"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { ArrowLeft, Send, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "", entity: "", date: "", location: "", description: "", tagsRaw: "", href: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Você precisa estar logado!");
    setLoading(true);

    try {
      const tagsArray = formData.tagsRaw.split(",").map(t => t.trim()).filter(t => t !== "");

      // MUDANÇA AQUI: Alteramos de "events" para "pending_events"
      await addDoc(collection(db, "pending_events"), {
        title: formData.title,
        entity: formData.entity,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        tags: tagsArray,
        href: formData.href || "#",
        createdBy: auth.currentUser.uid,
        status: "pending", // <-- Marcador útil para o seu painel de admin
        createdAt: serverTimestamp()
      });
      
      // Como o evento não vai pro ar na hora, é legal dar um aviso de sucesso
      alert("Evento enviado para análise! Em breve ele aparecerá no feed.");
      router.push("/events");
      
    } catch (error) {
      console.error("Erro ao publicar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/events" className="flex items-center text-slate-400 mb-6 hover:text-slate-100 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Radar
      </Link>
      
      <h1 className="text-3xl font-black mb-2 text-slate-50">Divulgar Evento</h1>
      <p className="text-slate-400 mb-8">Fortaleça o ecossistema compartilhando sua iniciativa.</p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Informações Básicas</label>
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
          <input required placeholder="Data (ex: 20 de Abril)" className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
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

        <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" /> : <><Send className="w-5 h-5" /> Lançar no Ecossistema</>}
        </button>
      </form>
    </div>
  );
}