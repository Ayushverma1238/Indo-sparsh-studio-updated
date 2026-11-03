/**
 * Stylised mockups for the "finished" side of each showcase. Everything is
 * built from HTML and CSS, so there are no image downloads and the mockup
 * stays crisp at any size. Colours come from the palette CSS variables set on
 * the showcase root (--a, --b, --c).
 */

export function BrowserFrame({ url, children }) {
  return (
    <div className="mk-browser">
      <div className="mk-chrome">
        <i />
        <i />
        <i />
        <span className="mk-url">{url}</span>
      </div>
      <div className="mk-page">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }) {
  return (
    <div className="mk-phone-wrap">
      <div className="mk-phone">
        <div className="mk-notch" />
        {children}
      </div>
    </div>
  );
}

export function LandingSite({ copy }) {
  return (
    <div className="mk-site">
      <div className="mk-site-nav">
        <div className="mk-logo">
          <span className="mk-logo-dot" />
          {copy.brand}
        </div>
        <div className="mk-links">
          <span>Services</span>
          <span>Work</span>
          <span>Pricing</span>
          <span>Contact</span>
        </div>
        <span className="mk-btn">{copy.cta}</span>
      </div>

      <div className="mk-hero">
        <div className="mk-h1">
          {copy.headline} <em>{copy.accent}</em>
        </div>
        <p className="mk-sub">{copy.sub}</p>
        <div className="mk-cta-row">
          <span className="mk-btn">{copy.cta}</span>
          <span className="mk-ghost">View our work</span>
        </div>
        <div className="mk-float">
          <span className="mk-muted">Enquiries this month</span>
          <div className="mk-minibars">
            {[40, 62, 48, 80, 66, 92].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="mk-grid3">
        {copy.features.map((f) => (
          <div className="mk-card" key={f.t}>
            <div className="mk-icon" />
            <b>{f.t}</b>
            <p>{f.d}</p>
          </div>
        ))}
      </div>

      <div className="mk-foot">
        <span>© {copy.brand}</span>
        <span>Built for speed</span>
      </div>
    </div>
  );
}

export function ListingSite({ copy }) {
  return (
    <div className="mk-site mk-listing">
      <div className="mk-banner" />
      <div className="mk-profile">
        <div className="mk-avatar">{copy.initial}</div>
        <div>
          <div className="mk-name">{copy.brand}</div>
          <div className="mk-cat">{copy.category}</div>
          <div className="mk-stars">★★★★★ <span className="mk-muted">Verified profile</span></div>
        </div>
      </div>
      <div className="mk-actions">
        {copy.actions.map((a) => (
          <span className="mk-chip" key={a}>
            {a}
          </span>
        ))}
      </div>
      <div className="mk-info">
        {copy.info.map(([label, value]) => (
          <div className="mk-row" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <div className="mk-map">
        <span className="mk-pin" />
      </div>
    </div>
  );
}

export function Dashboard({ mock }) {
  if (mock.variant === "table") {
    return (
      <div className="mk-dash">
        <div className="mk-dash-head">
          <b>{mock.title}</b>
          <span className="mk-tag">Sample data</span>
        </div>
        <div className="mk-kpis">
          {mock.kpis.map((k) => (
            <div className="mk-kpi" key={k.label}>
              <span>{k.label}</span>
              <b>{k.value}</b>
            </div>
          ))}
        </div>
        <div className="mk-table">
          {mock.rows.map(([name, city, status]) => (
            <div className="mk-trow" key={name}>
              <span className="mk-tname">{name}</span>
              <span className="mk-muted">{city}</span>
              <span className={`mk-pill ${status === "Verified" ? "ok" : ""}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mk-dash">
      <div className="mk-dash-head">
        <b>{mock.title}</b>
        <span className="mk-tag">Sample data</span>
      </div>
      <div className="mk-kpis">
        {mock.kpis.map((k) => (
          <div className="mk-kpi" key={k.label}>
            <span>{k.label}</span>
            <b>{k.value}</b>
          </div>
        ))}
      </div>
      <svg className="mk-spark" viewBox="0 0 280 90" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`mk-fill-${mock.variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--a)" }} stopOpacity="0.35" />
            <stop offset="1" style={{ stopColor: "var(--a)" }} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,78 L40,64 L80,70 L120,44 L160,50 L200,26 L240,32 L280,10 L280,90 L0,90 Z"
          fill={`url(#mk-fill-${mock.variant})`}
        />
        <path
          d="M0,78 L40,64 L80,70 L120,44 L160,50 L200,26 L240,32 L280,10"
          fill="none"
          style={{ stroke: "var(--a)" }}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mk-chart">
        {mock.bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function AppScreen({ copy, design = false }) {
  return (
    <div className={`mk-screen ${design ? "is-design" : ""}`}>
      <div className="mk-app-head">
        <div>
          <span className="mk-muted">{copy.greeting}</span>
          <b>{copy.name}</b>
        </div>
        <span className="mk-avatar sm">{copy.initial}</span>
      </div>
      <div className="mk-search">{copy.search}</div>
      <div className="mk-hcards">
        {copy.cards.map((c, i) => (
          <div className={`mk-hcard hc${i}`} key={c}>
            <span>{c}</span>
          </div>
        ))}
      </div>
      <div className="mk-list">
        {copy.items.map((item) => (
          <div className="mk-item" key={item}>
            <span className="mk-item-ico" />
            <div className="mk-item-txt">
              <b>{item}</b>
              <i />
            </div>
          </div>
        ))}
      </div>
      <div className="mk-tabs">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i === 0 ? "on" : ""} />
        ))}
      </div>
      {design && (
        <div className="mk-spec">
          <span>16 / 24</span>
          <span>#22d3ee</span>
          <span>8pt grid</span>
        </div>
      )}
    </div>
  );
}

export function FeedScreen({ copy }) {
  return (
    <div className="mk-screen mk-feed">
      <div className="mk-feed-head">
        <b>{copy.handle}</b>
        <span className="mk-muted">···</span>
      </div>
      <div className="mk-stories">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="mk-story" />
        ))}
      </div>
      <div className="mk-tiles">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={`mk-tile t${i % 4}`} />
        ))}
      </div>
      <div className="mk-post-meta">
        <span className="mk-heart">♥</span>
        <span className="mk-muted">{copy.likes} likes</span>
      </div>
      <div className="mk-caption">
        <b>{copy.handle}</b> {copy.caption}
      </div>
      <div className="mk-badge">{copy.badge}</div>
    </div>
  );
}

export function Poster({ copy }) {
  return (
    <div className="mk-poster">
      <span className="mk-orb" />
      <span className="mk-kicker">{copy.kicker}</span>
      <div className="mk-poster-title">{copy.title}</div>
      <div className="mk-poster-sub">{copy.sub}</div>
      <span className="mk-btn big">{copy.cta}</span>
      <div className="mk-poster-foot">{copy.brand}</div>
    </div>
  );
}

export function BrandBoard({ copy, palette }) {
  return (
    <div className="mk-brand">
      <div className="mk-brand-logo">
        <span className="mk-logo-mark" />
        <b>{copy.brand}</b>
      </div>
      <div className="mk-swatches">
        {palette.map((hex) => (
          <div className="mk-swatch" key={hex}>
            <span style={{ background: hex }} />
            <small>{hex}</small>
          </div>
        ))}
      </div>
      <div className="mk-type">
        <b>Aa</b>
        <div>
          <span>Space Grotesk</span>
          <span className="mk-muted">Inter</span>
        </div>
      </div>
      <div className="mk-biz">
        <b>{copy.brand}</b>
        <span className="mk-muted">{copy.tagline}</span>
      </div>
    </div>
  );
}

/** A written document: a title and numbered sections with text lines. */
export function DocumentSheet({ copy }) {
  return (
    <div className="mk-doc">
      <div className="mk-doc-head">
        <span className="mk-doc-mark" />
        {copy.brand}
      </div>
      <div className="mk-doc-title">{copy.title}</div>
      {copy.sections.map((section, i) => (
        <div className="mk-doc-sec" key={section}>
          <b>{`${String(i + 1).padStart(2, "0")}  ${section}`}</b>
          <i />
          <i />
          <i className="short" />
        </div>
      ))}
    </div>
  );
}
