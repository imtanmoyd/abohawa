import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Cloud, 
  Factory, 
  TreeDeciduous, 
  Code, 
  Sparkles, 
  ArrowRight,
  Github,
  ExternalLink
} from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Climate Prediction",
    description: "Predicts rainfall, temperature, humidity, wind speed, and air quality (SPM) using AI models trained on environmental data.",
    tech: ["Gemini AI", "Geolocation API", "Weather Modeling"],
  },
  {
    icon: Factory,
    title: "GHG Monitoring & Carbon Sequestration",
    description: "Simulates greenhouse gas emissions from various sources and calculates the carbon sequestration potential of different mitigation efforts.",
    tech: ["Carbon Cycle Models", "Emission Factors", "Sequestration Analysis"],
  },
  {
    icon: TreeDeciduous,
    title: "Indoor Plant Air Purification",
    description: "Models CO₂ absorption and O₂ emission rates of indoor plants based on room size and plant species characteristics.",
    tech: ["Photosynthesis Models", "Air Quality Analysis", "Plant Database"],
  },
];

export default function About() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-6">
            <Brain className="w-4 h-4 text-eco-green" />
            <span className="text-sm font-medium">Project Overview</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About This Project
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A demonstration of AI-powered environmental modeling and climate intelligence.
          </p>
        </div>

        {/* Main Description */}
        <Card variant="glass" className="mb-8 animate-fade-in-up delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-eco-green" />
              What is Abohawa?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              This demo app visualizes the backend logic of a real Python-based environmental model 
              using Google's Gemini AI. The original backend code predicts climate metrics, simulates 
              carbon cycles, and models indoor plant air purification capabilities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              While this frontend demonstration uses simulated data with realistic ranges, the actual 
              backend integrates with Google's Gemini Pro model to generate intelligent predictions 
              and analyses based on environmental science principles.
            </p>
          </CardContent>
        </Card>

        {/* Features Breakdown */}
        <div className="space-y-6 mb-12">
          <h2 className="font-display text-2xl font-bold text-center">Core Features</h2>
          
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="glass" 
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-eco-green to-eco-teal flex items-center justify-center shadow-lg">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <Card variant="eco" className="mb-8 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Technology Stack
            </CardTitle>
            <CardDescription>
              Built with modern web technologies and AI integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "React", desc: "Frontend Framework" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "Tailwind CSS", desc: "Styling" },
                { name: "Gemini AI", desc: "Backend Intelligence" },
              ].map((tech) => (
                <div key={tech.name} className="text-center p-4 rounded-xl bg-card/50">
                  <p className="font-display font-semibold">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Python Backend Note */}
        <Card className="border-eco-teal/30 bg-eco-teal/5 mb-8 animate-fade-in-up">
          <CardContent className="p-6">
            <h4 className="font-display font-semibold mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-eco-teal" />
              About the Backend
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              The original Python backend uses Google's Generative AI (Gemini Pro) to generate 
              structured environmental predictions. It includes three main functions:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li><code className="text-eco-teal">predict_environmental_data()</code> - Generates daily climate forecasts</li>
              <li><code className="text-eco-teal">simulate_carbon_cycle()</code> - Analyzes GHG emissions vs sequestration</li>
              <li><code className="text-eco-teal">model_indoor_plant_performance()</code> - Calculates plant air purification</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <p className="text-muted-foreground mb-6">
            Ready to explore the features?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="eco" size="lg" asChild>
              <Link to="/climate">
                Try Climate Prediction
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/carbon">
                Explore Carbon Balance
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
