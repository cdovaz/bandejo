"use client"

import Link from "next/link";
import { Clock, Calendar, Zap, Loader2, LayoutList } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import RestaurantItem from "@/components/home/RestaurantItem";
import EventCard from "@/components/home/EventCard";
import EvaluateModal from "@/components/home/EvaluateModal";
import { useState, useEffect } from "react";

// 1. Importações do Firebase
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 2. Tipagens dos Dados
interface Restaurant {
  id: string;
  name: string;
  emoji: string;
  currentWaitingTime: number;
  currentStatus?: "Vazio" | "Moderado" | "Longo" | "Muito Longo";
  averageFoodRating: number;
}

interface EventData {
  id: string;
  title: string;
  entity: string;
  date: string;
  category: string;
  location: string;
  description: string;
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantToEvaluate, setRestaurantToEvaluate] = useState({ id: "", name: "" });

  

  // 3. Estados Duplos: Restaurantes e Eventos
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // 4. Escutando os Restaurantes
  useEffect(() => {
    const qRest = query(collection(db, "restaurants"), orderBy("name"));
    const unsubscribeRest = onSnapshot(qRest, (snapshot) => {
      const restData: Restaurant[] = [];
      snapshot.forEach((doc) => {
        restData.push({ id: doc.id, ...doc.data() } as Restaurant);
      });
      setRestaurants(restData);
      setIsLoadingRestaurants(false);
    }, (error) => {
      console.error("Erro ao buscar restaurantes:", error);
      setIsLoadingRestaurants(false);
    });

    return () => unsubscribeRest();
  }, []);

  // 5. Escutando os Eventos
  useEffect(() => {
    // Usando orderBy pela data de criação se você tiver o campo, ou apenas puxando todos
    const qEvents = query(collection(db, "events")); 
    const unsubscribeEv = onSnapshot(qEvents, (snapshot) => {
      const evData: EventData[] = [];
      snapshot.forEach((doc) => {
        evData.push({ id: doc.id, ...doc.data() } as EventData);
      });
      setEvents(evData);
      setIsLoadingEvents(false);
    }, (error) => {
      console.error("Erro ao buscar eventos:", error);
      setIsLoadingEvents(false);
    });

    return () => unsubscribeEv();
  }, []);

  const handleOpenEvaluate = (id: string, nomeRestaurante: string) =>{
    setRestaurantToEvaluate({ id, name: nomeRestaurante });
    setIsModalOpen(true);
  }

  // 6. O Algoritmo de Intercalação Híbrida
  const mixedFeed: any[] = [];
  const maxLength = Math.max(restaurants.length, events.length);

  for (let i = 0; i < maxLength; i++) {
    // Coloca o Restaurante
    if (restaurants[i]) {
      mixedFeed.push({ type: "restaurant", data: restaurants[i] });
    }
    // Coloca o Evento logo em seguida (e continua colocando se os restaurantes acabarem)
    if (events[i]) {
      mixedFeed.push({ type: "event", data: events[i] });
    }
  }

  // Verifica se ambas as coleções terminaram de carregar
  const isScreenLoading = isLoadingRestaurants || isLoadingEvents;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <HeroSection/>

      {/* Título do Feed */}
      <div className="flex items-center gap-2 mb-4">
        <LayoutList className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-slate-50">
          Feed do Campus
        </h2>
      </div>

      {isScreenLoading ? (
        <div className="flex flex-col items-center justify-center py-10 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-500" />
          <p className="text-sm font-medium text-slate-400">Montando seu feed...</p>
        </div>
      ) : mixedFeed.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mixedFeed.map((item, index) => {
            if (item.type === "restaurant") {
              const rest = item.data as Restaurant;
              return (
                <div key={`rest-${rest.id}`} className="h-full">
                  <RestaurantItem 
                    name={rest.name}
                    emoji={rest.emoji}
                    waitingTime={rest.currentWaitingTime}
                    foodRating={rest.averageFoodRating}
                    status={rest.currentStatus}
                    onEvaluate={() => handleOpenEvaluate(rest.id, rest.name)}
                  />
                </div>
              );
            }
            
            if (item.type === "event") {
              const event = item.data as EventData;
              return (
                <div key={`event-${event.id}`} className="h-full">
                  <EventCard 
                    title={event.title}
                    entity={event.entity}
                    date={event.date}
                    category={event.category}
                    location={event.location}
                    description={event.description}
                  />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="text-center p-6 bg-slate-900 rounded-2xl border border-dashed border-slate-700 text-slate-400 text-sm">
          O feed está vazio no momento.
        </div>
      )}
      
      <EvaluateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        restaurantData={restaurantToEvaluate}
      />
      
    </div>
  );
}