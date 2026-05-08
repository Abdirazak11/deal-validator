export default function RecentSales({ sales }) {
  const formatAED = (num) => {
    if (num >= 1_000_000) return `AED ${(num / 1_000_000).toFixed(2)}M`
    return `AED ${num.toLocaleString()}`
  }

  return (
    <div className="animate-fade-up delay-200">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[17px] font-bold text-[#1d1d1f]">Recent Comparable Sales</h3>
        <span className="text-[12px] font-semibold text-[#86868b] bg-[#e5e5ea] px-2.5 py-1 rounded-full">
          DLD Data
        </span>
      </div>

      <div className="space-y-3">
        {sales.map((sale, i) => (
          <div
            key={sale.transactionId}
            className={`
              bg-white/90 rounded-2xl p-4 shadow-apple border border-[#f2f2f7]
              animate-fade-up
            `}
            style={{ animationDelay: `${0.1 + i * 0.08}s`, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-[#f2f2f7] flex items-center justify-center text-[11px] font-bold text-[#86868b]">
                    {i + 1}
                  </span>
                  <p className="text-[15px] font-semibold text-[#1d1d1f] truncate">
                    {sale.description}
                  </p>
                </div>
                <p className="text-[13px] text-[#86868b] ml-8">
                  {sale.area} · {sale.sizeSqft?.toLocaleString()} sqft · {sale.saleDate}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[17px] font-bold text-[#1d1d1f]">
                  {formatAED(sale.price)}
                </p>
                <p className="text-[12px] text-[#86868b]">
                  AED {sale.pricePerSqft?.toLocaleString()}/sqft
                </p>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="mt-3 pt-3 border-t border-[#f2f2f7]">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#86868b] shrink-0">
                  <path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[11px] font-mono text-[#aeaeb2]">{sale.transactionId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] text-[#aeaeb2] mt-4 font-medium">
        Source: Dubai Land Department · Updated Q1 2026
      </p>
    </div>
  )
}
