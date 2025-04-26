import axios from "axios";

// Define la URL base para las peticiones
const API_URL = "https://redibo-backend-sprinteros1.onrender.com/api";

interface BackendCountry {
    id: number;
    nombre: string;  // Nombre en el backend
}


export interface Country {
    id: number;
    name: string;   // Nombre en el frontend
}

export async function getCountries(): Promise<Country[]> {
    try {
        const response = await axios.get<BackendCountry[]>(`${API_URL}/paises`); // La respuesta es un array de BackendCountry

        // Verificar si la respuesta es un array válido y no está vacía
        if (!Array.isArray(response.data) || response.data.length === 0) {
            console.warn("No countries data received from the backend.");
            return []; // Return an empty array
        }

        const transformedData: Country[] = response.data.map(backendCountry => ({
            id: backendCountry.id,
            name: backendCountry.nombre, // Mapear 'nombre' -> 'name'
        }));

        return transformedData;
    } catch (error: unknown) {
        const typedError = error as Error & { response?: { data?: any } };
        console.error('Error fetching country:', typedError.response?.data || typedError.message);
        throw new Error("Error al obtener las paises");
      }            
}

interface BackendCity {
  id: number;
  nombre: string;
  id_pais: number;
}
export interface City {
  id: number;
  name: string;
  countryId: number;
}
export async function getCities(): Promise<City[]> {
    try {
      const response = await axios.get<BackendCity[]>(`${API_URL}/cities`);
  
      if (!Array.isArray(response.data) || response.data.length === 0) {
        console.warn("No cities data received from the backend.");
        return [];
      }
  
      const transformedData: City[] = response.data.map(backendCity => ({
        id: backendCity.id,
        name: backendCity.nombre,
        countryId: backendCity.id_pais,
      }));
  
      return transformedData;
    } catch (error: unknown) {
        const typedError = error as Error & { response?: { data?: any } };
        console.error('Error fetching cities:', typedError.response?.data || typedError.message);
        throw new Error("Error al obtener las ciudades");
      }
      
  }
  
