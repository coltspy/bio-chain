interface StatCardProps {
    title: string;
    value: string;
    icon: string;
    color: string;
  }
  
  export default function StatCard({ title, value, icon, color }: StatCardProps) {
    return (
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`relative rounded-md p-3 ${color} bg-opacity-10`}>
                <div className="text-2xl">{icon}</div>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                <dd>
                  <div className="text-lg font-semibold text-gray-900">{value}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }