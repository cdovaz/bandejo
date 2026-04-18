"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
// IMPORTANTE: Adicionamos o signOut aqui
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
// IMPORTANTE: Adicionamos o LogOut nos ícones
import { User, BookOpen, Building2, Save, Loader2, Award, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
// IMPORTANTE: Adicionamos o useRouter para o redirecionamento
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    displayName: "",
    institute: "",
    course: "",
    entity: ""
  });

  // 1. Busca os dados do aluno assim que a página carrega
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        // Se o Google tiver o nome dele, já preenchemos como padrão
        setFormData(prev => ({ ...prev, displayName: user.displayName || "" }));
        
        // Vai no Firestore ver se ele já preencheu o perfil acadêmico antes
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            displayName: data.displayName || user.displayName || "",
            institute: data.institute || "",
            course: data.course || "",
            entity: data.entity || ""
          });
        }
      }
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Salva as alterações no Firestore
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      await setDoc(doc(db, "users", userId), {
        displayName: formData.displayName,
        institute: formData.institute,
        course: formData.course,
        entity: formData.entity,
        updatedAt: new Date()
      }, { merge: true });

      setMessage({ text: "Perfil atualizado com sucesso!", type: "success" });
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      setMessage({ text: "Ocorreu um erro ao salvar. Tente novamente.", type: "error" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // 3. Função de Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Manda o usuário de volta para a tela inicial
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-slate-400 font-medium">Carregando seu perfil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <Link href="/home" className="flex items-center text-slate-400 mb-6 hover:text-slate-100 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Início
      </Link>
      
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/50 rounded-2xl flex items-center justify-center text-blue-400">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-50">Meu Perfil</h1>
          <p className="text-slate-400">Atualize seus dados para receber recomendações melhores.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-8 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        
        {message.text && (
          <div className={`p-4 rounded-xl text-sm font-bold animate-in zoom-in-95 ${
            message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1.5">
            <User className="w-3 h-3" /> Como a galera te chama?
          </label>
          <input 
            required 
            placeholder="Seu nome ou apelido" 
            value={formData.displayName}
            onChange={e => setFormData({...formData, displayName: e.target.value})}
            className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1.5">
              <Building2 className="w-3 h-3" /> Instituto
            </label>
            <input 
              placeholder="Ex: IME, Poli, FEA..." 
              value={formData.institute}
              onChange={e => setFormData({...formData, institute: e.target.value})}
              className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> Curso Atual
            </label>
            <input 
              placeholder="Ex: Ciências Moleculares" 
              value={formData.course}
              onChange={e => setFormData({...formData, course: e.target.value})}
              className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1.5">
            <Award className="w-3 h-3" /> Entidades que Participa
          </label>
          <input 
            placeholder="Ex: eLab USP, Nexus Skill..." 
            value={formData.entity}
            onChange={e => setFormData({...formData, entity: e.target.value})}
            className="w-full p-4 bg-slate-950 border border-slate-800 text-slate-50 rounded-2xl outline-none focus:border-blue-500 transition-all"
          />
          <p className="text-xs text-slate-500 ml-1">Essas informações ajudam a gente a recomendar eventos da sua área.</p>
        </div>

        {/* CONTAINER DOS BOTÕES */}
        <div className="space-y-3 pt-4">
          <button 
            type="submit" 
            disabled={isSaving} 
            className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <><Save className="w-5 h-5" /> Salvar Perfil</>}
          </button>

          {/* BOTÃO DE LOGOUT - O type="button" é crucial para não disparar o form */}
          <button 
            type="button" 
            onClick={handleLogout}
            className="w-full py-4 bg-transparent border border-red-500/20 text-red-400 font-bold rounded-2xl hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" /> Sair da Conta
          </button>
        </div>

      </form>
    </div>
  );
}