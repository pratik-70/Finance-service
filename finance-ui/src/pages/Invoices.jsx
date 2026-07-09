import { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import InvoiceTable from '../components/InvoiceTable';
import InvoiceModal from '../components/InvoiceModal';
import { getInvoices } from '../services/invoiceService';
import { getContracts } from '../services/contractService';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [invoicesRes, contractsRes] = await Promise.all([
        getInvoices(),
        getContracts(),
      ]);
      setInvoices(invoicesRes.data);
      setContracts(contractsRes.data);
      setFilteredInvoices(invoicesRes.data);
    } catch (error) {
      toast.error('Failed to load invoices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredInvoices(invoices);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = invoices.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(query) ||
          invoice.organizationName.toLowerCase().includes(query) ||
          invoice.status.toLowerCase().includes(query)
      );
      setFilteredInvoices(filtered);
    }
  }, [searchQuery, invoices]);

  const handleNewInvoice = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleSuccess = () => {
    loadData();
  };

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.status === 'PAID').length;
  const totalAmount = invoices.reduce((sum, inv) => sum + (parseFloat(inv.totalAmount) || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600 mt-1">
              Track and manage billing invoices for your contracts.
            </p>
          </div>
          <button
            onClick={handleNewInvoice}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
          >
            <Plus size={20} />
            New Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Total Invoices</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalInvoices}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Paid Invoices</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{paidInvoices}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by invoice number, organization, status..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <InvoiceTable
          invoices={filteredInvoices}
          onEdit={handleEditInvoice}
          onDelete={loadData}
          isLoading={isLoading}
        />
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isModalOpen}
        invoice={selectedInvoice}
        contracts={contracts}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
