// Mock API functions simulating Python backend behavior with enhanced accuracy

export interface EnvironmentalPrediction {
  rainfall_mm: number;
  temperature_c: number;
  humidity_percent: number;
  wind_speed_kmh: number;
  spm_ugm3: number;
  feels_like_c: number;
  uv_index: number;
  air_quality_index: number;
  visibility_km: number;
  pressure_hpa: number;
}

export interface CarbonSimulation {
  emissions: number;
  sequestration: number;
  netBalance: number;
  isPositive: boolean;
  explanation: string;
}

export interface PlantAnalysis {
  plantName: string;
  co2Absorption: number;
  o2Emission: number;
  summary: string;
}

// Simulate delay like real API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random number generator within range with precision
const randomInRange = (min: number, max: number, precision: number = 1) => {
  const factor = Math.pow(10, precision);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
};

// Get season based on month and hemisphere
const getSeason = (month: number, isNorthernHemisphere: boolean = true): string => {
  const seasons = isNorthernHemisphere
    ? ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter']
    : ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer'];
  return seasons[month];
};

// Climate patterns based on location keywords
interface ClimatePattern {
  tempRange: [number, number];
  humidityRange: [number, number];
  rainfallRange: [number, number];
  windRange: [number, number];
  spmRange: [number, number];
}

const getClimatePattern = (location: string, season: string): ClimatePattern => {
  const loc = location.toLowerCase();
  
  // Tropical locations (Bangladesh, India, SE Asia, etc.)
  if (loc.includes('dhaka') || loc.includes('bangladesh') || loc.includes('mumbai') || loc.includes('chennai') || loc.includes('bangkok') || loc.includes('singapore')) {
    const patterns: Record<string, ClimatePattern> = {
      summer: { tempRange: [30, 38], humidityRange: [70, 95], rainfallRange: [5, 80], windRange: [8, 25], spmRange: [80, 180] },
      monsoon: { tempRange: [26, 32], humidityRange: [85, 98], rainfallRange: [20, 150], windRange: [15, 40], spmRange: [40, 100] },
      winter: { tempRange: [12, 25], humidityRange: [50, 75], rainfallRange: [0, 10], windRange: [5, 15], spmRange: [100, 250] },
      spring: { tempRange: [25, 35], humidityRange: [60, 85], rainfallRange: [2, 30], windRange: [10, 25], spmRange: [70, 150] },
      autumn: { tempRange: [25, 32], humidityRange: [65, 85], rainfallRange: [5, 50], windRange: [8, 20], spmRange: [60, 130] },
    };
    return patterns[season] || patterns.summer;
  }
  
  // Desert/Arid locations
  if (loc.includes('dubai') || loc.includes('riyadh') || loc.includes('cairo') || loc.includes('phoenix') || loc.includes('las vegas')) {
    return {
      tempRange: season === 'summer' ? [38, 48] : [18, 30],
      humidityRange: [10, 35],
      rainfallRange: [0, 5],
      windRange: [5, 30],
      spmRange: [50, 120],
    };
  }
  
  // Cold/Northern locations
  if (loc.includes('moscow') || loc.includes('helsinki') || loc.includes('oslo') || loc.includes('reykjavik') || loc.includes('toronto') || loc.includes('chicago')) {
    const patterns: Record<string, ClimatePattern> = {
      winter: { tempRange: [-20, -5], humidityRange: [60, 85], rainfallRange: [0, 15], windRange: [10, 35], spmRange: [20, 60] },
      summer: { tempRange: [15, 28], humidityRange: [50, 75], rainfallRange: [5, 40], windRange: [8, 20], spmRange: [25, 70] },
      spring: { tempRange: [2, 15], humidityRange: [55, 80], rainfallRange: [5, 30], windRange: [10, 25], spmRange: [30, 75] },
      autumn: { tempRange: [0, 12], humidityRange: [60, 85], rainfallRange: [5, 35], windRange: [12, 30], spmRange: [25, 65] },
    };
    return patterns[season] || patterns.summer;
  }
  
  // Temperate European locations
  if (loc.includes('london') || loc.includes('paris') || loc.includes('berlin') || loc.includes('amsterdam')) {
    const patterns: Record<string, ClimatePattern> = {
      winter: { tempRange: [0, 8], humidityRange: [75, 95], rainfallRange: [5, 25], windRange: [15, 35], spmRange: [30, 80] },
      summer: { tempRange: [18, 28], humidityRange: [50, 75], rainfallRange: [2, 20], windRange: [8, 20], spmRange: [25, 60] },
      spring: { tempRange: [8, 18], humidityRange: [60, 85], rainfallRange: [5, 30], windRange: [10, 25], spmRange: [30, 70] },
      autumn: { tempRange: [8, 16], humidityRange: [70, 90], rainfallRange: [8, 35], windRange: [12, 30], spmRange: [35, 75] },
    };
    return patterns[season] || patterns.summer;
  }
  
  // US Coastal locations
  if (loc.includes('new york') || loc.includes('boston') || loc.includes('miami') || loc.includes('los angeles') || loc.includes('san francisco')) {
    if (loc.includes('miami')) {
      return { tempRange: [22, 35], humidityRange: [65, 90], rainfallRange: [2, 60], windRange: [8, 25], spmRange: [20, 50] };
    }
    if (loc.includes('los angeles') || loc.includes('san francisco')) {
      return { tempRange: [12, 28], humidityRange: [40, 70], rainfallRange: [0, 15], windRange: [8, 20], spmRange: [35, 90] };
    }
    const patterns: Record<string, ClimatePattern> = {
      winter: { tempRange: [-5, 8], humidityRange: [55, 75], rainfallRange: [5, 25], windRange: [15, 35], spmRange: [25, 60] },
      summer: { tempRange: [22, 34], humidityRange: [55, 80], rainfallRange: [5, 40], windRange: [8, 20], spmRange: [30, 70] },
      spring: { tempRange: [8, 20], humidityRange: [50, 75], rainfallRange: [8, 35], windRange: [12, 28], spmRange: [30, 65] },
      autumn: { tempRange: [10, 22], humidityRange: [55, 80], rainfallRange: [5, 30], windRange: [10, 25], spmRange: [28, 60] },
    };
    return patterns[season] || patterns.summer;
  }
  
  // Default temperate pattern
  return {
    tempRange: season === 'summer' ? [20, 32] : season === 'winter' ? [2, 15] : [12, 24],
    humidityRange: [45, 80],
    rainfallRange: [0, 30],
    windRange: [5, 25],
    spmRange: [30, 100],
  };
};

