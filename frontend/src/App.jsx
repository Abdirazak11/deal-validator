import { useState } from 'react'
import DealForm from './components/DealForm'
import PriceMeter from './components/PriceMeter'
import RecentSales from './components/RecentSales'
import { validateDeal } from './services/api'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await validateDeal(formData)
      setResult(data)
      // Smooth scroll to results on mobile
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-dvh bg-[#f5f5f7]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/40 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#007AFF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,122,255,0.4)]">
              <svg viewBox="0 0 20 20" fill="none" className="w-4.5 h-4.5">
                <path d="M3 10h14M10 3l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="text-[17px] font-bold text-[#1d1d1f] tracking-tight">DealCheck</span>
              <span className="ml-2 text-[11px] font-semibold text-[#86868b] bg-[#e5e5ea] px-1.5 py-0.5 rounded-md uppercase tracking-wide">Dubai</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse"></span>
            <span className="text-[12px] font-semibold text-[#86868b]">Live DLD</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-lg mx-auto px-5 pb-20">

        {/* Hero */}
        <div className="pt-8 pb-6">
          <p className="text-[13px] font-semibold text-[#007AFF] uppercase tracking-widest mb-2">
            Real Estate Intelligence
          </p>
          <h1 className="text-[34px] font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-3">
            Is This Deal<br />
            <span className="text-[#007AFF]">Worth It?</span>
          </h1>
          <p className="text-[16px] text-[#86868b] leading-relaxed">
            Validate any Dubai property deal against live DLD transaction data — instantly.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 rounded-3xl shadow-apple-xl border border-white/60 p-5 mb-6">
          <DealForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="animate-scale-in bg-[#fff5f5] border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-red-500">
                <path d="M10 6v4m0 4h.01M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-red-800">Analysis Failed</p>
              <p className="text-[13px] text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div id="results" className="space-y-5">
            {/* Context pill */}
            <div className="animate-fade-up flex items-center gap-2 px-1">
              <div className="flex items-center gap-2 bg-[#e5e5ea]/70 rounded-full px-3 py-1.5">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#86868b]">
                  <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5.5 8.5L7 10l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[12px] font-semibold text-[#86868b]">
                  {result.area} · {result.propertyType}
                </span>
              </div>
            </div>

            <PriceMeter result={result} />
            <RecentSales sales={result.comparableSales} />

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-4 rounded-2xl text-[17px] font-semibold text-[#007AFF] bg-[#007AFF]/8 hover:bg-[#007AFF]/12 active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Validate Another Deal
            </button>
          </div>
        )}

        {/* Empty state hint */}
        {!result && !loading && !error && (
          <div className="text-center py-8 opacity-60">
            <div className="w-12 h-12 rounded-2xl bg-[#e5e5ea] flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#86868b]">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#86868b]">
              Enter deal details above to get<br />an instant market analysis
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 glass border-t border-white/40 px-5 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <p className="text-[11px] text-[#aeaeb2] font-medium">
            Powered by DLD Transaction Data
          </p>
          <p className="text-[11px] text-[#aeaeb2] font-medium">
            Q1 2025 · Dubai
          </p>
        </div>
      </footer>
    </div>
  )
}
