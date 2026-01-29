// app/api/cars.ts
import { API } from "./apis";

export const getAllCars = () => API.get("/cars");

export const filterCars = (params: {
  category_id?: string;
  brand?: string;
  city?: string;
  fuel_type?: string;
  seats?: string;
  year?: string;
  min_price?: string;
  max_price?: string;
  min_rating?: string;
  available?: string;
  badge?: string;
}) => API.get("/cars/filter", { params });
