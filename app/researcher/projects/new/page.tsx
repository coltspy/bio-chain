'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProject() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    objective: '',
    primaryInvestigator: '',
    teamMembers: '',
    startDate: '',
    expectedEndDate: '',
    fundingSource: '',
    ethicsApproval: 'pending',
    specimenRequirements: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      
      router.push('/researcher/projects');
    }, 1500);
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center">
          <Link 
            href="/researcher/projects"
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create New Research Project</h1>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Provide details about your new research project to get started
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Project Basics</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                    Project Name*
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    required
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Briefly describe your research project and its goals"
                  ></textarea>
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                    Research Objective*
                  </label>
                  <textarea
                    name="objective"
                    id="objective"
                    rows={3}
                    required
                    value={formData.objective}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="What specific questions or hypotheses does this research aim to address?"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="primaryInvestigator" className="block text-sm font-medium text-gray-700">
                    Primary Investigator*
                  </label>
                  <input
                    type="text"
                    name="primaryInvestigator"
                    id="primaryInvestigator"
                    required
                    value={formData.primaryInvestigator}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">
                    Team Members
                  </label>
                  <input
                    type="text"
                    name="teamMembers"
                    id="teamMembers"
                    value={formData.teamMembers}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter names separated by commas"
                  />
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="expectedEndDate" className="block text-sm font-medium text-gray-700">
                    Expected End Date
                  </label>
                  <input
                    type="date"
                    name="expectedEndDate"
                    id="expectedEndDate"
                    value={formData.expectedEndDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="fundingSource" className="block text-sm font-medium text-gray-700">
                    Funding Source
                  </label>
                  <input
                    type="text"
                    name="fundingSource"
                    id="fundingSource"
                    value={formData.fundingSource}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Grant, institution, or other funding source"
                  />
                </div>
                
                <div>
                  <label htmlFor="ethicsApproval" className="block text-sm font-medium text-gray-700">
                    Ethics Approval Status
                  </label>
                  <select
                    name="ethicsApproval"
                    id="ethicsApproval"
                    value={formData.ethicsApproval}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="not_required">Not Required</option>
                    <option value="not_submitted">Not Submitted Yet</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Specimen Requirements</h2>
              <div>
                <label htmlFor="specimenRequirements" className="block text-sm font-medium text-gray-700">
                  Describe required specimens and quantities
                </label>
                <textarea
                  name="specimenRequirements"
                  id="specimenRequirements"
                  rows={4}
                  value={formData.specimenRequirements}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="E.g., '10 tumor tissue samples from lung cancer patients, 10 matched normal tissue samples, 20 blood samples from healthy controls'"
                ></textarea>
              </div>
              
              <div className="mt-4">
                <Link
                  href="/researcher/search"
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search for specimens now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <Link
              href="/researcher/projects"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}