import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Personal",
    price: "Free",
    description: "Perfect for individuals getting started with digital payments.",
    features: [
      "Up to 10 transactions per month",
      "Basic security features",
      "Mobile app access",
      "Email support",
      "Standard transfer speeds",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Ideal for frequent users and small businesses.",
    features: [
      "Unlimited transactions",
      "Advanced security features",
      "Priority customer support",
      "Instant transfers",
      "Multi-currency support",
      "Analytics dashboard",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$29.99",
    period: "/month",
    description: "Comprehensive solution for growing businesses.",
    features: [
      "Everything in Pro",
      "Team management (up to 10 users)",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingPlans() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Choose your plan</p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          All plans include our core security features and mobile app access.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : "ring-1 ring-border"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold leading-8 text-foreground">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-6 text-base leading-7">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm leading-6 text-muted-foreground">
            All plans include a 30-day money-back guarantee. No setup fees.
          </p>
        </div>
      </div>
    </section>
  )
}
