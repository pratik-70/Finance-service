import { Pencil, Trash2 } from "lucide-react";

const formatCurrency = (value) => `₹${Number(value ?? 0).toLocaleString("en-IN")}`;

const formatBoolean = (value) => (value ? "Yes" : "No");

export default function BillingRuleTable({
	billingRules,
	onEdit,
	onDelete
}) {

	if (billingRules.length === 0) {
		return (
			<div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
				<h2 className="text-xl font-semibold text-slate-900">
					No Billing Rules Found
				</h2>

				<p className="mt-2 text-slate-500">
					Create your first billing rule to showcase pricing logic.
				</p>
			</div>
		);
	}

	return (
		<div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-slate-900 text-slate-100">
						<tr>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								Rule
							</th>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								Contract
							</th>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								Billing Type
							</th>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								Base Amount
							</th>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								Discount
							</th>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								EMI
							</th>
							<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide">
								Active
							</th>
							<th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wide">
								Action
							</th>
						</tr>
					</thead>

					<tbody>
						{billingRules.map((rule) => (
							<tr key={rule.id} className="border-b border-slate-100 hover:bg-slate-50">
								<td className="px-4 py-4">
									<div className="font-semibold text-slate-900">
										{rule.ruleName}
									</div>

									<div className="text-sm text-slate-500">
										{rule.effectiveFrom} to {rule.effectiveTo}
									</div>
								</td>

								<td className="px-4 py-4 text-sm text-slate-700">
									<div className="font-medium text-slate-900">
										{rule.contractId}
									</div>
								</td>

								<td className="px-4 py-4 text-sm text-slate-700">
									{rule.billingType}
								</td>

								<td className="px-4 py-4 text-sm font-medium text-slate-700">
									{formatCurrency(rule.baseAmount)}
								</td>

								<td className="px-4 py-4 text-sm text-slate-700">
									{rule.discountType} {Number(rule.discountValue ?? 0)}
								</td>

								<td className="px-4 py-4 text-sm text-slate-700">
									{formatBoolean(rule.emiAllowed)}
									{rule.maximumInstallments ? `, ${rule.maximumInstallments} plans` : ""}
								</td>

								<td className="px-4 py-4">
									<span
										className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
											rule.active
												? "bg-emerald-100 text-emerald-700"
												: "bg-slate-100 text-slate-700"
										}`}
									>
										{rule.active ? "ACTIVE" : "INACTIVE"}
									</span>
								</td>

								<td className="px-4 py-4">
									<div className="flex items-center justify-center gap-3">
										<button
											onClick={() => onEdit(rule)}
											className="rounded-full p-2 text-violet-700 transition hover:bg-violet-50"
										>
											<Pencil size={18} />
										</button>

										<button
											onClick={() => onDelete(rule.id)}
											className="rounded-full p-2 text-rose-600 transition hover:bg-rose-50"
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
		</div>
	);
}
