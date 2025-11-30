import axios from "axios";

const URL_READ = "http://localhost:8080/api/v1/pelicula/findAll";
const URL_CREATE = "http://localhost:8080/api/v1/pelicula/save";
const URL_READ_NAME = "http://localhost:8080/api/v1/pelicula/findName";
const URL_UPDATE = "http://localhost:8080/api/v1/pelicula/update";
const URL_DELETE = "http://localhost:8080/api/v1/pelicula/delete";

const readPelicula = async () => {
    const response = await axios.get(URL_READ);
    if(response.status !== 200) {
        throw new Error("Error al obtener las peliculas");
    }
    return response.data;
}

const readPeliculaByName = async (name) => {
  const response = await axios.get(`${URL_READ_NAME}?nombre=${encodeURIComponent(name)}`);
  if(response.status !== 200){
    throw new Error("Error al obtener los datos")
  }
  return response.data[0];
}

const updatePelicula = async (nombreOriginal, peliculaEditada) => {
  const response = await axios.put(
    `${URL_UPDATE}?nombre=${encodeURIComponent(nombreOriginal)}`, 
    peliculaEditada
  );
  if(response.status !== 200) {
    throw new Error("Error al actualizar los datos")
  }
  return response.data;
}

const createPelicula = async (newPelicula) => {
  const response = await axios.post(URL_CREATE, newPelicula);
  if(response.status !== 200 && response.status !== 201) {
    throw new Error("Error al crear la pelicula")
  }
  return response.data;
}

const deletePelicula = async (nombre) => {
  const response = await axios.delete(`${URL_DELETE}?nombre=${encodeURIComponent(nombre)}`);
  if(response.status !== 200) {
    throw new Error("Error al eliminar la película");
  }
  return response.data;
}

export { readPelicula, createPelicula, readPeliculaByName, updatePelicula, deletePelicula };