"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Let&apos;s Work Together
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Looking for a modern website, business application, cloud
            deployment, or technical consultation? Feel free to reach out.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 text-accent" size={24} />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  sanjaiharish0402@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 text-accent" size={24} />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">
                  +91 9360491933
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="mt-1 text-accent" size={24} />
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-muted-foreground">
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:border-accent"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:border-accent"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:border-accent"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full resize-none rounded-lg border bg-transparent px-4 py-3 outline-none focus:border-accent"
            />

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-white transition hover:opacity-90"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}