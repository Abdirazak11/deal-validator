using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors();

// Mock DLD Sales Data
var mockSalesData = new Dictionary<string, List<Sale>>
{
    ["Downtown Dubai-Apartment"] = new()
    {
        new("DTDXB-2024-0312", "Downtown Dubai", "Apartment", 1_850_000, "Mar 2025", "1BR | Burj View", 1200),
        new("DTDXB-2024-0287", "Downtown Dubai", "Apartment", 1_920_000, "Feb 2025", "1BR | Pool View", 1150),
        new("DTDXB-2024-0301", "Downtown Dubai", "Apartment", 1_780_000, "Feb 2025", "Studio | High Floor", 950),
    },
    ["Downtown Dubai-Villa"] = new()
    {
        new("DTDXB-V-2025-041", "Downtown Dubai", "Villa", 8_500_000, "Mar 2025", "4BR | Private Pool", 4800),
        new("DTDXB-V-2025-038", "Downtown Dubai", "Villa", 9_100_000, "Jan 2025", "5BR | Burj View", 5200),
        new("DTDXB-V-2025-029", "Downtown Dubai", "Villa", 8_750_000, "Dec 2024", "4BR | Corner Plot", 4600),
    },
    ["Dubai Marina-Apartment"] = new()
    {
        new("DMR-2025-0198", "Dubai Marina", "Apartment", 1_450_000, "Mar 2025", "1BR | Marina View", 1100),
        new("DMR-2025-0176", "Dubai Marina", "Apartment", 1_520_000, "Feb 2025", "1BR | Sea View", 1050),
        new("DMR-2025-0154", "Dubai Marina", "Apartment", 1_380_000, "Jan 2025", "Studio | High Floor", 900),
    },
    ["Dubai Marina-Villa"] = new()
    {
        new("DMR-V-2025-021", "Dubai Marina", "Villa", 12_500_000, "Mar 2025", "5BR | Marina Front", 6200),
        new("DMR-V-2025-018", "Dubai Marina", "Villa", 11_800_000, "Feb 2025", "4BR | Private Dock", 5800),
        new("DMR-V-2025-015", "Dubai Marina", "Villa", 13_200_000, "Jan 2025", "6BR | Panoramic", 7000),
    },
    ["Palm Jumeirah-Apartment"] = new()
    {
        new("PJM-2025-0445", "Palm Jumeirah", "Apartment", 3_200_000, "Mar 2025", "2BR | Sea View", 2100),
        new("PJM-2025-0432", "Palm Jumeirah", "Apartment", 3_450_000, "Feb 2025", "2BR | Beach Access", 2200),
        new("PJM-2025-0421", "Palm Jumeirah", "Apartment", 3_100_000, "Jan 2025", "1BR | Atlantis View", 1800),
    },
    ["Palm Jumeirah-Villa"] = new()
    {
        new("PJM-V-2025-088", "Palm Jumeirah", "Villa", 35_000_000, "Mar 2025", "5BR | Beachfront", 9500),
        new("PJM-V-2025-079", "Palm Jumeirah", "Villa", 38_500_000, "Feb 2025", "6BR | Private Pool", 10200),
        new("PJM-V-2025-071", "Palm Jumeirah", "Villa", 32_000_000, "Jan 2025", "5BR | Frond View", 9000),
    },
    ["Business Bay-Apartment"] = new()
    {
        new("BBY-2025-0231", "Business Bay", "Apartment", 1_250_000, "Mar 2025", "1BR | Canal View", 1050),
        new("BBY-2025-0219", "Business Bay", "Apartment", 1_320_000, "Feb 2025", "1BR | Burj View", 1100),
        new("BBY-2025-0204", "Business Bay", "Apartment", 1_180_000, "Jan 2025", "Studio | City View", 850),
    },
    ["Business Bay-Penthouse"] = new()
    {
        new("BBY-PH-2025-012", "Business Bay", "Penthouse", 7_800_000, "Mar 2025", "4BR | Full Canal", 5100),
        new("BBY-PH-2025-009", "Business Bay", "Penthouse", 8_200_000, "Feb 2025", "4BR | Burj Khalifa", 5400),
        new("BBY-PH-2025-007", "Business Bay", "Penthouse", 7_500_000, "Dec 2024", "3BR | Duplex", 4800),
    },
    ["Jumeirah Village Circle-Apartment"] = new()
    {
        new("JVC-2025-0521", "Jumeirah Village Circle", "Apartment", 620_000, "Mar 2025", "1BR | Garden View", 850),
        new("JVC-2025-0508", "Jumeirah Village Circle", "Apartment", 680_000, "Feb 2025", "1BR | Pool View", 900),
        new("JVC-2025-0492", "Jumeirah Village Circle", "Apartment", 590_000, "Jan 2025", "Studio | High Floor", 650),
    },
    ["Jumeirah Village Circle-Villa"] = new()
    {
        new("JVC-V-2025-064", "Jumeirah Village Circle", "Villa", 3_800_000, "Mar 2025", "4BR | Private Garden", 3800),
        new("JVC-V-2025-058", "Jumeirah Village Circle", "Villa", 4_100_000, "Feb 2025", "5BR | Corner", 4200),
        new("JVC-V-2025-051", "Jumeirah Village Circle", "Villa", 3_650_000, "Jan 2025", "4BR | Pool", 3600),
    },
    ["Arabian Ranches-Villa"] = new()
    {
        new("ARN-V-2025-033", "Arabian Ranches", "Villa", 4_500_000, "Mar 2025", "4BR | Golf Course", 4100),
        new("ARN-V-2025-028", "Arabian Ranches", "Villa", 4_800_000, "Feb 2025", "5BR | Corner Plot", 4600),
        new("ARN-V-2025-022", "Arabian Ranches", "Villa", 4_300_000, "Jan 2025", "4BR | Park View", 3900),
    },
    ["DIFC-Apartment"] = new()
    {
        new("DFC-2025-0188", "DIFC", "Apartment", 2_850_000, "Mar 2025", "2BR | Gate View", 1900),
        new("DFC-2025-0171", "DIFC", "Apartment", 3_100_000, "Feb 2025", "2BR | City View", 2000),
        new("DFC-2025-0159", "DIFC", "Apartment", 2_700_000, "Jan 2025", "1BR | High Floor", 1600),
    },
};

