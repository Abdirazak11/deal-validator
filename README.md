# DealCheck — Dubai Real Estate Deal Validator

A premium mobile-first proptech tool for Dubai real estate brokers to instantly validate deals against DLD market data.

---

## 🏗 Architecture

```
deal-validator/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── DealForm.jsx      # Area / Type / Price input
│   │   │   ├── PriceMeter.jsx    # Visual deal verdict meter
│   │   │   └── RecentSales.jsx   # DLD comparable transactions
│   │   └── services/
│   │       └── api.js            # Axios + mock fallback
│   └── dist/                     # Production build
└── backend/           # .NET 8 Minimal API
    ├── Program.cs     # Full API + mock DLD data
    └── DealValidator.csproj
```

---

## 🚀 Quick Start

### Backend (.NET 8)

```bash
cd backend
dotnet run
# API runs on http://localhost:5000
```

**Endpoints:**
- `GET /` — Health check
- `POST /api/validate` — Validate a deal

**Request body:**
```json
{
  "area": "Downtown Dubai",
  "propertyType": "Apartment",
  "askingPrice": 1700000
}
```

**Response:**
```json
{
  "marketAverage": 1850000,
  "askingPrice": 1700000,
  "verdict": "undermarket",
  "percentageDiff": -8.1,
  "area": "Downtown Dubai",
  "propertyType": "Apartment",
  "comparableSales": [...]
}
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

**Production build:**
```bash
npm run build
# Output: frontend/dist/
```

---

## 🎨 Verdict Logic

| Verdict | Condition | Color |
|---------|-----------|-------|
| Under Market Value | ≤ 5% below average | 🟢 Green |
| Fair Market Value | Within ±5% of average | 🟡 Yellow |
| Overpriced | ≥ 5% above average | 🔴 Red |

---

## 📍 Supported Areas & Property Types

| Area | Apartment | Villa | Penthouse |
|------|-----------|-------|-----------|
| Downtown Dubai | ✅ | ✅ | — |
| Dubai Marina | ✅ | ✅ | — |
| Palm Jumeirah | ✅ | ✅ | — |
| Business Bay | ✅ | — | ✅ |
| Jumeirah Village Circle | ✅ | ✅ | — |
| Arabian Ranches | — | ✅ | — |
| DIFC | ✅ | — | — |

---

## 🔧 Environment Variables

```env
# frontend/.env (optional)
VITE_API_URL=http://localhost:5000/api
```

---

## 📌 Notes

- **Mock Fallback**: If the .NET backend is unavailable, the frontend automatically falls back to embedded mock DLD data so demos always work.
- **Data Source**: Mock data is based on Q1 2025 DLD transaction records.
- **Mobile First**: Optimized for 390px (iPhone 16) and wider.

---

*Built for Dubai real estate professionals. Data powered by Dubai Land Department.*
