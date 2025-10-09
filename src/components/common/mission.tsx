import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

const values = [
  {
    name: "Our Mission",
    description:
      "To democratize access to secure digital financial services and empower individuals to take control of their financial future.",
    icon: Target,
  },
  {
    name: "Our Vision",
    description: "A world where digital payments are as simple, secure, and universal as sending a text message.",
    icon: Eye,
  },
  {
    name: "Our Values",
    description:
      "Security first, user-centric design, transparency, innovation, and building trust through every interaction.",
    icon: Heart,
  },
]

export function Mission() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What drives us forward</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our core principles guide everything we do, from product development to customer support.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.name} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-xl font-semibold leading-7 text-foreground">{value.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