app.MapGet("/", () => "1-Click Deal Validator API v1.0");

app.MapPost("/api/validate", ([FromBody] ValidateRequest req) =>
{
    var key = $"{req.Area}-{req.PropertyType}";

    // Fuzzy match if exact key not found
    var matchedKey = mockSalesData.Keys.FirstOrDefault(k =>
        k.Equals(key, StringComparison.OrdinalIgnoreCase)) ??
        mockSalesData.Keys.FirstOrDefault(k =>
            k.Contains(req.Area ?? "", StringComparison.OrdinalIgnoreCase));

    if (matchedKey == null || !mockSalesData.TryGetValue(matchedKey, out var sales))
    {
        return Results.NotFound(new { error = "No comparable data found for this area/property type combination." });
    }

    var marketAverage = (long)sales.Average(s => s.Price);
    var askingPrice = req.AskingPrice;
    var diff = (askingPrice - marketAverage) / (double)marketAverage;

    var verdict = diff <= -0.05 ? "undermarket"
        : diff >= 0.05 ? "overpriced"
        : "fairmarket";

    var percentageDiff = Math.Round(diff * 100, 1);

    return Results.Ok(new
    {
        marketAverage,
        askingPrice,
        verdict,
        percentageDiff,
        area = req.Area,
        propertyType = req.PropertyType,
        comparableSales = sales.Take(3).Select(s => new
        {
            s.TransactionId,
            s.Area,
            s.PropertyType,
            s.Price,
            s.SaleDate,
            s.Description,
            s.SizeSqft,
            PricePerSqft = s.Price / s.SizeSqft
        })
    });
});

app.Run();

record Sale(string TransactionId, string Area, string PropertyType, long Price, string SaleDate, string Description, int SizeSqft);
record ValidateRequest(string? Area, string? PropertyType, long AskingPrice);
