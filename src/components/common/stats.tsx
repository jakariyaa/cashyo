const stats = [
  {
    id: 1,
    name: "Active Users",
    value: "10M+",
    description: "Active Users",
  },
  {
    id: 2,
    name: "Agent Points",
    value: "50K+",
    description: "Agent Points",
  },
  {
    id: 3,
    name: "Transactions",
    value: "5B+",
    description: "Transactions",
  },
  {
    id: 4,
    name: "Uptime",
    value: "99.9%",
    description: "Uptime",
  },
]

export function Stats() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col">
                <dd className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">{stat.value}</dd>
                <dt className="mt-2 text-sm font-medium text-muted-foreground">{stat.description}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
