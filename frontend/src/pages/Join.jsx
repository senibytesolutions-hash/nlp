import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitApplication } from "../lib/api.js";
import AnimatedSection from "../components/AnimatedSection.jsx";
import Button from "../components/Button.jsx";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  city: "",
  barAssociation: "",
  professionalDetails: "",
  experience: "",
  motivation: "",
  otherOrganization: false,
  organizationDetails: "",
  achievements: "",
  politicalGovernmentRelation: false,
};

const validate = (form) => {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  if (!form.age) {
    errors.age = "Age is required.";
  } else if (Number(form.age) < 18 || Number(form.age) > 100) {
    errors.age = "Age must be between 18 and 100.";
  }
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.barAssociation.trim()) errors.barAssociation = "Bar association is required.";
  if (!form.professionalDetails.trim())
    errors.professionalDetails = "Please share your professional details.";
  if (!form.experience.trim()) errors.experience = "Please describe your experience.";
  if (!form.motivation.trim()) errors.motivation = "Please share your motivation.";
  if (form.otherOrganization && !form.organizationDetails.trim())
    errors.organizationDetails = "Please provide details of the other organization.";

  return errors;
};

const inputClasses =
  "w-full rounded-md border border-stone-dark bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-forest";

const labelClasses = "text-sm font-medium text-ink";
const errorClasses = "flex items-center gap-1.5 text-xs text-red-600";

const Field = ({ label, htmlFor, error, children, required = true }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={htmlFor} className={labelClasses}>
      {label} {required && <span className="text-gold-700">*</span>}
    </label>
    {children}
    {error && (
      <span className={errorClasses}>
        <AlertCircle size={13} /> {error}
      </span>
    )}
  </div>
);

const Join = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
      await submitApplication({ ...form, age: Number(form.age) });
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerMessage(
        err?.response?.data?.message ||
          "We couldn't submit your application. Please check your connection and try again."
      );
    }
  };

  if (status === "success") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-parchment py-24">
        <AnimatedSection className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <div className="rounded-full bg-forest-50 p-4 text-forest">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="font-display text-3xl font-semibold text-ink">Application received</h1>
          <p className="leading-relaxed text-charcoal/70">
            Thank you for applying to National Lawyers Parliament. Our team will review your
            application and reach out to the email address you provided.
          </p>
          <Button onClick={() => setStatus("idle")} variant="outline">
            Submit Another Application
          </Button>
        </AnimatedSection>
      </section>
    );
  }

  return (
    <>
      <section className="bg-ink py-20 text-parchment">
        <div className="container-content">
          <span className="eyebrow text-gold-300">Join NLP</span>
          <h1 className="mt-4 text-gold-300 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Apply for membership
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-parchment/70">
            Membership is open to young lawyers, law graduates, and experienced practitioners who
            want to engage seriously with legislative process. Applications are reviewed on a
            rolling basis.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-content max-w-3xl">
          <AnimatedSection
            as="form"
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 rounded-xl border border-stone-dark/60 bg-white p-6 shadow-card sm:p-10"
          >
            {/* Personal details */}
            <fieldset className="flex flex-col gap-6">
              <legend className="font-display text-lg font-semibold text-ink">
                Personal Details
              </legend>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. Ayesha Raza"
                  />
                </Field>
                <Field label="Email Address" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="+92 3XX XXXXXXX"
                  />
                </Field>
                <Field label="Age" htmlFor="age" error={errors.age}>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    max="100"
                    value={form.age}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. 26"
                  />
                </Field>
                <Field label="City" htmlFor="city" error={errors.city}>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. Lahore"
                  />
                </Field>
                <Field label="Bar Association" htmlFor="barAssociation" error={errors.barAssociation}>
                  <input
                    id="barAssociation"
                    name="barAssociation"
                    type="text"
                    value={form.barAssociation}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. Lahore High Court Bar Association"
                  />
                </Field>
              </div>
            </fieldset>

            {/* Professional background */}
            <fieldset className="flex flex-col gap-6">
              <legend className="font-display text-lg font-semibold text-ink">
                Professional Background
              </legend>
              <Field
                label="Professional Details"
                htmlFor="professionalDetails"
                error={errors.professionalDetails}
              >
                <textarea
                  id="professionalDetails"
                  name="professionalDetails"
                  rows={4}
                  value={form.professionalDetails}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Current role, area of practice, and where you're based professionally."
                />
              </Field>
              <Field label="Experience" htmlFor="experience" error={errors.experience}>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  value={form.experience}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Relevant legal, legislative, or advocacy experience."
                />
              </Field>
              <Field label="Motivation" htmlFor="motivation" error={errors.motivation}>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  value={form.motivation}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Why do you want to join National Lawyers Parliament?"
                />
              </Field>
              <Field
                label="Notable Achievements"
                htmlFor="achievements"
                error={errors.achievements}
                required={false}
              >
                <textarea
                  id="achievements"
                  name="achievements"
                  rows={3}
                  value={form.achievements}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Optional — publications, awards, notable matters, etc."
                />
              </Field>
            </fieldset>

            {/* Affiliations */}
            <fieldset className="flex flex-col gap-6">
              <legend className="font-display text-lg font-semibold text-ink">Affiliations</legend>

              <div className="flex items-start gap-3">
                <input
                  id="otherOrganization"
                  name="otherOrganization"
                  type="checkbox"
                  checked={form.otherOrganization}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-stone-dark text-forest"
                />
                <label htmlFor="otherOrganization" className="text-sm text-charcoal/80">
                  I am currently affiliated with another organization, society, or bar body.
                </label>
              </div>

              {form.otherOrganization && (
                <Field
                  label="Organization Details"
                  htmlFor="organizationDetails"
                  error={errors.organizationDetails}
                >
                  <textarea
                    id="organizationDetails"
                    name="organizationDetails"
                    rows={3}
                    value={form.organizationDetails}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Name of the organization and your role in it."
                  />
                </Field>
              )}

              <div className="flex items-start gap-3">
                <input
                  id="politicalGovernmentRelation"
                  name="politicalGovernmentRelation"
                  type="checkbox"
                  checked={form.politicalGovernmentRelation}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-stone-dark text-forest"
                />
                <label htmlFor="politicalGovernmentRelation" className="text-sm text-charcoal/80">
                  I currently hold, or have held, a political party position or government office.
                </label>
              </div>
            </fieldset>

            {status === "error" && (
              <div className={errorClasses}>
                <AlertCircle size={14} /> {serverMessage}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={status === "submitting"}
              className="self-start"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Join;
