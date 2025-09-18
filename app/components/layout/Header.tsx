"use client";
import { ThemeToggle } from "@/app/utils/ThemeProvider";
import { MapPin, Menu, Github, ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 backdrop-blur bg-background">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg  bg-clip-text">
                Institutions Publiques
              </h1>
              <p className="text-xs text-muted-foreground">Madagascar</p>
            </div>
          </div>
          <div className="hidden sm:inline-flex text-xs animate-pulse bg-emerald-200 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-400/20">
            Beta
          </div>
        </div>
     

        <div className="flex items-center gap-2 ">
          <div className="hidden md:inline-flex gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center p-2 gap-1 hover:bg-emerald-800/20 transition-colors rounded-md text-sm font-medium "
            >
              <Github className="w-4 h-4 mr-2" />
              Code source
              <ExternalLink className="w-4 h-4 mr-2" />
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
