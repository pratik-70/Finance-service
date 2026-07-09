/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import ContractModal from "../components/ContractModal";
import ContractTable from "../components/ContractTable";
import { deleteContract, getContracts } from "../services/contractService";

const formatDate = (value) => {
    if (!value) return "-";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date(value));
};

export default function Contracts() {

    const [contracts, setContracts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedContract, setSelectedContract] = useState(null);

    const loadContracts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getContracts();

            setContracts(response.data);
        } catch (fetchError) {
            console.error("Failed to load contracts.", fetchError);
            setError("Unable to load contracts from the API.");
        } finally {
            setLoading(false);
        }
    };

    const filteredContracts = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return contracts;
        }

        return contracts.filter((contract) => (
            contract.contractNumber?.toLowerCase().includes(query)
            || contract.organizationName?.toLowerCase().includes(query)
            || contract.contractName?.toLowerCase().includes(query)
            || contract.status?.toLowerCase().includes(query)
        ));
    }, [contracts, search]);

    useEffect(() => {
        loadContracts();
    }, []);

    const handleEdit = (contract) => {
        setSelectedContract(contract);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Delete this contract?");

        if (!confirmed) {
            return;
        }

        try {
            await deleteContract(id);

            toast.success("Contract deleted successfully.");
            loadContracts();
        } catch (deleteError) {
            console.error(deleteError);
            toast.error(deleteError.response?.data?.message || "Unable to delete contract.");
        }
    };

    const handleSaved = () => {
        setSelectedContract(null);
        loadContracts();
    };

    return (
        <div className="space-y-8 p-8">
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-900 p-8 text-white shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-white/60">
                            Contract Management
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight">
                            Manage organization contracts and agreements.
                        </h1>

                        <p className="mt-3 max-w-2xl text-white/75">
                            This screen is connected to the live backend contract APIs, so the demo can show real create, update, search, and delete flows.
                        </p>
                    </div>

                    <button
                        onClick={() => setSelectedContract({})}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        New Contract
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Contracts
                    </h2>

                    <p className="text-sm text-slate-500">
                        {filteredContracts.length} record{filteredContracts.length === 1 ? "" : "s"} found
                    </p>
                </div>

                <div className="flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:w-[420px]">
                    <Search size={18} className="text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search by contract number, organization, name, or status"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            {loading ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
                    Loading contracts...
                </div>
            ) : error ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-12 text-center text-rose-700 shadow-sm">
                    {error}
                </div>
            ) : (
                <ContractTable
                    contracts={filteredContracts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { label: "Total Contracts", value: contracts.length },
                    { label: "Active Contracts", value: contracts.filter((item) => item.status === "ACTIVE").length },
                    { label: "Latest Start", value: formatDate(contracts[0]?.startDate) }
                ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                            {item.label}
                        </p>

                        <div className="mt-3 text-3xl font-bold text-slate-900">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>

            <ContractModal
                open={Boolean(selectedContract)}
                onClose={() => setSelectedContract(null)}
                onSaved={handleSaved}
                initialValues={selectedContract}
            />
        </div>
    );
}