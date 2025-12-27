import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

const team = [
  {
    name: "Jakariya Abbas",
    role: "Fullstack Developer",
    bio: "Passionate Fullstack Developer with expertise in building scalable web applications and premium user experiences.",
    image: "/placeholder.svg?height=400&width=400&text=Jakariya+Abbas",
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
