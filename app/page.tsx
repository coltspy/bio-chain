'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">AminoChain Demo</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 lg:p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Biospecimen Management Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our demo showcasing how biological samples could be managed in a transparent platform.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Choose a Portal to Explore</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            <Link 
              href="/contributor" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Sample Provider Portal</h2>
              <p className="text-gray-600 text-center">Track your biological samples, manage consent, and see how benefits are distributed</p>
            </Link>

            <Link 
              href="/researcher" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Researcher Portal</h2>
              <p className="text-gray-600 text-center">Discover biospecimens, request samples, and manage research projects</p>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Demo Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">For Researchers</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Natural Language Search:</span>
                    <p className="text-gray-600">Try searching for specimens using everyday language like "blood samples from diabetic patients over 60"</p>
                  </div>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Interactive Dashboard:</span>
                    <p className="text-gray-600">Explore a mock research dashboard with sample visualizations and project tracking</p>
                  </div>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Projects Section:</span>
                    <p className="text-gray-600">See how researchers might manage and organize multiple research initiatives</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">For Sample Providers</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Sample Tracking:</span>
                    <p className="text-gray-600">View how sample providers might track their biological samples and research usage</p>
                  </div>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Benefits Dashboard:</span>
                    <p className="text-gray-600">Explore a simulated benefits distribution system showing compensation for samples</p>
                  </div>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">Consent Management:</span>
                    <p className="text-gray-600">See a demo of how sample providers might control their consent preferences</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Technical Demo Notes</h3>
          <p className="text-gray-600 mb-4">
            This demo was built using Next.js, React, and Tailwind CSS. The semantic search functionality is simulated using pattern matching to demonstrate how a real implementation might work. No actual biological samples or data are connected to this system.
          </p>
          <p className="text-gray-600">
            Some features may not be fully implemented or may use mock data. This is just an educational demonstration of what a specimen management system could look like.
          </p>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">Demo Application - Not a real service</p>
        </div>
      </footer>
    </div>
  );
}