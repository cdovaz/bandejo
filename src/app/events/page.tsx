"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Search, Plus, Loader2 } from "lucide-react";

// Reutilizando aquele EventCard bonitão
import EventCard from "@/components/home/EventCard"; 

// Firebase
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface EventData {
  id: string;
  title: string;
  entity: string;
  date: string;
  tags: string[]; // <-- Garantindo que é um array
  location: string;
  description: string;
  createdAt?: any;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos"); // <-- Renomeado para selectedTag

  // Escutando os eventos do banco
  useEffect(() => {
    const q = query(collection(db, "events")); 
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const evData: EventData[] = [];
      snapshot.forEach((doc) => {
        evData.push({ id: doc.id, ...doc.data() } as EventData);
      });
      setEvents(evData);
      setIsLoading(false);
    }, (error) => {
      console.error("Erro ao buscar eventos:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. EXTRAÇÃO DE TAGS: Achata todos os arrays de tags e tira as duplicatas
  const availableTags = ["Todos", ...Array.from(new Set(events.flatMap(e => e.tags || [])))];

  // 2. FILTRAGEM: Verifica se o array de tags do evento .includes() a tag clicada
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.entity.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Se a tag selecionada for "Todos", passa. Se não, verifica se a tag existe dentro do array do evento.
    const matchesTag = selectedTag === "Todos" || (event.tags && event.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-4 sm:px-0">
      
      {/* --- HERO DA PÁGINA --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-3xl text-white shadow-lg">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-2">
            <Calendar className="w-8 h-8" />
            Ecossistema USP
          </h1>
          <p className="text-purple-100 max-w-md text-sm sm:text-base">
            Descubra hackathons, competições, imersões e festas rolando na universidade.
          </p>
        </div>
        
        <Link 
          href="/events/new" 
          className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Divulgar Evento
        </Link>
      </div>

      {/* --- BARRA DE PESQUISA E FILTROS --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-800">
        
        {/* Input de Busca */}
        <div className="relative w-full md:w-96 flex-shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou entidade..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 text-slate-50 rounded-xl focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm placeholder:text-slate-600"
          />
        </div>
        
        {/* Chips de Tags */}
        <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedTag === tag 
                ? 'bg-blue-600 text-white border-2 border-blue-500' 
                : 'bg-slate-950 text-slate-400 border-2 border-transparent hover:bg-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID DE EVENTOS --- */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
          <p className="text-slate-400 font-medium text-sm">Buscando a agenda do campus...</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="h-full">
               <EventCard 
                title={event.title}
                entity={event.entity}
                date={event.date}
                tags={event.tags || []} // Passando o array de tags corretamente
                location={event.location}
                description={event.description}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900 rounded-3xl border border-dashed border-slate-800">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-50 mb-1">Nenhum evento encontrado</h3>
          <p className="text-slate-400 text-sm">Tente buscar por outros termos ou limpe os filtros.</p>
        </div>
      )}

    </div>
  );
}