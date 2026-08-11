import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import StatusBadge, { FeesBadge } from "../../components/admin/StatusBadge.jsx";
import {
  getAdminApplicationById,
  updateAdminApplicationStatus,
  updateAdminApplicationFeesStatus,
  addAdminApplicationNote,
  deleteAdminApplication,
} from "../../lib/api.js";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trash2,
  StickyNote,
  Wallet
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import Button from "../../components/Button.jsx";


const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-charcoal/45">{label}</p>
    <p className="mt-1 text-sm leading-relaxed text-ink">{value || "—"}</p>
  </div>
);

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadApplication = () => {
    setLoading(true);
    setError("");
    getAdminApplicationById(id)
      .then(({ data }) => setApplication(data.data))
      .catch(() => setError("Couldn't load this application."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (status) => {
    setActionLoading(true);
    try {
      const { data } = await updateAdminApplicationStatus(id, status);
      setApplication(data.data);
    } catch {
      setError("Couldn't update status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };
  const handleFeesToggle = async () => {
    setActionLoading(true);
    try {
      const nextStatus = application.feesStatus === "paid" ? "unpaid" : "paid";
      const { data } = await updateAdminApplicationFeesStatus(id, nextStatus);
      setApplication(data.data);
    } catch {
      setError("Couldn't update fees status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setSavingNote(true);
    try {
      const { data } = await addAdminApplicationNote(id, noteText.trim());
      setApplication(data.data);
      setNoteText("");
    } catch {
      setError("Couldn't save your note. Please try again.");
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAdminApplication(id);
      navigate("/admin/applications", { replace: true });
    } catch {
      setError("Couldn't delete this application.");
      setDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <Link
        to="/admin/applications"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-600"
      >
        <ArrowLeft size={15} /> Back to Applications
      </Link>

      {loading ? (
        <div className="mt-8 flex items-center gap-2 text-charcoal/60">
          <Loader2 size={18} className="animate-spin" /> Loading application...
        </div>
      ) : error && !application ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} /> {error}
        </div>
      ) : application ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-stone-dark/60 bg-white p-7 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {application.fullName}
                  </h2>
                  <p className="mt-1 text-sm text-charcoal/60">
                    Submitted {new Date(application.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={application.status} />
                  {application.status === "accepted" && (
                    <FeesBadge feesStatus={application.feesStatus} />
                  )}
                </div>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <Field label="Email" value={application.email} />
                <Field label="Phone" value={application.phone} />
                <Field label="Age" value={application.age} />
                <Field label="City" value={application.city} />
                <Field label="Bar Association" value={application.barAssociation} />
              </div>

              <div className="mt-7 flex flex-col gap-6 border-t border-stone-dark/40 pt-7">
                <Field label="Professional Details" value={application.professionalDetails} />
                <Field label="Experience" value={application.experience} />
                <Field label="Motivation" value={application.motivation} />
                <Field label="Achievements" value={application.achievements} />
              </div>

              <div className="mt-7 grid gap-6 border-t border-stone-dark/40 pt-7 sm:grid-cols-2">
                <Field
                  label="Other Organization"
                  value={application.otherOrganization ? "Yes" : "No"}
                />
                {application.otherOrganization && (
                  <Field label="Organization Details" value={application.organizationDetails} />
                )}
                <Field
                  label="Political / Government Relation"
                  value={application.politicalGovernmentRelation ? "Yes" : "No"}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-xl border border-stone-dark/60 bg-white p-7 shadow-card">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <StickyNote size={18} className="text-gold-700" /> Internal Notes
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                {application.notes?.length ? (
                  application.notes
                    .slice()
                    .reverse()
                    .map((note, i) => (
                      <div key={i} className="rounded-md bg-stone/40 p-4 text-sm">
                        <p className="text-charcoal/85">{note.text}</p>
                        <p className="mt-1.5 text-xs text-charcoal/45">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-charcoal/50">No notes yet.</p>
                )}
              </div>

              <form onSubmit={handleAddNote} className="mt-5 flex flex-col gap-3 sm:flex-row">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={2}
                  placeholder="Add an internal note..."
                  className="w-full rounded-md border border-stone-dark bg-white px-3 py-2 text-sm focus:border-forest"
                />
                <Button type="submit" variant="outline" disabled={savingNote || !noteText.trim()}>
                  {savingNote ? <Loader2 size={15} className="animate-spin" /> : "Add Note"}
                </Button>
              </form>
            </div>
          </div>

          {/* Actions sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-stone-dark/60 bg-white p-6 shadow-card">
              <h3 className="font-display text-base font-semibold text-ink">Actions</h3>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button
                  variant="primary"
                  disabled={actionLoading || application.status === "accepted"}
                  onClick={() => handleStatusChange("accepted")}
                  className="justify-start"
                >
                  <CheckCircle2 size={16} /> Approve
                </Button>
                <Button
                  variant="outline"
                  disabled={actionLoading || application.status === "rejected"}
                  onClick={() => handleStatusChange("rejected")}
                  className="justify-start border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  <XCircle size={16} /> Reject
                </Button>
                <Button
                  variant="ghost"
                  disabled={actionLoading || application.status === "pending"}
                  onClick={() => handleStatusChange("pending")}
                  className="justify-start"
                >
                  <RotateCcw size={16} /> Return to Pending
                </Button>
                {application.status === "accepted" && (
                  <Button
                    variant={application.feesStatus === "paid" ? "outline" : "primary"}
                    disabled={actionLoading}
                    onClick={handleFeesToggle}
                    className="justify-start"
                  >
                    <Wallet size={16} />
                    {application.feesStatus === "paid"
                      ? "Mark Fees Unpaid"
                      : "Mark Fees Paid"}
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="font-display text-base font-semibold text-red-700">Danger Zone</h3>
              <p className="mt-2 text-xs leading-relaxed text-red-700/80">
                Deleting an application permanently removes it and its notes. This cannot be
                undone.
              </p>
              {confirmDelete ? (
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant="primary"
                    disabled={deleting}
                    onClick={handleDelete}
                    className="justify-center bg-red-600 hover:bg-red-700"
                  >
                    {deleting ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      "Confirm Delete"
                    )}
                  </Button>
                  <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setConfirmDelete(true)}
                  className="mt-4 justify-start border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={16} /> Delete Application
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
};

export default ApplicationDetail;
