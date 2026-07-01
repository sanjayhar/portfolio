"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-widest text-sm font-semibold">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Let's Work Together
          </h2>

          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Looking for a modern website, business application, cloud
            deployment, or technical consultation? Feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="text-accent mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-muted-foreground">
                  sanjaiharish0402@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-accent mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-muted-foreground">
                  +91 9360491933
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-accent mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
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
              className="w-full rounded-lg border px-4 py-3 bg-transparent outline-none focus:border-accent"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-lg border px-4 py-3 bg-transparent outline-none focus:border-accent"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border px-4 py-3 bg-transparent outline-none focus:border-accent"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full rounded-lg border px-4 py-3 bg-transparent outline-none resize-none focus:border-accent"
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