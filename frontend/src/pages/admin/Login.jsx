import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Loader2, AlertCircle, LogIn } from "lucide-react";
import logo from "../../assets/nlp-logo.jpeg";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button.jsx";
import AnimatedSection from "../../components/AnimatedSection.jsx";

const inputClasses =
  "w-full rounded-md border border-stone-dark bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-forest";

const AdminLogin = () => {
  const { login, isAuthenticated, checkingSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!checkingSession && isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await login(form.email.trim(), form.password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <AnimatedSection className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={logo} alt="NLP crest" className="h-14 w-14 rounded-full object-cover" />
          <h1 className="font-display text-2xl font-semibold text-parchment">Admin Sign In</h1>
          <p className="text-sm text-parchment/55">National Lawyers Parliament control panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 flex flex-col gap-5 rounded-xl border border-parchment/10 bg-parchment p-7 shadow-card"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="admin@nlp.org"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={inputClasses}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle size={13} /> {error}
            </div>
          )}

          <Button type="submit" variant="primary" disabled={submitting} className="mt-1 w-full">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in...
              </>
            ) : (
              <>
                <LogIn size={16} /> Sign In
              </>
            )}
          </Button>
        </form>
      </AnimatedSection>
    </div>
  );
};

export default AdminLogin;
