'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBox, FaChartBar, FaClock, FaFilter, FaMapMarkerAlt, FaSearch, FaUsers } from 'react-icons/fa';
import Sidebar from '../../components/admin/Sidebar';

interface Livraison {
  id: number;
  client: string;
  livreur: string;
  adresse: string;
  statut: string;
  heure: string;
  montant: string;
}

export default function AdminLivraisons() {
  const [livraisons] = useState<Livraison[]>([
    {
      id: 1,
      client: "Mamadou Diallo",
      livreur: "Mory Koulibaly",
      adresse: "Quartier Madina, Rue KA-020",
      statut: "En cours",
      heure: "10:30",
      montant: "150.000 GNF"
    },
    {
      id: 2,
      client: "Aissatou Barry",
      livreur: "Ibrahima Sow",
      adresse: "Quartier Almamya, Avenue de la République",
      statut: "Livré",
      heure: "09:45",
      montant: "75.000 GNF"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={40}
              height={40}
              className="h-auto"
            />
            <h1 className="text-2xl font-bold font-['Roboto']">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-['Roboto']">Admin</span>
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Gestion des Livraisons</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaFilter />
                Filtrer
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]">
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Total livraisons</h3>
              <p className="text-2xl font-bold text-[#048B9A]">245</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">En cours</h3>
              <p className="text-2xl font-bold text-yellow-500">12</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Terminées</h3>
              <p className="text-2xl font-bold text-green-500">228</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Annulées</h3>
              <p className="text-2xl font-bold text-red-500">5</p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une livraison..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Liste des livraisons */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livreur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {livraisons.map((livraison) => (
                  <tr key={livraison.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{livraison.client}</td>
                    <td className="px-6 py-4 text-gray-900">{livraison.livreur}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-[#048B9A] mr-2" />
                        <span className="text-gray-900">{livraison.adresse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaClock className="text-[#048B9A] mr-2" />
                        <span className="text-gray-900">{livraison.heure}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{livraison.montant}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        livraison.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                        livraison.statut === "Livré" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {livraison.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/livraisons/${livraison.id}`}>
                        <button className="text-[#048B9A] hover:text-[#037383]">
                          Détails
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
} 