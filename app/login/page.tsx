'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous ajouterez la logique d'authentification
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={120}
              height={120}
              className="h-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#048B9A] font-['Roboto']">
            Connexion Livreur
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#555555] font-['Roboto'] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              required
            />
          </div>

          <div>
            <label className="block text-[#555555] font-['Roboto'] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#048B9A] text-white py-3 rounded-lg hover:bg-[#037383] transition-colors font-['Roboto']"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
} 