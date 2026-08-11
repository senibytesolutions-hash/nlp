import { useEffect, useState } from "react";
import { Megaphone, ArrowRight, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection.jsx";
import Button from "./Button.jsx";
import { getActiveAnnouncements } from "../lib/api.js";

const isInternalLink = (link) => link?.startsWith("/");

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getActiveAnnouncements()
      .then(({ data }) => {
        if (isMounted) setAnnouncements(data.data || []);
      })
      .catch(() => {
        if (isMounted) setAnnouncements([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container-content flex items-center gap-2 text-sm text-charcoal/50">
          <Loader2 size={16} className="animate-spin" /> Loading announcements...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-content flex flex-col gap-5">
        {announcements.length === 0 ? (
          <AnimatedSection className="rounded-xl border border-stone-dark/60 bg-stone/40 p-8 text-center text-sm text-charcoal/55">
            No announcements available.
          </AnimatedSection>
        ) : (
          announcements.map((announcement, i) => (
            <AnimatedSection
              key={announcement._id}
              delay={i * 0.06}
              className="flex flex-col items-start gap-5 rounded-xl border border-gold-200 bg-gold-50 p-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-gold-100 p-3 text-gold-700">
                  <Megaphone size={20} />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    {announcement.title}
                  </p>
                  <p className="mt-1 text-sm text-charcoal/65">{announcement.description}</p>
                </div>
              </div>

              {announcement.ctaText &&
                announcement.ctaLink &&
                (isInternalLink(announcement.ctaLink) ? (
                  <Button to={announcement.ctaLink} variant="primary" className="shrink-0">
                    {announcement.ctaText} <ArrowRight size={15} />
                  </Button>
                ) : (
                  <Button href={announcement.ctaLink} variant="primary" className="shrink-0">
                    {announcement.ctaText} <ArrowRight size={15} />
                  </Button>
                ))}
            </AnimatedSection>
          ))
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
