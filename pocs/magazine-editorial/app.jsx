import { useState, useEffect, useRef } from "react";

// ── Global Styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; cursor: none; }
      body { background: #ffffff; -webkit-font-smoothing: antialiased; color: #0a0a0a; }
      a, button { cursor: none; }
      ::selection { background: #ff2d20; color: #ffffff; }

      .nav-link {
        position: relative;
        text-decoration: none;
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 13px;
        font-weight: 400;
        color: #0a0a0a;
        letter-spacing: 0.02em;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: #ff2d20;
        transition: width 0.3s ease;
      }
      .nav-link:hover::after { width: 100%; }

      .social-link {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        color: #6b6b6b;
        text-decoration: none;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        transition: color 0.2s ease;
      }
      .social-link:hover { color: #ffffff; }

      .work-item { overflow: hidden; }
      .work-item img-block { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
      .work-item:hover .img-scale { transform: scale(1.02); }
    `}</style>
  );
}

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    const onOver = (e) => {
      setHovered(!!e.target.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        width: hovered ? 36 : 10,
        height: hovered ? 36 : 10,
        borderRadius: "50%",
        background: hovered ? "transparent" : "#0a0a0a",
        border: hovered ? "1px solid #0a0a0a" : "none",
        transition:
          "width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease",
      }}
    />
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────
function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "20px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(10,10,10,0.06)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 400,
          color: "#0a0a0a",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        KK
      </a>
      <div style={{ display: "flex", gap: 40 }}>
        {["Work", "About", "Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ── Scroll Reveal Wrapper ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Image Placeholder ─────────────────────────────────────────────────────────
function Img({ label, aspect = "4/3", bg = "#e8e4dc", caption }) {
  const [ar1, ar2] = aspect.split("/").map(Number);
  const pct = ((ar2 / ar1) * 100).toFixed(1);
  return (
    <div>
      <div
        style={{
          width: "100%",
          paddingBottom: `${pct}%`,
          position: "relative",
          background: bg,
          overflow: "hidden",
        }}
        className="img-scale"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(10,10,10,0.3)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: "rgba(10,10,10,0.15)",
              letterSpacing: "0.1em",
            }}
          >
            {aspect}
          </div>
        </div>
      </div>
      {caption && (
        <div
          style={{
            paddingTop: 10,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#6b6b6b",
            letterSpacing: "0.1em",
            textAlign: "right",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#f5f3ef",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 48px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Placeholder full-bleed background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#f0ede8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "rgba(10,10,10,0.12)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Hero — Full Bleed Image
        </span>
      </div>

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background:
            "linear-gradient(to bottom, transparent, rgba(240,237,232,0.97))",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal delay={80}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b6b6b",
              marginBottom: 28,
            }}
          >
            Keighley Kodric — Product Designer
          </div>
        </Reveal>

        <Reveal delay={160}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(64px, 9.5vw, 148px)",
              fontWeight: 300,
              color: "#0a0a0a",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              marginBottom: 52,
            }}
          >
            Design
            <br />
            at the edge
            <br />
            <em style={{ fontStyle: "italic" }}>of what's</em>
            <br />
            possible.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "1px solid rgba(10,10,10,0.15)",
              paddingTop: 22,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: "#6b6b6b",
                maxWidth: 400,
                lineHeight: 1.8,
              }}
            >
              30 years of craft — print, web, product, AI. Each medium asked a
              different question. The work is how I answered.
            </p>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#6b6b6b",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Scroll ↓
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Work Section ──────────────────────────────────────────────────────────────
const WORKS = [
  {
    id: "ai",
    title: "AI Experiences",
    category: "Product Design",
    year: "2025",
    aspect: "3/2",
    bg: "#dedad4",
  },
  {
    id: "systems",
    title: "Design Systems",
    category: "Systems",
    year: "2023",
    aspect: "1/1",
    bg: "#e8e4dc",
  },
  {
    id: "mobile",
    title: "Mobile Platform",
    category: "Product",
    year: "2021",
    aspect: "4/3",
    bg: "#eae6de",
  },
  {
    id: "brand",
    title: "Brand Identity",
    category: "Visual",
    year: "2019",
    aspect: "3/4",
    bg: "#e0dbd2",
  },
];

function WorkMeta({ work }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingTop: 12,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            color: "#0a0a0a",
            marginBottom: 3,
          }}
        >
          {work.title}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#6b6b6b",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {work.category}
        </div>
      </div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#6b6b6b",
        }}
      >
        {work.year}
      </div>
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" style={{ padding: "120px 48px", background: "#ffffff" }}>
      <Reveal>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "1px solid #0a0a0a",
            paddingBottom: 16,
            marginBottom: 64,
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 300,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
            }}
          >
            Selected Work
          </h2>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#6b6b6b",
              letterSpacing: "0.15em",
            }}
          >
            04 PROJECTS
          </span>
        </div>
      </Reveal>

      {/* Asymmetric grid: large left, 2 stacked right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.65fr 1fr",
          gap: 32,
          marginBottom: 32,
        }}
      >
        <Reveal>
          <div className="work-item">
            <Img
              label={WORKS[0].title}
              aspect={WORKS[0].aspect}
              bg={WORKS[0].bg}
            />
            <WorkMeta work={WORKS[0]} />
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Reveal delay={100}>
            <div className="work-item">
              <Img
                label={WORKS[1].title}
                aspect={WORKS[1].aspect}
                bg={WORKS[1].bg}
              />
              <WorkMeta work={WORKS[1]} />
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="work-item">
              <Img
                label={WORKS[2].title}
                aspect={WORKS[2].aspect}
                bg={WORKS[2].bg}
              />
              <WorkMeta work={WORKS[2]} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-width horizontal: text left, wide image right */}
      <Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2.6fr",
            gap: 32,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#6b6b6b",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {WORKS[3].category}
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vw, 40px)",
                fontWeight: 300,
                color: "#0a0a0a",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {WORKS[3].title}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#6b6b6b",
              }}
            >
              {WORKS[3].year}
            </div>
          </div>
          <Img label={WORKS[3].title} aspect="21/6" bg={WORKS[3].bg} />
        </div>
      </Reveal>
    </section>
  );
}

// ── Feature / Case Study ──────────────────────────────────────────────────────
function FeatureSection() {
  return (
    <section style={{ background: "#e8e4dc", padding: "120px 0" }}>
      <Reveal>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 48px" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#6b6b6b",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            Featured — AI & Trust
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 300,
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 36,
            }}
          >
            Designing trust in systems that think
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: "#0a0a0a",
              lineHeight: 1.85,
              marginBottom: 20,
            }}
          >
            When AI makes mistakes, what does the interface say? Not how to hide
            failure — how to design for it honestly. Three products. Three
            answers. One through-line.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: "#6b6b6b",
              lineHeight: 1.85,
              marginBottom: 48,
            }}
          >
            The confidence score is low. The model is wrong. The user doesn't
            know what they're looking at. Failure UX is the new edge case — and
            the work I've been doing at the edge of that problem for the past
            two years.
          </p>
          <a
            href="#"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#0a0a0a",
              textDecoration: "none",
              borderBottom: "1px solid #ff2d20",
              paddingBottom: 2,
            }}
          >
            Read case study →
          </a>
        </div>
      </Reveal>

      <Reveal delay={150} style={{ marginTop: 72, padding: "0 48px" }}>
        <Img
          label="AI Trust Framework — Interface Studies"
          aspect="21/7"
          bg="#d8d4cc"
          caption="fig. 01 — trust signal exploration, 2025"
        />
      </Reveal>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "2025", role: "Senior Product Designer", note: "AI-first product" },
  {
    year: "2013",
    role: "Lead Product Designer",
    note: "Design systems at scale",
  },
  { year: "2004", role: "Web Designer", note: "The handcoded era" },
  { year: "2000", role: "Print Designer", note: "Craft before digital" },
  { year: "1993", role: "Curious Tinkerer", note: "Before the title" },
];

function AboutSection() {
  return (
    <section
      id="about"
      style={{ padding: "120px 48px", background: "#ffffff" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px 120px",
          alignItems: "start",
        }}
      >
        <Reveal>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#6b6b6b",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 40,
              }}
            >
              About
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
                color: "#0a0a0a",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 36,
              }}
            >
              30 years of making things for screens
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: "#6b6b6b",
                lineHeight: 1.85,
                marginBottom: 24,
              }}
            >
              Started in print. Moved to web when Flash was still a career
              path. Led design teams through the mobile shift, the
              design-systems era, and now the AI moment.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: "#6b6b6b",
                lineHeight: 1.85,
              }}
            >
              Each platform change asked a different version of the same
              question: what does the interface owe the human on the other side?
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ borderTop: "1px solid #e8e4dc", paddingTop: 24 }}>
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                style={{
                  display: "flex",
                  gap: 32,
                  paddingBottom: i < TIMELINE.length - 1 ? 28 : 0,
                  borderBottom:
                    i < TIMELINE.length - 1 ? "1px solid #e8e4dc" : "none",
                  marginBottom: i < TIMELINE.length - 1 ? 28 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: "#6b6b6b",
                    width: 40,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {t.year}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#0a0a0a",
                      marginBottom: 3,
                    }}
                  >
                    {t.role}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#6b6b6b",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Grid / Craft Section ──────────────────────────────────────────────────────
const CRAFT = [
  {
    label: "Interaction Design",
    cat: "Craft",
    year: "2024",
    aspect: "3/4",
    bg: "#e8e4dc",
  },
  {
    label: "Data Visualisation",
    cat: "Systems",
    year: "2023",
    aspect: "3/2",
    bg: "#dedad4",
  },
  {
    label: "Motion & Prototyping",
    cat: "Method",
    year: "2022",
    aspect: "1/1",
    bg: "#e4e0d8",
  },
];

function GridSection() {
  return (
    <section style={{ padding: "120px 48px", background: "#e8e4dc" }}>
      <Reveal>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "1px solid rgba(10,10,10,0.15)",
            paddingBottom: 16,
            marginBottom: 64,
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 300,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
            }}
          >
            Craft & Method
          </h2>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#6b6b6b",
              letterSpacing: "0.15em",
            }}
          >
            03
          </span>
        </div>
      </Reveal>

      {/* 3-column asymmetric — deliberate size variation */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr 1.2fr",
          gap: 24,
          alignItems: "end",
        }}
      >
        {CRAFT.map((item, i) => (
          <Reveal key={item.label} delay={i * 100}>
            <div className="work-item">
              <Img label={item.label} aspect={item.aspect} bg={item.bg} />
              <div
                style={{
                  paddingTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#0a0a0a",
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#6b6b6b",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.cat}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "#6b6b6b",
                  }}
                >
                  {item.year}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      style={{ padding: "120px 48px 80px", background: "#0a0a0a" }}
    >
      <Reveal>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#6b6b6b",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          Contact
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8.5vw, 116px)",
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            marginBottom: 80,
          }}
        >
          Let's make
          <br />
          something
          <br />
          <em style={{ fontStyle: "italic" }}>worth</em>
          <br />
          looking at.
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <div
          style={{
            borderTop: "1px solid #2a2a2a",
            paddingTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="mailto:hello@keighley.design"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              color: "#ffffff",
              textDecoration: "none",
              borderBottom: "1px solid #ff2d20",
              paddingBottom: 3,
            }}
          >
            hello@keighley.design
          </a>
          <div style={{ display: "flex", gap: 32 }}>
            {["LinkedIn", "Twitter", "Dribbble"].map((l) => (
              <a key={l} href="#" className="social-link">
                {l.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        padding: "20px 48px",
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#3a3a3a",
          letterSpacing: "0.1em",
        }}
      >
        © 2026 Keighley Kodric
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#3a3a3a",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        POC — Magazine Editorial
      </span>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <FeatureSection />
        <AboutSection />
        <GridSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
