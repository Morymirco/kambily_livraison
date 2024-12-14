'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaBox, FaChartBar, FaDownload, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Sidebar from '../../components/admin/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface TopLivreur {
  id: number;
  nom: string;
  livraisons: number;
  evaluation: number;
  tauxReussite: string;
}

interface ZoneRetard {
  zone: string;
  retards: number;
  tempsMoyen: string;
  raisonPrincipale: string;
}

export default function AdminRapports() {
  const [periode, setPeriode] = useState('month');
  const [topLivreurs] = useState<TopLivreur[]>([
    { id: 1, nom: "Mory Koulibaly", livraisons: 156, evaluation: 4.8, tauxReussite: "98%" },
    { id: 2, nom: "Mamadou Diallo", livraisons: 142, evaluation: 4.7, tauxReussite: "96%" },
    { id: 3, nom: "Ibrahim Sow", livraisons: 128, evaluation: 4.6, tauxReussite: "95%" }
  ]);

  const [zonesRetard] = useState<ZoneRetard[]>([
    { zone: "Madina", retards: 15, tempsMoyen: "35 min", raisonPrincipale: "Trafic dense" },
    { zone: "Kaloum", retards: 12, tempsMoyen: "30 min", raisonPrincipale: "Travaux routiers" },
    { zone: "Ratoma", retards: 8, tempsMoyen: "28 min", raisonPrincipale: "Adresses imprécises" }
  ]);

  const livraisonsData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Livraisons réussies',
        data: [45, 52, 48, 55, 50, 58, 48],
        borderColor: '#048B9A',
        backgroundColor: 'rgba(4, 139, 154, 0.1)',
        fill: true,
      },
      {
        label: 'Livraisons annulées',
        data: [3, 4, 2, 3, 4, 3, 2],
        borderColor: '#FF4444',
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        fill: true,
      }
    ],
  };

  const performanceData = {
    labels: ['À temps', 'Retard', 'Annulé'],
    datasets: [
      {
        data: [85, 12, 3],
        backgroundColor: ['#048B9A', '#FFA500', '#FF4444'],
      },
    ],
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Logique d'export
    console.log(`Exporting in ${format} format...`);
  };

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
            <h1 className="text-2xl font-bold font-['Roboto']">Analyses & Rapports</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#048B9A] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaDownload />
              Export CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#048B9A] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaDownload />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 p-6">
          {/* Filtres */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Performance globale</h2>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-gray-500" />
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Total livraisons</h3>
              <p className="text-2xl font-bold text-[#048B9A]">1,245</p>
              <span className="text-green-500 text-sm">↑ 12% vs mois dernier</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Taux de réussite</h3>
              <p className="text-2xl font-bold text-[#048B9A]">96%</p>
              <span className="text-green-500 text-sm">↑ 2% vs mois dernier</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Temps moyen</h3>
              <p className="text-2xl font-bold text-[#048B9A]">22 min</p>
              <span className="text-green-500 text-sm">↓ 3 min vs mois dernier</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Satisfaction client</h3>
              <p className="text-2xl font-bold text-[#048B9A]">4.8/5</p>
              <span className="text-green-500 text-sm">↑ 0.2 vs mois dernier</span>
            </div>
          </div>

          {/* Top livreurs */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Livreurs</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livreur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livraisons</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Évaluation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux de réussite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topLivreurs.map((livreur) => (
                    <tr key={livreur.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{livreur.nom}</td>
                      <td className="px-6 py-4 text-gray-900">{livreur.livraisons}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-gray-900 mr-2">{livreur.evaluation}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <FaChartBar
                                key={index}
                                className={`h-4 w-4 ${
                                  index < Math.floor(livreur.evaluation)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{livreur.tauxReussite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tendance des livraisons</h3>
              <Line data={livraisonsData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Performance globale</h3>
              <Doughnut data={performanceData} />
            </div>
          </div>

          {/* Zones à problèmes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt />
              Zones avec retards fréquents
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Zone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Nombre de retards</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Temps moyen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Raison principale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {zonesRetard.map((zone, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{zone.zone}</td>
                      <td className="px-6 py-4 text-gray-900">{zone.retards}</td>
                      <td className="px-6 py-4 text-gray-900">{zone.tempsMoyen}</td>
                      <td className="px-6 py-4 text-gray-900">{zone.raisonPrincipale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 