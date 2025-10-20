"use client"

export default function PartnersSection() {
  const partners = [
    "TechCorp Africa",
    "Global Solutions Ltd",
    "Innovation Hub",
    "Digital Ventures",
    "Enterprise Systems",
    "Future Tech",
    "Growth Partners",
    "Excellence Group",
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by Leading Companies</h2>
          <p className="text-lg text-muted-foreground">
            We partner with Africa's most innovative companies to find and develop top talent
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="p-6 bg-card rounded-lg border border-border flex items-center justify-center text-center hover:border-primary/50 transition-colors"
            >
              <p className="font-semibold text-foreground">{partner}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-lg border border-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Why Companies Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">Access to Africa's best talent pool</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">
                    Multilingual professionals (English, French, Portuguese, Chinese)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">AI-powered talent matching algorithm</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">Local and international placements</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Why Professionals Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">World-class training programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">Mentorship from industry experts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">Access to exclusive job opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">Career growth and development support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
