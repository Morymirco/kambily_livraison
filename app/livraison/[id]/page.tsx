'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaUser, FaClock, FaBox, FaTruck } from 'react-icons/fa';
import DeliveryMap from '@/app/components/DeliveryMap';

export default function DetailLivraison({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [livraison] = useState({
    id: resolvedParams.id,
    client: {
      nom: "Marie Dupont",
      telephone: "06 12 34 56 78",
      email: "marie.dupont@email.com"
    },
    adresse: {
      rue: "123 Rue de Paris",
      ville: "Paris",
      codePostal: "75001",
      instructions: "Digicode: 1234. 3ème étage gauche."
    },
    commande: {
      numero: "CMD-2024-001",
      articles: [
        { nom: "Pizza Margherita", quantite: 1, prix: "12.90€" },
        { nom: "Coca-Cola", quantite: 2, prix: "3.50€" }
      ],
      total: "19.90€",
      paiement: "Payé par CB"
    },
    statut: "En cours",
    heure: {
      estimation: "10:30",
      prise: "10:15",
      preparation: "10:00"
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <FaArrowLeft />
              <span className="font-['Roboto']">Retour au dashboard</span>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#048B9A] font-['Roboto'] mb-2">
                Commande #{livraison.commande.numero}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                livraison.statut === "En cours" ? "bg-yellow-100 text-yellow-800" :
                livraison.statut === "Livré" ? "bg-green-100 text-green-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {livraison.statut}
              </span>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-[#048B9A] text-white px-6 py-2 rounded-lg hover:bg-[#037383] transition-colors font-['Roboto'] flex items-center gap-2">
                <FaTruck />
                Commencer la livraison
              </button>
            </div>
          </div>

          {/* Timeline de la commande */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">Préparation</p>
              <p className="font-bold text-[#048B9A]">{livraison.heure.preparation}</p>
            </div>
            <div className="h-1 flex-1 mx-4 bg-[#048B9A]"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Prise en charge</p>
              <p className="font-bold text-[#048B9A]">{livraison.heure.prise}</p>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Livraison estimée</p>
              <p className="font-bold text-gray-400">{livraison.heure.estimation}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-6 flex items-center gap-2">
              <FaUser />
              Informations client
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
                <FaMapMarkerAlt className="text-[#048B9A]" />
                <div>
                  <p>{livraison.adresse.rue}</p>
                  <p>{livraison.adresse.codePostal} {livraison.adresse.ville}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Instructions:</strong> {livraison.adresse.instructions}
                </p>
              </div>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-6 flex items-center gap-2">
              <FaBox />
              Détails de la commande
            </h2>
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
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-4 flex items-center gap-2">
            <FaMapMarkerAlt />
            Localisation et trajet
          </h2>
          <DeliveryMap />
        </div>
      </div>
    </div>
  );
} 