import { useState } from "react";

const buildInitialState = (values = {}) => ({
    contractId: values.contractId ?? "",
    ruleName: values.ruleName ?? "",
    billingType: values.billingType ?? "FIXED",
    baseAmount: values.baseAmount ?? "",
    currency: values.currency ?? "INR",
    gstPercentage: values.gstPercentage ?? "",
    discountType: values.discountType ?? "NONE",
    discountValue: values.discountValue ?? "",
    emiAllowed: values.emiAllowed ?? "false",
    maximumInstallments: values.maximumInstallments ?? "",
    lateFee: values.lateFee ?? "",
    effectiveFrom: values.effectiveFrom ?? "",
    effectiveTo: values.effectiveTo ?? "",
    active: values.active ?? "true"
});

export default function BillingRuleForm({
    onSubmit,
    initialValues,
    submitLabel = "Save Billing Rule"
}) {

    const [formData, setFormData] = useState(() => buildInitialState(initialValues));

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
                <label className="font-medium text-slate-700">
                    Contract ID
                </label>

                <input
                    name="contractId"
                    value={formData.contractId}
                    onChange={handleChange}
                    readOnly={Boolean(initialValues?.id)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 read-only:bg-slate-100"
                    placeholder="Paste contract UUID"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Rule Name
                </label>

                <input
                    name="ruleName"
                    value={formData.ruleName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Billing Type
                </label>

                <select
                    name="billingType"
                    value={formData.billingType}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="FIXED">FIXED</option>
                    <option value="PER_LEARNER">PER_LEARNER</option>
                    <option value="PER_BATCH">PER_BATCH</option>
                    <option value="PER_SESSION">PER_SESSION</option>
                    <option value="PER_HOUR">PER_HOUR</option>
                    <option value="CUSTOM">CUSTOM</option>
                </select>
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Base Amount
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="baseAmount"
                    value={formData.baseAmount}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
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
                    Discount Type
                </label>

                <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="NONE">NONE</option>
                    <option value="FIXED">FIXED</option>
                    <option value="PERCENTAGE">PERCENTAGE</option>
                </select>
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Discount Value
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    EMI Allowed
                </label>

                <select
                    name="emiAllowed"
                    value={formData.emiAllowed}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Maximum Installments
                </label>

                <input
                    type="number"
                    min="1"
                    step="1"
                    name="maximumInstallments"
                    value={formData.maximumInstallments}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    placeholder="Optional"
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Late Fee
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="lateFee"
                    value={formData.lateFee}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    placeholder="Optional"
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Effective From
                </label>

                <input
                    type="date"
                    name="effectiveFrom"
                    value={formData.effectiveFrom}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Effective To
                </label>

                <input
                    type="date"
                    name="effectiveTo"
                    value={formData.effectiveTo}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                />
            </div>

            <div>
                <label className="font-medium text-slate-700">
                    Active
                </label>

                <select
                    name="active"
                    value={formData.active}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="flex items-end justify-end md:col-span-2">
                <button className="rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-700 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:brightness-110">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}