import { cn } from "@/lib/utils";
import { Cloud } from "lucide-react";

interface LoaderProps {
  text?: string;
  className?: string;
}

export function CloudLoader({ text = "Analyzing...", className }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-12", className)}>
      {/* Animated Clouds */}
      <div className="relative w-32 h-20">
        <Cloud 
          className="absolute w-12 h-12 text-eco-teal/60 animate-float" 
          style={{ left: 0, top: 0 }}
        />
        <Cloud 
          className="absolute w-16 h-16 text-eco-green/70 animate-float delay-200" 
          style={{ left: '40%', top: '20%' }}
        />
        <Cloud 
          className="absolute w-10 h-10 text-eco-teal/50 animate-float delay-500" 
          style={{ right: 0, top: '10%' }}
        />
      </div>
      
      {/* Loading Text */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">{text}</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-eco-green rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-eco-green rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-eco-green rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
