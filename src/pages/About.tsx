import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Globe, Heart, Shield, Target, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "We prioritize the security of your financial data and transactions above all else.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description:
        "Every decision we make is centered around providing the best experience for our users.",
    },
    {
      icon: Globe,
      title: "Inclusive Access",
      description:
        "Making financial services accessible to everyone, regardless of their background.",
    },
    {
      icon: Heart,
      title: "Trust & Transparency",
      description:
        "Building lasting relationships through honest communication and reliable service.",
    },
  ];

  const team = [
    {
      name: "Jakariya Abbas",
      role: "CEO & Co-Founder",
      description: "Former VP at Goldman Sachs with 15+ years in fintech",
      image: "👨",
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      description: "Ex-Google engineer specializing in secure payment systems",
      image: "👩‍💻",
    },
    {
      name: "Priya Patel",
      role: "Head of Security",
      description:
        "Cybersecurity expert with PhD from MIT and 10+ years experience",
      image: "👩‍🔬",
    },
    {
      name: "James Wilson",
      role: "Head of Product",
      description: "Product leader with experience at Stripe and PayPal",
      image: "👨‍💼",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "Cashyo founded with a vision to democratize digital payments",
    },
    {
      year: "2021",
      event: "Launched our first mobile app and reached 100K users",
    },
    {
      year: "2022",
      event: "Expanded agent network to 10K+ locations nationwide",
    },
    {
      year: "2023",
      event: "Achieved 5M+ active users and $1B+ in transactions",
    },
    {
      year: "2024",
      event: "Launched advanced analytics and business solutions",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4">
              About Cashyo
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Empowering Financial Freedom for Everyone
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We're on a mission to make digital payments simple, secure, and
              accessible to everyone. Built by a team of financial technology
              experts who believe in the power of inclusive finance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To revolutionize how people interact with money by providing a
                secure, user-friendly digital wallet that makes financial
                transactions as simple as sending a text message. We believe
                everyone deserves access to modern financial tools, regardless
                of their economic background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To create a world where financial services are universally
                accessible, transparent, and empowering. We envision a future
                where geographical and economic barriers no longer limit access
                to essential financial services, enabling economic growth and
                prosperity for all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              From startup to trusted financial partner
            </p>
          </motion.div>

          <div className="mt-12 space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-foreground">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Our Leadership
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Experienced professionals dedicated to your financial success
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center shadow-card">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
