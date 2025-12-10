// Mock API functions simulating Python backend behavior

export interface EnvironmentalPrediction {
  rainfall_mm: number;
  temperature_c: number;
  humidity_percent: number;
  wind_speed_kmh: number;
  spm_ugm3: number;
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

// Random number generator within range
const randomInRange = (min: number, max: number) => 
  Math.round((Math.random() * (max - min) + min) * 10) / 10;

export const predictEnvironmentalData = async (
  location: string, 
  date: string
): Promise<EnvironmentalPrediction> => {
  await delay(1500); // Simulate API delay
  
  return {
    rainfall_mm: randomInRange(0, 50),
    temperature_c: randomInRange(15, 38),
    humidity_percent: randomInRange(40, 95),
    wind_speed_kmh: randomInRange(5, 45),
    spm_ugm3: randomInRange(20, 150),
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
    co2Absorption: Math.round(randomInRange(...plant.co2Range) * sizeFactor),
    o2Emission: Math.round(randomInRange(...plant.o2Range) * sizeFactor),
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
