'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { FaArrowLeft, FaStar, FaUser, FaPhone, FaEnvelope, FaTruck, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import ConfirmationModal from '@/app/components/ConfirmationModal';

interface Livraison {
  id: number;
  client: string;
  adresse: string;
  date: string;
  statut: string;
  evaluation: number;
}

export default function DetailLivreur({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [livreur] = useState({
    id: resolvedParams.id,
    nom: "Mory Koulibaly",
    email: "mory@example.com",
    telephone: "625 21 21 15",
    statut: "Actif",
    vehicule: "Scooter électrique",
    zone: "Conakry - Kaloum",
    dateInscription: "15/01/2024",
    evaluation: 4.8,
    statistiques: {
      livraisons: 156,
      enCours: 3,
      completees: 153,
      tauxReussite: "98%",
      tempsMoyen: "22 min"
    },
    dernieresLivraisons: [
      {
        id: 1,
        client: "Mamadou Diallo",
        adresse: "Quartier Madina, Rue KA-020",
        date: "22/03/2024",
        statut: "Livré",
        evaluation: 5
      },
      {
        id: 2,
        client: "Aissatou Barry",
        adresse: "Quartier Almamya, Avenue de la République",
        date: "22/03/2024",
        statut: "En cours",
        evaluation: 0
      }
    ]
  });

  const [showModal, setShowModal] = useState(false);

  const handleDesactivation = () => {
    setShowModal(true);
  };

  const confirmDesactivation = () => {
    // Logique de désactivation
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <FaArrowLeft />
              <span className="font-['Roboto']">Retour</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={40}
              height={40}
              className="h-auto"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* En-tête du profil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#048B9A] to-[#06748A] p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl text-[#048B9A] font-['Roboto'] font-bold">
                  {livreur.nom.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">{livreur.nom}</h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < Math.floor(livreur.evaluation) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span>{livreur.evaluation}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  livreur.statut === "Actif" ? "bg-green-500" : "bg-red-500"
                }`}>
                  {livreur.statut}
                </span>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-gray-50">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm">Total livraisons</p>
              <p className="text-2xl font-bold text-[#048B9A]">{livreur.statistiques.livraisons}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm">En cours</p>
              <p className="text-2xl font-bold text-[#048B9A]">{livreur.statistiques.enCours}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm">Complétées</p>
              <p className="text-2xl font-bold text-[#048B9A]">{livreur.statistiques.completees}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm">Taux de réussite</p>
              <p className="text-2xl font-bold text-[#048B9A]">{livreur.statistiques.tauxReussite}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm">Temps moyen</p>
              <p className="text-2xl font-bold text-[#048B9A]">{livreur.statistiques.tempsMoyen}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informations personnelles */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6 flex items-center gap-2">
              <FaUser />
              Informations personnelles
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#048B9A]" />
                <span>{livreur.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#048B9A]" />
                <span>{livreur.telephone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaTruck className="text-[#048B9A]" />
                <span>{livreur.vehicule}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#048B9A]" />
                <span>{livreur.zone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendar className="text-[#048B9A]" />
                <span>Inscrit le {livreur.dateInscription}</span>
              </div>
            </div>
          </div>

          {/* Dernières livraisons */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6">Dernières livraisons</h2>
            <div className="space-y-4">
              {livreur.dernieresLivraisons.map((livraison) => (
                <div key={livraison.id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{livraison.client}</h3>
                      <p className="text-sm text-gray-600">{livraison.adresse}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      livraison.statut === "Livré" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {livraison.statut}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{livraison.date}</span>
                    {livraison.evaluation > 0 && (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>{livraison.evaluation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Link href={`/admin/livreurs/${livreur.id}/edit`}>
            <button className="px-6 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037383] transition-colors">
              Modifier
            </button>
          </Link>
          <button
            onClick={handleDesactivation}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Désactiver le compte
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDesactivation}
        title="Désactiver le compte"
        message="Êtes-vous sûr de vouloir désactiver ce compte livreur ? Cette action empêchera le livreur d'accéder à l'application."
        confirmText="Désactiver"
        cancelText="Annuler"
        type="warning"
      />
    </div>
  );
} 