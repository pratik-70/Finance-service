/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import BillingRuleModal from "../components/BillingRuleModal";
import BillingRuleTable from "../components/BillingRuleTable";
import { deleteBillingRule, getBillingRules } from "../services/billingRuleService";

export default function BillingRules() {

	const [billingRules, setBillingRules] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedRule, setSelectedRule] = useState(null);

	const loadBillingRules = async () => {
		setLoading(true);
		setError("");

		try {
			const response = await getBillingRules();

			setBillingRules(response.data);
		} catch (fetchError) {
			console.error("Failed to load billing rules.", fetchError);
			setError("Unable to load billing rules from the API.");
		} finally {
			setLoading(false);
		}
	};

	const filteredBillingRules = useMemo(() => {
		const query = search.trim().toLowerCase();

		if (!query) {
			return billingRules;
		}

		return billingRules.filter((rule) => (
			rule.ruleName?.toLowerCase().includes(query)
			|| rule.billingType?.toLowerCase().includes(query)
			|| rule.discountType?.toLowerCase().includes(query)
			|| rule.contractId?.toLowerCase().includes(query)
		));
	}, [billingRules, search]);

	useEffect(() => {
		loadBillingRules();
	}, []);

	const handleEdit = (rule) => {
		setSelectedRule(rule);
	};

	const handleDelete = async (id) => {
		const confirmed = window.confirm("Delete this billing rule?");

		if (!confirmed) {
			return;
		}

		try {
			await deleteBillingRule(id);

			toast.success("Billing rule deleted successfully.");
			loadBillingRules();
		} catch (deleteError) {
			console.error(deleteError);
			toast.error(deleteError.response?.data?.message || "Unable to delete billing rule.");
		}
	};

	const handleSaved = () => {
		setSelectedRule(null);
		loadBillingRules();
	};

	return (
		<div className="space-y-8 p-8">
			<div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-800 p-8 text-white shadow-xl">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="text-sm uppercase tracking-[0.25em] text-white/60">
							Billing Rules Management
						</p>

						<h1 className="mt-3 text-4xl font-bold tracking-tight">
							Manage pricing policies tied to contracts.
						</h1>

						<p className="mt-3 max-w-2xl text-white/75">
							This screen demonstrates the backend billing rule services with live list, create, edit, and delete operations.
						</p>
					</div>

					<button
						onClick={() => setSelectedRule({})}
						className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
					>
						<Plus size={18} />
						New Billing Rule
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-slate-900">
						Billing Rules
					</h2>

					<p className="text-sm text-slate-500">
						{filteredBillingRules.length} record{filteredBillingRules.length === 1 ? "" : "s"} found
					</p>
				</div>

				<div className="flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:w-[420px]">
					<Search size={18} className="text-slate-400" />

					<input
						type="text"
						placeholder="Search by rule name, type, discount, or contract"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
					/>
				</div>
			</div>

			{loading ? (
				<div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
					Loading billing rules...
				</div>
			) : error ? (
				<div className="rounded-3xl border border-rose-200 bg-rose-50 p-12 text-center text-rose-700 shadow-sm">
					{error}
				</div>
			) : (
				<BillingRuleTable
					billingRules={filteredBillingRules}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			<div className="grid gap-4 md:grid-cols-3">
				{[
					{ label: "Total Rules", value: billingRules.length },
					{ label: "Active Rules", value: billingRules.filter((item) => item.active).length },
					{ label: "EMI Enabled", value: billingRules.filter((item) => item.emiAllowed).length }
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

			<BillingRuleModal
				open={Boolean(selectedRule)}
				onClose={() => setSelectedRule(null)}
				onSaved={handleSaved}
				initialValues={selectedRule}
			/>
		</div>
	);
}
