/**
 * The background behind every page: warm aurora glows, a faint star field,
 * and a few floating voxel blocks from the game room. Mountain ridges live
 * on the hero and footer (RidgeBand), not here, so a fixed layer never
 * paints over mid-page cards. Motion stops under prefers-reduced-motion.
 */

const STARS = [
  [4, 28], [16, 36], [41, 32], [63, 40], [96, 30],
  [6, 54], [55, 48], [94, 58],
  [10, 78], [48, 74], [88, 84],
] as const;

const RIDGE_FAR =
  "M0 200V130L80 112L160 128L240 88L330 118L420 70L500 110L590 84L680 122L760 96L850 132L940 90L1030 120L1110 76L1200 130L1280 112L1360 128L1440 88L1530 118L1620 70L1700 110L1790 84L1880 122L1960 96L2050 132L2140 90L2230 120L2310 76L2400 130V200Z";
const RIDGE_NEAR =
  "M0 200V160L90 140L170 152L260 118L350 150L440 104L540 146L620 126L720 158L800 136L900 164L990 120L1080 150L1200 160L1290 140L1370 152L1460 118L1550 150L1640 104L1740 146L1820 126L1920 158L2000 136L2100 164L2190 120L2280 150L2400 160V200Z";

export function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-glow ambient-glow-a" />
      <div className="ambient-glow ambient-glow-b" />
      <div className="ambient-glow ambient-glow-c" />
      <svg className="ambient-stars" viewBox="0 0 100 100" preserveAspectRatio="none">
        {STARS.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 5 === 0 ? 0.28 : 0.18} className={`star star-${index % 3}`} />
        ))}
      </svg>
      <div className="ambient-voxels">
        {[0, 1, 2].map((index) => (
          <svg key={index} className={`voxel voxel-${index}`} viewBox="0 0 24 28">
            <path d="M12 2 22 7v14l-10 5L2 21V7z" fill="#e8611f" fillOpacity="0.55" />
            <path d="M12 2 22 7l-10 5L2 7z" fill="#ffb088" fillOpacity="0.7" />
            <path d="M12 12v14l10-5V7z" fill="#9a3a0f" fillOpacity="0.7" />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** Drifting ridges, absolutely positioned inside one section (hero or footer). */
export function RidgeBand({ className = "" }: { className?: string }) {
  return (
    <div className={`ridge-band ${className}`} aria-hidden="true">
      <svg className="ridge-band-far" viewBox="0 0 2400 200" preserveAspectRatio="none">
        <path d={RIDGE_FAR} />
      </svg>
      <svg className="ridge-band-near" viewBox="0 0 2400 200" preserveAspectRatio="none">
        <path d={RIDGE_NEAR} />
      </svg>
    </div>
  );
}

/** A few voxel blocks scattered inside one section, for variety between sections. */
export function SectionVoxels({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <svg key={index} className={`voxel voxel-section voxel-section-${index}`} viewBox="0 0 24 28">
          <path d="M12 2 22 7v14l-10 5L2 21V7z" fill="#e8611f" fillOpacity="0.4" />
          <path d="M12 2 22 7l-10 5L2 7z" fill="#ffb088" fillOpacity="0.55" />
          <path d="M12 12v14l10-5V7z" fill="#9a3a0f" fillOpacity="0.6" />
        </svg>
      ))}
    </div>
  );
}
