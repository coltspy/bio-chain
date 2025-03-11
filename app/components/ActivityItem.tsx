interface ActivityItemProps {
    title: string;
    description: string;
    date: string;
    icon: string;
    type: string;
  }
  
  export default function ActivityItem({ title, description, date, icon, type }: ActivityItemProps) {
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
      <div className="p-6 hover:bg-gray-50">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100">
              <span className="text-lg">{icon}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
              <div className={`px-2 py-1 text-xs rounded-full ${getTypeColor(type)}`}>
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
            </div>
            <p className="text-sm text-gray-500">{description}</p>
            <p className="mt-1 text-xs text-gray-400">{date}</p>
          </div>
        </div>
      </div>
    );
  }