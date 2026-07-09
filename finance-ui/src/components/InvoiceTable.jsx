import { Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteInvoice } from '../services/invoiceService';

export default function InvoiceTable({ invoices, onEdit, onDelete, isLoading }) {
  const getStatusBadgeColor = (status) => {
    const colors = {
      DRAFT: 'bg-gray-100 text-gray-800',
      SENT: 'bg-blue-100 text-blue-800',
      VIEWED: 'bg-cyan-100 text-cyan-800',
      PARTIALLY_PAID: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800',
      OVERDUE: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-red-200 text-red-900',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€';
    return `${symbol}${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(id);
        toast.success('Invoice deleted successfully');
        onDelete();
      } catch (error) {
        toast.error('Failed to delete invoice');
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading invoices...</div>;
  }

  if (invoices.length === 0) {
    return <div className="text-center py-8 text-gray-500">No invoice data available yet.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Invoice No</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Organization</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Invoice Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Due Date</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Amount</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium text-gray-900">{invoice.invoiceNumber}</td>
              <td className="px-4 py-3 text-gray-700">{invoice.organizationName}</td>
              <td className="px-4 py-3 text-gray-600">{formatDate(invoice.invoiceDate)}</td>
              <td className="px-4 py-3 text-gray-600">{formatDate(invoice.dueDate)}</td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(invoice)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                    title="Edit invoice"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                    title="Delete invoice"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
