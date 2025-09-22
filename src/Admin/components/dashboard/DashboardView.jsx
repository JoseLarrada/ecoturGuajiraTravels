import React from 'react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import { 
  MapPin, 
  Star, 
  Users, 
  DollarSign,
  TrendingUp,
  Calendar
} from 'lucide-react';

const DashboardView = () => {
  const stats = [
    {
      title: 'Total Tours',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: MapPin,
      color: 'blue'
    },
    {
      title: 'Testimonios',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'Reservas Este Mes',
      value: '89',
      change: '+23%',
      changeType: 'increase',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Ingresos',
      value: '$12.4M',
      change: '+15%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tours Más Populares</h3>
          <div className="space-y-3">
            {[
              { name: 'Cabo de la Vela Mágico', bookings: 45 },
              { name: 'Punta Gallinas Aventura', bookings: 38 },
              { name: 'Ruta Vallenata Cultural', bookings: 32 },
              { name: 'Camarones y Flamencos', bookings: 28 }
            ].map((tour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{tour.name}</span>
                <span className="text-sm text-gray-500">{tour.bookings} reservas</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;