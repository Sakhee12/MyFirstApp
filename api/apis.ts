import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.6:1000",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
console.log("ATTACHING TOKEN:", token);

  return config;
});