// Calculate feels like temperature (heat index / wind chill)
const calculateFeelsLike = (temp: number, humidity: number, windSpeed: number): number => {
  if (temp >= 27) {
    // Heat index for warm temperatures
    const hi = -8.785 + 1.611 * temp + 2.339 * humidity - 0.146 * temp * humidity;
    return Math.round(hi * 10) / 10;
  } else if (temp <= 10 && windSpeed > 5) {
    // Wind chill for cold temperatures
    const wc = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
    return Math.round(wc * 10) / 10;
  }
  return temp;
};

// Calculate UV index based on location and conditions
const calculateUVIndex = (temp: number, humidity: number, rainfall: number): number => {
  let baseUV = temp > 30 ? 9 : temp > 25 ? 7 : temp > 20 ? 5 : temp > 15 ? 3 : 2;
  if (rainfall > 10) baseUV *= 0.3;
  else if (humidity > 80) baseUV *= 0.6;
  return Math.round(Math.max(1, Math.min(11, baseUV + randomInRange(-1, 1))));
};

// Calculate Air Quality Index from SPM
const calculateAQI = (spm: number): number => {
  if (spm <= 50) return Math.round(spm);
  if (spm <= 100) return Math.round(50 + (spm - 50) * 0.5);
  if (spm <= 150) return Math.round(75 + (spm - 100) * 0.5);
  return Math.round(100 + (spm - 150) * 0.6);
};

export const predictEnvironmentalData = async (
  location: string, 
  date: string
): Promise<EnvironmentalPrediction> => {
  await delay(1800); // Simulate API delay
  
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const season = getSeason(month);
  
  const pattern = getClimatePattern(location, season);
  
  // Generate correlated weather data
  const humidity = randomInRange(pattern.humidityRange[0], pattern.humidityRange[1]);
  
  // Higher humidity increases rainfall probability
  const rainfallProbability = humidity > 75 ? 0.7 : humidity > 60 ? 0.4 : 0.2;
  const rainfall = Math.random() < rainfallProbability 
    ? randomInRange(pattern.rainfallRange[0], pattern.rainfallRange[1])
    : randomInRange(0, pattern.rainfallRange[0]);
  
  // Temperature affected by rain
  const tempAdjustment = rainfall > 20 ? -3 : rainfall > 5 ? -1 : 0;
  const temperature = randomInRange(
    pattern.tempRange[0] + tempAdjustment, 
    pattern.tempRange[1] + tempAdjustment
  );
  
  // Wind can increase with rain
  const windAdjustment = rainfall > 30 ? 10 : rainfall > 10 ? 5 : 0;
  const windSpeed = randomInRange(
    pattern.windRange[0], 
    Math.min(60, pattern.windRange[1] + windAdjustment)
  );
  
  // SPM decreases with rain (washes particles)
  const spmAdjustment = rainfall > 20 ? 0.5 : rainfall > 5 ? 0.7 : 1;
  const spm = randomInRange(
    pattern.spmRange[0] * spmAdjustment, 
    pattern.spmRange[1] * spmAdjustment
  );
  
  const feelsLike = calculateFeelsLike(temperature, humidity, windSpeed);
  const uvIndex = calculateUVIndex(temperature, humidity, rainfall);
  const aqi = calculateAQI(spm);
  
  // Visibility affected by humidity and SPM
  const visibility = Math.round(Math.max(1, 15 - (humidity / 20) - (spm / 50)) * 10) / 10;
  
  // Pressure (higher in clear weather)
  const pressure = Math.round(1013 + (rainfall > 10 ? -15 : 5) + randomInRange(-10, 10));
  
  return {
    rainfall_mm: rainfall,
    temperature_c: temperature,
    humidity_percent: Math.round(humidity),
    wind_speed_kmh: windSpeed,
    spm_ugm3: Math.round(spm),
    feels_like_c: feelsLike,
    uv_index: uvIndex,
    air_quality_index: aqi,
    visibility_km: visibility,
    pressure_hpa: pressure,
  };
};

