"use client"

import { useState } from "react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EA</span>
            </div>
            <span className="font-bold text-lg text-foreground">E-Africa Services</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#talent" className="text-foreground hover:text-primary transition-colors">
              Talent Pool
            </a>
            <a href="#training" className="text-foreground hover:text-primary transition-colors">
              Training
            </a>
            <a href="#team" className="text-foreground hover:text-primary transition-colors">
              Team
            </a>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="/services" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Services
            </a>
            <a href="#talent" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Talent Pool
            </a>
            <a href="#training" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Training
            </a>
            <a href="#team" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Team
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
