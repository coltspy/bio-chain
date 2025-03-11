// app/researcher/inquiries/page.tsx
export default function ResearcherInquiries() {
    // Mock data
    const inquiryItems = [
      {
        id: 'SP12345',
        type: 'Tumor Tissue',
        diagnosis: 'Glioblastoma',
        gender: 'Male',
        age: 48,
        preservation: 'FFPE',
        source: 'Mayo Clinic Biobank',
        addedDate: '2023-04-15'
      },
      {
        id: 'SP13579',
        type: 'Normal Tissue',
        diagnosis: 'Matched Normal',
        gender: 'Male',
        age: 48,
        preservation: 'FFPE',
        source: 'Mayo Clinic Biobank',
        addedDate: '2023-04-15'
      },
      {
        id: 'SP24680',
        type: 'Blood Sample',
        diagnosis: 'Type 2 Diabetes',
        gender: 'Female',
        age: 62,
        preservation: 'Frozen',
        source: 'Johns Hopkins Biobank',
        addedDate: '2023-04-10'
      }
    ];
  
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sample Inquiry</h1>
            <p className="text-sm text-gray-500">
              Review and submit requests for selected samples
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Save Inquiry
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Submit Request
            </button>
          </div>
        </div>
  
        {/* Inquiry Summary */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Inquiry Summary</h2>
          </div>
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Total Samples</div>
              <div className="text-2xl font-bold text-gray-900">3</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Biobanks</div>
              <div className="text-2xl font-bold text-gray-900">2</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Sample Types</div>
              <div className="text-2xl font-bold text-gray-900">3</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Estimated Cost</div>
              <div className="text-2xl font-bold text-gray-900">Contact for Quote</div>
            </div>
          </div>
        </div>
  
        {/* Inquiry Items Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Samples in Inquiry</h3>
            <button className="text-sm text-red-600 hover:text-red-900">
              Remove All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demographics</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preservation</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.diagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gender}, {item.age} yrs</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.preservation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.addedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Request Form */}
        <div className="mt-6 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
            <p className="mt-1 text-sm text-gray-500">
              Provide additional information about your request
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700">Research Project</label>
                <select id="project" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a project</option>
                  <option>Oncology Biomarkers Study</option>
                  <option>Diabetes Genetics Research</option>
                  <option>+ Create New Project</option>
                </select>
              </div>
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Research Purpose</label>
                <textarea id="purpose" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">Expected Timeline</label>
                <select id="timeline" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Immediate (1-2 weeks)</option>
                  <option>Soon (2-4 weeks)</option>
                  <option>Future (1-3 months)</option>
                </select>
              </div>
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea id="additionalNotes" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    );
  }