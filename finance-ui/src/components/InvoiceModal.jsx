import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import InvoiceForm from './InvoiceForm';
import { updateInvoice, createInvoice } from '../services/invoiceService';

export default function InvoiceModal({ isOpen, invoice, contracts, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (invoice) {
        const response = await updateInvoice(invoice.id, formData);
        toast.success('Invoice updated successfully!');
      } else {
        const response = await createInvoice(formData);
        toast.success('Invoice created successfully!');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save invoice');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-white">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Saving invoice...</p>
            </div>
          ) : (
            <InvoiceForm
              invoice={invoice}
              contracts={contracts}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
