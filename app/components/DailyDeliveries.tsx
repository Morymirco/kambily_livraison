'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaSearch, FaFilter } from 'react-icons/fa';

interface DailyDelivery {
  id: number;
  client: string;
  adresse: string;
  heure: string;
  statut: string;
  montant: string;
  paiement: string;
}

export default function DailyDeliveries() {
  const [deliveries] = useState<DailyDelivery[]>([
    {
      id: 1,
      client: "Mamadou Diallo",
      adresse: "Quartier Madina, Rue KA-020",
      heure: "10:30",
      statut: "En attente",
      montant: "150.000 GNF",
      paiement: "Cash"
    },
    {
      id: 2,
      client: "Fatoumata Camara",
      adresse: "Quartier Almamya, Avenue de la République",
      heure: "11:15",
      statut: "En cours",
      montant: "75.000 GNF",
      paiement: "Mobile Money"
    },
    {
      id: 3,
      client: "Ibrahima Sory",
      adresse: "Quartier Kipé, Rue KI-150",
      heure: "09:45",
      statut: "Livré",
      montant: "200.000 GNF",
      paiement: "Carte bancaire"
    }
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-[#048B9A] text-white flex justify-between items-center">
          <h2 className="text-lg font-bold font-['Roboto']">
            Mes livraisons du jour
          </h2>
          <span className="bg-white text-[#048B9A] px-3 py-1 rounded-full text-sm">
            {deliveries.length} livraison(s)
          </span>
        </div>

        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher une livraison..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A] text-gray-600">
              <option value="all">Tous les statuts</option>
              <option value="en-attente">En attente</option>
              <option value="en-cours">En cours</option>
              <option value="livre">Livré</option>
            </select>
          </div>

          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{delivery.client}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FaMapMarkerAlt className="mr-2 text-[#048B9A]" />
                      <span>{delivery.adresse}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    delivery.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                    delivery.statut === "Livré" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {delivery.statut}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-[#048B9A]" />
                      <span>{delivery.heure}</span>
                    </div>
                    <span className="text-[#048B9A] font-medium">{delivery.montant}</span>
                    <span className="text-gray-500">{delivery.paiement}</span>
                  </div>
                  
                  <Link href={`/livraison/${delivery.id}`}>
                    <button className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037383] transition-colors">
                      Voir détails
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 