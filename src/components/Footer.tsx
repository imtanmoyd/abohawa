import { Leaf, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-eco-green to-eco-teal flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              Built with{" "}
              <Heart className="w-3 h-3 inline text-destructive animate-pulse" />{" "}
              using Lovable – AI Generated Environment Intelligence App 🌱
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Abohawa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
