/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import { getContracts } from "../services/contractService";
import { getBillingRules } from "../services/billingRuleService";

const money = (value) => `₹${Number(value ?? 0).toLocaleString("en-IN")}`;

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

const formatDate = (value) => {
  if (!value) return "-";

  return dateFormatter.format(new Date(value));
};

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [billingRules, setBillingRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      const [contractsResponse, billingRulesResponse] = await Promise.all([
        getContracts(),
        getBillingRules()
      ]);

      setContracts(contractsResponse.data);
      setBillingRules(billingRulesResponse.data);
    } catch (error) {
      console.error("Failed to load dashboard data.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalContractValue = contracts.reduce((sum, contract) => sum + Number(contract.contractValue ?? 0), 0);
  const totalBillingBaseAmount = billingRules.reduce((sum, rule) => sum + Number(rule.baseAmount ?? 0), 0);
  const activeContracts = contracts.filter((contract) => contract.status === "ACTIVE").length;
  const activeBillingRules = billingRules.filter((rule) => rule.active).length;

  const recentContracts = contracts.slice(0, 5);
  const recentBillingRules = billingRules.slice(0, 5);

  return (
    <div className="space-y-8 p-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Finance Overview
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              Demo dashboard for the finance backend services.
            </h1>

            <p className="mt-3 max-w-3xl text-slate-500">
              This overview pulls live contract and billing rule data from the backend and presents a concise showcase for your demo.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-500">
            {loading ? "Refreshing live data..." : "Connected to local finance API"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Contracts"
          value={contracts.length}
          subtitle="Total records from the backend"
          color="bg-gradient-to-br from-violet-700 to-indigo-700"
        />

        <DashboardCard
          title="Billing Rules"
          value={billingRules.length}
          subtitle="Configured pricing policies"
          color="bg-gradient-to-br from-teal-700 to-cyan-700"
        />

        <DashboardCard
          title="Contract Value"
          value={money(totalContractValue)}
          subtitle={`${activeContracts} active contract${activeContracts === 1 ? "" : "s"}`}
          color="bg-gradient-to-br from-slate-900 to-slate-700"
        />

        <DashboardCard
          title="Billing Base"
          value={money(totalBillingBaseAmount)}
          subtitle={`${activeBillingRules} active billing rule${activeBillingRules === 1 ? "" : "s"}`}
          color="bg-gradient-to-br from-emerald-700 to-lime-700"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Recent Contracts
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Latest entries returned by the contract API.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Organization</th>
                  <th className="px-4 py-3">Contract</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentContracts.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
                      No contract data available yet.
                    </td>
                  </tr>
                ) : recentContracts.map((contract) => (
                  <tr key={contract.id} className="border-t border-slate-100">
                    <td className="px-4 py-4 font-medium text-slate-900">
                      {contract.organizationName}
                      <div className="text-xs text-slate-500">
                        {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {contract.contractName}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {money(contract.contractValue)}
                    </td>

                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${contract.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : contract.status === "DRAFT" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Recent Billing Rules
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              The latest billing policies ready for invoice calculation.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {recentBillingRules.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
                No billing rule data available yet.
              </div>
            ) : recentBillingRules.map((rule) => (
              <div key={rule.id} className="rounded-2xl border border-slate-200 p-4 transition hover:border-violet-300 hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {rule.ruleName}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {rule.billingType} · {rule.discountType} discount · {rule.emiAllowed ? "EMI enabled" : "No EMI"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(rule.effectiveFrom)} to {formatDate(rule.effectiveTo)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-2 text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Base
                    </p>

                    <p className="font-semibold text-slate-900">
                      {money(rule.baseAmount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}