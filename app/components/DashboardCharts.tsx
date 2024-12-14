'use client';
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

export default function DashboardCharts() {
  // Données pour le graphique des livraisons
  const livraisonsData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Livraisons',
        data: [12, 15, 8, 13, 10, 14, 11],
        borderColor: '#048B9A',
        backgroundColor: 'rgba(4, 139, 154, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Données pour le graphique de satisfaction
  const satisfactionData = {
    labels: ['5★', '4★', '3★', '2★', '1★'],
    datasets: [
      {
        data: [65, 20, 10, 3, 2],
        backgroundColor: [
          '#048B9A',
          '#06748A',
          '#0A5C6B',
          '#0D4450',
          '#0F2C33',
        ],
      },
    ],
  };

  // Données pour le graphique des temps de livraison
  const tempsLivraisonData = {
    labels: ['8h-10h', '10h-12h', '12h-14h', '14h-16h', '16h-18h', '18h-20h'],
    datasets: [
      {
        label: 'Temps moyen (minutes)',
        data: [22, 25, 30, 24, 28, 20],
        backgroundColor: 'rgba(4, 139, 154, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold text-[#555555] font-['Roboto'] mb-6">
        Analyses et Performances
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Graphique des livraisons */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-[#048B9A] font-['Roboto'] mb-4">
            Livraisons cette semaine
          </h3>
          <Line data={livraisonsData} options={options} />
        </div>

        {/* Graphique de satisfaction */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-[#048B9A] font-['Roboto'] mb-4">
            Satisfaction client
          </h3>
          <Doughnut data={satisfactionData} options={doughnutOptions} />
        </div>

        {/* Graphique des temps de livraison */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-[#048B9A] font-['Roboto'] mb-4">
            Temps de livraison moyen
          </h3>
          <Bar data={tempsLivraisonData} options={options} />
        </div>
      </div>

      {/* Résumé des performances */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-[#048B9A] font-['Roboto'] mb-4">
          Résumé des performances
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Satisfaction moyenne</p>
            <p className="text-2xl font-bold text-[#048B9A]">4.8/5</p>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm">↑ 0.2</span>
              <span className="text-gray-500 text-sm ml-2">vs mois dernier</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Taux de livraison à temps</p>
            <p className="text-2xl font-bold text-[#048B9A]">96%</p>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm">↑ 3%</span>
              <span className="text-gray-500 text-sm ml-2">vs mois dernier</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Efficacité moyenne</p>
            <p className="text-2xl font-bold text-[#048B9A]">22 min</p>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm">↓ 2 min</span>
              <span className="text-gray-500 text-sm ml-2">vs mois dernier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 