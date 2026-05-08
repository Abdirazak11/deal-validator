import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Mock data for when backend is unavailable (demo mode)
const MOCK_DATA = {
  'Downtown Dubai-Apartment': {
    marketAverage: 1850000,
    comparableSales: [
      { transactionId: 'DTDXB-2024-0312', area: 'Downtown Dubai', propertyType: 'Apartment', price: 1850000, saleDate: 'Mar 2025', description: '1BR | Burj View', sizeSqft: 1200, pricePerSqft: 1542 },
      { transactionId: 'DTDXB-2024-0287', area: 'Downtown Dubai', propertyType: 'Apartment', price: 1920000, saleDate: 'Feb 2025', description: '1BR | Pool View', sizeSqft: 1150, pricePerSqft: 1670 },
      { transactionId: 'DTDXB-2024-0301', area: 'Downtown Dubai', propertyType: 'Apartment', price: 1780000, saleDate: 'Feb 2025', description: 'Studio | High Floor', sizeSqft: 950, pricePerSqft: 1874 },
    ]
  },
  'Downtown Dubai-Villa': {
    marketAverage: 8783333,
    comparableSales: [
      { transactionId: 'DTDXB-V-2025-041', area: 'Downtown Dubai', propertyType: 'Villa', price: 8500000, saleDate: 'Mar 2025', description: '4BR | Private Pool', sizeSqft: 4800, pricePerSqft: 1771 },
      { transactionId: 'DTDXB-V-2025-038', area: 'Downtown Dubai', propertyType: 'Villa', price: 9100000, saleDate: 'Jan 2025', description: '5BR | Burj View', sizeSqft: 5200, pricePerSqft: 1750 },
      { transactionId: 'DTDXB-V-2025-029', area: 'Downtown Dubai', propertyType: 'Villa', price: 8750000, saleDate: 'Dec 2024', description: '4BR | Corner Plot', sizeSqft: 4600, pricePerSqft: 1902 },
    ]
  },
  'Dubai Marina-Apartment': {
    marketAverage: 1450000,
    comparableSales: [
      { transactionId: 'DMR-2025-0198', area: 'Dubai Marina', propertyType: 'Apartment', price: 1450000, saleDate: 'Mar 2025', description: '1BR | Marina View', sizeSqft: 1100, pricePerSqft: 1318 },
      { transactionId: 'DMR-2025-0176', area: 'Dubai Marina', propertyType: 'Apartment', price: 1520000, saleDate: 'Feb 2025', description: '1BR | Sea View', sizeSqft: 1050, pricePerSqft: 1448 },
      { transactionId: 'DMR-2025-0154', area: 'Dubai Marina', propertyType: 'Apartment', price: 1380000, saleDate: 'Jan 2025', description: 'Studio | High Floor', sizeSqft: 900, pricePerSqft: 1533 },
    ]
  },
  'Dubai Marina-Villa': {
    marketAverage: 12500000,
    comparableSales: [
      { transactionId: 'DMR-V-2025-021', area: 'Dubai Marina', propertyType: 'Villa', price: 12500000, saleDate: 'Mar 2025', description: '5BR | Marina Front', sizeSqft: 6200, pricePerSqft: 2016 },
      { transactionId: 'DMR-V-2025-018', area: 'Dubai Marina', propertyType: 'Villa', price: 11800000, saleDate: 'Feb 2025', description: '4BR | Private Dock', sizeSqft: 5800, pricePerSqft: 2034 },
      { transactionId: 'DMR-V-2025-015', area: 'Dubai Marina', propertyType: 'Villa', price: 13200000, saleDate: 'Jan 2025', description: '6BR | Panoramic', sizeSqft: 7000, pricePerSqft: 1886 },
    ]
  },
  'Palm Jumeirah-Apartment': {
    marketAverage: 3250000,
    comparableSales: [
      { transactionId: 'PJM-2025-0445', area: 'Palm Jumeirah', propertyType: 'Apartment', price: 3200000, saleDate: 'Mar 2025', description: '2BR | Sea View', sizeSqft: 2100, pricePerSqft: 1524 },
      { transactionId: 'PJM-2025-0432', area: 'Palm Jumeirah', propertyType: 'Apartment', price: 3450000, saleDate: 'Feb 2025', description: '2BR | Beach Access', sizeSqft: 2200, pricePerSqft: 1568 },
      { transactionId: 'PJM-2025-0421', area: 'Palm Jumeirah', propertyType: 'Apartment', price: 3100000, saleDate: 'Jan 2025', description: '1BR | Atlantis View', sizeSqft: 1800, pricePerSqft: 1722 },
    ]
  },
  'Palm Jumeirah-Villa': {
    marketAverage: 35166667,
    comparableSales: [
      { transactionId: 'PJM-V-2025-088', area: 'Palm Jumeirah', propertyType: 'Villa', price: 35000000, saleDate: 'Mar 2025', description: '5BR | Beachfront', sizeSqft: 9500, pricePerSqft: 3684 },
      { transactionId: 'PJM-V-2025-079', area: 'Palm Jumeirah', propertyType: 'Villa', price: 38500000, saleDate: 'Feb 2025', description: '6BR | Private Pool', sizeSqft: 10200, pricePerSqft: 3775 },
      { transactionId: 'PJM-V-2025-071', area: 'Palm Jumeirah', propertyType: 'Villa', price: 32000000, saleDate: 'Jan 2025', description: '5BR | Frond View', sizeSqft: 9000, pricePerSqft: 3556 },
    ]
  },
  'Business Bay-Apartment': {
    marketAverage: 1250000,
    comparableSales: [
      { transactionId: 'BBY-2025-0231', area: 'Business Bay', propertyType: 'Apartment', price: 1250000, saleDate: 'Mar 2025', description: '1BR | Canal View', sizeSqft: 1050, pricePerSqft: 1190 },
      { transactionId: 'BBY-2025-0219', area: 'Business Bay', propertyType: 'Apartment', price: 1320000, saleDate: 'Feb 2025', description: '1BR | Burj View', sizeSqft: 1100, pricePerSqft: 1200 },
      { transactionId: 'BBY-2025-0204', area: 'Business Bay', propertyType: 'Apartment', price: 1180000, saleDate: 'Jan 2025', description: 'Studio | City View', sizeSqft: 850, pricePerSqft: 1388 },
    ]
  },
  'Business Bay-Penthouse': {
    marketAverage: 7833333,
    comparableSales: [
      { transactionId: 'BBY-PH-2025-012', area: 'Business Bay', propertyType: 'Penthouse', price: 7800000, saleDate: 'Mar 2025', description: '4BR | Full Canal', sizeSqft: 5100, pricePerSqft: 1529 },
      { transactionId: 'BBY-PH-2025-009', area: 'Business Bay', propertyType: 'Penthouse', price: 8200000, saleDate: 'Feb 2025', description: '4BR | Burj Khalifa', sizeSqft: 5400, pricePerSqft: 1519 },
      { transactionId: 'BBY-PH-2025-007', area: 'Business Bay', propertyType: 'Penthouse', price: 7500000, saleDate: 'Dec 2024', description: '3BR | Duplex', sizeSqft: 4800, pricePerSqft: 1563 },
    ]
  },
  'Jumeirah Village Circle-Apartment': {
    marketAverage: 630000,
    comparableSales: [
      { transactionId: 'JVC-2025-0521', area: 'Jumeirah Village Circle', propertyType: 'Apartment', price: 620000, saleDate: 'Mar 2025', description: '1BR | Garden View', sizeSqft: 850, pricePerSqft: 729 },
      { transactionId: 'JVC-2025-0508', area: 'Jumeirah Village Circle', propertyType: 'Apartment', price: 680000, saleDate: 'Feb 2025', description: '1BR | Pool View', sizeSqft: 900, pricePerSqft: 756 },
      { transactionId: 'JVC-2025-0492', area: 'Jumeirah Village Circle', propertyType: 'Apartment', price: 590000, saleDate: 'Jan 2025', description: 'Studio | High Floor', sizeSqft: 650, pricePerSqft: 908 },
    ]
  },
  'Jumeirah Village Circle-Villa': {
    marketAverage: 3850000,
    comparableSales: [
      { transactionId: 'JVC-V-2025-064', area: 'Jumeirah Village Circle', propertyType: 'Villa', price: 3800000, saleDate: 'Mar 2025', description: '4BR | Private Garden', sizeSqft: 3800, pricePerSqft: 1000 },
      { transactionId: 'JVC-V-2025-058', area: 'Jumeirah Village Circle', propertyType: 'Villa', price: 4100000, saleDate: 'Feb 2025', description: '5BR | Corner', sizeSqft: 4200, pricePerSqft: 976 },
      { transactionId: 'JVC-V-2025-051', area: 'Jumeirah Village Circle', propertyType: 'Villa', price: 3650000, saleDate: 'Jan 2025', description: '4BR | Pool', sizeSqft: 3600, pricePerSqft: 1014 },
    ]
  },
  'Arabian Ranches-Villa': {
    marketAverage: 4533333,
    comparableSales: [
      { transactionId: 'ARN-V-2025-033', area: 'Arabian Ranches', propertyType: 'Villa', price: 4500000, saleDate: 'Mar 2025', description: '4BR | Golf Course', sizeSqft: 4100, pricePerSqft: 1098 },
      { transactionId: 'ARN-V-2025-028', area: 'Arabian Ranches', propertyType: 'Villa', price: 4800000, saleDate: 'Feb 2025', description: '5BR | Corner Plot', sizeSqft: 4600, pricePerSqft: 1043 },
      { transactionId: 'ARN-V-2025-022', area: 'Arabian Ranches', propertyType: 'Villa', price: 4300000, saleDate: 'Jan 2025', description: '4BR | Park View', sizeSqft: 3900, pricePerSqft: 1103 },
    ]
  },
  'DIFC-Apartment': {
    marketAverage: 2883333,
    comparableSales: [
      { transactionId: 'DFC-2025-0188', area: 'DIFC', propertyType: 'Apartment', price: 2850000, saleDate: 'Mar 2025', description: '2BR | Gate View', sizeSqft: 1900, pricePerSqft: 1500 },
      { transactionId: 'DFC-2025-0171', area: 'DIFC', propertyType: 'Apartment', price: 3100000, saleDate: 'Feb 2025', description: '2BR | City View', sizeSqft: 2000, pricePerSqft: 1550 },
      { transactionId: 'DFC-2025-0159', area: 'DIFC', propertyType: 'Apartment', price: 2700000, saleDate: 'Jan 2025', description: '1BR | High Floor', sizeSqft: 1600, pricePerSqft: 1688 },
    ]
  },
}

