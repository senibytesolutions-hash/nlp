import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import Card from "../../components/Card.jsx";
import AnimatedSection from "../../components/AnimatedSection.jsx";
import { getAdminApplicationStats } from "../../lib/api.js";

const statCards = [
  { key: "total", label: "Total Applications", icon: FileText, tone: "text-forest bg-forest-50" },
  { key: "pending", label: "Pending Applications", icon: Clock, tone: "text-gold-700 bg-gold-50" },
  { key: "accepted", label: "Approved Applications", icon: CheckCircle2, tone: "text-forest bg-forest-50" },
  { key: "rejected", label: "Rejected Applications", icon: XCircle, tone: "text-red-600 bg-red-50" },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getAdminApplicationStats()
      .then(({ data }) => {
        if (isMounted) setStats(data.data);
      })
      .catch(() => {
        if (isMounted) setError("Couldn't load dashboard stats.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center gap-2 text-charcoal/60">
          <Loader2 size={18} className="animate-spin" /> Loading stats...
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} /> {error}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ key, label, icon: Icon, tone }, i) => (
            <AnimatedSection key={key} delay={i * 0.06}>
              <Card>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${tone}`}>
                  <Icon size={20} />
                </div>
                <p className="mt-5 font-display text-3xl font-semibold text-ink">
                  {stats?.[key] ?? 0}
                </p>
                <p className="mt-1 text-sm text-charcoal/60">{label}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
