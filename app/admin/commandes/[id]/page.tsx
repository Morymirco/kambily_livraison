'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaTruck, FaMapMarkerAlt, FaClock, FaBox, FaHistory } from 'react-icons/fa';
import ConfirmationModal from '@/app/components/ConfirmationModal';

interface Historique {
  date: string;
  action: string;
  utilisateur: string;
  details?: string;
}

export default function DetailCommande({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [commande] = useState({
    id: resolvedParams.id,
    numero: "CMD-2024-001",
    client: {
      nom: "Mamadou Diallo",
      telephone: "625 21 21 15",
      email: "mamadou@example.com",
      adresse: "Quartier Madina, Rue KA-020, Conakry"
    },
    livreur: {
      nom: "Mory Koulibaly",
      telephone: "625 00 00 00",
      evaluation: 4.8
    },
    details: {
      articles: [
        { nom: "Sandwich Poulet", quantite: 2, prix: "60.000 GNF" },
        { nom: "Coca-Cola", quantite: 2, prix: "20.000 GNF" }
      ],
      total: "80.000 GNF",
      paiement: "Mobile Money",
      instructions: "Appeler à l'arrivée"
    },
    statut: "En cours",
    urgent: true,
    horaires: {
      commande: "09:30",
      attribution: "09:35",
      preparation: "09:40",
      priseEnCharge: "09:45",
      livraisonPrevue: "10:15"
    },
    historique: [
      {
        date: "22/03/2024 09:30",
        action: "Commande créée",
        utilisateur: "Système",
        details: "Nouvelle commande reçue"
      },
      {
        date: "22/03/2024 09:35",
        action: "Attribution",
        utilisateur: "Admin",
        details: "Attribuée à Mory Koulibaly"
      },
      {
        date: "22/03/2024 09:45",
        action: "Prise en charge",
        utilisateur: "Mory Koulibaly",
        details: "Commande acceptée par le livreur"
      }
    ] as Historique[]
  });

  const [livreursDispo] = useState([
    { id: 1, nom: "Ibrahim Sow", evaluation: 4.7, livraisons: 142 },
    { id: 2, nom: "Aissatou Barry", evaluation: 4.9, livraisons: 128 }
  ]);

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    // Logique d'annulation
    router.push('/admin/commandes');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/commandes" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <FaArrowLeft />
              <span className="font-['Roboto']">Retour aux commandes</span>
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
        {/* En-tête de la commande */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#048B9A] mb-2">
                  Commande #{commande.numero}
                </h1>
                <p className="text-gray-500">Créée le {commande.historique[0].date}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  commande.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                  commande.statut === "Livrée" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {commande.statut}
                </span>
                {commande.urgent && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Urgent
                  </span>
                )}
              </div>
            </div>

            {/* Timeline de la commande */}
            <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Commande</p>
                <p className="font-bold text-[#048B9A]">{commande.horaires.commande}</p>
              </div>
              <div className="h-1 flex-1 mx-4 bg-[#048B9A]"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Attribution</p>
                <p className="font-bold text-[#048B9A]">{commande.horaires.attribution}</p>
              </div>
              <div className="h-1 flex-1 mx-4 bg-[#048B9A]"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Préparation</p>
                <p className="font-bold text-[#048B9A]">{commande.horaires.preparation}</p>
              </div>
              <div className="h-1 flex-1 mx-4 bg-[#048B9A]"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Prise en charge</p>
                <p className="font-bold text-[#048B9A]">{commande.horaires.priseEnCharge}</p>
              </div>
              <div className="h-1 flex-1 mx-4 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Livraison prévue</p>
                <p className="font-bold text-gray-400">{commande.horaires.livraisonPrevue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6 flex items-center gap-2">
              <FaUser />
              Client
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-600">Nom:</span>
                <span>{commande.client.nom}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#048B9A]" />
                <span>{commande.client.telephone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#048B9A]" />
                <span>{commande.client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#048B9A]" />
                <span>{commande.client.adresse}</span>
              </div>
            </div>
          </div>

          {/* Informations livreur */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6 flex items-center gap-2">
              <FaTruck />
              Livreur
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-600">Nom:</span>
                <span>{commande.livreur.nom}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#048B9A]" />
                <span>{commande.livreur.telephone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-600">Évaluation:</span>
                <span>{commande.livreur.evaluation}/5</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setShowReassignModal(true)}
                  className="text-[#048B9A] hover:text-[#037383] font-medium"
                >
                  Réassigner la commande
                </button>
              </div>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6 flex items-center gap-2">
              <FaBox />
              Détails commande
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                {commande.details.articles.map((article, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{article.quantite}x</span> {article.nom}
                    </div>
                    <span className="text-gray-600">{article.prix}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-[#048B9A]">{commande.details.total}</span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  {commande.details.paiement}
                </p>
              </div>
              {commande.details.instructions && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Instructions: {commande.details.instructions}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Historique */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6 flex items-center gap-2">
              <FaHistory />
              Historique
            </h2>
            <div className="space-y-4">
              {commande.historique.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#048B9A]"></div>
                  <div>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    <p className="font-medium">{event.action}</p>
                    <p className="text-sm text-gray-600">Par: {event.utilisateur}</p>
                    {event.details && (
                      <p className="text-sm text-gray-500">{event.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Annuler la commande
          </button>
        </div>
      </div>

      {/* Modal de réassignation */}
      <ConfirmationModal
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
        onConfirm={() => {
          // Logique de réassignation
          setShowReassignModal(false);
        }}
        title="Réassigner la commande"
        message="Sélectionnez un nouveau livreur pour cette commande"
        confirmText="Réassigner"
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

      {/* Modal d'annulation */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="Annuler la commande"
        message="Êtes-vous sûr de vouloir annuler cette commande ? Cette action est irréversible."
        confirmText="Annuler la commande"
        cancelText="Retour"
        type="warning"
      />
    </div>
  );
} 