const API_BASE_URL = 'http://localhost:8080';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Si ya es una URL completa, devolverla tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Si es una ruta relativa, agregarle el dominio base
  return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

export const getImagePreview = (imageFile) => {
  if (!imageFile) return null;
  return URL.createObjectURL(imageFile);
};