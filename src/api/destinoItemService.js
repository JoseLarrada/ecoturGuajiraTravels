import api from "./api";

// Obtener todos los items
export const getAll = async () => {
  try {
    const response = await api.get('/destino-item');
    return response.data;
  } catch (error) {
    console.error('Error getting destino items:', error);
    throw error;
  }
};

// Crear item con imágenes
export const createDestinoItem = async (destinoItem, images) => {
  const data = new FormData();
  data.append(
    "destinoItem",
    new Blob([JSON.stringify(destinoItem)], { type: "application/json" })
  );
  if (images && images.length > 0) {
    images.forEach((file) => data.append("images", file));
  }

  return await api.post("/destino-item", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar (aquí depende si tu backend soporta imágenes en update o solo JSON)
export const updateDestinoItem = async (id, destinoItemData, newImages = [], keptImagePaths = []) => {
  try {
    const formData = new FormData();
    
    // Agregar los datos del destino item como JSON blob (igual que en create)
    formData.append(
      "destinoItem",
      new Blob([JSON.stringify(destinoItemData)], { type: "application/json" })
    );
    
    // Agregar nuevas imágenes si existen
    if (newImages && newImages.length > 0) {
      newImages.forEach((image) => {
        formData.append('images', image);
      });
    }
    
    // Agregar las rutas de las imágenes que se conservan como un array JSON
    if (keptImagePaths && keptImagePaths.length > 0) {
      formData.append(
        "keptImages",
        new Blob([JSON.stringify(keptImagePaths)], { type: "application/json" })
      );
    }

    console.log('=== SERVICE DEBUG ===');
    console.log('ID:', id);
    console.log('DestinoItem data:', destinoItemData);
    console.log('Nuevas imágenes:', newImages.length);
    console.log('Imágenes conservadas:', keptImagePaths);
    console.log('===================');

    const response = await api.put(`/destino-item/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating destino item:', error);
    throw error;
  }
};

// Eliminar por id
export const deleteItem = async (id) => {
  return await api.delete(`/destino-item/${id}`);
};

