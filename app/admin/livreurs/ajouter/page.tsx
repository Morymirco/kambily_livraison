'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import ConfirmationModal from '@/app/components/ConfirmationModal';

export default function AjouterLivreur() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    vehicule: '',
    secteur: '',
    motDePasse: '',
    confirmerMotDePasse: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout du livreur
    setShowSuccessModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSuccess = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#048B9A] mb-6">Ajouter un nouveau livreur</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Type de véhicule</label>
                  <select
                    name="vehicule"
                    value={formData.vehicule}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                    required
                  >
                    <option value="">Sélectionner un véhicule</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Moto">Moto</option>
                    <option value="Voiture">Voiture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Mot de passe</label>
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    name="confirmerMotDePasse"
                    value={formData.confirmerMotDePasse}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Link href="/admin">
                  <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Annuler
                  </button>
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037383] transition-colors"
                >
                  Ajouter le livreur
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={handleSuccess}
        title="Livreur ajouté avec succès"
        message="Le nouveau livreur a été ajouté à la plateforme. Un email avec ses identifiants de connexion lui a été envoyé."
        confirmText="Retour à la liste"
        cancelText="Ajouter un autre livreur"
        type="success"
      />
    </div>
  );
} 