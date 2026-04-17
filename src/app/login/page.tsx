"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

// Importamos o onAuthStateChanged para ser nosso "Ouvinte Global"
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // --- A MÁGICA ACONTECE AQUI ---
  useEffect(() => {
    // 1. OUVINTE GLOBAL: Se você já tiver sessão ativa (voltando do Google ou abrindo o app), vai direto pra Home!
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      }
    });

    // 2. GRAVAÇÃO NO BANCO: Lida com a criação do perfil caso seja o primeiro login via Google
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          // Só cria se o documento não existir (Primeiro Acesso)
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              nome: user.displayName || "Aluno USP",
              email: user.email || "",
              instituto: "Não informado", 
              curso: "Não informado",
              entidade: "",
              createdAt: serverTimestamp()
            });
            console.log("Novo perfil Google criado com sucesso!");
          }
        }
      } catch (error: any) {
        console.error("Erro ao voltar do Google Redirect:", error);
        setErrorMsg("Falha ao concluir o login com o Google. Tente novamente.");
        setIsLoading(false);
      }
    };

    handleRedirectResult();

    // Desliga o ouvinte quando saímos da tela para não gastar memória
    return () => unsubscribe(); 
  }, [router]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setErrorMsg("");
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      // O router.push("/home") nem precisa ficar aqui mais, porque o onAuthStateChanged lá em cima já vai capturar o login e fazer isso automaticamente!
    } catch (error: any) {
      console.error("Erro no login por email:", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrorMsg("E-mail ou senha incorretos.");
      } else {
        setErrorMsg("Ocorreu um erro ao entrar. Verifique sua conexão.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      
      <div className="w-full max-w-md mb-4 px-4">
        <Link href="/home" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-50 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Voltar para o início
        </Link>
      </div>

      <div className="bg-slate-900 w-full max-w-md p-6 md:p-10 rounded-3xl shadow-2xl shadow-black/40 relative overflow-hidden mx-4">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">
            Acesse o Bandejo
          </h1>
          <p className="text-slate-400">
            Entre para reportar filas e favoritar eventos.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-300">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300 ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@usp.br" className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
            </div>
          </div>

          <div className="space-y-1.5 pb-2">
            <label className="text-sm font-bold text-slate-300 ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type={showPassword ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Sua senha" className="w-full pl-12 pr-12 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
          </button>
        </form>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink-0 mx-4 text-slate-500 text-sm font-medium">ou conecte com</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <button onClick={handleGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 text-slate-50 px-6 py-3.5 rounded-xl font-bold text-base hover:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          )}
          {isLoading ? "Conectando..." : "Entrar com Google"}
        </button>

        <p className="text-center text-sm text-slate-400 mt-8">
          É calouro ou ainda não tem conta?{' '}
          <Link href="/create-account" className="font-bold text-blue-500 hover:underline">
            Crie sua conta
          </Link>
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Fique tranquilo, não publicamos nada em seu nome.</span>
        </div>
      </div>
    </div>
  );
}