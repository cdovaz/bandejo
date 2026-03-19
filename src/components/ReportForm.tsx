'use client';

import { useSearchParams } from 'next/navigation';

export default function ReportForm() {
  const searchParams = useSearchParams();
  const restaurant = searchParams.get('restaurant');

  return (
    <form className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="restaurant">
          Restaurante
        </label>
        <select
          id="restaurant"
          defaultValue={restaurant || ''}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>Bandejão Central</option>
          <option>Bandejão da Quimica</option>
          <option>Bandejão da Fisica</option>
          <option>Bandejão da Puc</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="queueTime">
          Tempo de Fila (em minutos)
        </label>
        <input
          type="number"
          id="queueTime"
          placeholder="Ex: 25"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reportar
        </button>
      </div>
    </form>
  );
}
