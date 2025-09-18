"use client";
import { ThemeToggle } from "@/app/utils/ThemeProvider";
import { MapPin, Menu, Github, ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                Institutions Publiques
              </h1>
              <p className="text-xs text-muted-foreground">Madagascar</p>
            </div>
          </div>
          <div className="hidden sm:inline-flex text-xs animate-pulse bg-emerald-800/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/20">
            Beta
          </div>
        </div>
     

        <div className="flex items-center gap-2 ">
          <div className="hidden md:inline-flex">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4 mr-2" />
              Code source
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <ThemeToggle />
          </div>

          <div className="lg:hidden">
            <Menu className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
