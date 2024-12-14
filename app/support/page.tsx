'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaHeadset, FaQuestionCircle, FaPhone, FaEnvelope, FaWhatsapp, FaSearch } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactForm, setShowContactForm] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: "Comment modifier mon statut de disponibilité ?",
      answer: "Accédez à votre profil et utilisez le bouton de statut en haut de l'écran pour basculer entre 'Disponible' et 'Indisponible'.",
      category: "compte"
    },
    {
      question: "Que faire en cas de problème lors d'une livraison ?",
      answer: "Contactez immédiatement le support via le bouton d'urgence dans l'application ou appelez le +224 621 00 00 00.",
      category: "livraison"
    },
    {
      question: "Comment signaler un problème technique ?",
      answer: "Utilisez le formulaire de contact dans la section Support ou envoyez un email à support@delivery.com",
      category: "technique"
    }
  ];

  const filteredFAQ = faqItems.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        {/* En-tête Support */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <FaHeadset className="text-[#048B9A] text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#048B9A] font-['Roboto'] mb-2">
              Support et Assistance
            </h1>
            <p className="text-gray-600">
              Comment pouvons-nous vous aider aujourd'hui ?
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher une réponse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Contact rapide */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FaPhone className="text-[#048B9A] text-3xl mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Assistance téléphonique</h3>
            <p className="text-gray-600 mb-4">Disponible 7j/7 de 8h à 22h</p>
            <a href="tel:+224621000000" className="text-[#048B9A] font-bold">
              +224 621 00 00 00
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FaWhatsapp className="text-[#048B9A] text-3xl mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Réponse rapide par message</p>
            <a href="https://wa.me/224621000000" className="text-[#048B9A] font-bold">
              Démarrer une discussion
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FaEnvelope className="text-[#048B9A] text-3xl mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Support par email 24/7</p>
            <a href="mailto:support@delivery.com" className="text-[#048B9A] font-bold">
              support@delivery.com
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#048B9A] font-['Roboto'] flex items-center gap-2">
              <FaQuestionCircle />
              Questions fréquentes
            </h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
            >
              <option value="all">Toutes les catégories</option>
              <option value="compte">Compte</option>
              <option value="livraison">Livraison</option>
              <option value="technique">Technique</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-800 mb-2 cursor-pointer hover:text-[#048B9A]">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton de contact */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-[#048B9A] text-white px-8 py-3 rounded-lg hover:bg-[#037383] transition-colors font-['Roboto']"
          >
            Contacter le support
          </button>
        </div>
      </div>
    </div>
  );
} 