import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    content:
      "Cashyo has transformed how I handle my business transactions. Fast, secure, and reliable.",
    author: "Diana Johnson",
    role: "Small Business Owner",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=diana",
  },
  {
    content:
      "The best digital wallet I've ever used. The agent network makes cash-in/out super convenient.",
    author: "Mike Rodriguez",
    role: "Freelancer",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=mike",
  },
  {
    content:
      "Perfect for managing my expenses. The analytics help me budget better. This app is a game-changer!",
    author: "Abdul Kader",
    role: "Student",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=abdul",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary uppercase tracking-wide">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Millions
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See what our community has to say about their Cashyo experience.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="flex flex-col justify-between bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <blockquote className="text-foreground text-lg leading-relaxed mb-6 flex-grow">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center gap-4 mt-auto border-t border-border/50 pt-6">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
