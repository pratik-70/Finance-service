import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/invoices';

export const createInvoice = (invoiceData) =>
  axios.post(API_URL, invoiceData);

export const getInvoices = () =>
  axios.get(API_URL);

export const getInvoiceById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const getInvoicesByContractId = (contractId) =>
  axios.get(`${API_URL}/contract/${contractId}`);

export const getInvoicesByOrganizationId = (organizationId) =>
  axios.get(`${API_URL}/organization/${organizationId}`);

export const searchInvoices = (query) =>
  axios.get(`${API_URL}/search`, {
    params: { query },
  });

export const updateInvoice = (id, invoiceData) =>
  axios.put(`${API_URL}/${id}`, invoiceData);

export const deleteInvoice = (id) =>
  axios.delete(`${API_URL}/${id}`);

