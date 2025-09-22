import api from "./api";

// Obtener todos los testimonios
export const getAll = async () => {
  try {
    const response = await api.get('/testimonial');
    return response.data;
  } catch (error) {
    console.error('Error getting testimonials:', error);
    throw error;
  }
};

// Crear testimonio con imagen
export const createTestimonial = async (testimonial, image) => {
  const data = new FormData();
  data.append(
    "testimonial",
    new Blob([JSON.stringify(testimonial)], { type: "application/json" })
  );
  if (image) data.append("image", image);

  return await api.post("/testimonial", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar testimonio (PUT solo JSON)
export const updateTestimonial = async (id, testimonial, image = null) => {
  const data = new FormData();

  // JSON del testimonial
  data.append("testimonial", JSON.stringify(testimonial));

  // Imagen opcional
  if (image) {
    data.append("image", image);
  }

  return await api.put(`/testimonial/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Eliminar testimonio
export const deleteItem = async (id) => {
  return await api.delete(`/testimonial/${id}`);
};

