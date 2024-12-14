'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { FaHeadset, FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import DailyDeliveries from './components/DailyDeliveries';
import DashboardCharts from './components/DashboardCharts';
import NewDeliveries from './components/NewDeliveries';

interface Livraison {
  id: number;
  client: string;
  adresse: string;
  statut: string;
  heure: string;
}

export default function DashboardLivreur() {
  // Modifiez la déclaration des données simulées
  const [livraisons] = useState<Livraison[]>([
    { id: 1, client: "Marie Dupont", adresse: "123 Rue de Paris", statut: "En attente", heure: "10:30" },
    { id: 2, client: "Jean Martin", adresse: "45 Avenue des Champs", statut: "En cours", heure: "11:15" },
    { id: 3, client: "Sophie Bernard", adresse: "78 Boulevard Victor Hugo", statut: "Livré", heure: "09:45" },
  ]);

  // Calculez les statistiques à partir des données
  const livraisonsDuJour = livraisons.length;
  const livraisonsTerminees = livraisons.filter(l => l.statut === "Livré").length;
  const tempsMoyen = "25"; // À calculer en fonction des données réelles

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
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
            <h1 className="text-2xl font-bold font-['Roboto']">Dashboard Livreur</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/support" className="text-white hover:text-gray-200 transition-colors">
              <FaHeadset size={20} />
            </Link>
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="font-['Roboto'] text-white">Mory Koulibaly</span>
                <div className="w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="/profil.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-auto"
                  />
                </div>
              </div>
              
              {/* Menu déroulant */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-3 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Connecté en tant que</p>
                  <p className="text-sm text-gray-500 truncate">mory@gmail.com</p>
                </div>

                <div className="py-2">
                  <Link href="/profil">
                    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-700 hover:text-[#048B9A] transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Mon profil
                    </div>
                  </Link>
                  
                  <Link href="/support">
                    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-700 hover:text-[#048B9A] transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Support
                    </div>
                  </Link>
                </div>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link href="/login">
                    <div className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Se déconnecter
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Statistiques */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#048B9A]/10 rounded-lg">
              <svg
                className="w-6 h-6 text-[#048B9A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[#7A7A7A] font-['Roboto']">Livraisons du jour</h3>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-[#048B9A]">{livraisonsDuJour}</p>
                <Link href="#livraisonsList" className="text-sm text-[#048B9A] hover:underline">
                  Voir la liste
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#048B9A]/10 rounded-lg">
              <svg
                className="w-6 h-6 text-[#048B9A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[#7A7A7A] font-['Roboto']">Livraisons terminées</h3>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-[#048B9A]">{livraisonsTerminees}</p>
                <span className="text-sm text-green-500">
                  {Math.round((livraisonsTerminees / livraisonsDuJour) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#048B9A]/10 rounded-lg">
              <svg
                className="w-6 h-6 text-[#048B9A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[#7A7A7A] font-['Roboto']">Temps moyen de livraison</h3>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-[#048B9A]">{tempsMoyen}</p>
                <span className="text-sm text-[#7A7A7A]">min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ajoutez la section des nouvelles livraisons juste après les statistiques */}
      <div className="container mx-auto">
        <NewDeliveries />
      </div>

      {/* Liste des livraisons */}
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-bold text-[#555555] font-['Roboto'] mb-4 md:mb-0">Livraisons en cours</h2>
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 md:flex-initial">
              <input
                type="text"
                placeholder="Rechercher une livraison..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A] text-gray-600">
              <option value="all">Tous les statuts</option>
              <option value="en-attente">En attente</option>
              <option value="en-cours">En cours</option>
              <option value="livre">Livré</option>
            </select>
          </div>
        </div>

        {/* Table pour desktop, Liste pour mobile */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Version desktop */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adresse
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {livraisons.map((livraison) => (
                  <tr 
                    key={livraison.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-[#048B9A] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {livraison.client.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{livraison.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-900">{livraison.adresse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-900">{livraison.heure}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        livraison.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                        livraison.statut === "Livré" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {livraison.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/livraison/${livraison.id}`}>
                        <button className="inline-flex items-center px-4 py-2 border border-[#048B9A] text-sm font-medium rounded-md text-[#048B9A] hover:bg-[#048B9A] hover:text-white transition-colors duration-200">
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Détails
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Version mobile */}
          <div className="md:hidden">
            {livraisons.map((livraison) => (
              <div key={livraison.id} className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-[#048B9A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {livraison.client.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{livraison.client}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[#048B9A]" />
                      {livraison.adresse}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-[#048B9A]" />
                    <span className="text-sm text-gray-600">{livraison.heure}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    livraison.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                    livraison.statut === "Livré" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {livraison.statut}
                  </span>
                </div>

                <div className="flex justify-end">
                  <Link href={`/livraison/${livraison.id}`}>
                    <button className="inline-flex items-center px-4 py-2 border border-[#048B9A] text-sm font-medium rounded-md text-[#048B9A] hover:bg-[#048B9A] hover:text-white transition-colors duration-200">
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Détails
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ajoutez les graphiques après la liste des livraisons */}
      <DashboardCharts />

      <div className="container mx-auto">
        <DailyDeliveries />
      </div>
    </div>
  );
}
