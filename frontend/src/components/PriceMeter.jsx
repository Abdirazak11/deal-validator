import { useEffect, useState } from 'react'

const VERDICT_CONFIG = {
  undermarket: {
    label: 'Under Market Value',
    sublabel: 'Strong Buy Signal',
    color: '#34c759',
    bg: 'bg-[#f0fdf4]',
    border: 'border-[#34c759]/25',
    ring: 'ring-[#34c759]/15',
    badge: 'bg-[#34c759]/10 text-[#1a7a34]',
    dot: 'bg-[#34c759]',
    emoji: '🟢',
    gradient: 'from-[#34c759]/20 to-transparent',
    meterColor: '#34c759',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    )
  },
  fairmarket: {
    label: 'Fair Market Value',
    sublabel: 'Priced to Market',
    color: '#ff9f0a',
    bg: 'bg-[#fffbeb]',
    border: 'border-[#ff9f0a]/25',
    ring: 'ring-[#ff9f0a]/15',
    badge: 'bg-[#ff9f0a]/10 text-[#92400e]',
    dot: 'bg-[#ff9f0a]',
    emoji: '🟡',
    gradient: 'from-[#ff9f0a]/20 to-transparent',
    meterColor: '#ff9f0a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 12 19"/>
      </svg>
    )
  },
  overpriced: {
    label: 'Overpriced',
    sublabel: 'Proceed with Caution',
    color: '#ff3b30',
    bg: 'bg-[#fff5f5]',
    border: 'border-[#ff3b30]/25',
    ring: 'ring-[#ff3b30]/15',
    badge: 'bg-[#ff3b30]/10 text-[#991b1b]',
    dot: 'bg-[#ff3b30]',
    emoji: '🔴',
    gradient: 'from-[#ff3b30]/20 to-transparent',
    meterColor: '#ff3b30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
        <polyline points="17 18 23 18 23 12"/>
      </svg>
    )
  }
}

function formatAED(num) {
  if (num >= 1_000_000) return `AED ${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `AED ${(num / 1_000).toFixed(0)}K`
  return `AED ${num.toLocaleString()}`
}

export default function PriceMeter({ result }) {
  const [animated, setAnimated] = useState(false)
  const [meterWidth, setMeterWidth] = useState(0)

  const config = VERDICT_CONFIG[result.verdict]
  const pct = result.percentageDiff // e.g. -8.2 or +6.1

  // Map pct (-20 to +20) to meter width 0–100
  const clampedPct = Math.max(-20, Math.min(20, pct))
  const targetWidth = ((clampedPct + 20) / 40) * 100

  useEffect(() => {
    const t1 = setTimeout(() => setAnimated(true), 50)
    const t2 = setTimeout(() => setMeterWidth(targetWidth), 100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [targetWidth])

  const priceDiff = result.askingPrice - result.marketAverage
  const absDiff = Math.abs(priceDiff)

  return (
    <div className={`
      animate-scale-in rounded-3xl border shadow-apple-lg overflow-hidden
      ${config.bg} ${config.border}
    `}>
      {/* Header Band */}
      <div className={`bg-gradient-to-br ${config.gradient} p-6 pb-5`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold mb-3
              ${config.badge}
            `}>
              <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></span>
              {config.sublabel}
            </div>
            <h2 className="text-[28px] font-bold text-[#1d1d1f] leading-tight tracking-tight">
              {config.label}
            </h2>
          </div>
          <div style={{ color: config.color }}>{config.icon}</div>
        </div>

        {/* Price Display */}
        <div className="flex items-end gap-3 mb-1">
          <div>
            <p className="text-[12px] font-semibold text-[#86868b] uppercase tracking-wide mb-1">Asking Price</p>
            <p className="text-[32px] font-bold text-[#1d1d1f] tracking-tight leading-none">
              {formatAED(result.askingPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 divide-x divide-[#e5e5ea]/60 border-t border-[#e5e5ea]/60">
        <div className="px-5 py-4">
          <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-1">Market Avg</p>
          <p className="text-[20px] font-bold text-[#1d1d1f]">{formatAED(result.marketAverage)}</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-1">
            {priceDiff >= 0 ? 'Premium' : 'Discount'}
          </p>
          <p className="text-[20px] font-bold" style={{ color: config.color }}>
            {priceDiff >= 0 ? '+' : '-'}{formatAED(absDiff)}
          </p>
        </div>
      </div>

      {/* Meter */}
      <div className="px-5 py-5 border-t border-[#e5e5ea]/60">
        <div className="flex justify-between text-[11px] font-semibold text-[#86868b] uppercase tracking-wide mb-3">
          <span>Under Market</span>
          <span>Fair Value</span>
          <span>Overpriced</span>
        </div>

        {/* Track */}
        <div className="relative h-3 bg-[#e5e5ea] rounded-full overflow-hidden">
          {/* Zone markers */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-[#34c759]/10"></div>
            <div className="w-[2px] bg-[#e5e5ea]"></div>
            <div className="flex-1 bg-[#ff9f0a]/10"></div>
            <div className="w-[2px] bg-[#e5e5ea]"></div>
            <div className="flex-1 bg-[#ff3b30]/10"></div>
          </div>

          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${meterWidth}%`,
              backgroundColor: config.meterColor,
              boxShadow: `0 0 8px ${config.meterColor}80`,
            }}
          />

          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg border-2 transition-all duration-1000 ease-out"
            style={{
              left: `calc(${meterWidth}% - 10px)`,
              borderColor: config.meterColor,
              boxShadow: `0 2px 8px ${config.meterColor}50`,
            }}
          />
        </div>

        {/* Percentage badge */}
        <div className="flex justify-center mt-4">
          <div className={`
            inline-flex items-center gap-1 px-4 py-2 rounded-2xl text-[15px] font-bold
            ${config.badge}
          `}>
            {pct > 0 ? '+' : ''}{pct}%
            <span className="text-[13px] font-medium ml-1">vs market</span>
          </div>
        </div>
      </div>
    </div>
  )
}
