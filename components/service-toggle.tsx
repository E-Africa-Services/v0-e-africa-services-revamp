"use client"

const companyServices = [
  { title: "Customer Success Training", description: "Build exceptional customer-centric teams" },
  { title: "AI Automation", description: "Streamline operations with intelligent automation" },
  { title: "CRM Integrations", description: "Seamless integration across your teams" },
  { title: "LMS Software Integration", description: "Optimize your learning management systems" },
  { title: "Talent Acquisition", description: "Find and recruit top African talent" },
  { title: "Workforce Development", description: "Build skills for tomorrow's challenges" },
  { title: "IoT Consultancy & Training", description: "Master Internet of Things technology" },
]

const individualServices = [
  { title: "LinkedIn Optimization", description: "Build a powerful professional presence" },
  { title: "CV Optimization", description: "Create a standout resume" },
  { title: "AI Automation Training", description: "Master AI tools and automation" },
  { title: "Sales & Rebranding", description: "Elevate your personal brand" },
  { title: "Personal Goal Setting", description: "Achieve your career aspirations" },
  { title: "Voice Coaching & Tonality", description: "Perfect your communication skills" },
  { title: "CRM Training", description: "Master customer relationship management" },
  { title: "AI Prompt Engineering", description: "Unlock AI's full potential" },
  { title: "Email Marketing", description: "Effective communication strategies" },
  { title: "Interview Preparation", description: "Land your dream job" },
  { title: "Job Opportunities", description: "Access exclusive job placements" },
  { title: "Talent Staffing", description: "Connect with right opportunities" },
]

export default function ServiceToggle({
  userType,
  onBack,
}: { userType: "companies" | "individuals"; onBack: () => void }) {
  const services = userType === "companies" ? companyServices : individualServices

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              {userType === "companies" ? "Services for Companies" : "Services for Individuals"}
            </h2>
            <p className="text-muted-foreground">
              {userType === "companies"
                ? "Transform your team with tailored training and consulting solutions"
                : "Accelerate your career with comprehensive training and mentorship"}
            </p>
          </div>
          <button onClick={onBack} className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
            ← Change
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold">→</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
