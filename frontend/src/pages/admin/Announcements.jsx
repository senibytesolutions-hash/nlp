import { useEffect, useState } from "react";
import {
  Loader2,
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import Button from "../../components/Button.jsx";
import {
  getAdminAnnouncements,
  createAdminAnnouncement,
  updateAdminAnnouncement,
  toggleAdminAnnouncementActive,
  deleteAdminAnnouncement,
} from "../../lib/api.js";

const emptyForm = { title: "", description: "", ctaText: "", ctaLink: "", active: true };

const inputClasses =
  "w-full rounded-md border border-stone-dark bg-white px-4 py-2.5 text-sm focus:border-forest";

const AnnouncementForm = ({ initialValues, onCancel, onSaved }) => {
  const [form, setForm] = useState(initialValues || emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEditing = Boolean(initialValues?._id);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      if (isEditing) {
        await updateAdminAnnouncement(form._id, form);
      } else {
        await createAdminAnnouncement(form);
      }
      onSaved();
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't save this announcement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-stone-dark/60 bg-white p-6 shadow-card"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink">
          {isEditing ? "Edit Announcement" : "New Announcement"}
        </h3>
        <button type="button" onClick={onCancel} className="text-charcoal/50 hover:text-charcoal">
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-ink">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Applications for the 2026 Legislative Cohort are now open"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-ink">Description</label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Short supporting line shown under the title."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink">CTA Text</label>
          <input
            name="ctaText"
            value={form.ctaText}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Apply Now"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink">CTA Link</label>
          <input
            name="ctaLink"
            value={form.ctaLink}
            onChange={handleChange}
            className={inputClasses}
            placeholder="/join"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-charcoal/80">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
          className="h-4 w-4 rounded border-stone-dark text-forest"
        />
        Active (visible on the public site)
      </label>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={13} /> {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? <Loader2 size={15} className="animate-spin" /> : "Save Announcement"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState(null); // null | "create" | announcement object
  const [busyId, setBusyId] = useState(null);

  const loadAnnouncements = () => {
    setLoading(true);
    setError("");
    getAdminAnnouncements()
      .then(({ data }) => setAnnouncements(data.data))
      .catch(() => setError("Couldn't load announcements."))
      .finally(() => setLoading(false));
  };

  useEffect(loadAnnouncements, []);

  const handleSaved = () => {
    setFormMode(null);
    loadAnnouncements();
  };

  const handleToggle = async (id) => {
    setBusyId(id);
    try {
      await toggleAdminAnnouncementActive(id);
      loadAnnouncements();
    } catch {
      setError("Couldn't update that announcement.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement? This cannot be undone.")) return;
    setBusyId(id);
    try {
      await deleteAdminAnnouncement(id);
      loadAnnouncements();
    } catch {
      setError("Couldn't delete that announcement.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout title="Announcements">
      <div className="flex items-center justify-between">
        <p className="text-sm text-charcoal/60">
          Active announcements appear in the announcement banner on the public Home page.
        </p>
        {!formMode && (
          <Button variant="primary" onClick={() => setFormMode("create")}>
            <Plus size={16} /> New Announcement
          </Button>
        )}
      </div>

      {formMode && (
        <div className="mt-6">
          <AnnouncementForm
            initialValues={formMode === "create" ? emptyForm : formMode}
            onCancel={() => setFormMode(null)}
            onSaved={handleSaved}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {loading ? (
          <div className="flex items-center gap-2 text-charcoal/60">
            <Loader2 size={18} className="animate-spin" /> Loading announcements...
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle size={16} /> {error}
          </div>
        ) : announcements.length === 0 ? (
          <p className="rounded-xl border border-stone-dark/60 bg-white p-8 text-sm text-charcoal/60 shadow-card">
            No announcements yet. Create one to show it on the Home page.
          </p>
        ) : (
          announcements.map((a) => (
            <div
              key={a._id}
              className="flex flex-col gap-4 rounded-xl border border-stone-dark/60 bg-white p-6 shadow-card sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{a.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      a.active ? "bg-forest-100 text-forest-700" : "bg-stone-dark/40 text-charcoal/60"
                    }`}
                  >
                    {a.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-charcoal/65">{a.description}</p>
                {a.ctaText && (
                  <p className="mt-2 text-xs text-charcoal/45">
                    CTA: {a.ctaText} &rarr; {a.ctaLink || "—"}
                  </p>
                )}
                <p className="mt-1 text-xs text-charcoal/40">
                  Created {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  disabled={busyId === a._id}
                  onClick={() => handleToggle(a._id)}
                  className="rounded-md p-2 text-charcoal/60 hover:bg-stone/50 hover:text-forest disabled:opacity-40"
                  aria-label="Toggle active status"
                  title="Toggle active"
                >
                  {a.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode(a)}
                  className="rounded-md p-2 text-charcoal/60 hover:bg-stone/50 hover:text-forest"
                  aria-label="Edit announcement"
                  title="Edit"
                >
                  <Pencil size={17} />
                </button>
                <button
                  type="button"
                  disabled={busyId === a._id}
                  onClick={() => handleDelete(a._id)}
                  className="rounded-md p-2 text-charcoal/60 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                  aria-label="Delete announcement"
                  title="Delete"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default Announcements;
