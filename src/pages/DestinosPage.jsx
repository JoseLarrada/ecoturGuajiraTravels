import React, { useState } from 'react';
import { MapPin, Camera, Waves, Mountain, Sun, Fish, Leaf, Shield, Bus, Utensils, Coffee, Droplets, Users, Heart, Star } from 'lucide-react';
import DestinationModal from '../components/DestinationModal'
import cabo from '../Images/Cabo/Cabo_de_la_Vela,_Colombia.jpg' 
import desierto from '../Images/Cabo/deiserto.jpg' 
import faro from '../Images/Cabo/Faro-de-Cabo-de-la-Vela-viajar-a-colombia-aventureros-360-10-.jpg'
import rocosas from '../Images/Cabo/formaciones-rocosas.jpg'
import pilon from '../Images/Cabo/pilon-de-azucar.jpg'
import playa from '../Images/Cabo/playa-arcoirir.jpg'
import wayuu from '../Images/Cabo/wayuuwebp.webp'
import bahia from '../Images/PuntaGallina/Bahia_hondita.jpeg'
import dunas from '../Images/PuntaGallina/dunas.webp'
import faroPta from '../Images/PuntaGallina/FaroPta.jpg'
import paisaje from '../Images/PuntaGallina/paisajes.jpg'
import main from '../Images/PuntaGallina/principal.jpg'
import mayapoaguas from '../Images/mayapo/mayapoaguas.jpg'
import arenasBlancas from '../Images/mayapo/arenasBlancas.jpg'
import contraste from '../Images/mayapo/contrasteplaya.jpg'
import playamayapo from '../Images/mayapo/Mayapo-Playa-Jimatsu-1024x576.webp'
import virgen from '../Images/mayapo/playavirgen.jpg'
import Valledupar from '../Images/RutaVallenata/Valledupar.jpg'
import carrizal from '../Images/RutaVallenata/carrizal.jpg' 
import festival from '../Images/RutaVallenata/Festival-Vallenato.jpg'
import laJunta from '../Images/RutaVallenata/LaJunta.jpg'
import pedazoacordeon from '../Images/RutaVallenata/pedazoacordeón.jpg'
import plaza from '../Images/RutaVallenata/plazaAlfonzoLopez.jpg'
import tradicion from '../Images/RutaVallenata/tradicionVallenata.avif'
import camarones from '../Images/camarones/camarones.jpg'
import atardecer from '../Images/camarones/atardecer.png'
import biodiversidad from '../Images/camarones/BiodiversidadMarina.png'
import flamencos from '../Images/camarones/flamencos.jpg'
import laguna from '../Images/camarones/Lagunas.jpg'
import manglares from '../Images/camarones/Manglares.png'
import pescaArtesanal from '../Images/camarones/pescaArtesanal.png'
import ecosistema from '../Images/Palomino/ecosistema.jpg'
import Indigenas from '../Images/Palomino/Indigenas.jpg'
import palomino from '../Images/Palomino/MainPalomino.jpg'
import playaspa from '../Images/Palomino/playasPa.webp'
import contrasterio from '../Images/Palomino/RioPlaya.webp'
import sierra from '../Images/Palomino/sierraFondo.jpg'
import tubbing from '../Images/Palomino/tubbing.jpg'
import atardecerCaribe from '../Images/Dibulla/atardecercaribe.jpg'
import comunidad from '../Images/Dibulla/comunidadPesca.jpg'
import rioCristalino from '../Images/Dibulla/cristalina.jpg'
import dibulla from '../Images/Dibulla/MainDibulla.jpg'
import pescaDibulla from '../Images/Dibulla/pescaDibulla.jpeg'
import playaDorada from '../Images/Dibulla/playaDorada.webp'
import tranquilidad from '../Images/Dibulla/Tranquilidad.png'

const DestinosPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const destinos = [
    {
      id: 1,
      nombre: "Cabo de la Vela",
      imagen: cabo,
      descripcion: "Descubre la magia del extremo norte colombiano",
      experiencias: ["El Faro", "Playa Arcoíris", "Pilón de Azúcar"],
      icon: <Sun className="w-6 h-6" />,
      color: "from-orange-400 to-red-500"
    },
    {
      id: 2,
      nombre: "Punta Gallinas",
      imagen: main,
      descripcion: "El punto más septentrional de América del Sur",
      experiencias: ["Bahía Honda", "Desierto Taroa", "Faro Punta Gallinas"],
      icon: <Mountain className="w-6 h-6" />,
      color: "from-blue-400 to-purple-500"
    },
    {
      id: 3,
      nombre: "Mayapo",
      imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      descripcion: "Playas vírgenes y aguas cristalinas",
      experiencias: ["Playas de Mayapo"],
      icon: <Waves className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: 4,
      nombre: "Poportín",
      imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      descripcion: "Historia y turismo en estado puro",
      experiencias: ["Relatos Históricos", "Turismo Virgen"],
      icon: <Camera className="w-6 h-6" />,
      color: "from-green-400 to-teal-500"
    },
    {
      id: 5,
      nombre: "Ruta Vallenata",
      imagen: Valledupar,
      descripcion: "Vive la cultura vallenata en su máxima expresión",
      experiencias: ["La Junta", "Carrizal", "Valledupar"],
      icon: <Heart className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 6,
      nombre: "Camarones y Santuario Los Flamencos",
      imagen: camarones,
      descripcion: "Observa flamencos en su hábitat natural",
      experiencias: ["Paseo Acuático", "Atardecer", "Pesca"],
      icon: <Fish className="w-6 h-6" />,
      color: "from-pink-400 to-rose-500"
    },
    {
      id: 7,
      nombre: "Palomino",
      imagen: palomino,
      descripción: "Donde la montaña se encuentra con el mar",
      experiencias: ["Playas", "Guías"],
      icon: <Mountain className="w-6 h-6" />,
      color: "from-emerald-400 to-green-500"
    },
    {
      id: 8,
      nombre: "Dibulla",
      imagen: dibulla,
      descripcion: "Playas paradisíacas del Caribe colombiano",
      experiencias: ["Playas", "Guías"],
      icon: <Waves className="w-6 h-6" />,
      color: "from-indigo-400 to-blue-500"
    },
    {
      id: 9,
      nombre: "Montes de Oca",
      imagen: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      descripcion: "Naturaleza y aventura en una reserva natural",
      experiencias: ["Reserva", "Ríos"],
      icon: <Leaf className="w-6 h-6" />,
      color: "from-lime-400 to-green-500"
    }
  ];

  const destinationsData = {
  1: {
    name: 'Cabo de la Vela',
    type: 'Desierto Costero',
    experiences: 3,
    bestTime: '2-3 días',
    icon: Sun,
    mainImage: cabo,
    description: 'El Cabo de la Vela es uno de los destinos más místicos de Colombia, donde el desierto se encuentra con el mar Caribe. Este lugar sagrado para el pueblo Wayuu ofrece paisajes únicos con acantilados rojizos, playas vírgenes y atardeceres que quitan el aliento.',
    history: 'Para el pueblo Wayuu, el Cabo de la Vela es "Jepirra", lugar donde las almas de los muertos parten hacia el más allá. Los colonizadores españoles lo llamaron así por su forma de vela hinchada por el viento. Durante siglos ha sido un punto de referencia para navegantes y un lugar sagrado donde se realizan rituales ancestrales wayuu.',
    highlights: [
      'El Faro: punto más septentrional de Suramérica continental',
      'Playa Arcoíris: aguas cristalinas de colores cambiantes',
      'Pilón de Azúcar: formación rocosa icónica perfecta para el sunset',
      'Cultura Wayuu auténtica y hospitalidad ancestral',
      'Vientos constantes ideales para kitesurfing y windsurf',
      'Cielos estrellados sin contaminación lumínica'
    ],
    activities: ['Kitesurfing', 'Windsurf', 'Fotografía', 'Senderismo', 'Observación de estrellas', 'Turismo cultural'],
    gallery: [
      { url: faro, caption: 'El icónico Faro del Cabo' },
      { url: pilon, caption: 'Atardecer en Pilón de Azúcar' },
      { url: playa, caption: 'Playa Arcoíris' },
      { url: desierto, caption: 'Desierto costero' },
      { url: rocosas, caption: 'Formaciones rocosas' },
      { url: wayuu, caption: 'Cultura Wayuu' }
    ]
  },
  2: {
    name: 'Punta Gallinas',
    type: 'Extremo Continental',
    experiences: 3,
    bestTime: '3-4 días',
    icon: Mountain,
    mainImage: main,
    description: 'Punta Gallinas es el punto más septentrional de Sudamérica continental, un lugar remoto y salvaje donde las dunas doradas se encuentran con el mar turquesa. Es el hogar del pueblo Wayuu y ofrece una experiencia única de inmersión cultural y natural.',
    history: 'Conocida por los Wayuu como "Kotchipaa", Punta Gallinas ha sido habitada por este pueblo milenario durante generaciones. Su nombre español proviene de las gallinas de Guinea que los primeros exploradores encontraron en la zona. Este territorio ancestral wayuu mantiene intactas sus tradiciones y es considerado uno de los últimos bastiones de cultura indígena pura en Colombia.',
    highlights: [
      'Punto más septentrional de Sudamérica continental',
      'Dunas de Taroa: formaciones de arena de hasta 35 metros',
      'Bahía Honda: aguas cristalinas protegidas del viento',
      'Faro de Punta Gallinas con vistas panorámicas',
      'Comunidades Wayuu auténticas y sus tradiciones',
      'Paisajes desérticos únicos en el continente'
    ],
    activities: ['Sandboarding', 'Snorkeling', 'Turismo cultural', 'Fotografía', 'Caminatas', 'Pesca artesanal'],
    gallery: [
      { url: dunas, caption: 'Dunas de Taroa' },
      { url: bahia, caption: 'Bahía Honda' },
      { url: faroPta, caption: 'Faro de Punta Gallinas' },
      { url: desierto, caption: 'Desierto de La Guajira' },
      { url: wayuu, caption: 'Comunidad Wayuu' },
      { url: paisaje, caption: 'Paisajes únicos' }
    ]
  },
  3: {
    name: 'Mayapo',
    type: 'Playa Virgen',
    experiences: 1,
    bestTime: '1-2 días',
    icon: Waves,
    mainImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    description: 'Mayapo es una playa virgen de aguas cristalinas ubicada en el corazón de La Guajira. Sus aguas turquesas y arenas blancas crean un contraste perfecto con el árido desierto que la rodea, ofreciendo un oasis de tranquilidad en medio del paisaje guajiro.',
    history: 'Mayapo, cuyo nombre en wayuunaiki significa "lugar de agua dulce", ha sido tradicionalmente un sitio de descanso para los viajeros wayuu que cruzan el desierto. Las fuentes de agua dulce cercanas la convirtieron en un punto estratégico para las rutas comerciales ancestrales. Hoy en día conserva su esencia pristina y es un refugio natural protegido por las comunidades locales.',
    highlights: [
      'Aguas cristalinas de color turquesa intenso',
      'Playa virgen sin desarrollo comercial',
      'Arenas blancas y finas ideales para el descanso',
      'Ambiente tranquilo y relajante',
      'Acceso a fuentes de agua dulce naturales',
      'Punto perfecto para desconectarse del mundo'
    ],
    activities: ['Natación', 'Snorkeling', 'Relajación', 'Fotografía', 'Caminatas en playa'],
    gallery: [
      { url: mayapoaguas, caption: 'Aguas cristalinas de Mayapo' },
      { url: virgen, caption: 'Playa virgen y pristina' },
      { url: contraste, caption: 'Contraste desierto-mar' },
      { url: arenasBlancas, caption: 'Arenas blancas' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Tranquilidad absoluta' },
      { url: playamayapo, caption: 'Oasis guajiro' }
    ]
  },
  4: {
    name: 'Poportín',
    type: 'Patrimonio Histórico',
    experiences: 2,
    bestTime: '1-2 días',
    icon: Camera,
    mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Porporín es un tesoro histórico escondido en La Guajira, donde convergen relatos de antiguos navegantes, piratas y comerciantes. Este rincón virgen mantiene intacta la esencia colonial y ofrece una ventana al pasado de la región caribeña.',
    history: 'Porporín fue un importante puerto durante la época colonial, utilizado como refugio por navegantes y comerciantes que transitaban por el Caribe. Su nombre proviene de las embarcaciones "porporinas" que frecuentaban estas costas. Durante los siglos XVII y XVIII, fue testigo del paso de piratas, contrabandistas y exploradores que dejaron huellas en sus costas rocosas y bahías protegidas.',
    highlights: [
      'Ruinas coloniales y vestigios arqueológicos',
      'Bahías protegidas ideales para la navegación antigua',
      'Formaciones rocosas con petroglifos precolombinos',
      'Paisajes vírgenes sin intervención moderna',
      'Relatos y leyendas de piratas y tesoros escondidos',
      'Biodiversidad marina única en aguas cristalinas'
    ],
    activities: ['Turismo histórico', 'Arqueología', 'Fotografía', 'Snorkeling', 'Senderismo', 'Observación de aves'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Vestigios históricos' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Bahías protegidas' },
      { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Formaciones rocosas' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Aguas cristalinas' },
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Paisajes vírgenes' },
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Patrimonio cultural' }
    ]
  },
  5: {
    name: 'Ruta Vallenata',
    type: 'Patrimonio Cultural',
    experiences: 3,
    bestTime: '3-5 días',
    icon: Heart,
    mainImage: Valledupar,
    description: 'La Ruta Vallenata es un viaje musical y cultural que recorre los pueblos cuna del vallenato. Desde Valledupar hasta La Junta y Carrizal, cada rincón respira música, tradición y la esencia más pura de la cultura costeña colombiana.',
    history: 'El vallenato nació en esta región a finales del siglo XIX, fusionando tradiciones indígenas, africanas y europeas. La Junta fue el hogar de Alejo Durán, uno de los grandes maestros del vallenato. Carrizal vio nacer leyendas como Abel Antonio Villa, y Valledupar se consolidó como la capital mundial de este género musical. Esta ruta conecta los lugares donde surgieron los cantos que narran la vida, el amor y la historia del pueblo costeño.',
    highlights: [
      'Casa de Alejo Durán en La Junta, cuna del acordeón',
      'Monumento al acordeón en Carrizal',
      'Plaza Alfonso López en Valledupar, epicentro del Festival Vallenato',
      'Parque de la Leyenda Vallenata con estatuas de los grandes maestros',
      'Talleres de construcción de acordeones artesanales',
      'Parranda vallenata auténtica con juglares locales'
    ],
    activities: ['Turismo musical', 'Talleres de acordeón', 'Parranda vallenata', 'Gastronomía típica', 'Festival Vallenato', 'Turismo cultural'],
    gallery: [
      { url: pedazoacordeon, caption: 'Acordeón vallenato' },
      { url: plaza, caption: 'Plaza Alfonso López' },
      { url: laJunta, caption: 'La Junta, pueblo natal' },
      { url: carrizal, caption: 'Carrizal histórico' },
      { url: festival, caption: 'Festival Vallenato' },
      { url: tradicion, caption: 'Tradición musical' }
    ]
  },
  6: {
    name: 'Camarones y Santuario Los Flamencos',
    type: 'Reserva Natural',
    experiences: 3,
    bestTime: '2-3 días',
    icon: Fish,
    mainImage: camarones,
    description: 'El Santuario de Fauna y Flora Los Flamencos en Camarones es uno de los ecosistemas más importantes del Caribe colombiano. Este paraíso natural alberga miles de flamencos rosados, aves migratorias y una rica biodiversidad marina que convierte cada visita en un espectáculo de la naturaleza.',
    history: 'Establecido en 1977, el Santuario Los Flamencos protege las lagunas costeras donde estas majestuosas aves han anidado durante milenios. Los indígenas wayuu consideraban sagrados estos lugares, llamándolos "Shiimaalüin" (lugar de las aves rosadas). Camarones, el pueblo pescador que custodia el santuario, ha mantenido una relación armoniosa con la naturaleza, desarrollando el ecoturismo como alternativa sostenible a la pesca tradicional.',
    highlights: [
      'Más de 2,000 flamencos rosados en temporada migratoria',
      'Navegación por manglares y lagunas cristalinas',
      'Atardeceres espectaculares desde las embarcaciones',
      'Pesca artesanal con técnicas ancestrales',
      'Avistamiento de más de 150 especies de aves',
      'Gastronomía marina fresca preparada por pescadores locales'
    ],
    activities: ['Avistamiento de aves', 'Paseos acuáticos', 'Pesca artesanal', 'Fotografía de naturaleza', 'Kayaking', 'Turismo ecológico'],
    gallery: [
      { url: flamencos, caption: 'Flamencos en su hábitat' },
      { url: laguna, caption: 'Lagunas cristalinas' },
      { url: atardecer, caption: 'Atardecer en Camarones' },
      { url: manglares, caption: 'Navegación por manglares' },
      { url: pescaArtesanal, caption: 'Pesca artesanal' },
      { url: biodiversidad, caption: 'Biodiversidad marina' }
    ]
  },
  7: {
    name: 'Palomino',
    type: 'Encuentro Mar-Montaña',
    experiences: 2,
    bestTime: '2-3 días',
    icon: Mountain,
    mainImage: palomino,
    description: 'Palomino es el lugar mágico donde la Sierra Nevada de Santa Marta se encuentra con el mar Caribe. Sus ríos cristalinos descienden desde las montañas para desembocar en playas paradisíacas, creando un ecosistema único donde se puede vivir montaña y playa en un mismo día.',
    history: 'Palomino debe su nombre a un caballo palomino que según la leyenda local pertenecía a un cacique indígena de la región. Los pueblos originarios Kogui, Wiwa y Arhuaco consideran esta zona como territorio sagrado de la Sierra Nevada. Durante siglos, los ríos que descienden de la montaña más alta del país han creado este oasis donde confluyen múltiples ecosistemas, desde bosques tropicales hasta manglares costeros.',
    highlights: [
      'Río Palomino que desemboca directamente en el mar',
      'Playas vírgenes enmarcadas por la Sierra Nevada',
      'Tubing por aguas cristalinas de montaña',
      'Comunidades indígenas Kogui, Wiwa y Arhuaco cercanas',
      'Biodiversidad única entre montaña y costa',
      'Atardeceres con la Sierra Nevada como telón de fondo'
    ],
    activities: ['Tubing', 'Senderismo', 'Natación en río y mar', 'Turismo indígena', 'Observación de aves', 'Relajación en playa'],
    gallery: [
      { url: contrasterio, caption: 'Río encontrando el mar' },
      { url: sierra, caption: 'Sierra Nevada de fondo' },
      { url: playaspa, caption: 'Playas paradisíacas' },
      { url: tubbing, caption: 'Tubing aventura' },
      { url: ecosistema, caption: 'Ecosistema único' },
      { url: Indigenas, caption: 'Comunidades indígenas' }
    ]
  },
  8: {
    name: 'Dibulla',
    type: 'Playas Paradisíacas',
    experiences: 2,
    bestTime: '2-3 días',
    icon: Waves,
    mainImage: dibulla,
    description: 'Dibulla es la puerta de entrada al paraíso caribeño de La Guajira, famosa por sus extensas playas de arena dorada, aguas cristalinas y una tranquilidad que invita a desconectarse del mundo. Este municipio costero combina la belleza natural con la calidez de su gente y su rica gastronomía marina.',
    history: 'Fundada en 1538 por el español Alonso de Heredia, Dibulla es una de las poblaciones más antiguas de la costa atlántica colombiana. Su nombre proviene del cacique indígena Divulga, quien dominaba la región antes de la llegada de los españoles. Durante la época colonial fue un importante puerto de intercambio comercial, y hoy mantiene su esencia marinera con una comunidad que vive principalmente de la pesca y el turismo sostenible.',
    highlights: [
      'Playa Las Flores: arena dorada y aguas tranquilas',
      'Playa La Bocana: ideal para deportes acuáticos',
      'Gastronomía marina auténtica con pescado fresco',
      'Comunidad pesquera tradicional y hospitalaria',
      'Proximidad a la Sierra Nevada y sus atractivos',
      'Base perfecta para explorar La Guajira alta'
    ],
    activities: ['Natación', 'Pesca deportiva', 'Gastronomía marina', 'Descanso en playa', 'Kayaking', 'Turismo rural'],
    gallery: [
      { url: playaDorada, caption: 'Playas doradas de Dibulla' },
      { url: rioCristalino, caption: 'Aguas cristalinas del Caribe' },
      { url: pescaDibulla, caption: 'Pesca tradicional' },
      { url: comunidad, caption: 'Comunidad pescadora' },
      { url: atardecerCaribe, caption: 'Atardeceres caribeños' },
      { url: tranquilidad, caption: 'Tranquilidad absoluta' }
    ]
  },
  9: {
    name: 'Montes de Oca',
    type: 'Naturaleza y Aventura',
    experiences: 2,
    bestTime: '2-3 días',
    icon: Leaf,
    mainImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    description: 'Montes de Oca es un tesoro natural escondido en las estribaciones de la Sierra Nevada de Santa Marta. Este destino ofrece una experiencia única de conexión con la naturaleza, donde ríos cristalinos, bosques tropicales y reservas naturales crean el escenario perfecto para el ecoturismo y la aventura.',
    history: 'Montes de Oca fue fundado en 1751 como un asentamiento agrícola en las faldas de la Sierra Nevada. Su nombre hace honor a los montes boscosos que caracterizan la región y a la abundante vegetación que los antiguos pobladores encontraron al llegar. Tradicionalmente ha sido una zona de vocación agrícola y ganadera, pero en las últimas décadas ha desarrollado un modelo de turismo sostenible que protege sus ecosistemas mientras genera oportunidades para las comunidades locales.',
    highlights: [
      'Reserva Natural El Rincón del Mar: biodiversidad excepcional',
      'Ríos cristalinos ideales para refrescarse y relajarse',
      'Bosques tropicales con senderos ecológicos',
      'Avistamiento de aves endémicas de la Sierra Nevada',
      'Cascadas naturales y pozos de agua pura',
      'Turismo rural comunitario auténtico'
    ],
    activities: ['Senderismo ecológico', 'Avistamiento de aves', 'Baño en ríos', 'Turismo rural', 'Fotografía de naturaleza', 'Meditación en natura'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Bosques de Montes de Oca' },
      { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Ríos cristalinos' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Cascadas naturales' },
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Biodiversidad única' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Senderos ecológicos' },
      { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Sierra Nevada' }
    ]
  }
    };
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExploreClick = (destinationId) => {
    setSelectedDestination(destinationsData[destinationId]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  const serviciosIncluidos = [
    { icon: <Bus className="w-5 h-5" />, nombre: "Transporte ida y vuelta" },
    { icon: <Utensils className="w-5 h-5" />, nombre: "Almuerzo" },
    { icon: <Coffee className="w-5 h-5" />, nombre: "Refrigerio" },
    { icon: <Droplets className="w-5 h-5" />, nombre: "Hidratación" },
    { icon: <Camera className="w-5 h-5" />, nombre: "Tour" },
    { icon: <Shield className="w-5 h-5" />, nombre: "Seguro de salud viajero" },
    { icon: <Shield className="w-5 h-5" />, nombre: "Seguridad" },
    { icon: <Users className="w-5 h-5" />, nombre: "Operador Turístico" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Nuestros Destinos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Descubre la magia de La Guajira con experiencias únicas e inolvidables
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">La Guajira, Colombia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destinos Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinos.map((destino, index) => (
            <div
              key={destino.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(destino.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Imagen */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destino.imagen}
                    alt={destino.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${destino.color} opacity-60 transition-opacity duration-300 group-hover:opacity-40`}></div>
                  
                  {/* Icon flotante */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white">
                      {destino.icon}
                    </div>
                  </div>
                  
                  {/* Badge de experiencias */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                      {destino.experiencias.length} experiencias
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {destino.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {destino.descripcion}
                  </p>

                  {/* Lista de experiencias */}
                  <div className="space-y-2 mb-6">
                    {destino.experiencias.map((experiencia, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{experiencia}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botón */}
                  <button onClick={() => handleExploreClick(destino.id)} className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${destino.color} text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95`}>
                    Explorar Destino
                  </button>
                </div>

                {/* Efecto de brillo */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${hoveredCard === destino.id ? 'opacity-100' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Servicios Incluidos */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Todo Incluido en Nuestros Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Disfruta de una experiencia completa sin preocupaciones adicionales
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviciosIncluidos.map((servicio, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {servicio.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {servicio.nombre}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y diseñemos juntos el viaje perfecto a La Guajira
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105">
              Reservar Tour
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300">
              Más Información
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      {/* Modal */}
      <DestinationModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        destination={selectedDestination}
      />
    </div>
  );
};

export default DestinosPage;