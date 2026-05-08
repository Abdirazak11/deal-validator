import { useState } from 'react'

const AREAS = [
  'Downtown Dubai',
  'Dubai Marina',
  'Palm Jumeirah',
  'Business Bay',
  'Jumeirah Village Circle',
  'Arabian Ranches',
  'DIFC',
]

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Townhouse']

export default function DealForm({ onSubmit, loading }) {
  const [area, setArea] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [askingPrice, setAskingPrice] = useState('')
  const [errors, setErrors] = useState({})

  const formatPrice = (val) => {
    const num = val.replace(/[^0-9]/g, '')
    if (!num) return ''
    return Number(num).toLocaleString('en-AE')
  }

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setAskingPrice(raw)
  }

  const validate = () => {
    const errs = {}
    if (!area) errs.area = 'Select an area'
    if (!propertyType) errs.propertyType = 'Select property type'
    if (!askingPrice || Number(askingPrice) < 100000) errs.price = 'Enter a valid asking price'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ area, propertyType, askingPrice: Number(askingPrice) })
  }

  const inputBase = `
    w-full bg-white/80 border border-[#e5e5ea] rounded-2xl px-4 py-4
    text-[17px] text-[#1d1d1f] font-body placeholder-[#aeaeb2]
    shadow-[0_1px_3px_rgba(0,0,0,0.05)]
    focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15
    transition-all duration-200
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Area */}
      <div>
        <label className="block text-[13px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 px-1">
          Area
        </label>
        <select
          value={area}
          onChange={e => { setArea(e.target.value); setErrors(p => ({ ...p, area: null })) }}
          className={`${inputBase} pr-10 cursor-pointer ${errors.area ? 'border-red-400 ring-2 ring-red-100' : ''}`}
        >
          <option value="">Select Dubai Area</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        {errors.area && <p className="text-red-500 text-[13px] mt-1 px-1">{errors.area}</p>}
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-[13px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 px-1">
          Property Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => { setPropertyType(type); setErrors(p => ({ ...p, propertyType: null })) }}
              className={`
                py-3.5 rounded-2xl text-[15px] font-medium border transition-all duration-200
                ${propertyType === type
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-[0_4px_12px_rgba(0,122,255,0.3)]'
                  : 'bg-white/80 text-[#1d1d1f] border-[#e5e5ea] hover:border-[#007AFF]/40 hover:bg-[#f2f8ff]'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.propertyType && <p className="text-red-500 text-[13px] mt-1 px-1">{errors.propertyType}</p>}
      </div>

      {/* Asking Price */}
      <div>
        <label className="block text-[13px] font-semibold text-[#86868b] uppercase tracking-wide mb-2 px-1">
          Asking Price
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] font-semibold text-[#86868b]">
            AED
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={askingPrice ? Number(askingPrice).toLocaleString('en-AE') : ''}
            onChange={handlePriceChange}
            placeholder="1,800,000"
            className={`${inputBase} pl-[60px] ${errors.price ? 'border-red-400 ring-2 ring-red-100' : ''}`}
          />
        </div>
        {errors.price && <p className="text-red-500 text-[13px] mt-1 px-1">{errors.price}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-4 rounded-2xl text-[17px] font-semibold text-white
          transition-all duration-200 mt-2
          ${loading
            ? 'bg-[#007AFF]/60 cursor-not-allowed'
            : 'bg-[#007AFF] hover:bg-[#0066dd] active:scale-[0.98] shadow-[0_4px_16px_rgba(0,122,255,0.4)] hover:shadow-[0_6px_20px_rgba(0,122,255,0.5)]'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Analysing Deal…
          </span>
        ) : (
          'Validate Deal'
        )}
      </button>
    </form>
  )
}