function getMockResult(area, propertyType, askingPrice) {
  const key = `${area}-${propertyType}`
  const mock = MOCK_DATA[key]

  if (!mock) {
    // Find closest match
    const fallbackKey = Object.keys(MOCK_DATA).find(k => k.startsWith(area)) ||
      Object.keys(MOCK_DATA).find(k => k.endsWith(propertyType))
    if (!fallbackKey) throw new Error('No data found for this combination')
    return getMockResultFromData(MOCK_DATA[fallbackKey], askingPrice, area, propertyType)
  }

  return getMockResultFromData(mock, askingPrice, area, propertyType)
}

function getMockResultFromData(mock, askingPrice, area, propertyType) {
  const { marketAverage, comparableSales } = mock
  const diff = (askingPrice - marketAverage) / marketAverage
  const verdict = diff <= -0.05 ? 'undermarket' : diff >= 0.05 ? 'overpriced' : 'fairmarket'
  return {
    marketAverage,
    askingPrice,
    verdict,
    percentageDiff: Math.round(diff * 1000) / 10,
    area,
    propertyType,
    comparableSales,
  }
}

export async function validateDeal({ area, propertyType, askingPrice }) {
  try {
    const { data } = await axios.post(`${API_BASE}/validate`, {
      area,
      propertyType,
      askingPrice,
    }, { timeout: 5000 })
    return data
  } catch {
    // Fallback to mock data if backend unreachable
    console.info('[DealValidator] Backend unavailable, using mock data')
    return getMockResult(area, propertyType, askingPrice)
  }
}
