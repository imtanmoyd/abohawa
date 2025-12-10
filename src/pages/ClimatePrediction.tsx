import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CloudLoader } from "@/components/CloudLoader";
import { predictEnvironmentalData, reverseGeocode, type EnvironmentalPrediction } from "@/lib/mockApi";
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  MapPin, 
  Calendar,
  AlertCircle,
  Waves,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Rain droplet animation component
function RainDroplets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-3 bg-eco-blue/40 rounded-full animate-droplet"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// Temperature shimmer effect
function HeatShimmer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent animate-shimmer" />
    </div>
  );
}

// Windmill animation
function WindmillIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Wind className="w-8 h-8 text-eco-teal animate-spin-slow" />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  animation?: React.ReactNode;
  delay?: number;
}

function MetricCard({ title, value, unit, icon, animation, delay = 0 }: MetricCardProps) {
  return (
    <Card 
      variant="glass" 
      className="relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {animation}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold">
            {value}
            <span className="text-lg text-muted-foreground ml-1">{unit}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClimatePrediction() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [prediction, setPrediction] = useState<EnvironmentalPrediction | null>(null);

  const detectLocation = async () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const cityName = await reverseGeocode(latitude, longitude);
          setLocation(cityName);
          setIsLocating(false);
          toast({
            title: "Location detected",
            description: `Found: ${cityName}`,
          });
        },
        (error) => {
          setIsLocating(false);
          toast({
            title: "Location access denied",
            description: "Please enter your location manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLocating(false);
      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  const handlePredict = async () => {
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter or detect your location.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPrediction(null);
    
    const today = new Date().toISOString().split("T")[0];
    const data = await predictEnvironmentalData(location, today);
    
    setPrediction(data);
    setIsLoading(false);
  };

  // Auto-detect location on mount
  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-teal-light border border-eco-teal/20 mb-6">
            <Cloud className="w-4 h-4 text-eco-teal" />
            <span className="text-sm font-medium">AI-Powered Predictions</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Daily Climate & Air Quality
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Get real-time environmental forecasts for your location including weather and air quality metrics.
          </p>
        </div>

        {/* Location Input */}
        <Card variant="glass" className="mb-8 animate-fade-in-up delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-eco-green" />
              Your Location
            </CardTitle>
            <CardDescription>
              Enter your city or use automatic detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Enter city name..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button
                variant="eco-outline"
                size="lg"
                onClick={detectLocation}
                disabled={isLocating}
              >
                {isLocating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    Auto Detect
                  </>
                )}
              </Button>
              <Button variant="eco" size="lg" onClick={handlePredict} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4" />
                    Predict
                  </>
                )}
              </Button>
            </div>

            {/* Date Display */}
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Forecast for: {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}</span>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card variant="glass" className="mb-8">
            <CardContent className="py-8">
              <CloudLoader text="Generating environmental predictions..." />
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {prediction && !isLoading && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 animate-fade-in-up">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground font-medium">Prediction Results for {location}</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Rainfall"
                value={prediction.rainfall_mm}
                unit="mm"
                icon={<Droplets className="w-6 h-6 text-eco-blue" />}
                animation={<RainDroplets />}
                delay={0}
              />
              <MetricCard
                title="Temperature"
                value={prediction.temperature_c}
                unit="°C"
                icon={<Thermometer className="w-6 h-6 text-orange-500" />}
                animation={<HeatShimmer />}
                delay={100}
              />
              <MetricCard
                title="Humidity"
                value={prediction.humidity_percent}
                unit="%"
                icon={<Waves className="w-6 h-6 text-eco-teal" />}
                delay={200}
              />
              <MetricCard
                title="Wind Speed"
                value={prediction.wind_speed_kmh}
                unit="km/h"
                icon={<WindmillIcon />}
                delay={300}
              />
              <MetricCard
                title="SPM (Air Quality)"
                value={prediction.spm_ugm3}
                unit="μg/m³"
                icon={<AlertCircle className={`w-6 h-6 ${prediction.spm_ugm3 > 100 ? 'text-destructive' : prediction.spm_ugm3 > 50 ? 'text-yellow-500' : 'text-eco-green'}`} />}
                delay={400}
              />
            </div>

            {/* Air Quality Interpretation */}
            <Card 
              variant={prediction.spm_ugm3 > 100 ? "default" : "eco"} 
              className={`animate-fade-in-up delay-500 ${prediction.spm_ugm3 > 100 ? 'border-destructive/30' : ''}`}
            >
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-2">Air Quality Assessment</h3>
                <p className="text-muted-foreground">
                  {prediction.spm_ugm3 <= 50 
                    ? "✅ Excellent air quality! Safe for all outdoor activities."
                    : prediction.spm_ugm3 <= 100 
                    ? "⚠️ Moderate air quality. Sensitive individuals should limit prolonged outdoor exertion."
                    : "❌ Poor air quality. Everyone should reduce outdoor activities."}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
