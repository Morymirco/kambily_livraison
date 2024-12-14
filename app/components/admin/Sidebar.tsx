'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUsers, FaBox, FaChartBar, FaFileAlt, FaShoppingBag } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { path: '/admin', label: 'Livreurs', icon: <FaUsers /> },
    { path: '/admin/commandes', label: 'Commandes', icon: <FaShoppingBag /> },
    { path: '/admin/livraisons', label: 'Livraisons', icon: <FaBox /> },
    { path: '/admin/statistiques', label: 'Statistiques', icon: <FaChartBar /> },
    { path: '/admin/rapports', label: 'Rapports', icon: <FaFileAlt /> }
  ];

  return (
    <aside className="w-64 bg-white h-[calc(100vh-72px)] shadow-lg">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link 
                  href={item.path} 
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-[#048B9A] bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 