"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Loader2, User, Mail, 
  Building2, GraduationCap, Users, Lock, Eye, EyeOff, AlertCircle
} from "lucide-react";

// 1. Importações vitais do Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // Importando o arquivo que criamos na pasta lib!

export default function CreateAccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Novo estado para capturar e mostrar erros do Firebase (ex: senha fraca, email já existe)
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    instituto: "",
    curso: "",
    entidade: "",
    senha: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(""); // Limpa o erro quando o usuário volta a digitar
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // 1. Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.senha
      );
      
      const user = userCredential.user;

      // 2. Salva os dados extras no Firestore na coleção 'users'
      // Usamos doc() e setDoc() para que o ID do documento seja o mesmo UID do Auth
      await setDoc(doc(db, "users", user.uid), {
        nome: formData.nome,
        email: formData.email,
        instituto: formData.instituto,
        curso: formData.curso,
        entidade: formData.entidade, // opcional
        createdAt: serverTimestamp(), // Pega a hora exata do servidor do Google
      });

      console.log("Conta criada com sucesso! ID:", user.uid);

      // 3. Joga o aluno para a Home
      router.push("/home");

    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      
      // Tratando as mensagens de erro para ficarem amigáveis em português
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("Este e-mail já está cadastrado. Tente fazer login.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else {
        setErrorMsg("Ocorreu um erro ao criar a conta. Tente novamente.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="w-full max-w-xl mb-4 px-4">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-50 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Voltar para o Login
        </Link>
      </div>

      <div className="bg-slate-900 w-full max-w-xl p-6 md:p-10 rounded-3xl border border-slate-800 shadow-2xl shadow-black/40 relative overflow-hidden mx-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">
            Crie sua conta
          </h1>
          <p className="text-slate-400">
            Junte-se à comunidade do Bandejo e otimize seu tempo na USP.
          </p>
        </div>

        {/* --- CAIXA DE ERRO (Só aparece se der problema) --- */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-300">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300 ml-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Sofia Lara" className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300 ml-1">E-mail Institucional</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu.nome@usp.br" className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-300 ml-1">Instituto</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <select required name="instituto" value={formData.instituto} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none">
                  <option value="" disabled className="text-slate-500">Selecione...</option>
                  <option value="IME">IME</option>
                  <option value="Poli">Poli</option>
                  <option value="FEA">FEA</option>
                  <option value="FFLCH">FFLCH</option>
                  <option value="ECA">ECA</option>
                  <option value="IF">IF</option>
                  <option value="IQ">IQ</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-300 ml-1">Curso</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input required type="text" name="curso" value={formData.curso} onChange={handleChange} placeholder="Ex: Ciência da Computação" className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300 ml-1">Entidade (Opcional)</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="text" name="entidade" value={formData.entidade} onChange={handleChange} placeholder="Ex: eLab, Zenith, Maratona..." className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
            </div>
          </div>

          <div className="space-y-1.5 pb-4">
            <label className="text-sm font-bold text-slate-300 ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type={showPassword ? "text" : "password"} name="senha" value={formData.senha} onChange={handleChange} placeholder="Crie uma senha forte" className="w-full pl-12 pr-12 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar minha conta"}
          </button>

        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-bold text-blue-500 hover:underline">
            Entre aqui
          </Link>
        </p>

      </div>
    </div>
  );
}