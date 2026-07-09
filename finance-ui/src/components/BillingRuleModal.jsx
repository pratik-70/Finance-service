import { X } from "lucide-react";
import toast from "react-hot-toast";

import BillingRuleForm from "./BillingRuleForm";
import { createBillingRule, updateBillingRule } from "../services/billingRuleService";

export default function BillingRuleModal({
    open,
    onClose,
    onSaved,
    initialValues
}) {

    if (!open) return null;

    const isEditing = Boolean(initialValues?.id);

    const handleSaveBillingRule = async (formData) => {
        const payload = {
            ruleName: formData.ruleName.trim(),
            billingType: formData.billingType,
            baseAmount: Number(formData.baseAmount),
            currency: formData.currency,
            gstPercentage: Number(formData.gstPercentage),
            discountType: formData.discountType,
            discountValue: Number(formData.discountValue),
            emiAllowed: formData.emiAllowed === "true",
            maximumInstallments: formData.maximumInstallments === "" ? null : Number(formData.maximumInstallments),
            lateFee: formData.lateFee === "" ? null : Number(formData.lateFee),
            effectiveFrom: formData.effectiveFrom,
            effectiveTo: formData.effectiveTo,
            active: formData.active === "true"
        };

        try {
            if (isEditing) {
                await updateBillingRule(initialValues.id, payload);

                toast.success("Billing rule updated successfully.");
            } else {
                await createBillingRule({
                    contractId: formData.contractId,
                    ...payload
                });

                toast.success("Billing rule created successfully.");
            }

            onSaved();
            onClose();
        } catch (error) {
            console.error(error);

            toast.error(error.response?.data?.message || "Unable to save billing rule.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-[min(1024px,96vw)] overflow-auto rounded-3xl border border-slate-100 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {isEditing ? "Edit Billing Rule" : "Create Billing Rule"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {isEditing
                                ? "Update the billing settings for the selected contract."
                                : "Define billing settings for a contract."}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="bg-slate-50/60 p-8">
                    <BillingRuleForm
                        key={isEditing ? initialValues.id : "new-billing-rule"}
                        onSubmit={handleSaveBillingRule}
                        initialValues={initialValues}
                        submitLabel={isEditing ? "Update Billing Rule" : "Save Billing Rule"}
                    />
                </div>
            </div>
        </div>
    );
}