import axios from "axios";
const BASE_URL = "https://apitest.kifaytihealth.com/api1/api";

export const getReadings = async () => {
  return axios.get(`${BASE_URL}/bp`);
};

export const addReading = async (reading) => {
  return axios.post(`${BASE_URL}/bp`, reading);
};

export const updateReading = async (id, updatedData) => {
  return axios.put(`${BASE_URL}/bp/${id}`, updatedData);
};

export const deleteReading = async (id) => {
  return axios.delete(`${BASE_URL}/bp/${id}`);
};

export const getBPLimits = async () => {
  return axios.get(`${BASE_URL}/bp/limits`);
};

export const updateBPLimits = async (limits) => {
  return axios.post(`${BASE_URL}/bp/limits`, limits);
};
