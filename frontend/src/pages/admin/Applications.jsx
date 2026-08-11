import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getAdminApplications } from "../../lib/api.js";
import StatusBadge, { FeesBadge } from "../../components/admin/StatusBadge.jsx";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];
const feesOptions = [
  { value: "all", label: "All Fees" },
  { value: "unpaid", label: "Fees Unpaid" },
  { value: "paid", label: "Fees Paid" },
];
const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feesStatus, setFeesStatus] = useState("all");

  // Debounce search input so we don't fire a request on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, feesStatus]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    getAdminApplications({ search: debouncedSearch, status, feesStatus, page, limit: 10 })
      .then(({ data }) => {
        if (!isMounted) return;
        setApplications(data.data);
        setPagination(data.pagination);
      })
      .catch(() => {
        if (isMounted) setError("Couldn't load applications.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch, status,feesStatus, page]);

  return (
    <AdminLayout title="Applications">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, city..."
            className="w-full rounded-md border border-stone-dark bg-white py-2.5 pl-9 pr-3 text-sm focus:border-forest"
          />
        </div>
      <div className="flex gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-stone-dark bg-white px-3 py-2.5 text-sm focus:border-forest sm:w-52"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={feesStatus}
          onChange={(e) => setFeesStatus(e.target.value)}
          className="rounded-md border border-stone-dark bg-white px-3 py-2.5 text-sm focus:border-forest sm:w-52"
        >
          {feesOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-dark/60 bg-white shadow-card">
        {loading ? (
          <div className="flex items-center gap-2 p-8 text-charcoal/60">
            <Loader2 size={18} className="animate-spin" /> Loading applications...
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 p-8 text-sm text-red-600">
            <AlertCircle size={16} /> {error}
          </div>
        ) : applications.length === 0 ? (
          <p className="p-8 text-sm text-charcoal/60">No applications match your filters.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-stone-dark/60 bg-stone/40 text-xs uppercase tracking-wide text-charcoal/50">
                  <tr>
                    <th className="px-5 py-3 font-medium">Applicant</th>
                    <th className="px-5 py-3 font-medium">City</th>
                    <th className="px-5 py-3 font-medium">Bar Association</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Fees</th>
                    <th className="px-5 py-3 font-medium">Submitted</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="border-b border-stone-dark/40 last:border-0 hover:bg-stone/30">
                      <td className="px-5 py-4">
                        <p className="font-medium text-ink">{app.fullName}</p>
                        <p className="text-xs text-charcoal/55">{app.email}</p>
                      </td>
                      <td className="px-5 py-4 text-charcoal/75">{app.city}</td>
                      <td className="px-5 py-4 text-charcoal/75">{app.barAssociation}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-5 py-4">
                        {app.status === "accepted" ? (
                          <FeesBadge feesStatus={app.feesStatus} />
                        ) : (
                          <span className="text-xs text-charcoal/40">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-charcoal/60">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/admin/applications/${app._id}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:text-forest-600"
                        >
                          View <ArrowUpRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-stone-dark/50 px-5 py-4">
                <p className="text-xs text-charcoal/55">
                  Page {pagination.page} of {pagination.totalPages} &middot; {pagination.total} total
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="inline-flex items-center gap-1 rounded-md border border-stone-dark px-3 py-1.5 text-xs font-medium text-charcoal/70 disabled:opacity-40"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  <button
                    type="button"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    className="inline-flex items-center gap-1 rounded-md border border-stone-dark px-3 py-1.5 text-xs font-medium text-charcoal/70 disabled:opacity-40"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Applications;
