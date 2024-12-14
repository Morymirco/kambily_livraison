'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/admin/Sidebar';

interface Livreur {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  statut: 'Actif' | 'Inactif';
  livraisons: number;
  evaluation: number;
  dateInscription: string;
}

export default function AdminDashboard() {
  const [livreurs] = useState<Livreur[]>([
    {
      id: 1,
      nom: "Mory Koulibaly",
      email: "mory@example.com",
      telephone: "625 21 21 15",
      statut: "Actif",
      livraisons: 156,
      evaluation: 4.8,
      dateInscription: "15/01/2024"
    },
    {
      id: 2,
      nom: "Mamadou Diallo",
      email: "mamadou@example.com",
      telephone: "624 30 40 50",
      statut: "Actif",
      livraisons: 98,
      evaluation: 4.5,
      dateInscription: "20/01/2024"
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
            <h2 className="text-xl font-bold text-gray-800">Gestion des Livreurs</h2>
            <Link href="/admin/livreurs/ajouter">
              <button className="flex items-center gap-2 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037383] transition-colors">
                <FaPlus />
                Ajouter un livreur
              </button>
            </Link>
          </div>

          {/* Barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un livreur..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Liste des livreurs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livreur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livraisons</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Évaluation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {livreurs.map((livreur) => (
                  <tr key={livreur.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-[#048B9A] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {livreur.nom.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{livreur.nom}</div>
                          <div className="text-sm text-gray-500">{livreur.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{livreur.telephone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        livreur.statut === "Actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {livreur.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{livreur.livraisons}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{livreur.evaluation}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`h-4 w-4 ${
                                index < Math.floor(livreur.evaluation)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/livreurs/${livreur.id}`}>
                          <button className="text-[#048B9A] hover:text-[#037383]">
                            Détails
                          </button>
                        </Link>
                        <button className="text-red-600 hover:text-red-800 ml-2">
                          Désactiver
                        </button>
                      </div>
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