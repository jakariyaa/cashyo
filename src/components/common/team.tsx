import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Product at PayPal with 15 years in fintech. Led digital transformation initiatives serving 400M+ users.",
    image: "/placeholder.svg?height=400&width=400&text=Sarah+Chen",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer specializing in distributed systems and cryptography. Built payment infrastructure at scale.",
    image: "/placeholder.svg?height=400&width=400&text=Marcus+Rodriguez",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Emily Watson",
    role: "Head of Security",
    bio: "Cybersecurity expert with 12 years protecting financial institutions. Former security architect at JPMorgan Chase.",
    image: "/placeholder.svg?height=400&width=400&text=Emily+Watson",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "David Kim",
    role: "Head of Design",
    bio: "Award-winning UX designer focused on financial products. Previously led design teams at Stripe and Square.",
    image: "/placeholder.svg?height=400&width=400&text=David+Kim",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export function Team() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Meet our leadership team</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Experienced leaders from top fintech and technology companies, united by a shared vision.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {team.map((person) => (
            <li key={person.name}>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img
                    className="mx-auto h-24 w-24 rounded-full"
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                  />
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-foreground">
                    {person.name}
                  </h3>
                  <p className="text-sm leading-6 text-primary font-medium">{person.role}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{person.bio}</p>
                  <ul role="list" className="mt-6 flex justify-center gap-x-6">
                    <li>
                      <a href={person.social.linkedin} className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </li>
                    <li>
                      <a href={person.social.twitter} className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-5 w-5" />
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
