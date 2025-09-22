import {
  MapPin,
  Compass,
  Image,
  Building2,
  Monitor,
  MessageSquare,
  Route,
  DollarSign,
  Database
} from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

// Importar tus componentes reales
import DestinationDataForm from '../components/DestinationData/DestinationDataForm';
import DestinoForm from '../components/Destino/DestinoForm';
import DestinoItemForm from '../components/DestinoItem/DestinoItemForm';
import EmpresaInfoForm from '../components/Empresa/EmpresaInfoForm';
import SlideForm from '../components/Slide/SlideForm';
import TestimonialForm from '../components/Testimonial/TestimonialForm';
import TourForm from '../components/Tour/TourForm';
import TourOptionForm from '../components/TourOption/TourOptionForm';

// Importar los servicios
import * as tourService from '../../api/tourService';
import * as destinoService from '../../api/destinoService';
import * as destinoItemService from '../../api/destinoItemService';
import * as slideService from '../../api/slideService';
import * as testimonialService from '../../api/testimonialService';
import * as tourOptionService from '../../api/tourOptionService';
import * as empresaInfoService from '../../api/empresaInfoService';
import * as destinationService from '../../api/destinationService';

export const menuItems = [
  {
    id: 'tours',
    title: 'Tours',
    icon: Route,
    service: tourService,
    FormComponent: TourForm,
    columns: [
      { key: 'id', title: 'ID' },
      { 
        key: 'image', 
        title: 'Imagen', 
        render: (value) => value ? (
          <img 
            src={getImageUrl(value)} 
            alt="Tour" 
            className="w-12 h-12 object-cover rounded"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">Sin img</text></svg>';
            }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Sin img</span>
          </div>
        )
      },
      { key: 'title', title: 'Título' },
      { key: 'duration', title: 'Duración' },
      { key: 'price', title: 'Precio', render: (value) => `$${value?.toLocaleString()}` },
      { key: 'rating', title: 'Calificación' },
      { key: 'badge', title: 'Badge' }
    ],
    searchFields: ['title', 'description', 'badge']
  },
  {
    id: 'destinos',
    title: 'Destinos',
    icon: MapPin,
    service: destinoService,
    FormComponent: DestinoForm,
    columns: [
      { key: 'id', title: 'ID' },
      { 
        key: 'imagen', 
        title: 'Imagen', 
        render: (value) => value ? (
          <img 
            src={getImageUrl(value)} 
            alt="Destino" 
            className="w-12 h-12 object-cover rounded"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">Sin img</text></svg>';
            }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Sin img</span>
          </div>
        )
      },
      { key: 'nombre', title: 'Nombre' },
      { key: 'descripcion', title: 'Descripción' },
      { 
        key: 'experiencias', 
        title: 'Experiencias', 
        render: (value) => Array.isArray(value) ? value.length : 0 
      },
      { 
        key: 'color', 
        title: 'Color', 
        render: (value) => value ? (
          <div className={`w-8 h-4 rounded bg-gradient-to-r ${value}`}></div>
        ) : '-'
      }
    ],
    searchFields: ['nombre', 'descripcion']
  },
  {
    id: 'destino-items',
    title: 'Items de Destino',
    icon: Compass,
    service: destinoItemService,
    FormComponent: DestinoItemForm,
    columns: [
      { key: 'id', title: 'ID' },
      { 
        key: 'images', 
        title: 'Imágenes', 
        render: (value) => {
          if (Array.isArray(value) && value.length > 0) {
            const firstImage = value[0];
            const imageUrl = getImageUrl(firstImage);
            return (
              <div className="flex items-center gap-1">
                <img 
                  src={imageUrl} 
                  alt="Item" 
                  className="w-10 h-10 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="10">Sin img</text></svg>';
                  }}
                />
                {value.length > 1 && (
                  <span className="text-xs text-gray-500">+{value.length - 1}</span>
                )}
              </div>
            );
          }
          return (
            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">Sin img</span>
            </div>
          );
        }
      },
      { key: 'title', title: 'Título' },
      { key: 'phrase', title: 'Frase' },
      { 
        key: 'color', 
        title: 'Color', 
        render: (value) => value ? (
          <div className={`w-8 h-4 rounded bg-gradient-to-r ${value}`}></div>
        ) : '-'
      }
    ],
    searchFields: ['title', 'phrase']
  },
  {
    id: 'slides',
    title: 'Slides',
    icon: Monitor,
    service: slideService,
    FormComponent: SlideForm,
    columns: [
      { key: 'id', title: 'ID' },
      { 
        key: 'image', 
        title: 'Imagen', 
        render: (value) => value ? (
          <img 
            src={getImageUrl(value)} 
            alt="Slide" 
            className="w-12 h-12 object-cover rounded"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">Sin img</text></svg>';
            }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Sin img</span>
          </div>
        )
      },
      { key: 'title', title: 'Título' },
      { key: 'location', title: 'Ubicación' },
      { key: 'duration', title: 'Duración' },
      { key: 'price', title: 'Precio', render: (value) => `$${value?.toLocaleString()}` },
      { key: 'capacity', title: 'Capacidad' }
    ],
    searchFields: ['title', 'description', 'location']
  },
  {
    id: 'testimonials',
    title: 'Testimonios',
    icon: MessageSquare,
    service: testimonialService,
    FormComponent: TestimonialForm,
    columns: [
      { key: 'id', title: 'ID' },
      { 
        key: 'profileImage', 
        title: 'Foto', 
        render: (value) => value ? (
          <img 
            src={getImageUrl(value)} 
            alt="Perfil" 
            className="w-10 h-10 object-cover rounded-full"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="18" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="10">👤</text></svg>';
            }}
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-500">👤</span>
          </div>
        )
      },
      { key: 'name', title: 'Nombre' },
      { key: 'location', title: 'Ubicación' },
      { key: 'rating', title: 'Calificación' },
      { key: 'text', title: 'Testimonio', render: (value) => value?.substring(0, 50) + '...' }
    ],
    searchFields: ['name', 'location', 'text']
  },
  {
    id: 'tour-options',
    title: 'Opciones de Tours',
    icon: DollarSign,
    service: tourOptionService,
    FormComponent: TourOptionForm,
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'tourName', title: 'Tour' },
      { key: 'days', title: 'Días' },
      { 
        key: 'basePrice', 
        title: 'Precio Base', 
        render: (value) => value ? `$${value.toLocaleString()}` : '-' 
      },
      { 
        key: 'hospedajeOption.name', 
        title: 'Hospedaje',
        render: (value, row) => {
          const hospedaje = row.hospedajeOption?.name;
          return hospedaje ? (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
              {hospedaje}
            </span>
          ) : '-';
        }
      },
      {
        key: 'hospedajeOption.description',
        title: 'Descripción',
        render: (value, row) => {
          const description = row.hospedajeOption?.description;
          return description ? (
            <span className="text-sm text-gray-600" title={description}>
              {description.length > 30 ? `${description.substring(0, 30)}...` : description}
            </span>
          ) : '-';
        }
      }
    ],
    searchFields: ['tourName', 'days', 'hospedajeOption.name']
  },
  {
    id: 'empresa-info',
    title: 'Info Empresa',
    icon: Building2,
    service: empresaInfoService,
    FormComponent: EmpresaInfoForm,
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'razonSocial', title: 'Razón Social' },
      { key: 'nit', title: 'NIT' },
      { key: 'ciudad', title: 'Ciudad' },
      { key: 'telefono', title: 'Teléfono' },
      { 
        key: 'exposiciones', 
        title: 'Exposiciones', 
        render: (value) => Array.isArray(value) ? (
          <span className="text-sm text-gray-600">
            {value.length} exposición{value.length !== 1 ? 'es' : ''}
          </span>
        ) : '-'
      },
      { 
        key: 'timeline', 
        title: 'Timeline', 
        render: (value) => Array.isArray(value) ? (
          <span className="text-sm text-gray-600">
            {value.length} evento{value.length !== 1 ? 's' : ''}
          </span>
        ) : '-'
      }
    ],
    searchFields: ['razonSocial', 'nit', 'ciudad', 'telefono']
  },
  {
    id: 'destination-data',
    title: 'Datos de Destinos',
    icon: Database,
    service: destinationService,
    FormComponent: DestinationDataForm,
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Nombre' },
      { key: 'type', title: 'Tipo' },
      { key: 'experiences', title: 'Experiencias' },
      { key: 'bestTime', title: 'Mejor Tiempo' }
    ],
    searchFields: ['name', 'type', 'description']
  }
];