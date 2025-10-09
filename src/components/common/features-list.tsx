import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Zap,
  Smartphone,
  CreditCard,
  Globe,
  Lock,
  BarChart3,
  Bell,
  Users,
  Repeat,
  QrCode,
  Headphones,
} from "lucide-react"

const features = [
  {
    category: "Security",
    items: [
      {
        name: "Bank-Grade Security",
        description:
          "Multi-layer encryption, biometric authentication, and hardware security modules protect your funds.",
        icon: Shield,
      },
      {
        name: "Privacy Protection",
        description: "Zero-knowledge architecture ensures your financial data remains completely private.",
        icon: Lock,
      },
      {
        name: "Fraud Detection",
        description: "AI-powered fraud detection monitors transactions 24/7 to keep your account safe.",
        icon: Bell,
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        name: "Instant Transactions",
        description: "Send and receive money instantly with our lightning-fast processing network.",
        icon: Zap,
      },
      {
        name: "QR Code Payments",
        description: "Pay at any merchant by simply scanning a QR code with your mobile device.",
        icon: QrCode,
      },
      {
        name: "Recurring Payments",
        description: "Set up automatic payments for subscriptions, bills, and regular transfers.",
        icon: Repeat,
      },
    ],
  },
  {
    category: "Global",
    items: [
      {
        name: "Multi-Currency Support",
        description: "Support for 50+ fiat currencies and popular cryptocurrencies in one wallet.",
        icon: CreditCard,
      },
      {
        name: "Global Transfers",
        description: "Send money anywhere in the world with competitive exchange rates and low fees.",
        icon: Globe,
      },
      {
        name: "Mobile First",
        description: "Designed for mobile with a seamless experience across all devices and platforms.",
        icon: Smartphone,
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        name: "Analytics Dashboard",
        description: "Track spending patterns, set budgets, and gain insights into your financial habits.",
        icon: BarChart3,
      },
      {
        name: "Team Management",
        description: "Manage business accounts with role-based permissions and approval workflows.",
        icon: Users,
      },
      {
        name: "24/7 Support",
        description: "Get help whenever you need it with our round-the-clock customer support team.",
        icon: Headphones,
      },
    ],
  },
]

export function FeaturesList() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {features.map((category, categoryIndex) => (
          <div key={category.category} className={categoryIndex > 0 ? "mt-24" : ""}>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{category.category}</h2>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {category.items.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <Card key={feature.name} className="border-0 shadow-none">
                      <CardHeader>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-lg font-semibold leading-7 text-foreground">
                          {feature.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-base leading-7">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
