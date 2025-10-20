"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const individualTrainings = [
  {
    title: "LinkedIn Optimization",
    description: "Build a powerful professional presence",
    fullDescription: "30-day challenge to transform your LinkedIn profile and build a strong professional network.",
    price: 49,
    process: ["Profile Audit", "Content Strategy", "Engagement Plan", "30-Day Challenge"],
    image: "/trainings/linkedin-optimization.jpg",
  },
  {
    title: "CV Optimization",
    description: "Create a standout resume",
    fullDescription: "Expert guidance to craft a compelling CV that gets you noticed by recruiters.",
    price: 29,
    process: ["CV Review", "Formatting", "Content Enhancement", "Final Polish"],
    image: "/trainings/cv-optimization.jpg",
  },
  {
    title: "AI Automation Training",
    description: "Master AI tools and automation",
    fullDescription: "Hands-on training to leverage AI tools for productivity and career advancement.",
    price: 79,
    process: ["AI Basics", "Tool Mastery", "Automation Workflows", "Real-World Projects"],
    image: "/trainings/ai-automation-training.jpg",
  },
  {
    title: "Sales & Rebranding",
    description: "Elevate your personal brand",
    fullDescription: "Strategic personal branding and sales skills to advance your career.",
    price: 59,
    process: ["Brand Audit", "Strategy Development", "Sales Training", "Implementation"],
    image: "/trainings/sales-rebranding.jpg",
  },
  {
    title: "Voice Coaching & Tonality",
    description: "Perfect your communication skills",
    fullDescription: "Professional voice coaching to improve communication and presence.",
    price: 39,
    process: ["Assessment", "Technique Training", "Practice Sessions", "Certification"],
    image: "/trainings/voice-coaching.jpg",
  },
  {
    title: "CRM Training",
    description: "Master customer relationship management",
    fullDescription: "Comprehensive CRM training to manage customer relationships effectively.",
    price: 49,
    process: ["CRM Basics", "Advanced Features", "Integration", "Best Practices"],
    image: "/trainings/crm-training.jpg",
  },
  {
    title: "AI Prompt Engineering",
    description: "Unlock AI's full potential",
    fullDescription: "Learn to craft effective prompts and maximize AI capabilities.",
    price: 69,
    process: ["Prompt Basics", "Advanced Techniques", "Use Cases", "Certification"],
    image: "/trainings/ai-prompt-engineering.jpg",
  },
  {
    title: "Email Marketing",
    description: "Effective communication strategies",
    fullDescription: "Master email marketing to build relationships and drive results.",
    price: 44,
    process: ["Strategy", "Copywriting", "Automation", "Analytics"],
    image: "/trainings/email-marketing.jpg",
  },
  {
    title: "Interview Preparation",
    description: "Land your dream job",
    fullDescription: "Comprehensive interview prep with mock interviews and feedback.",
    price: 34,
    process: ["Interview Types", "Mock Interviews", "Q&A Prep", "Confidence Building"],
    image: "/trainings/interview-preparation.jpg",
  },
  {
    title: "Personal Goal Setting",
    description: "Achieve your career aspirations",
    fullDescription: "Mentorship and coaching to set and achieve meaningful career goals.",
    price: 54,
    process: ["Goal Definition", "Action Planning", "Accountability", "Progress Tracking"],
    image: "/trainings/personal-goal-setting.jpg",
  },
  {
    title: "Talent Staffing",
    description: "Connect with right opportunities",
    fullDescription: "Personalized staffing support to find the perfect role for your skills.",
    price: 0,
    process: ["Assessment", "Matching", "Interview Prep", "Placement Support"],
    image: "/trainings/talent-staffing.jpg",
    isTalentPool: true,
  },
]

export default function IndividualTrainingsGrid({
  onSelectTraining,
}: {
  onSelectTraining: (training: string) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const filteredTrainings = individualTrainings.filter((t) => t.title !== "Job Opportunities")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTrainings.map((training, idx) => (
        <div
          key={idx}
          className={`relative h-96 rounded-xl overflow-hidden group cursor-pointer bg-card border border-border transition-all duration-500 ${
            hoveredIndex === idx ? "shadow-2xl scale-105" : "shadow-lg"
          }`}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Image Container with slide-up animation */}
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              hoveredIndex === idx ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <Image
              src={training.image || "/placeholder.svg"}
              alt={training.title}
              fill
              className="object-cover"
              priority={idx < 3}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>

          {/* Title, Description and Price positioned at bottom on image */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
              hoveredIndex === idx ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <h3 className="text-lg font-bold text-white drop-shadow-lg mb-1">{training.title}</h3>
            <p className="text-white/90 text-sm drop-shadow-md mb-3">{training.description}</p>
            {training.price > 0 && <p className="text-2xl font-bold text-accent drop-shadow-lg">${training.price}</p>}
            {training.price === 0 && <p className="text-lg font-bold text-accent drop-shadow-lg">Free</p>}
          </div>

          {/* Hover State - Content slides up with detailed info */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-secondary/95 to-secondary/90 backdrop-blur p-6 flex flex-col justify-between transition-all duration-500 overflow-y-auto ${
              hoveredIndex === idx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-bold text-secondary-foreground mb-2">{training.title}</h3>
              <p className="text-secondary-foreground/90 text-sm leading-relaxed mb-4">{training.fullDescription}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-secondary-foreground mb-2 uppercase tracking-wide">Process:</p>
                <ul className="space-y-1.5">
                  {training.process.map((step, i) => (
                    <li key={i} className="text-xs text-secondary-foreground/80 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {training.price > 0 && <p className="text-xl font-bold text-accent mb-4">${training.price}</p>}
            </div>

            {training.isTalentPool ? (
              <Link href="/#talent-pool" onClick={() => onSelectTraining(training.title)}>
                <button className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold hover:shadow-lg hover:scale-105 active:scale-95">
                  Join Talent Pool
                </button>
              </Link>
            ) : (
              <button
                onClick={() => onSelectTraining(training.title)}
                className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
