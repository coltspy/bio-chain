// app/components/Sidebar.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarProps {
  userType: 'researcher' | 'contributor';
  activePage?: string;
}

export default function Sidebar({ userType, activePage }: SidebarProps) {
  const researcherLinks = [
    { name: 'Dashboard', href: '/researcher/dashboard', icon: '📊' },
    { name: 'Search Specimens', href: '/researcher/search', icon: '🔍' },
    { name: 'My Inquiries', href: '/researcher/inquiries', icon: '📋' },
    { name: 'Projects', href: '/researcher/projects', icon: '📁' },
    { name: 'Settings', href: '/researcher/settings', icon: '⚙️' },
  ];

  const contributorLinks = [
    { name: 'Dashboard', href: '/contributor/dashboard', icon: '📊' },
    { name: 'My Samples', href: '/contributor/samples', icon: '🧪' },
    { name: 'Benefits', href: '/contributor/benefits', icon: '💰' },
    { name: 'Consent Management', href: '/contributor/consent', icon: '📝' },
    { name: 'Settings', href: '/contributor/settings', icon: '⚙️' },
  ];

  const links = userType === 'researcher' ? researcherLinks : contributorLinks;
  const title = userType === 'researcher' ? 'Researcher Portal' : 'Sample Provider Portal';

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">Specimen Center</h1>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = activePage === link.href;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`flex items-center px-6 py-3 text-sm ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
          <span className="mr-2">←</span>
          <span>Switch Portal</span>
        </Link>
      </div>
    </div>
  );
}