const carbonExplanations: Record<string, string> = {
  Factory: "Industrial factories are significant contributors to atmospheric CO₂, releasing emissions through energy consumption and manufacturing processes. Modern facilities implement various mitigation strategies including carbon capture systems and renewable energy adoption.",
  Vehicles: "Transportation sector emissions arise from fossil fuel combustion in engines. Electric vehicle adoption and improved fuel efficiency standards are gradually reducing this impact, though the global vehicle fleet continues to grow.",
  "Power Plant": "Power generation facilities, particularly those using coal and natural gas, represent major point sources of greenhouse gas emissions. The transition to renewable energy sources is crucial for reducing this environmental impact.",
  "Waste Burning": "Open burning of waste releases harmful pollutants and greenhouse gases. Proper waste management through recycling, composting, and controlled incineration with emission controls can significantly reduce these impacts.",
};

const sequestrationExplanations: Record<string, string> = {
  Afforestation: "Planting trees on previously non-forested land creates new carbon sinks. A mature forest can absorb substantial amounts of CO₂ annually, while also providing biodiversity benefits and ecosystem services.",
  "Ocean Algae Farming": "Marine algae are efficient carbon absorbers, converting CO₂ through photosynthesis. Ocean farming initiatives show promise for large-scale carbon sequestration while producing valuable biomass products.",
  "Soil Carbon": "Regenerative agricultural practices increase soil organic carbon content. Cover cropping, reduced tillage, and composting enhance the soil's ability to store carbon long-term while improving fertility.",
  "Urban Green Roofs": "Green roofs and urban vegetation reduce building energy consumption while absorbing CO₂. They also mitigate urban heat islands and improve air quality in densely populated areas.",
};

export const simulateCarbonCycle = async (
  emissionSource: string, 
  sequestrationEffort: string
): Promise<CarbonSimulation> => {
  await delay(2000);
  
  const emissions = randomInRange(10, 200);
  const sequestration = randomInRange(5, 150);
  const netBalance = sequestration - emissions;
  
  const emissionText = carbonExplanations[emissionSource] || carbonExplanations.Factory;
  const sequestrationText = sequestrationExplanations[sequestrationEffort] || sequestrationExplanations.Afforestation;
  
  return {
    emissions,
    sequestration,
    netBalance,
    isPositive: netBalance > 0,
    explanation: `${emissionText}\n\n${sequestrationText}`,
  };
};

const plantData: Record<string, { co2Range: [number, number]; o2Range: [number, number]; fact: string }> = {
  "Snake Plant": {
    co2Range: [40, 80],
    o2Range: [100, 200],
    fact: "Known for its exceptional air-purifying qualities, the Snake Plant (Sansevieria) is one of the few plants that converts CO₂ to oxygen even at night through a unique form of photosynthesis.",
  },
  "Aloe Vera": {
    co2Range: [30, 60],
    o2Range: [80, 150],
    fact: "Beyond its medicinal properties, Aloe Vera is an effective air purifier that removes formaldehyde and benzene. It releases oxygen at night, making it ideal for bedrooms.",
  },
  "Areca Palm": {
    co2Range: [60, 100],
    o2Range: [150, 300],
    fact: "The Areca Palm is a powerhouse of air purification, capable of processing large volumes of air. NASA research has confirmed its effectiveness at removing indoor pollutants.",
  },
  "Peace Lily": {
    co2Range: [35, 70],
    o2Range: [90, 180],
    fact: "Peace Lilies excel at removing ammonia, benzene, and formaldehyde from indoor air. They thrive in low light conditions and indicate when they need water.",
  },
};

export const analyzeIndoorPlant = async (
  plantName: string, 
  roomSizeSqm: number
): Promise<PlantAnalysis> => {
  await delay(1500);
  
  const plant = plantData[plantName] || plantData["Snake Plant"];
  const sizeFactor = Math.min(roomSizeSqm / 20, 1.5);
  
  return {
    plantName,
    co2Absorption: Math.round(randomInRange(plant.co2Range[0], plant.co2Range[1]) * sizeFactor),
    o2Emission: Math.round(randomInRange(plant.o2Range[0], plant.o2Range[1]) * sizeFactor),
    summary: plant.fact,
  };
};

// Geolocation helper
export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || "Unknown Location";
  } catch {
    return "Unknown Location";
  }
};
