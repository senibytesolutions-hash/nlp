import { useState } from "react";
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactMessage } from "../lib/api.js";
import AnimatedSection from "../components/AnimatedSection.jsx";
import Button from "../components/Button.jsx";

const initialForm = { name: "", email: "", subject: "", message: "" };

const inputClasses =
  "w-full rounded-md border border-stone-dark bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-forest";

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
};

const contactDetails = [
  { icon: MapPin, label: "Address", value: "Lahore, Pakistan" },
  { icon: Phone, label: "Phone", value: "+92 305 1309191" },
  { icon: Mail, label: "Email", value: "nationallawyers@gmail.com" },
];

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerMessage("");

    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerMessage(
        err?.response?.data?.message || "We couldn't send your message. Please try again."
      );
    }
  };

  return (
    <>
      <section className="bg-ink py-20 text-parchment">
        <div className="container-content">
          <span className="eyebrow text-gold-300">Contact Us</span>
          <h1 className="mt-4 text-gold-300 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            We&rsquo;d like to hear from you
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-parchment/70">
            Questions about membership, partnerships, or the program itself &mdash; reach out and
            our team will respond within a few working days.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-content grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <AnimatedSection className="flex flex-col gap-6">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl border border-stone-dark/60 bg-white p-6 shadow-card"
              >
                <div className="rounded-lg bg-forest-50 p-3 text-forest">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-charcoal/50">
                    {label}
                  </p>
                  <p className="mt-1 text-ink">{value}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-stone-dark/60 bg-white p-10 text-center shadow-card">
                <div className="rounded-full bg-forest-50 p-4 text-forest">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="font-display text-2xl font-semibold text-ink">Message sent</h2>
                <p className="text-sm leading-relaxed text-charcoal/70">
                  Thank you for reaching out. We&rsquo;ll get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 rounded-xl border border-stone-dark/60 bg-white p-8 shadow-card"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-ink">
                      Name <span className="text-gold-700">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <span className="flex items-center gap-1.5 text-xs text-red-600">
                        <AlertCircle size={13} /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-ink">
                      Email <span className="text-gold-700">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <span className="flex items-center gap-1.5 text-xs text-red-600">
                        <AlertCircle size={13} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-ink">
                    Subject <span className="text-gold-700">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <span className="flex items-center gap-1.5 text-xs text-red-600">
                      <AlertCircle size={13} /> {errors.subject}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-ink">
                    Message <span className="text-gold-700">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <span className="flex items-center gap-1.5 text-xs text-red-600">
                      <AlertCircle size={13} /> {errors.message}
                    </span>
                  )}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle size={14} /> {serverMessage}
                  </div>
                )}

                <Button type="submit" variant="primary" disabled={status === "submitting"} className="self-start">
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-content overflow-hidden rounded-xl border border-stone-dark/60 shadow-card">
          <iframe
            title="NLP location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.0%2C33.6%2C73.1%2C33.7&layer=mapnik"
            className="h-72 w-full grayscale"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
