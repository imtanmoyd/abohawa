import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudLoader } from "@/components/CloudLoader";
import { simulateCarbonCycle, type CarbonSimulation } from "@/lib/mockApi";
import { Factory, TreePine, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const emissionSources = [
  { value: "Factory", label: "Factory" },
  { value: "Vehicles", label: "Vehicles" },
  { value: "Power Plant", label: "Power Plant" },
  { value: "Waste Burning", label: "Waste Burning" },
];

const sequestrationEfforts = [
  { value: "Afforestation", label: "Afforestation" },
  { value: "Ocean Algae Farming", label: "Ocean Algae Farming" },
  { value: "Soil Carbon", label: "Soil Carbon" },
  { value: "Urban Green Roofs", label: "Urban Green Roofs" },
];

// CO2 Bubbles Animation
function CO2Bubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bubble-rise"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: "-20px",
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[8px] font-bold text-muted-foreground/40">
            CO₂
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CarbonBalance() {
  const [emissionSource, setEmissionSource] = useState("");
  const [sequestrationEffort, setSequestrationEffort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [simulation, setSimulation] = useState<CarbonSimulation | null>(null);

  const handleSimulate = async () => {
    if (!emissionSource || !sequestrationEffort) {
      return;
    }

    setIsLoading(true);
    setSimulation(null);

    const data = await simulateCarbonCycle(emissionSource, sequestrationEffort);
    setSimulation(data);
    setIsLoading(false);
  };

  const resetSimulation = () => {
    setSimulation(null);
    setEmissionSource("");
    setSequestrationEffort("");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-green-light border border-eco-green/20 mb-6">
            <Factory className="w-4 h-4 text-eco-green" />
            <span className="text-sm font-medium">Carbon Cycle Analysis</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Carbon Balance Simulator
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Simulate the balance between greenhouse gas emissions and carbon sequestration efforts.
          </p>
        </div>

        {/* Input Form */}
        <Card variant="glass" className="mb-8 animate-fade-in-up delay-100">
          <CardHeader>
            <CardTitle>Configure Simulation</CardTitle>
            <CardDescription>
              Select an emission source and a sequestration effort to analyze the carbon balance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Emission Source */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Factory className="w-4 h-4 text-destructive" />
                  Emission Source
                </label>
                <Select value={emissionSource} onValueChange={setEmissionSource}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select emission source" />
                  </SelectTrigger>
                  <SelectContent>
                    {emissionSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sequestration Effort */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-eco-green" />
                  Sequestration Effort
                </label>
                <Select value={sequestrationEffort} onValueChange={setSequestrationEffort}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select sequestration effort" />
                  </SelectTrigger>
                  <SelectContent>
                    {sequestrationEfforts.map((effort) => (
                      <SelectItem key={effort.value} value={effort.value}>
                        {effort.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              variant="eco" 
              size="lg" 
              className="w-full"
              onClick={handleSimulate}
              disabled={!emissionSource || !sequestrationEffort || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Simulating...
                </>
              ) : (
                "Simulate Carbon Cycle"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card variant="glass" className="relative overflow-hidden mb-8">
            <CO2Bubbles />
            <CardContent className="py-8 relative z-10">
              <CloudLoader text="Simulating carbon cycle..." />
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {simulation && !isLoading && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Metrics */}
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Emissions */}
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Daily Emissions</p>
                  <p className="text-3xl font-display font-bold text-destructive">
                    {simulation.emissions}
                    <span className="text-sm font-normal ml-1">tons</span>
                  </p>
                </CardContent>
              </Card>

              {/* Sequestration */}
              <Card className="border-eco-green/30 bg-eco-green/5">
                <CardContent className="p-6 text-center">
                  <TrendingDown className="w-8 h-8 text-eco-green mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Daily Sequestration</p>
                  <p className="text-3xl font-display font-bold text-eco-green">
                    {simulation.sequestration}
                    <span className="text-sm font-normal ml-1">tons</span>
                  </p>
                </CardContent>
              </Card>

              {/* Net Balance */}
              <Card className={`${simulation.isPositive ? 'border-eco-green/30 bg-eco-green/5' : 'border-destructive/30 bg-destructive/5'}`}>
                <CardContent className="p-6 text-center">
                  <Minus className={`w-8 h-8 mx-auto mb-3 ${simulation.isPositive ? 'text-eco-green' : 'text-destructive'}`} />
                  <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
                  <p className={`text-3xl font-display font-bold ${simulation.isPositive ? 'text-eco-green' : 'text-destructive'}`}>
                    {simulation.netBalance > 0 ? '+' : ''}{simulation.netBalance.toFixed(1)}
                    <span className="text-sm font-normal ml-1">tons</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Result Badge */}
            <div className="text-center">
              <Badge 
                className={`text-lg px-6 py-3 ${
                  simulation.isPositive 
                    ? 'bg-eco-green text-primary-foreground' 
                    : 'bg-destructive text-destructive-foreground'
                }`}
              >
                NET RESULT: {simulation.isPositive ? '✅ CARBON POSITIVE' : '❌ CARBON NEGATIVE'}
              </Badge>
            </div>

            {/* Explanation */}
            <Card variant="glass" className="relative overflow-hidden">
              <CO2Bubbles />
              <CardHeader className="relative z-10">
                <CardTitle>Analysis Report</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="prose prose-sm max-w-none">
                  {simulation.explanation.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reset Button */}
            <div className="text-center">
              <Button variant="outline" onClick={resetSimulation}>
                Run Another Simulation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
