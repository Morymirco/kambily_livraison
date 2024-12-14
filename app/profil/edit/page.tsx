'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: 'Mory Koulibaly',
    email: 'mory.koulibaly@example.com',
    telephone: '625 21 21 15',
    vehicule: 'Scooter électrique',
    secteur: 'Conakry Guinee',
    langue: 'Français',
    disponible: true,
    motDePasse: '',
    confirmerMotDePasse: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, ajoutez la logique pour sauvegarder les modifications
    router.push('/profil');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#048B9A] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/profil" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <FaArrowLeft />
              <span className="font-['Roboto']">Retour au profil</span>
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
          {/* En-tête du formulaire */}
          <div className="bg-gradient-to-r from-[#048B9A] to-[#06748A] p-8 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                <span className="text-4xl text-[#048B9A] font-['Roboto'] font-bold">
                  {formData.nom.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg text-[#048B9A] hover:text-[#037383] transition-colors">
                <FaCamera size={20} />
              </button>
            </div>
            <h1 className="text-2xl font-bold text-white font-['Roboto'] mt-4">
              Modifier le profil
            </h1>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-4">
                  Informations personnelles
                </h2>
                
                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Langue préférée
                  </label>
                  <select
                    name="langue"
                    value={formData.langue}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  >
                    <option value="Français">Français</option>
                    <option value="English">English</option>
                    <option value="العربية">العربية</option>
                    <option value="Pulaar">Pulaar</option>
                    <option value="Susu">Susu</option>
                    <option value="Maninka">Maninka</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-[#555555] font-['Roboto']">Disponibilité</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="disponible"
                      checked={formData.disponible}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        disponible: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#048B9A]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#048B9A]"></div>
                  </label>
                </div>
              </div>

              {/* Informations professionnelles */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-4">
                  Informations professionnelles
                </h2>

                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Type de véhicule
                  </label>
                  <select
                    name="vehicule"
                    value={formData.vehicule}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  >
                    <option value="Scooter électrique">Scooter électrique</option>
                    <option value="Vélo">Vélo</option>
                    <option value="Voiture">Voiture</option>
                    <option value="Moto">Moto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Secteur de livraison
                  </label>
                  <input
                    type="text"
                    name="secteur"
                    value={formData.secteur}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  />
                </div>
              </div>
            </div>

            {/* Modification du mot de passe */}
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] mb-4">
                Modifier le mot de passe
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-[#555555] font-['Roboto'] mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmerMotDePasse"
                    value={formData.confirmerMotDePasse}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-4 mt-8">
              <Link
                href="/profil"
                className="px-6 py-2 border border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-gray-50 transition-colors font-['Roboto']"
              >
                Annuler
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037383] transition-colors font-['Roboto']"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 