import { useState } from "react";

const buildInitialState = (values = {}) => ({
    contractNumber: values.contractNumber ?? "",
    organizationId: values.organizationId ?? "",
    organizationName: values.organizationName ?? "",
    contractName: values.contractName ?? "",
    contractType: values.contractType ?? "FIXED",
    currency: values.currency ?? "INR",
    contractValue: values.contractValue ?? "",
    gstPercentage: values.gstPercentage ?? "",
    startDate: values.startDate ?? "",
    endDate: values.endDate ?? "",
    status: values.status ?? "DRAFT"
});

export default function ContractForm({
    onSubmit,
    initialValues,
    submitLabel = "Save Contract"
}) {

    const [formData, setFormData] = useState(() => buildInitialState(initialValues));

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
            <div>
                <label className="font-medium text-slate-700">
                    Contract Number
                </label>

                <input
                    name="contractNumber"
                    value={formData.contractNumber}
                    onChange={handleChange}
                    readOnly={Boolean(initialValues?.id)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 read-only:bg-slate-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Organization ID
                </label>

                <input
                    name="organizationId"
                    value={formData.organizationId}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    placeholder="Paste UUID"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Organization Name
                </label>

                <input
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Contract Name
                </label>

                <input
                    name="contractName"
                    value={formData.contractName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Contract Type
                </label>

                <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="FIXED">FIXED</option>
                    <option value="PER_LEARNER">PER_LEARNER</option>
                    <option value="PER_BATCH">PER_BATCH</option>
                    <option value="PER_SESSION">PER_SESSION</option>
                </select>
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Currency
                </label>

                <input
                    name="currency"
                    value={formData.currency}
                    readOnly
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none"
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Contract Value
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="contractValue"
                    value={formData.contractValue}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    GST %
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="gstPercentage"
                    value={formData.gstPercentage}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Start Date
                </label>

                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    End Date
                </label>

                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Status
                </label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="DRAFT">DRAFT</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="EXPIRED">EXPIRED</option>
                    <option value="TERMINATED">TERMINATED</option>
                </select>
            </div>

            <div className="flex items-end justify-end md:col-span-2">
                <button
                    className="rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-700 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:brightness-110"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}