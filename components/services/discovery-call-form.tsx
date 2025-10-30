"use client"

import type React from "react"

import { useState } from "react"

export default function DiscoveryCallForm({
  service,
  onBack,
}: {
  service: string | null
  onBack: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    whatsapp: "",
    service: service || "",
    requirements: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        if (value.trim().length > 100) return "Name must be less than 100 characters"
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Name can only contain letters, spaces, hyphens, and apostrophes"
        return ""
      case "businessName":
        if (!value.trim()) return "Business name is required"
        if (value.trim().length < 2) return "Business name must be at least 2 characters"
        if (value.trim().length > 100) return "Business name must be less than 100 characters"
        return ""
      case "email":
        if (!value.trim()) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        return ""
      case "phone":
        if (!value.trim()) return "Phone number is required"
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
        if (!phoneRegex.test(value.replace(/\s/g, ""))) return "Please enter a valid phone number"
        if (value.replace(/\D/g, "").length < 10) return "Phone number must be at least 10 digits"
        return ""
      case "whatsapp":
        if (value.trim()) {
          const whatsappRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
          if (!whatsappRegex.test(value.replace(/\s/g, ""))) return "Please enter a valid WhatsApp number"
          if (value.replace(/\D/g, "").length < 10) return "WhatsApp number must be at least 10 digits"
        }
        return ""
      case "service":
        if (!value) return "Please select a service"
        return ""
      case "requirements":
        if (!value.trim()) return "Please describe your requirements"
        if (value.trim().length < 20) return "Requirements must be at least 20 characters"
        if (value.trim().length > 1000) return "Requirements must be less than 1000 characters"
        return ""
      default:
        return ""
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field and validate
    const error = validateField(name, value)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[name] = error
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      element?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    
    console.log("[v0] Discovery call form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      onBack()
      setSubmitted(false)
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Request Received!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for your interest. Our team will contact you within 24 hours to schedule your discovery call.
        </p>
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground">Book Discovery Call</h2>
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                errors.name ? "border-red-500" : "border-border"
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Business Name *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                errors.businessName ? "border-red-500" : "border-border"
              }`}
              placeholder="Your Company"
            />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                errors.email ? "border-red-500" : "border-border"
              }`}
              placeholder="john@company.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors ${
                errors.phone ? "border-red-500" : "border-border"
              }`}
              placeholder="+234 XXX XXX XXXX"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">WhatsApp Number</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors ${
              errors.whatsapp ? "border-red-500" : "border-border"
            }`}
            placeholder="+234 XXX XXX XXXX"
          />
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Service Interested In *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors ${
              errors.service ? "border-red-500" : "border-border"
            }`}
          >
            <option value="">Select a service</option>
            <option value="Customer Success Training">Customer Success Training</option>
            <option value="AI Automation">AI Automation</option>
            <option value="CRM Integrations">CRM Integrations</option>
            <option value="LMS Software Integration">LMS Software Integration</option>
            <option value="Talent Acquisition">Talent Acquisition</option>
            <option value="Workforce Development">Workforce Development</option>
            <option value="IoT Consultancy & Training">IoT Consultancy & Training</option>
          </select>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">What do you need from us? *</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none ${
              errors.requirements ? "border-red-500" : "border-border"
            }`}
            placeholder="Tell us about your specific needs and goals..."
          />
          {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
          <p className="text-xs text-muted-foreground mt-1">
            {formData.requirements.length}/1000 characters (minimum 20)
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          Send Request
        </button>
      </form>
    </div>
  )
}
