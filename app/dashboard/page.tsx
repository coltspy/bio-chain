'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface ActivityItem {
  id: number;
  type: 'sample-used' | 'benefit-received' | 'consent-updated';
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

// Sample Chart Data
const usageData = [
  { month: 'Jan', usage: 3, benefits: 80 },
  { month: 'Feb', usage: 4, benefits: 120 },
  { month: 'Mar', usage: 2, benefits: 60 },
  { month: 'Apr', usage: 5, benefits: 190 },
  { month: 'May', usage: 7, benefits: 240 },
  { month: 'Jun', usage: 6, benefits: 200 },
  { month: 'Jul', usage: 9, benefits: 320 }
];

const StatCard = ({ title, value, icon, color, change, trend }: StatCardProps) => {
  return (
    <motion.div 
      className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend === 'up' ? 'text-green-600' : 
                    trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {trend === 'up' && (
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {trend === 'down' && (
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="sr-only">{trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'No change'} by</span>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ActivityFeed = ({ activity }: { activity: ActivityItem }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sample-used':
        return 'bg-blue-100 text-blue-800';
      case 'benefit-received':
        return 'bg-green-100 text-green-800';
      case 'consent-updated':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      className="p-6 hover:bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100">
            {activity.icon}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {activity.title}
            </p>
            <div className={`px-2 py-1 text-xs rounded-full ${getTypeColor(activity.type)}`}>
              {activity.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
          </div>
          <p className="text-sm text-gray-500">{activity.description}</p>
          <p className="mt-1 text-xs text-gray-400">{activity.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scaleY: 0.8 },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  // Mock stats data
  const stats = [
    { 
      title: 'Active Samples', 
      value: '8', 
      icon: <span className="text-white text-xl">🧪</span>, 
      color: 'bg-blue-500',
      change: '25%',
      trend: 'up' as const
    },
    { 
      title: 'Research Projects', 
      value: '4', 
      icon: <span className="text-white text-xl">🔬</span>, 
      color: 'bg-purple-500',
      change: '50%',
      trend: 'up' as const
    },
    { 
      title: 'Total Benefits', 
      value: '$749.50', 
      icon: <span className="text-white text-xl">💰</span>, 
      color: 'bg-green-500',
      change: '12%',
      trend: 'up' as const
    },
    { 
      title: 'Average Per Project', 
      value: '$187.38', 
      icon: <span className="text-white text-xl">📊</span>, 
      color: 'bg-yellow-500',
      change: '8%',
      trend: 'down' as const
    }
  ];

  // Mock activity data
  const activities = [
    { 
      id: 1, 
      type: 'sample-used' as const, 
      title: 'Sample Used', 
      description: 'Your blood sample (SP12345) was used in research project RES789',
      date: '2 days ago',
      icon: <span className="text-lg">🧪</span>
    },
    { 
      id: 2, 
      type: 'benefit-received' as const, 
      title: 'Benefit Received', 
      description: 'You received 0.045 ETH from research project RES456',
      date: '1 week ago',
      icon: <span className="text-lg">💰</span>
    },
    { 
      id: 3, 
      type: 'consent-updated' as const, 
      title: 'Consent Updated', 
      description: 'You updated consent preferences for sample SP12346',
      date: '2 weeks ago',
      icon: <span className="text-lg">📝</span>
    },
    { 
      id: 4, 
      type: 'sample-used' as const, 
      title: 'Sample Used', 
      description: 'Your tumor tissue (SP12347) was used in research project RES901',
      date: '3 weeks ago',
      icon: <span className="text-lg">🧪</span>
    }
  ];

  const [chartType, setChartType] = useState<'usage' | 'benefits'>('benefits');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <motion.p 
          className="mt-1 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Track your samples, monitor research progress, and manage benefits
        </motion.p>
      </div>

      {/* Demo Banner */}
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> This is a demonstration of the patient portal interface. No real data is being displayed.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <StatCard 
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              change={stat.change}
              trend={stat.trend}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div 
        className="mb-8 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden"
        variants={chartVariants}
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Sample Usage & Benefits Overview</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setChartType('usage')}
              className={`px-3 py-1 text-sm rounded-md ${
                chartType === 'usage' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Usage
            </button>
            <button 
              onClick={() => setChartType('benefits')}
              className={`px-3 py-1 text-sm rounded-md ${
                chartType === 'benefits' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Benefits
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={usageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  stroke="#8884d8"
                  label={{ value: chartType === 'usage' ? 'Samples Used' : 'Benefits ($)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === 'benefits') return [`$${value}`, 'Benefits'];
                    return [value, 'Samples Used'];
                  }}
                />
                {chartType === 'usage' ? (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="usage"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                ) : (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="benefits"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <motion.div key={activity.id} variants={itemVariants}>
              <ActivityFeed activity={activity} />
            </motion.div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Link 
            href="/history"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all activity →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}