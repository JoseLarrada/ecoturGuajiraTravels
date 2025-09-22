import React from 'react';
import { Clock } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      action: 'Nuevo tour creado',
      details: 'Cabo de la Vela Mágico',
      time: 'Hace 2 horas',
      type: 'create'
    },
    {
      id: 2,
      action: 'Testimonio agregado',
      details: 'Jose Larrada - 5 estrellas',
      time: 'Hace 4 horas',
      type: 'testimonial'
    },
    {
      id: 3,
      action: 'Destino actualizado',
      details: 'Punta Gallinas',
      time: 'Hace 6 horas',
      type: 'update'
    },
    {
      id: 4,
      action: 'Nueva reserva',
      details: 'Tour Ruta Vallenata',
      time: 'Hace 8 horas',
      type: 'booking'
    }
  ];

  const getActivityColor = (type) => {
    const colors = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      testimonial: 'bg-yellow-100 text-yellow-800',
      booking: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Clock size={20} />
        Actividad Reciente
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
              {activity.type}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.details}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;