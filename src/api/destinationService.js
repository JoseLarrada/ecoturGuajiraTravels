// src/api/destinationService.js
import api from "./api";

// Obtener todos
export const getAll = async () => {
  try {
    const response = await api.get('/destination-data');
    return response.data;
  } catch (error) {
    console.error('Error getting destinations:', error);
    throw error;
  }
};

// Crear
export const createDestination = async (destinationData, mainImage, galleryImages) => {
  const data = new FormData();
  data.append(
    "destinationData",
    new Blob([JSON.stringify(destinationData)], { type: "application/json" })
  );

  if (mainImage) {
    data.append("mainImage", mainImage);
  }

  if (galleryImages && galleryImages.length > 0) {
    galleryImages.forEach((file) => data.append("galleryImages", file));
  }

  return await api.post("/destination-data", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar
export const updateDestination = async (
  id,
  destinationData,
  newMainImage = null,
  newGalleryImages = [],
  keptMainImagePath = null,
  keptGalleryPaths = []
) => {
  try {
    const formData = new FormData();

    // Agregar los datos del destino como JSON blob
    formData.append(
      "destination",
      new Blob([JSON.stringify(destinationData)], { type: "application/json" })
    );

    // Agregar nueva imagen principal si existe
    if (newMainImage) {
      formData.append("mainImage", newMainImage);
    }

    // Agregar ruta de imagen principal conservada como JSON blob (NO como string)
    if (keptMainImagePath && !newMainImage) {
      formData.append(
        "keptMainImage",
        new Blob([JSON.stringify(keptMainImagePath)], { type: "application/json" })
      );
    }

    // Agregar nuevas imágenes de galería
    if (Array.isArray(newGalleryImages) && newGalleryImages.length > 0) {
      newGalleryImages.forEach((image) => {
        if (image) formData.append("galleryImages", image);
      });
    }

    // Agregar galería conservada como JSON blob (NO como string)
    if (Array.isArray(keptGalleryPaths) && keptGalleryPaths.length > 0) {
      // Transformar a la estructura que espera el backend
      const keptGalleryItems = keptGalleryPaths.map(item => ({
        url: item.image || item.url || item.originalPath || item,
        caption: item.caption || ""
      }));
      
      formData.append(
        "keptGallery",
        new Blob([JSON.stringify(keptGalleryItems)], { type: "application/json" })
      );
    }

    // Debug
    console.log("=== SERVICE DEBUG ===");
    console.log("ID:", id);
    console.log("Destination data:", destinationData);
    console.log("Nueva imagen principal:", newMainImage?.name || "Ninguna");
    console.log("Imagen principal conservada:", keptMainImagePath || "Ninguna");
    console.log("Nuevas imágenes galería:", newGalleryImages?.length || 0);
    console.log("keptGalleryPaths original:", keptGalleryPaths);
    console.log("keptGalleryItems transformado:", keptGalleryPaths?.map(item => ({
      url: item.image || item.url || item.originalPath || item,
      caption: item.caption || ""
    })));
    console.log("===================");

    const response = await api.put(`/destination-data/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating destination:", error);
    throw error;
  }
};


// Eliminar
export const deleteItem = async (id) => {
  return await api.delete(`/destination-data/${id}`);
};
