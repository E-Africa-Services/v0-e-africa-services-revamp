"use client"

import { useState } from "react"

export default function TalentPool() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    fieldOfExperience: "",
    experienceLevel: "",
    skills: [] as string[],
    cv: null as File | null,
    videoUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const countries = [
    "Nigeria",
    "Kenya",
    "Ghana",
    "South Africa",
    "Uganda",
    "Rwanda",
    "Ethiopia",
    "Tanzania",
    "Cameroon",
    "Other",
  ]
  const fields = ["Technology", "Sales", "Customer Service", "Marketing", "Finance", "HR", "Operations", "Other"]
  const levels = ["Entry Level", "Mid Level", "Senior", "Executive"]
  const skillOptions = [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Technical Skills",
    "Project Management",
    "Data Analysis",
    "Sales",
    "Customer Service",
  ]

  const validateField = (name: string, value: string | string[] | File | null): string => {
    switch (name) {
      case "fullName":
        if (!value || (typeof value === "string" && !value.trim())) return "Full name is required"
        if (typeof value === "string" && value.trim().length < 2) return "Full name must be at least 2 characters"
        if (typeof value === "string" && value.trim().length > 100) return "Full name must be less than 100 characters"
        if (typeof value === "string" && !/^[a-zA-Z\s'-]+$/.test(value)) return "Name can only contain letters"
        return ""
      case "email":
        if (!value || (typeof value === "string" && !value.trim())) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (typeof value === "string" && !emailRegex.test(value)) return "Please enter a valid email address"
        return ""
      case "country":
        if (!value) return "Please select a country"
        return ""
      case "fieldOfExperience":
        if (!value) return "Please select a field of experience"
        return ""
      case "experienceLevel":
        if (!value) return "Please select an experience level"
        return ""
      case "skills":
        if (Array.isArray(value) && value.length === 0) return "Please select at least one skill"
        return ""
      case "cv":
        if (!value) return "Please upload your CV"
        if (value instanceof File) {
          const maxSize = 5 * 1024 * 1024 // 5MB
          if (value.size > maxSize) return "CV file size must be less than 5MB"
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]
          if (!allowedTypes.includes(value.type)) return "CV must be a PDF, DOC, or DOCX file"
        }
        return ""
      case "videoUrl":
        if (typeof value === "string" && value.trim()) {
          // Optional field, but if provided, should be a valid URL
          try {
            new URL(value)
          } catch {
            return "Please enter a valid URL"
          }
        }
        return ""
      default:
        return ""
    }
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (currentStep === 1) {
      // Validate step 1 fields
      const step1Fields = ["fullName", "email", "country"]
      step1Fields.forEach((field) => {
        const error = validateField(field, formData[field as keyof typeof formData])
        if (error) {
          newErrors[field] = error
        }
      })
    } else if (currentStep === 2) {
      // Validate step 2 fields
      const step2Fields = ["fieldOfExperience", "experienceLevel", "cv"]
      step2Fields.forEach((field) => {
        const error = validateField(field, formData[field as keyof typeof formData])
        if (error) {
          newErrors[field] = error
        }
      })
    } else if (currentStep === 3) {
      // Validate step 3 fields
      const error = validateField("skills", formData.skills)
      if (error) {
        newErrors.skills = error
      }
    } else if (currentStep === 4) {
      // Validate step 4 fields (video is optional)
      const error = validateField("videoUrl", formData.videoUrl)
      if (error) {
        newErrors.videoUrl = error
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const newSkills = prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill]
      
      // Validate skills after toggle
      const error = validateField("skills", newSkills)
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        if (error) {
          newErrors.skills = error
        } else {
          delete newErrors.skills
        }
        return newErrors
      })
      
      return { ...prev, skills: newSkills }
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, cv: file })
    
    // Validate file
    const error = validateField("cv", file)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors.cv = error
      } else {
        delete newErrors.cv
      }
      return newErrors
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    
    // Clear error for this field and validate
    const error = validateField(field, value)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[field] = error
      } else {
        delete newErrors[field]
      }
      return newErrors
    })
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    if (!validateStep(step)) {
      return
    }
    
    console.log("Form submitted:", formData)
    alert("Thank you for joining our talent pool! We'll review your profile and get back to you soon.")
    setStep(1)
    setFormData({
      fullName: "",
      email: "",
      country: "",
      fieldOfExperience: "",
      experienceLevel: "",
      skills: [],
      cv: null,
      videoUrl: "",
    })
    setErrors({})
  }

  return (
    <section id="talent" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Join Our Talent Pool</h2>
          <p className="text-lg text-muted-foreground">
            Showcase your skills and connect with opportunities across Africa and beyond
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    step >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {num}
                </div>
                <span className="text-sm text-muted-foreground">
                  {num === 1 ? "Personal" : num === 2 ? "Profile" : num === 3 ? "Skills" : "Video"}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground mb-6">Personal Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.fullName ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.country ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Select your country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground mb-6">Professional Profile</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Field of Experience *</label>
                <select
                  value={formData.fieldOfExperience}
                  onChange={(e) => handleInputChange("fieldOfExperience", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.fieldOfExperience ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Select your field</option>
                  {fields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                {errors.fieldOfExperience && <p className="text-red-500 text-xs mt-1">{errors.fieldOfExperience}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Experience Level *</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.experienceLevel ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Select your level</option>
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.experienceLevel && <p className="text-red-500 text-xs mt-1">{errors.experienceLevel}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload CV *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.cv ? "border-red-500" : "border-border"
                  }`}
                />
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
                {formData.cv && (
                  <p className="text-xs text-green-600 mt-1">✓ {formData.cv.name} selected</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Skills */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground mb-6">Select Your Skills</h3>
              <p className="text-muted-foreground mb-4">Choose all that apply *</p>
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`p-3 rounded-lg border-2 transition-all text-left font-medium ${
                      formData.skills.includes(skill)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-xs mt-2">{errors.skills}</p>}
            </div>
          )}

          {/* Step 4: Video */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground mb-6">Video Introduction</h3>
              <div className="bg-muted/50 p-6 rounded-lg border-2 border-dashed border-border">
                <p className="text-foreground font-medium mb-2">Record or Upload Your Video</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Tell us about yourself, your experience, and why you're interested in joining our talent pool. Speak
                  clearly and professionally. Max 2 minutes, under 50MB. (Optional)
                </p>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                  placeholder="Paste video URL or upload file"
                  className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.videoUrl ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.videoUrl && <p className="text-red-500 text-xs mt-1">{errors.videoUrl}</p>}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
