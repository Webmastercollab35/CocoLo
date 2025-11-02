function ProgressBar({ value, max = 100, label }) {
  const percentage = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-semibold text-slate-600">{label}</span>}
      <div className="h-3 w-full rounded-full bg-white/70 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-candy via-ocean to-forest transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-500">{percentage}%</span>
    </div>
  )
}

export default ProgressBar
