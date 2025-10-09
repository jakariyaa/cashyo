"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    name: "Email",
    value: "hello@cashyo.com",
    icon: Mail,
  },
  {
    name: "Phone",
    value: "+1 (555) 123-4567",
    icon: Phone,
  },
  {
    name: "Address",
    value: "123 Financial District, San Francisco, CA 94105",
    icon: MapPin,
  },
  {
    name: "Business Hours",
    value: "Mon-Fri 9AM-6PM PST",
    icon: Clock,
  },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);

    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let's work together
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Whether you're a potential customer, partner, or just curious
              about what we do, we're here to help answer your questions.
            </p>

            <dl className="mt-10 space-y-4 text-base leading-7 text-muted-foreground">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">{item.name}</span>
                      <Icon className="h-7 w-6 text-primary" />
                    </dt>
                    <dd>{item.value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select name="subject" required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales Question</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="press">Press Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="mt-2"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
