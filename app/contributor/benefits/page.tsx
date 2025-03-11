// app/contributor/benefits/page.tsx
export default function ContributorBenefits() {
    // Mock data
    const benefitHistory = [
      {
        id: 'PMT123',
        date: '2023-03-15',
        amount: 120.00,
        project: 'RES456',
        institution: 'Genentech',
        sample: 'S12345',
        status: 'Paid'
      },
      {
        id: 'PMT124',
        date: '2023-04-22',
        amount: 75.50,
        project: 'RES789',
        institution: 'Mayo Clinic',
        sample: 'S12346',
        status: 'Paid'
      },
      {
        id: 'PMT125',
        date: '2023-05-10',
        amount: 45.00,
        project: 'RES901',
        institution: 'Johns Hopkins',
        sample: 'S12345',
        status: 'Processing'
      }
    ];
  
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Benefits Dashboard</h1>
            <p className="text-sm text-gray-500">
              Track compensation from research using your samples
            </p>
          </div>
        </div>
  
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg mb-6">
          <div className="p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Total Benefits Received</h2>
                <p className="text-sm opacity-80">Lifetime earnings from your contributions</p>
              </div>
              <div className="text-4xl font-bold">$240.50</div>
            </div>
          </div>
          <div className="bg-indigo-800 bg-opacity-50 px-6 py-4">
            <div className="flex justify-between text-white text-sm">
              <span>Pending: $45.00</span>
              <span>Earnings This Year: $240.50</span>
            </div>
          </div>
        </div>
  
        {/* Benefits Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Sample S12345</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">$165.00</div>
            <div className="mt-1 text-xs text-gray-500">From 2 research projects</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Sample S12346</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">$75.50</div>
            <div className="mt-1 text-xs text-gray-500">From 1 research project</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Sample S12347</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">$0.00</div>
            <div className="mt-1 text-xs text-gray-500">Not yet used in research</div>
          </div>
        </div>
  
        {/* Transaction History */}
        <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Benefit History</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed record of compensation</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {benefitHistory.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.institution}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.sample}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }