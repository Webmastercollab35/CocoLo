import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

function CountdownTimer({ duration = 30, running, onExpire, keySeed }) {
  const [time, setTime] = useState(duration)

  useEffect(() => {
    if (!running) return
    setTime(duration)
  }, [duration, running, keySeed])

  useEffect(() => {
    if (!running) return
    if (time <= 0) {
      onExpire?.()
      return
    }
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [running, time, onExpire])

  const progress = useMemo(() => {
    return Math.max(0, Math.min(100, (time / duration) * 100))
  }, [time, duration])

  const ringClass = classNames('h-14 w-14 rounded-full border-4 flex items-center justify-center text-lg font-bold', {
    'border-emerald-400 text-emerald-500': progress > 60,
    'border-amber-400 text-amber-500': progress <= 60 && progress > 25,
    'border-rose-500 text-rose-500 animate-pulse': progress <= 25,
  })

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-white/10" />
        <div className={ringClass}>{time}s</div>
      </div>
      <div className="h-2 w-24 overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs font-semibold text-slate-500">Réponds vite pour marquer plus de points !</p>
    </div>
  )
}

export default CountdownTimer
