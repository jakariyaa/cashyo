export function FaqHero() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Frequently asked <span className="text-primary">questions</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Find answers to common questions about Cashyo. Can't find what
            you're looking for? Contact our support team.
          </p>
        </div>
      </div>
    </section>
  );
}
