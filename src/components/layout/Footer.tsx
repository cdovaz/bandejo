export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Créditos de Desenvolvimento */}
        <div className="flex items-center text-sm text-slate-500 gap-1.5">
          <span>made in</span>
          <span className="font-bold text-blue-500">eLab-USP</span>
          <span>by Sofia Lara</span>
        </div>

        {/* Redes Sociais */}
        <a 
          href="https://instagram.com/elab.usp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-pink-500 transition-colors"
        >
          {/* SVG Oficial do Instagram */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span className="font-semibold">@elab.usp</span>
        </a>

      </div>
    </footer>
  );
}