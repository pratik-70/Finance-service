import { X } from "lucide-react";
import toast from "react-hot-toast";

import ContractForm from "./ContractForm";
import { createContract, updateContract } from "../services/contractService";

export default function ContractModal({
    open,
    onClose,
    onSaved,
    initialValues
}) {

    if (!open) return null;

    const isEditing = Boolean(initialValues?.id);

    const handleSaveContract = async (formData) => {

        const payload = {
            organizationId: formData.organizationId,
            organizationName: formData.organizationName.trim(),
            contractName: formData.contractName.trim(),
            contractType: formData.contractType,
            currency: formData.currency,
            contractValue: Number(formData.contractValue),
            gstPercentage: Number(formData.gstPercentage),
            startDate: formData.startDate,
            endDate: formData.endDate,
            status: formData.status
        };

        try {

            if (isEditing) {
                await updateContract(initialValues.id, payload);

                toast.success("Contract updated successfully.");
            } else {

                await createContract({
                    contractNumber: formData.contractNumber.trim(),
                    ...payload
                });

                toast.success("Contract created successfully.");
            }

            onSaved();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to create contract."
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl shadow-2xl w-[min(960px,92vw)] max-h-[90vh] overflow-auto border border-slate-100">

                {/* Header */}

                <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">

                    <div>

                        <h2 className="text-2xl font-bold">

                            {isEditing ? "Edit Contract" : "Create Contract"}

                        </h2>

                        <p className="text-gray-500 mt-1">

                            {isEditing
                                ? "Update the contract details and save the changes."
                                : "Enter contract information below."}

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="hover:bg-gray-100 p-2 rounded-lg"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Form */}

                <div className="p-8 bg-slate-50/60">

                    <ContractForm
                        key={isEditing ? initialValues.id : "new-contract"}
                        onSubmit={handleSaveContract}
                        initialValues={initialValues}
                        submitLabel={isEditing ? "Update Contract" : "Save Contract"}
                    />

                </div>

            </div>

        </div>

    );

}