// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">AminoChain</h1>
        <p className="text-xl text-gray-600">Connecting biosamples to research, with transparency and trust</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
        {/* Contributor Portal Card */}
        <Link 
          href="/contributor" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Sample Provider Portal</h2>
          <p className="text-gray-600 text-center">Track your biological samples, manage consent, and receive benefits from research</p>
        </Link>

        {/* Researcher Portal Card */}
        <Link 
          href="/researcher" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Researcher Portal</h2>
          <p className="text-gray-600 text-center">Discover biospecimens, request samples, and manage research projects</p>
        </Link>
      </div>

      <div className="mt-12 text-center text-gray-500">
        <p>Demo version of AminoChain Specimen Center</p>
      </div>
    </div>
  );
}