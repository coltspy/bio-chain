'use client';

import { useState } from 'react';
import StatCard from './components/StatCard';
import ActivityItem from './components/ActivityItem';

export default function Dashboard() {
  // Mock data
  const [stats] = useState([
    { title: 'Active Samples', value: '3', icon: '🧪', color: 'bg-blue-500' },
    { title: 'Research Projects', value: '2', icon: '🔬', color: 'bg-purple-500' },
    { title: 'Available Balance', value: '$240', icon: '💰', color: 'bg-green-500' },
  ]);

  const [activities] = useState([
    { 
      id: 1, 
      type: 'sample-used', 
      title: 'Sample Used', 
      description: 'Your blood sample (SP12345) was used in research project RES789',
      date: '2 days ago',
      icon: '🧪'
    },
    { 
      id: 2, 
      type: 'benefit-received', 
      title: 'Benefit Received', 
      description: 'You received $120 from research project RES456',
      date: '1 week ago',
      icon: '💰'
    },
    { 
      id: 3, 
      type: 'consent-updated', 
      title: 'Consent Updated', 
      description: 'You updated consent preferences for sample SP12346',
      date: '2 weeks ago',
      icon: '📝'
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor your samples, track research, and manage benefits
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <ActivityItem 
              key={activity.id}
              title={activity.title}
              description={activity.description}
              date={activity.date}
              icon={activity.icon}
              type={activity.type}
            />
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View all activity →
          </button>
        </div>
      </div>

      {/* Sample Usage */}
      <div className="mt-8 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Sample Usage Overview</h2>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            {/* This would be replaced with a real chart */}
            <p className="text-gray-500">Sample usage chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
}