import { Pencil, Trash2 } from "lucide-react";

/**
 * ------------------------------------------------------------------------
 * Contract Table
 *
 * Displays all Contracts.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 * ------------------------------------------------------------------------
 */
export default function ContractTable({

    contracts,

    onEdit,

    onDelete

}) {

    if (contracts.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-sm mt-8 p-12 text-center">

                <h2 className="text-xl font-semibold">

                    No Contracts Found

                </h2>

                <p className="text-gray-500 mt-2">

                    Create your first contract.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">

            <table className="w-full">

                <thead className="bg-violet-700 text-white">

                    <tr>

                        <th className="p-4 text-left">
                            Contract No
                        </th>

                        <th className="text-left">
                            Organization
                        </th>

                        <th className="text-left">
                            Contract Name
                        </th>

                        <th className="text-left">
                            Type
                        </th>

                        <th className="text-left">
                            Value
                        </th>

                        <th className="text-left">
                            GST
                        </th>

                        <th className="text-left">
                            Status
                        </th>

                        <th className="text-center">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {contracts.map((contract) => (

                        <tr
                            key={contract.id}
                            className="border-b hover:bg-gray-50"
                        >

                            <td className="p-4 font-semibold">

                                {contract.contractNumber}

                            </td>

                            <td>

                                {contract.organizationName}

                            </td>

                            <td>

                                {contract.contractName}

                            </td>

                            <td>

                                {contract.contractType}

                            </td>

                            <td>

                                ₹{Number(
                                    contract.contractValue
                                ).toLocaleString("en-IN")}

                            </td>

                            <td>

                                {contract.gstPercentage}%

                            </td>

                            <td>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${
                                        contract.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : contract.status === "DRAFT"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : contract.status === "EXPIRED"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >

                                    {contract.status}

                                </span>

                            </td>

                            <td>

                                <div className="flex justify-center gap-4">

                                    <button
                                        onClick={() => onEdit(contract)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >

                                        <Pencil size={18} />

                                    </button>

                                    <button
                                        onClick={() => onDelete(contract.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >

                                        <Trash2 size={18} />

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