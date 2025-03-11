// app/contributor/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

export default function ContributorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="contributor" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}