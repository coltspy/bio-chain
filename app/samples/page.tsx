'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Sample {
  id: string;
  type: string;
  collectionDate: string;
  status: 'active' | 'inactive';
  location: string;
  research: string[];
  consent: {
    academicResearch: boolean;
    commercialResearch: boolean;
    profitSharing: boolean;
  };
}

interface SampleDetailsProps {
  sample: Sample;
  onClose: () => void;
}

const SampleDetails = ({ sample, onClose }: SampleDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white px-6 pt-5 pb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Sample Details: {sample.id}
                </h3>
                <button 
                  onClick={onClose}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sample Type</p>
                  <p className="mt-1 text-sm text-gray-900">{sample.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Collection Date</p>
                  <p className="mt-1 text-sm text-gray-900">{sample.collectionDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sample.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Storage Location</p>
                  <p className="mt-1 text-sm text-gray-900">{sample.location}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Current Research Projects</p>
                <div className="mt-1">
                  {sample.research.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-900">
                      {sample.research.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Not currently used in any research projects</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Consent Settings</p>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">Academic Research</p>
                    <div className={`h-4 w-4 rounded-full ${sample.consent.academicResearch ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">Commercial Research</p>
                    <div className={`h-4 w-4 rounded-full ${sample.consent.commercialResearch ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">Profit Sharing</p>
                    <div className={`h-4 w-4 rounded-full ${sample.consent.profitSharing ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-between">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Manage Consent
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function SamplesPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);

  // Mock samples data
  const [samples] = useState<Sample[]>([
    {
      id: 'SP12345',
      type: 'Blood Plasma',
      collectionDate: '2023-05-10',
      status: 'active',
      location: 'Mayo Clinic Biobank',
      research: ['Cancer Research', 'Genomics'],
      consent: {
        academicResearch: true,
        commercialResearch: true,
        profitSharing: true
      }
    },
    {
      id: 'SP12346',
      type: 'Tumor Tissue',
      collectionDate: '2023-06-22',
      status: 'active',
      location: 'Columbia University Biobank',
      research: ['Oncology Studies'],
      consent: {
        academicResearch: true,
        commercialResearch: false,
        profitSharing: true
      }
    },
    {
      id: 'SP12347',
      type: 'Blood Sample',
      collectionDate: '2023-08-15',
      status: 'inactive',
      location: 'Johns Hopkins Biobank',
      research: [],
      consent: {
        academicResearch: true,
        commercialResearch: true,
        profitSharing: false
      }
    },
    {
      id: 'SP12348',
      type: 'Skin Biopsy',
      collectionDate: '2023-09-05',
      status: 'active',
      location: 'Mayo Clinic Biobank',
      research: ['Dermatology Research'],
      consent: {
        academicResearch: true,
        commercialResearch: true,
        profitSharing: true
      }
    },
    {
      id: 'SP12349',
      type: 'Whole Blood',
      collectionDate: '2023-10-18',
      status: 'active',
      location: 'Stanford Medical Center',
      research: ['Immunology', 'COVID-19 Research'],
      consent: {
        academicResearch: true,
        commercialResearch: false,
        profitSharing: false
      }
    }
  ]);

  useEffect(() => {
    setIsAnimate(true);
  }, []);

  // Filter samples based on type and search term
  const filteredSamples = samples.filter(sample => {
    const matchesType = filterType === 'all' || sample.type.includes(filterType);
    const matchesSearch = sample.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sample.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sample.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <motion.h1 
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Samples
          </motion.h1>
          <motion.p 
            className="mt-1 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View and manage your biological samples
          </motion.p>
        </div>
        <motion.div
          className="mt-4 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Register New Sample
          </button>
        </motion.div>
      </div>

      {/* Demo Banner */}
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6"
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
              <strong>Demo Mode:</strong> This is a demonstration showing how patients can track their donated samples. No real data is displayed.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filter and Search */}
      <motion.div 
        className="bg-white p-4 shadow-sm rounded-lg border border-gray-200 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="search" className="sr-only">Search samples</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by ID, type, or location"
              />
            </div>
          </div>
          <div>
            <label htmlFor="filter" className="sr-only">Filter by type</label>
            <select
              id="filter"
              name="filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Types</option>
              <option value="Blood">Blood Samples</option>
              <option value="Tumor">Tumor Samples</option>
              <option value="Skin">Skin Samples</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Samples Table */}
      <motion.div 
        className="bg-white shadow-sm overflow-hidden sm:rounded-lg border border-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate={isAnimate ? "visible" : "hidden"}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Research Projects
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSamples.map((sample) => (
                <motion.tr 
                  key={sample.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  variants={itemVariants}
                  onClick={() => setSelectedSample(sample)}
                  whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {sample.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sample.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sample.collectionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sample.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sample.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sample.research.length > 0 
                      ? sample.research.join(', ')
                      : <span className="text-gray-400">None</span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSample(sample);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle consent management
                      }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Manage Consent
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSamples.length === 0 && (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">No samples found matching your criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Sample Details Modal */}
      {selectedSample && (
        <SampleDetails sample={selectedSample} onClose={() => setSelectedSample(null)} />
      )}
    </div>
  );
}