export default function LoadingHome() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse mt-10">
      {/* Esqueleto do Hero Section */}
      <div className="h-48 bg-slate-800 rounded-3xl w-full"></div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Esqueleto do Card do Bandejão */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-72 space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/3 mb-6"></div>
          <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
          <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
          <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
        </div>

        {/* Esqueleto do Card de Eventos */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-72 space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/3 mb-6"></div>
          <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
}