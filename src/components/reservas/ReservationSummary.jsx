import { Star } from 'lucide-react';
const ReservationSummary = ({ formData }) => {
  const calculateTotal = () => {
    const basePrice = {
      'Montes de Oca': 250000,
      'Cabo de la Vela': 280000,
      'Punta Gallina': 800000,
      'Manaure': 110000,
      'Mayapo': 150000,
      'Camarones': 200000,
      'Palomino': 250000,
      'Dibulla': 250000,
      'Poportin': 200000
    };
    
    const price = basePrice[formData.tour] || 0;
    const total = price * parseInt(formData.numPersonas || 1);
    return total;
  };

  const tourNames = {
    'Cabo de la Vela': 'Cabo de la Vela',
    'Punta Gallinas': 'Punta Gallinas',
    'Manaure': 'Salinas de Manaure',
    'Mayapo': 'Mayapo',
    'Camarones': 'Camarones',
    'Palomino': 'Palomino',
    'Dibulla': 'Dibulla',
    'Poportin': 'Poportin',
    'Montes de Oca': 'Montes de Oca'
  };

  if (!formData.tour) return null;

  return (
    <div className="bg-gradient-to-br from-[#6A8C20]/10 to-[#ADD90D]/10 rounded-xl p-6 border-2 border-[#ADD90D]/30">
      <h3 className="text-lg font-bold text-[#6A8C20] mb-4 flex items-center gap-2">
        <Star className="w-5 h-5" />
        Resumen de tu Reserva
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tour seleccionado:</span>
          <span className="font-semibold text-[#6A8C20]">{tourNames[formData.tour]}</span>
        </div>
        
        {formData.fechaViaje && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-semibold">{formData.fechaViaje}</span>
          </div>
        )}
        
        {formData.numPersonas && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Personas:</span>
            <span className="font-semibold">{formData.numPersonas}</span>
          </div>
        )}
        
        <div className="border-t border-[#ADD90D]/30 pt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-gray-800">Total:</span>
            <span className="font-bold text-[#6A8C20] text-xl">
              ${calculateTotal().toLocaleString()} COP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;