import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function InvoiceForm({ invoice, contracts, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    contractId: '',
    organizationId: '',
    organizationName: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    subtotal: 0,
    gstAmount: 0,
    discountAmount: 0,
    totalAmount: 0,
    currency: 'INR',
    invoicePeriodFrom: new Date().toISOString().split('T')[0],
    invoicePeriodTo: new Date().toISOString().split('T')[0],
    description: '',
    status: 'DRAFT',
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        contractId: invoice.contractId || '',
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Amount') || name.includes('subtotal') ? parseFloat(value) || 0 : value,
    }));
  };

  const handleContractChange = (e) => {
    const contractId = e.target.value;
    const selectedContract = contracts.find((c) => c.id === contractId);
    
    setFormData((prev) => ({
      ...prev,
      contractId,
      organizationId: selectedContract?.organizationId || '',
      organizationName: selectedContract?.organizationName || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.invoiceNumber.trim()) {
      toast.error('Invoice number is required');
      return;
    }

    if (!formData.contractId) {
      toast.error('Please select a contract');
      return;
    }

    if (formData.invoiceDate > formData.dueDate) {
      toast.error('Due date must be after invoice date');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Invoice Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="INV-2026-001"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contract */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contract</label>
          <select
            name="contractId"
            value={formData.contractId}
            onChange={handleContractChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a contract</option>
            {contracts.map((contract) => (
              <option key={contract.id} value={contract.id}>
                {contract.contractName} ({contract.contractNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Organization Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            disabled
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Invoice Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subtotal */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtotal</label>
          <input
            type="number"
            name="subtotal"
            value={formData.subtotal}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GST Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">GST Amount</label>
          <input
            type="number"
            name="gstAmount"
            value={formData.gstAmount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Discount Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Amount</label>
          <input
            type="number"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Invoice Period From */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Period From</label>
          <input
            type="date"
            name="invoicePeriodFrom"
            value={formData.invoicePeriodFrom}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Invoice Period To */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Period To</label>
          <input
            type="date"
            name="invoicePeriodTo"
            value={formData.invoicePeriodTo}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="VIEWED">Viewed</option>
            <option value="PARTIALLY_PAID">Partially Paid</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Invoice description or notes"
          rows="3"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {invoice ? 'Update Invoice' : 'Create Invoice'}
        </button>
      </div>
    </form>
  );
}
