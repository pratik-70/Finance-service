import api from "./api";

export const getBillingRules = () => api.get("/billing-rules");

export const createBillingRule = (billingRule) =>
	api.post("/billing-rules", billingRule);

export const updateBillingRule = (id, billingRule) =>
	api.put(`/billing-rules/${id}`, billingRule);

export const deleteBillingRule = (id) =>
	api.delete(`/billing-rules/${id}`);
