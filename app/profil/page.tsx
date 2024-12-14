'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft, FaEdit, FaEnvelope, FaMapMarkerAlt, FaPhone, FaStar, FaTruck, FaGlobe, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ProfilLivreur() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [livreur] = useState({
    nom: 'Mory Koulibaly',
    email: 'mory.koulibaly@example.com',
    telephone: '625 21 21 15',
    vehicule: 'Scooter électrique',
    secteur: 'Conakry Guinee',
    nombreLivraisons: 156,
    dateInscription: '15/01/2024',
    evaluation: 4.8,
    langue: 'Français',
    disponible: true,
    statistiquesMensuelles: [
      { label: 'Livraisons', valeur: '42' },
      { label: 'Km parcourus', valeur: '380' },
      { label: 'Temps moyen', valeur: '22min' },
      { label: 'Satisfaction', valeur: '98%' },
    ]
  });

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header avec bouton retour */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
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
        {/* Carte principale du profil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#048B9A] to-[#06748A] p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl text-[#048B9A] font-['Roboto'] font-bold">
                  {livreur.nom.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white font-['Roboto'] mb-2">
                  {livreur.nom}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className={`${index < Math.floor(livreur.evaluation) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-white font-['Roboto']">{livreur.evaluation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques mensuelles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
            {livreur.statistiquesMensuelles.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <p className="text-[#7A7A7A] text-sm font-['Roboto']">{stat.label}</p>
                <p className="text-2xl font-bold text-[#048B9A]">{stat.valeur}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto']">
                Informations personnelles
              </h2>
              <Link href="/profil/edit">
                <button className="text-[#048B9A] hover:text-[#037383] transition-colors">
                  <FaEdit size={20} />
                </button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#7A7A7A]">
                <FaEnvelope className="text-[#048B9A]" />
                <span>{livreur.email}</span>
              </div>
              <div className="flex items-center gap-3 text-[#7A7A7A]">
                <FaPhone className="text-[#048B9A]" />
                <span>{livreur.telephone}</span>
              </div>
              <div className="flex items-center gap-3 text-[#7A7A7A]">
                <FaTruck className="text-[#048B9A]" />
                <span>{livreur.vehicule}</span>
              </div>
              <div className="flex items-center gap-3 text-[#7A7A7A]">
                <FaMapMarkerAlt className="text-[#048B9A]" />
                <span>{livreur.secteur}</span>
              </div>
              <div className="flex items-center gap-3 text-[#7A7A7A]">
                <FaGlobe className="text-[#048B9A]" />
                <span>{livreur.langue}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {isAvailable ? (
                      <FaToggleOn size={24} className="text-[#048B9A] cursor-pointer" onClick={handleAvailabilityToggle} />
                    ) : (
                      <FaToggleOff size={24} className="text-gray-400 cursor-pointer" onClick={handleAvailabilityToggle} />
                    )}
                    <span className="font-['Roboto']">Disponibilité</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isAvailable 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {isAvailable ? "Disponible" : "Indisponible"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-6">
              Historique
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-[#7A7A7A] font-['Roboto']">Livraisons totales</span>
                <span className="font-bold text-[#048B9A]">{livreur.nombreLivraisons}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-[#7A7A7A] font-['Roboto']">Membre depuis</span>
                <span className="font-bold text-[#048B9A]">{livreur.dateInscription}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-6">
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-['Roboto'] flex items-center justify-center gap-2"
          >
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
          </button>
        </div>
      </div>
    </div>
  );
} 