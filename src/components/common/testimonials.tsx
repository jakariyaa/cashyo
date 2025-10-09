const testimonials = [
  {
    content:
      "Cashyo has transformed how I handle my business transactions. Fast, secure, and reliable.",
    author: "Diana Johnson",
    role: "Small Business Owner",
    rating: 5,
  },
  {
    content:
      "The best digital wallet I've ever used. The agent network makes cash-in/out super convenient.",
    author: "Mike Rodriguez",
    role: "Freelancer",
    rating: 5,
  },
  {
    content:
      "Perfect for managing my expenses. The analytics help me budget better. This app is a game-changer!",
    author: "Abdul Kader",
    role: "Student",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Millions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users say about their Cashyo experience
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-foreground mb-4">
                "{testimonial.content}"
              </blockquote>
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
