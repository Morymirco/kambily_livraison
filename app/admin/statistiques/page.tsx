'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaBox, FaChartBar, FaCalendar } from 'react-icons/fa';
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

export default function AdminStatistiques() {
  const [periode, setPeriode] = useState('month');

  const livraisonsData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Livraisons',
        data: [25, 32, 28, 35, 30, 38, 28],
        borderColor: '#048B9A',
        backgroundColor: 'rgba(4, 139, 154, 0.1)',
        fill: true,
      },
    ],
  };

  const performanceData = {
    labels: ['Livré à temps', 'Retard', 'Annulé'],
    datasets: [
      {
        data: [85, 12, 3],
        backgroundColor: ['#048B9A', '#FFA500', '#FF4444'],
      },
    ],
  };

  const revenusData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus (GNF)',
        data: [1200000, 1500000, 1300000, 1800000, 1600000, 2000000],
        backgroundColor: 'rgba(4, 139, 154, 0.8)',
      },
    ],
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
            <h1 className="text-2xl font-bold font-['Roboto']">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-['Roboto']">Admin</span>
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Menu latéral */}
      <div className="flex">
        <aside className="w-64 bg-white h-[calc(100vh-72px)] shadow-lg">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <FaUsers />
                  <span>Livreurs</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/livraisons" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <FaBox />
                  <span>Livraisons</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/statistiques" className="flex items-center gap-3 p-3 text-[#048B9A] bg-blue-50 rounded-lg">
                  <FaChartBar />
                  <span>Statistiques</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Statistiques</h2>
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
              <h3 className="text-gray-500 text-sm">Livraisons totales</h3>
              <p className="text-2xl font-bold text-[#048B9A]">1,245</p>
              <span className="text-green-500 text-sm">↑ 12% vs mois dernier</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Revenus</h3>
              <p className="text-2xl font-bold text-[#048B9A]">15.5M GNF</p>
              <span className="text-green-500 text-sm">↑ 8% vs mois dernier</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Livreurs actifs</h3>
              <p className="text-2xl font-bold text-[#048B9A]">28</p>
              <span className="text-green-500 text-sm">↑ 4 nouveaux</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Satisfaction client</h3>
              <p className="text-2xl font-bold text-[#048B9A]">4.8/5</p>
              <span className="text-green-500 text-sm">↑ 0.2 vs mois dernier</span>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Livraisons par jour</h3>
              <Line data={livraisonsData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Performance des livraisons</h3>
              <Doughnut data={performanceData} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenus mensuels</h3>
            <Bar data={revenusData} />
          </div>
        </main>
      </div>
    </div>
  );
} 