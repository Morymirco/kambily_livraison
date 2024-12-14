'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaTruck, FaMapMarkerAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import ConfirmationModal from '@/app/components/ConfirmationModal';

interface Probleme {
  date: string;
  type: string;
  description: string;
  statut: 'Résolu' | 'En cours' | 'Non résolu';
}

interface Historique {
  date: string;
  action: string;
  utilisateur: string;
  details?: string;
}

export default function DetailLivraison({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [livraison] = useState({
    id: resolvedParams.id,
    numero: "CMD-2024-001",
    statut: "En cours",
    dateCreation: "22/03/2024 09:30",
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
    commande: {
      articles: [
        { nom: "Sandwich Poulet", quantite: 2, prix: "60.000 GNF" },
        { nom: "Coca-Cola", quantite: 2, prix: "20.000 GNF" }
      ],
      total: "80.000 GNF",
      paiement: "Mobile Money"
    },
    horaires: {
      creation: "09:30",
      attribution: "09:35",
      priseEnCharge: "09:45",
      livraisonPrevue: "10:15"
    },
    problemes: [
      {
        date: "22/03/2024 09:55",
        type: "Retard",
        description: "Trafic dense dans la zone",
        statut: "En cours"
      }
    ] as Probleme[],
    historique: [
      {
        date: "22/03/2024 09:30",
        action: "Création",
        utilisateur: "Système",
        details: "Commande créée"
      },
      {
        date: "22/03/2024 09:35",
        action: "Attribution",
        utilisateur: "Admin",
        details: "Attribuée à Mory Koulibaly"
      }
    ] as Historique[]
  });

  const [livreursDispo] = useState([
    { id: 1, nom: "Ibrahim Sow", evaluation: 4.7 },
    { id: 2, nom: "Aissatou Barry", evaluation: 4.9 }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/livraisons" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <FaArrowLeft />
              <span className="font-['Roboto']">Retour aux livraisons</span>
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#048B9A] mb-2">
                Commande #{livraison.numero}
              </h1>
              <p className="text-gray-500">Créée le {livraison.dateCreation}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              livraison.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
              livraison.statut === "Livré" ? "bg-green-100 text-green-800" :
              livraison.statut === "Annulé" ? "bg-red-100 text-red-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {livraison.statut}
            </span>
          </div>

          {/* Timeline de la commande */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">Création</p>
              <p className="font-bold text-[#048B9A]">{livraison.horaires.creation}</p>
            </div>
            <div className="h-1 flex-1 mx-4 bg-[#048B9A]"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Attribution</p>
              <p className="font-bold text-[#048B9A]">{livraison.horaires.attribution}</p>
            </div>
            <div className="h-1 flex-1 mx-4 bg-[#048B9A]"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Prise en charge</p>
              <p className="font-bold text-[#048B9A]">{livraison.horaires.priseEnCharge}</p>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Livraison prévue</p>
              <p className="font-bold text-gray-400">{livraison.horaires.livraisonPrevue}</p>
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
                <span>{livraison.client.nom}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#048B9A]" />
                <span>{livraison.client.telephone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#048B9A]" />
                <span>{livraison.client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#048B9A]" />
                <span>{livraison.client.adresse}</span>
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
                <span>{livraison.livreur.nom}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#048B9A]" />
                <span>{livraison.livreur.telephone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-600">Évaluation:</span>
                <span>{livraison.livreur.evaluation}/5</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setShowReassignModal(true)}
                  className="text-[#048B9A] hover:text-[#037383] font-medium"
                >
                  Réassigner la livraison
                </button>
              </div>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6">Détails commande</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                {livraison.commande.articles.map((article, index) => (
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
                <span className="text-[#048B9A]">{livraison.commande.total}</span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  {livraison.commande.paiement}
                </p>
              </div>
            </div>
          </div>

          {/* Problèmes signalés */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] mb-6 flex items-center gap-2">
              <FaExclamationTriangle />
              Problèmes signalés
            </h2>
            <div className="space-y-4">
              {livraison.problemes.length > 0 ? (
                livraison.problemes.map((probleme, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{probleme.type}</h3>
                        <p className="text-sm text-gray-600">{probleme.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        probleme.statut === "Résolu" ? "bg-green-100 text-green-800" :
                        probleme.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {probleme.statut}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{probleme.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun problème signalé</p>
              )}
            </div>
          </div>
        </div>

        {/* Historique */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#048B9A] mb-6">Historique</h2>
          <div className="space-y-4">
            {livraison.historique.map((event, index) => (
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

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Annuler la livraison
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
        title="Réassigner la livraison"
        message="Choisissez un nouveau livreur pour cette commande"
        confirmText="Réassigner"
        cancelText="Annuler"
        type="warning"
      >
        <div className="mt-4">
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            {livreursDispo.map(livreur => (
              <option key={livreur.id} value={livreur.id}>
                {livreur.nom} ({livreur.evaluation}/5)
              </option>
            ))}
          </select>
        </div>
      </ConfirmationModal>

      {/* Modal d'annulation */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          // Logique d'annulation
          setShowCancelModal(false);
        }}
        title="Annuler la livraison"
        message="Êtes-vous sûr de vouloir annuler cette livraison ? Cette action est irréversible."
        confirmText="Annuler la livraison"
        cancelText="Retour"
        type="warning"
      />
    </div>
  );
} 