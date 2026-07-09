export default function DashboardCard({
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <div className={`rounded-3xl p-6 text-white shadow-lg shadow-slate-200/60 ${color}`}>
      <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
        {title}
      </h4>

      <h2 className="mt-4 text-4xl font-bold">
        {value}
      </h2>

      {subtitle ? (
        <p className="mt-2 text-sm text-white/80">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}