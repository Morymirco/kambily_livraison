'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaBox, FaChartBar, FaSearch, FaFilter, FaShoppingBag, FaFileAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ConfirmationModal from '@/app/components/ConfirmationModal';

interface Commande {
  id: number;
  client: string;
  adresse: string;
  montant: string;
  statut: 'En attente' | 'Attribuée' | 'En cours' | 'Livrée' | 'Annulée';
  heure: string;
  livreur?: string;
  urgent: boolean;
}

export default function AdminCommandes() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);
  const [selectedLivreur, setSelectedLivreur] = useState<number | null>(null);
  const [commandes, setCommandes] = useState<Commande[]>([
    {
      id: 1,
      client: "Mamadou Diallo",
      adresse: "Quartier Madina, Rue KA-020",
      montant: "150.000 GNF",
      statut: "En attente",
      heure: "10:30",
      urgent: true
    },
    {
      id: 2,
      client: "Aissatou Barry",
      adresse: "Quartier Almamya, Avenue de la République",
      montant: "75.000 GNF",
      statut: "Attribuée",
      heure: "11:15",
      livreur: "Mory Koulibaly",
      urgent: false
    }
  ]);

  const [livreursDispo] = useState([
    { id: 1, nom: "Mory Koulibaly", evaluation: 4.8, livraisons: 156 },
    { id: 2, nom: "Ibrahim Sow", evaluation: 4.7, livraisons: 142 },
    { id: 3, nom: "Aissatou Barry", evaluation: 4.9, livraisons: 128 }
  ]);

  const handleAssign = (commande: Commande) => {
    setSelectedCommande(commande);
    setShowAssignModal(true);
  };

  const handleLivreurSelection = (id: number) => {
    setSelectedLivreur(id);
  };

  const confirmAssign = () => {
    if (!selectedLivreur || !selectedCommande) return;

    const livreurAssigne = livreursDispo.find(l => l.id === selectedLivreur);
    if (livreurAssigne) {
      setCommandes(prev => prev.map(cmd => 
        cmd.id === selectedCommande.id 
          ? { ...cmd, statut: 'Attribuée', livreur: livreurAssigne.nom }
          : cmd
      ));
    }

    setShowAssignModal(false);
    setSelectedCommande(null);
    setSelectedLivreur(null);
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
                <Link href="/admin/commandes" className="flex items-center gap-3 p-3 text-[#048B9A] bg-blue-50 rounded-lg">
                  <FaShoppingBag />
                  <span>Commandes</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/livraisons" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <FaBox />
                  <span>Livraisons</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/statistiques" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <FaChartBar />
                  <span>Statistiques</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/rapports" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <FaFileAlt />
                  <span>Rapports</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Gestion des Commandes</h2>
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
              <h3 className="text-gray-500 text-sm">Total commandes</h3>
              <p className="text-2xl font-bold text-[#048B9A]">245</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">En attente</h3>
              <p className="text-2xl font-bold text-yellow-500">12</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Attribuées</h3>
              <p className="text-2xl font-bold text-blue-500">28</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Livrées</h3>
              <p className="text-2xl font-bold text-green-500">205</p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une commande..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Liste des commandes */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livreur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {commandes.map((commande) => (
                  <tr key={commande.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-[#048B9A] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {commande.client.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{commande.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{commande.adresse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaClock className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{commande.heure}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{commande.montant}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        commande.statut === "En attente" ? "bg-yellow-100 text-yellow-800" :
                        commande.statut === "Attribuée" ? "bg-blue-100 text-blue-800" :
                        commande.statut === "En cours" ? "bg-orange-100 text-orange-800" :
                        commande.statut === "Livrée" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {commande.statut}
                      </span>
                      {commande.urgent && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          Urgent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {commande.livreur || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/commandes/${commande.id}`}>
                          <button className="text-[#048B9A] hover:text-[#037383]">
                            Détails
                          </button>
                        </Link>
                        {!commande.livreur && (
                          <button 
                            onClick={() => handleAssign(commande)}
                            className="text-blue-600 hover:text-blue-800 ml-2"
                          >
                            Assigner
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal d'assignation */}
      <ConfirmationModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedCommande(null);
          setSelectedLivreur(null);
        }}
        onConfirm={confirmAssign}
        title="Assigner la commande"
        message={`Sélectionnez un livreur pour la commande de ${selectedCommande?.client}`}
        confirmText="Assigner"
        cancelText="Annuler"
        type="warning"
      >
        <div className="mt-4 space-y-4">
          {livreursDispo.map((livreur) => (
            <div key={livreur.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="livreur"
                value={livreur.id}
                className="mr-3"
                onChange={() => handleLivreurSelection(livreur.id)}
              />
              <div className="flex-1">
                <p className="font-medium">{livreur.nom}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-3">{livreur.evaluation} ⭐</span>
                  <span>{livreur.livraisons} livraisons</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ConfirmationModal>
    </div>
  );
} 