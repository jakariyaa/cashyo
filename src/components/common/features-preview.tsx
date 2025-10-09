import { Shield, Zap, Smartphone, CreditCard, BarChart3, Clock } from "lucide-react"

const features = [
  {
    name: "Bank-Level Security",
    description: "Your money is protected with advanced encryption and multi-factor authentication",
    icon: Shield,
  },
  {
    name: "Instant Transfers",
    description: "Send and receive money instantly with zero delays",
    icon: Zap,
  },
  {
    name: "Agent Network",
    description: "Cash-in and cash-out at thousands of agent locations nationwide",
    icon: Smartphone,
  },
  {
    name: "Digital Payments",
    description: "Pay bills, shop online, and manage all your payments in one place",
    icon: CreditCard,
  },
  {
    name: "Financial Insights",
    description: "Track your spending with detailed analytics and smart budgeting tools",
    icon: BarChart3,
  },
  {
    name: "24/7 Available",
    description: "Access your wallet anytime, anywhere with our reliable platform",
    icon: Clock,
  },
]

export function Features() {
  return (
    <section id="features-preview" className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Cashyo?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with cutting-edge technology and designed for your convenience
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.name} className="flex flex-col items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
