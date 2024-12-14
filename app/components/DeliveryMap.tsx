'use client';
import { useState } from 'react';

export default function DeliveryMap() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Carte temporairement indisponible</p>
          <p className="text-sm text-gray-400">La fonctionnalité de carte sera bientôt disponible</p>
        </div>
      </div>

      {/* Légende */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-bold text-sm mb-2">Légende</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#048B9A]"></div>
            <span className="text-sm">Ma position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm">En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-sm">En attente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Livré</span>
          </div>
        </div>
      </div>
    </div>
  );
} 