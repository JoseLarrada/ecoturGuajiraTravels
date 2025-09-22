import api from "./api";

// Obtener todos los destinos
export const getAll = async () => {
  try {
    const response = await api.get('/destino');
    return response.data;
  } catch (error) {
    console.error('Error getting destinos:', error);
    throw error;
  }
};

// Crear un destino con imagen
export const createDestino = async (destino, imagen) => {
  const data = new FormData();
  data.append(
    "destino",
    new Blob([JSON.stringify(destino)], { type: "application/json" })
  );
  if (imagen) data.append("imagen", imagen);

  return await api.post("/destino", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar destino (PUT solo JSON)
export const updateDestino = async (id, destino, imagen = null) => {
  const data = new FormData();

  // Agregar el JSON como string plano
  data.append("destino", JSON.stringify(destino));

  // Agregar la imagen solo si existe
  if (imagen) {
    data.append("imagen", imagen);
  }

  return await api.put(`/destino/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Eliminar destino
export const deleteItem = async (id) => {
  return await api.delete(`/destino/${id}`);
};

