import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { MotionWrapper } from "@/components/common/motion-wrapper";

export default function Contact() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <MotionWrapper>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Our friendly team is always here to chat.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <MotionWrapper delay={0.2}>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email us</h3>
                  <p className="text-muted-foreground mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:support@cashyo.com" className="text-primary font-medium">support@cashyo.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Visit us</h3>
                  <p className="text-muted-foreground mb-2">Come say hello at our office HQ.</p>
                  <p className="text-foreground">100 Smith Street<br />Collingwood VIC 3066 AU</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call us</h3>
                  <p className="text-muted-foreground mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+1555000000" className="text-primary font-medium">+1 (555) 000-0000</a>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Contact Form */}
          <MotionWrapper delay={0.4}>
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Leave us a message..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
