'use client';

import { getTypeColor, getTypeIcon } from '@/lib/search-helpers';

type SpecimenCardProps = {
  specimen: {
    id: string;
    external_id: string;
    biobank: string;
    type: string;
    diagnosis: string;
    gender: string;
    age_at_collection: number;
    ethnicity: string;
    preservation_method: string;
    quantity: string;
    similarity?: number;
    available: boolean;
  };
  isSelected: boolean;
  onToggleSelect: () => void;
  showDetails?: boolean;
};

export default function SpecimenCard({ 
  specimen, 
  isSelected, 
  onToggleSelect,
  showDetails = false
}: SpecimenCardProps) {
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className={`p-4 ${getTypeColor(specimen.type)} relative`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2 text-lg">{getTypeIcon(specimen.type)}</span>
            <h3 className="text-sm font-medium text-gray-900">{specimen.type}</h3>
          </div>
          {specimen.similarity !== undefined && (
            <span className="text-xs text-gray-600 bg-white bg-opacity-60 px-2 py-0.5 rounded-full">
              Match: {(specimen.similarity * 100).toFixed(0)}%
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onToggleSelect}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
          />
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="flex justify-between text-xs mb-3">
          <span className="text-gray-600 truncate" style={{ maxWidth: '60%' }}>{specimen.biobank}</span>
          <span className="text-gray-800">ID: {specimen.external_id}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <div className="text-gray-500">Gender</div>
            <div>{specimen.gender}</div>
          </div>
          <div>
            <div className="text-gray-500">Age</div>
            <div>{specimen.age_at_collection} years</div>
          </div>
          <div>
            <div className="text-gray-500">Diagnosis</div>
            <div className="truncate">{specimen.diagnosis}</div>
          </div>
          <div>
            <div className="text-gray-500">Preservation</div>
            <div>{specimen.preservation_method}</div>
          </div>
          <div>
            <div className="text-gray-500">Ethnicity</div>
            <div className="truncate">{specimen.ethnicity}</div>
          </div>
          <div>
            <div className="text-gray-500">Quantity</div>
            <div>{specimen.quantity}</div>
          </div>
        </div>
        
        {/* Detailed information (conditionally rendered) */}
        {showDetails && (
          <div className="border-t border-gray-200 mt-3 pt-3 text-xs">
            <div className="mb-2">
              <div className="text-gray-500 font-medium">Detailed Diagnosis</div>
              <div className="text-gray-700">{specimen.diagnosis}</div>
            </div>
            <div className="mb-2">
              <div className="text-gray-500 font-medium">Availability</div>
              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  specimen.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {specimen.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <button className="text-xs font-medium text-gray-700 hover:text-gray-900">
            View Details
          </button>
          <button 
            onClick={onToggleSelect}
            className={`inline-flex items-center px-3 py-1.5 border ${
              isSelected 
                ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100' 
                : 'border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
            } rounded-md text-xs font-medium`}
          >
            {isSelected ? 'Remove' : 'Add to inquiry'}
          </button>
        </div>
      </div>
    </div>
  );
}