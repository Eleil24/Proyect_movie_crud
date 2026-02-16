import axios from "./axiosConfig";

const BASE_URL = import.meta.env.VITE_API_URI_RATE;

const saveRate = async ({ idPelicula, rate }) => {
    const response = await axios.post(`${BASE_URL}/save`, { idPelicula, rate });
    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Error al guardar la calificación");
    }
    return response.data;
}

const deleteRate = async (idPelicula) => {
    const response = await axios.delete(`${BASE_URL}/delete/${idPelicula}`);
    if (response.status !== 200) {
        throw new Error("Error al eliminar la calificación");
    }
    return response.data;
}

const getAllRatings = async () => {
    const response = await axios.get(`${BASE_URL}/findAll`);
    if (response.status !== 200) {
        throw new Error("Error al obtener las calificaciones");
    }
    return response.data;
}

const deleteRatingAdmin = async (idPelicula, correo) => {
    const response = await axios.delete(`${BASE_URL}/deleteAdmin`, {
        params: { idPelicula, correo }
    });
    if (response.status !== 200) {
        throw new Error("Error al eliminar la calificación");
    }
    return response.data;
}

export { saveRate, deleteRate, getAllRatings, deleteRatingAdmin };
