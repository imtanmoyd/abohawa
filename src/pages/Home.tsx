import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Factory, TreeDeciduous, Sparkles, ArrowRight, Leaf, Wind, Droplets } from "lucide-react";

const features = [
  {
    title: "Climate Prediction",
    description: "AI-powered daily forecasts for weather and air quality with real-time location detection.",
    icon: Cloud,
    href: "/climate",
    color: "from-eco-teal to-eco-blue",
  },
  {
    title: "Carbon Balance",
    description: "Simulate greenhouse gas emissions and sequestration efforts to understand carbon cycles.",
    icon: Factory,
    href: "/carbon",
    color: "from-eco-earth to-eco-green",
  },
  {
    title: "Plant Analyzer",
    description: "Discover how indoor plants purify air by absorbing CO₂ and releasing oxygen.",
    icon: TreeDeciduous,
    href: "/plants",
    color: "from-eco-green to-eco-leaf",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-eco-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-eco-teal/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 border border-eco-green/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-eco-green" />
            <span className="text-sm font-medium text-accent-foreground">Powered by AI & Environmental Science</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            <span className="eco-gradient-text">AI-Powered Climate</span>
            <br />
            <span className="text-foreground">& Environmental Insights</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Understand our planet better with predictive climate models, carbon cycle simulations, 
            and indoor air quality analysis – all in one beautiful interface.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Button variant="eco" size="xl" asChild>
              <Link to="/climate" className="gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute top-32 left-10 opacity-20 animate-float">
          <Leaf className="w-12 h-12 text-eco-green" />
        </div>
        <div className="absolute top-48 right-20 opacity-20 animate-float delay-300">
          <Wind className="w-10 h-10 text-eco-teal" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20 animate-float delay-500">
          <Droplets className="w-8 h-8 text-eco-blue" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Explore Our Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three powerful tools to help you understand and improve your environmental impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.href} className="group">
                <Card 
                  variant="glass" 
                  className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-eco-green transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-eco-green group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 bg-accent/30">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "98%", label: "Prediction Accuracy" },
              { value: "50+", label: "Climate Metrics" },
              { value: "4", label: "Plant Species" },
              { value: "24/7", label: "Real-time Data" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-display text-3xl sm:text-4xl font-bold eco-gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
