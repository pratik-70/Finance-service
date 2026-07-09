import api from "./api";

export const getContracts = () => api.get("/contracts");

export const createContract = (contract) =>
  api.post("/contracts", contract);

export const updateContract = (id, contract) =>
  api.put(`/contracts/${id}`, contract);

export const deleteContract = (id) =>
  api.delete(`/contracts/${id}`);