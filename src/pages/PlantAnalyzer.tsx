import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CloudLoader } from "@/components/CloudLoader";
import { analyzeIndoorPlant, type PlantAnalysis } from "@/lib/mockApi";
import { TreeDeciduous, Leaf, Wind, RefreshCw, Sparkles } from "lucide-react";

const plants = [
  { value: "Snake Plant", label: "Snake Plant", emoji: "🌿" },
  { value: "Aloe Vera", label: "Aloe Vera", emoji: "🪴" },
  { value: "Areca Palm", label: "Areca Palm", emoji: "🌴" },
  { value: "Peace Lily", label: "Peace Lily", emoji: "🌸" },
];

// Glowing plant animation
function GlowingPlant({ isGlowing }: { isGlowing: boolean }) {
  return (
    <div className={`relative transition-all duration-500 ${isGlowing ? 'animate-glow-pulse' : ''}`}>
      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-eco-green-light to-eco-leaf/20 flex items-center justify-center">
        <TreeDeciduous className={`w-16 h-16 text-eco-green transition-all duration-500 ${isGlowing ? 'scale-110' : ''}`} />
      </div>
      {isGlowing && (
        <div className="absolute -inset-4 rounded-full bg-eco-green/10 animate-ping" />
      )}
    </div>
  );
}

export default function PlantAnalyzer() {
  const [plant, setPlant] = useState("");
  const [roomSize, setRoomSize] = useState("15");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<PlantAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!plant || !roomSize) {
      return;
    }

    setIsLoading(true);
    setAnalysis(null);

    const data = await analyzeIndoorPlant(plant, parseFloat(roomSize));
    setAnalysis(data);
    setIsLoading(false);
  };

  const selectedPlant = plants.find(p => p.value === plant);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-green-light border border-eco-green/20 mb-6">
            <TreeDeciduous className="w-4 h-4 text-eco-green" />
            <span className="text-sm font-medium">Indoor Air Quality</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Indoor Plant Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Discover how indoor plants help purify your air by absorbing CO₂ and releasing fresh oxygen.
          </p>
        </div>

        {/* Input Form */}
        <Card variant="glass" className="mb-8 animate-fade-in-up delay-100">
          <CardHeader>
            <CardTitle>Configure Analysis</CardTitle>
            <CardDescription>
              Select a plant and enter your room size to see its air purification impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Plant Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-eco-green" />
                  Select Plant
                </label>
                <Select value={plant} onValueChange={setPlant}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a plant" />
                  </SelectTrigger>
                  <SelectContent>
                    {plants.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <span className="flex items-center gap-2">
                          <span>{p.emoji}</span>
                          {p.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Room Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-eco-teal" />
                  Room Size (m²)
                </label>
                <Input
                  type="number"
                  placeholder="Enter room size"
                  value={roomSize}
                  onChange={(e) => setRoomSize(e.target.value)}
                  min="1"
                  max="100"
                  className="h-12"
                />
              </div>
            </div>

            <Button 
              variant="eco" 
              size="lg" 
              className="w-full"
              onClick={handleAnalyze}
              disabled={!plant || !roomSize || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TreeDeciduous className="w-4 h-4" />
                  Analyze Plant
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card variant="glass" className="mb-8">
            <CardContent className="py-8">
              <CloudLoader text="Analyzing plant performance..." />
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {analysis && !isLoading && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Plant Visual */}
            <Card variant="eco" className="overflow-hidden">
              <CardContent className="py-12">
                <GlowingPlant isGlowing={true} />
                <h3 className="text-center font-display text-2xl font-bold mt-6">
                  {selectedPlant?.emoji} {analysis.plantName}
                </h3>
                <p className="text-center text-muted-foreground">
                  in a {roomSize}m² room
                </p>
              </CardContent>
            </Card>

            {/* Metrics */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* CO2 Absorption */}
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-eco-green/20 flex items-center justify-center">
                      <Leaf className="w-7 h-7 text-eco-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CO₂ Absorption</p>
                      <p className="text-3xl font-display font-bold text-eco-green">
                        {analysis.co2Absorption}
                        <span className="text-sm font-normal text-muted-foreground ml-1">g/day</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* O2 Emission */}
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-eco-teal/20 flex items-center justify-center">
                      <Wind className="w-7 h-7 text-eco-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">O₂ Emission</p>
                      <p className="text-3xl font-display font-bold text-eco-teal">
                        {analysis.o2Emission}
                        <span className="text-sm font-normal text-muted-foreground ml-1">L/day</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-eco-green" />
                  Plant Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {analysis.summary}
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-eco-green/20 bg-eco-green/5">
              <CardContent className="p-6">
                <h4 className="font-display font-semibold mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  For optimal air purification in a {roomSize}m² room, consider having {Math.max(1, Math.ceil(parseFloat(roomSize) / 10))} to {Math.ceil(parseFloat(roomSize) / 5)} plants. 
                  Place them near windows for best results!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
