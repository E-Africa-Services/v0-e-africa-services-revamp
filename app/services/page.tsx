"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CompanyServicesGrid from "@/components/services/company-services-grid"
import IndividualTrainingsGrid from "@/components/services/individual-trainings-grid"
import DiscoveryCallForm from "@/components/services/discovery-call-form"
import TrainingEnrollmentForm from "@/components/services/training-enrollment-form"

export default function ServicesPage() {
  const [userType, setUserType] = useState<"companies" | "individuals" | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {!userType ? (
        <section className="min-h-[calc(100vh-64px)] flex items-center justify-center py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">Choose Your Path</h1>
            <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Select whether you're looking for services as a company or individual
            </p>

            <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <button
                onClick={() => setUserType("companies")}
                className="p-8 bg-card border-2 border-border rounded-xl hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">For Companies</h2>
                <p className="text-muted-foreground">
                  Training, consulting, and talent acquisition solutions for your organization
                </p>
              </button>

              <button
                onClick={() => setUserType("individuals")}
                className="p-8 bg-card border-2 border-border rounded-xl hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">For Individuals</h2>
                <p className="text-muted-foreground">Career development, training, and job placement opportunities</p>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in-up">
                    {userType === "companies" ? "Services for Companies" : "Training Programs"}
                  </h1>
                  <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    {userType === "companies"
                      ? "Transform your team with tailored training and consulting solutions"
                      : "Accelerate your career with comprehensive training and mentorship"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUserType(null)
                    setSelectedService(null)
                    setShowForm(false)
                  }}
                  className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  ← Back
                </button>
              </div>

              {!showForm ? (
                userType === "companies" ? (
                  <CompanyServicesGrid
                    onSelectService={(service) => {
                      setSelectedService(service)
                      setShowForm(true)
                    }}
                  />
                ) : (
                  <IndividualTrainingsGrid
                    onSelectTraining={(training) => {
                      setSelectedService(training)
                      setShowForm(true)
                    }}
                  />
                )
              ) : (
                <div className="max-w-2xl mx-auto">
                  {userType === "companies" ? (
                    <DiscoveryCallForm service={selectedService} onBack={() => setShowForm(false)} />
                  ) : (
                    <TrainingEnrollmentForm training={selectedService} onBack={() => setShowForm(false)} />
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  )
}
