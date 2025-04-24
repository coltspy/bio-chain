'use client';

import { useEffect, useState } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

type VisualizationProps = {
  searchResults: any[];
};

export default function SearchVisualizations({ searchResults }: VisualizationProps) {
  const [diagnosisData, setDiagnosisData] = useState<any[]>([]);
  const [ageData, setAgeData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);
  
  useEffect(() => {
    if (searchResults.length > 0) {
      const diagnosisCounts: Record<string, number> = {};
      searchResults.forEach(specimen => {
        diagnosisCounts[specimen.diagnosis] = (diagnosisCounts[specimen.diagnosis] || 0) + 1;
      });
      
      const diagnosisArray = Object.entries(diagnosisCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); 
      
      setDiagnosisData(diagnosisArray);
      
      const ageGroups = {
        '0-18': 0,
        '19-30': 0,
        '31-45': 0,
        '46-60': 0,
        '61-75': 0,
        '76+': 0,
      };
      
      searchResults.forEach(specimen => {
        const age = specimen.age_at_collection;
        if (age <= 18) ageGroups['0-18']++;
        else if (age <= 30) ageGroups['19-30']++;
        else if (age <= 45) ageGroups['31-45']++;
        else if (age <= 60) ageGroups['46-60']++;
        else if (age <= 75) ageGroups['61-75']++;
        else ageGroups['76+']++;
      });
      
      const ageArray = Object.entries(ageGroups)
        .map(([name, value]) => ({ name, value }));
      
      setAgeData(ageArray);
      
      const typeCounts: Record<string, number> = {};
      searchResults.forEach(specimen => {
        typeCounts[specimen.type] = (typeCounts[specimen.type] || 0) + 1;
      });
      
      const typeArray = Object.entries(typeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); 
      
      setTypeData(typeArray);
    }
  }, [searchResults]);
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];
  
  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Search for specimens to see visualizations
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Diagnosis Distribution</h3>
        {diagnosisData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={diagnosisData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {diagnosisData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400">
            Not enough data
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Age Distribution</h3>
        {ageData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={ageData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400">
            Not enough data
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Sample Type Distribution</h3>
        {typeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              layout="vertical"
              data={typeData}
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip formatter={(value) => [`${value} specimens`, 'Count']} />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400">
            Not enough data
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Biobank Network Map</h3>
        <div className="h-48 relative">
          <div className="w-full h-full bg-gray-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-5 border-2 border-gray-300 rounded-lg"></div>
            
            <div className="absolute h-3 w-3 rounded-full bg-blue-500 pulse-blue" style={{ top: '30%', left: '25%' }}>
              <span className="absolute top-4 left-2 text-xs font-medium text-gray-700">Mayo Clinic</span>
            </div>
            <div className="absolute h-3 w-3 rounded-full bg-green-500 pulse-green" style={{ top: '35%', left: '38%' }}>
              <span className="absolute top-4 left-2 text-xs font-medium text-gray-700">Johns Hopkins</span>
            </div>
            <div className="absolute h-3 w-3 rounded-full bg-purple-500 pulse-purple" style={{ top: '40%', left: '15%' }}>
              <span className="absolute top-4 left-2 text-xs font-medium text-gray-700">Stanford</span>
            </div>
            <div className="absolute h-3 w-3 rounded-full bg-red-500 pulse-red" style={{ top: '25%', left: '45%' }}>
              <span className="absolute top-4 left-2 text-xs font-medium text-gray-700">Harvard</span>
            </div>
            
            <div className="absolute bottom-2 right-2 text-xs bg-white bg-opacity-75 p-1 rounded">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span>Active Biobanks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}