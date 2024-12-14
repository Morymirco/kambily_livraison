'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBell, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface NewDelivery {
  id: number;
  client: string;
  adresse: string;
  heure: string;
  statut: string;
  urgent: boolean;
  timeAssigned: string;
}

export default function NewDeliveries() {
  const [mounted, setMounted] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [newDeliveries, setNewDeliveries] = useState<NewDelivery[]>([]);

  useEffect(() => {
    setMounted(true);
    // Simuler le chargement des données
    setNewDeliveries([
      {
        id: 1,
        client: "Mamadou Diallo",
        adresse: "Quartier Madina, Rue KA-020",
        heure: "10:30",
        statut: "Nouveau",
        urgent: true,
        timeAssigned: "Il y a 5 minutes"
      },
      {
        id: 2,
        client: "Aissatou Barry",
        adresse: "Quartier Almamya, Avenue de la République",
        heure: "11:15",
        statut: "Nouveau",
        urgent: false,
        timeAssigned: "Il y a 15 minutes"
      }
    ]);
  }, []);

  if (!mounted) {
    return null; // Évite le rendu initial côté serveur
  }

  const handleAccept = (id: number) => {
    setNewDeliveries(prev => prev.filter(delivery => delivery.id !== id));
  };

  const handleReject = (id: number) => {
    setNewDeliveries(prev => prev.filter(delivery => delivery.id !== id));
  };

  if (newDeliveries.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-6">
      {/* Notification pour nouvelles livraisons */}
      {showNotification && (
        <div className="bg-blue-50 border-l-4 border-[#048B9A] p-4 mb-4 relative">
          <div className="flex items-center">
            <FaBell className="text-[#048B9A] mr-3" />
            <div>
              <p className="font-medium text-[#048B9A]">
                Nouvelles livraisons assignées !
              </p>
              <p className="text-sm text-gray-600">
                {newDeliveries.length} nouvelle(s) livraison(s) vous ont été assignée(s)
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimesCircle />
            </button>
          </div>
        </div>
      )}

      {/* Liste des nouvelles livraisons */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-[#048B9A] text-white flex justify-between items-center">
          <h2 className="text-lg font-bold font-['Roboto']">
            Nouvelles livraisons assignées
          </h2>
          <span className="bg-white text-[#048B9A] px-3 py-1 rounded-full text-sm">
            {newDeliveries.length} nouvelle(s)
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {newDeliveries.map((delivery) => (
            <div key={delivery.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{delivery.client}</h3>
                  <p className="text-sm text-gray-600">{delivery.adresse}</p>
                </div>
                {delivery.urgent && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Urgent
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>🕒 {delivery.heure}</span>
                  <span>📅 {delivery.timeAssigned}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAccept(delivery.id)}
                    className="inline-flex items-center px-3 py-1 bg-[#048B9A] text-white text-sm rounded-lg hover:bg-[#037383] transition-colors"
                  >
                    <FaCheckCircle className="mr-1" />
                    Accepter
                  </button>
                  <button 
                    onClick={() => handleReject(delivery.id)}
                    className="inline-flex items-center px-3 py-1 border border-red-500 text-red-500 text-sm rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <FaTimesCircle className="mr-1" />
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 