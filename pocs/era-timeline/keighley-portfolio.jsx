import { useState, useEffect, useRef } from "react";

const eras = [
  {
    id: "win95",
    year: "1993",
    range: "1993 — 1999",
    role: "Curious Tinkerer",
    tagline: "Before the job title. Just a kid who couldn't stop taking things apart.",
    skills: ["Problem solving", "Visual curiosity", "Self-directed learning", "Pixel thinking"],
    style: "win95",
    images: [
      { label: "Paint.exe experiments", aspect: "4/3" },
      { label: "Early pixel work", aspect: "1/1" },
    ],
  },
  {
    id: "print",
    year: "2000",
    range: "2000 — 2003",
    role: "Print Designer",
    tagline: "Craft first. Every kerning decision was permanent.",
    skills: ["Grid systems", "Typography", "Colour theory", "Brand identity", "Print production"],
    style: "print",
    images: [
      { label: "Brand identity work", aspect: "4/3" },
      { label: "Print collateral", aspect: "3/4" },
    ],
  },
  {
    id: "web",
    year: "2004",
    range: "2004 — 2012",
    role: "Web Designer",
    tagline: "Tables, floats, and hand-coded everything. Hacks were a feature.",
    skills: ["HTML / CSS", "Information architecture", "Flash", "Cross-browser compat."],
    style: "web",
    images: [
      { label: "Web UI design", aspect: "16/9" },
      { label: "Site design", aspect: "4/3" },
    ],
  },
  {
    id: "react",
    year: "2013",
    range: "2013 — 2024",
    role: "Lead Product Designer",
    tagline: "Systems over screens. Led teams, shipped products, wrote the components.",
    skills: ["React + JS", "Design systems", "Team leadership", "Accessibility", "0-to-1 products"],
    style: "react",
    images: [
      { label: "Design system", aspect: "4/3" },
      { label: "Product work", aspect: "4/3" },
    ],
  },
  {
    id: "ai",
    year: "Now",
    range: "2025 — Present",
    role: "Senior Product Designer",
    tagline: "Designing at the edge of what's possible. The platform shift I've been waiting for.",
    skills: ["AI product design", "Vibe coding", "Trust + failure UX", "Human–AI systems"],
    style: "ai",
    images: [
      { label: "AI experience design", aspect: "4/3" },
      { label: "Speculative work", aspect: "1/1" },
    ],
  },
];

function ImgPlaceholder({ label, aspect, eraStyle }) {
  const palettes = {
    win95: { bg: "#C0C0C0", border: "#888", text: "#000", accent: "#000080" },
    print: { bg: "#E8E0D0", border: "#C8102E", text: "#333", accent: "#C8102E" },
    web:   { bg: "#061066", border: "#00FF41", text: "#00FF41", accent: "#FFD700" },
    react: { bg: "#1A1A2E", border: "#61DAFB44", text: "#61DAFB", accent: "#FF6B6B" },
    ai:    { bg: "#0D0D1A", border: "#A78BFA44", text: "#A78BFA", accent: "#34D399" },
  };
  const p = palettes[eraStyle] || palettes.ai;
  const [ar1, ar2] = aspect.split("/").map(Number);
  const pct = (ar2 / ar1 * 100).toFixed(1);
  return (
    <div style={{ width: "100%", paddingBottom: `${pct}%`, position: "relative", background: p.bg, border: `1px solid ${p.border}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${p.border}33 1px, transparent 1px), linear-gradient(90deg, ${p.border}33 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(to bottom right, transparent calc(50% - 0.5px), ${p.border}55, transparent calc(50% + 0.5px)), linear-gradient(to bottom left, transparent calc(50% - 0.5px), ${p.border}55, transparent calc(50% + 0.5px))` }} />
        <div style={{ position: "relative", zIndex: 1, fontFamily: "monospace", fontSize: 10, color: p.text, opacity: 0.7, textAlign: "center", padding: "3px 8px", background: p.bg + "DD" }}>{label}</div>
        <div style={{ position: "relative", zIndex: 1, fontFamily: "monospace", fontSize: 9, color: p.accent, opacity: 0.4 }}>{aspect}</div>
      </div>
    </div>
  );
}

// ── Nav components, one per era ──────────────────────────────────────────────
function Win95Nav({ eras, current, onSelect }) {
  const bv = (on) => on
    ? { borderTop:"2px solid #555", borderLeft:"2px solid #555", borderBottom:"2px solid #fff", borderRight:"2px solid #fff" }
    : { borderTop:"2px solid #fff", borderLeft:"2px solid #fff", borderBottom:"2px solid #555", borderRight:"2px solid #555" };
  return (
    <div style={{ display:"flex", gap:4, alignItems:"center" }}>
      {eras.map((e,i) => (
        <button key={e.id} onClick={()=>onSelect(i)} style={{ ...bv(current===i), background:"#C0C0C0", padding:"2px 10px", fontFamily:"'Courier New',monospace", fontSize:11, cursor:"pointer", color: current===i?"#000080":"#000", fontWeight: current===i?"bold":"normal" }}>{e.year}</button>
      ))}
    </div>
  );
}
function PrintNav({ eras, current, onSelect }) {
  return (
    <div style={{ display:"flex", gap:20, alignItems:"center" }}>
      {eras.map((e,i) => (
        <button key={e.id} onClick={()=>onSelect(i)} style={{ background:"none", border:"none", borderBottom: current===i?"2px solid #C8102E":"2px solid transparent", cursor:"pointer", fontFamily:"Georgia,serif", fontSize:12, color: current===i?"#C8102E":"#999", fontWeight: current===i?"bold":"normal", paddingBottom:2, letterSpacing:"0.05em" }}>{e.year}</button>
      ))}
    </div>
  );
}
function WebNav({ eras, current, onSelect }) {
  return (
    <div style={{ display:"flex", gap:2, alignItems:"center" }}>
      {eras.map((e,i) => (
        <button key={e.id} onClick={()=>onSelect(i)} style={{ background: current===i?"linear-gradient(180deg,#FFD700,#FFA500)":"linear-gradient(180deg,#4444aa,#222288)", border: current===i?"1px solid #FFA500":"1px solid #6666cc", cursor:"pointer", padding:"3px 10px", fontFamily:"'Courier New',monospace", fontSize:11, color: current===i?"#000":"#aaa", borderRadius:2 }}>{e.year}</button>
      ))}
    </div>
  );
}
function ReactNav({ eras, current, onSelect }) {
  return (
    <div style={{ display:"flex", gap:14, alignItems:"center" }}>
      {eras.map((e,i) => (
        <button key={e.id} onClick={()=>onSelect(i)} style={{ background:"none", border:"none", borderBottom: current===i?"1px solid #61DAFB":"1px solid transparent", cursor:"pointer", fontFamily:"'SF Mono',monospace", fontSize:11, color: current===i?"#61DAFB":"rgba(255,255,255,0.25)", paddingBottom:2 }}>{e.year}</button>
      ))}
    </div>
  );
}
function AiNav({ eras, current, onSelect }) {
  return (
    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
      {eras.map((e,i) => (
        <button key={e.id} onClick={()=>onSelect(i)} style={{ background: current===i?"rgba(167,139,250,0.15)":"transparent", border:`1px solid ${current===i?"rgba(167,139,250,0.5)":"rgba(255,255,255,0.1)"}`, borderRadius:100, cursor:"pointer", padding:"3px 12px", fontFamily:"'Helvetica Neue',sans-serif", fontSize:11, color: current===i?"#A78BFA":"rgba(255,255,255,0.3)", fontWeight:300 }}>{e.year}</button>
      ))}
    </div>
  );
}
const NavComponents = { win95:Win95Nav, print:PrintNav, web:WebNav, react:ReactNav, ai:AiNav };

// ── Screen components ────────────────────────────────────────────────────────
function Win95Screen({ era, active }) {
  const bv = (inset=false) => inset
    ? { borderTop:"2px solid #555", borderLeft:"2px solid #555", borderBottom:"2px solid #fff", borderRight:"2px solid #fff" }
    : { borderTop:"2px solid #fff", borderLeft:"2px solid #fff", borderBottom:"2px solid #555", borderRight:"2px solid #555" };
  return (
    <div style={{ width:"100%", height:"100%", background:"#008080", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ background:"#C0C0C0", borderBottom:"2px solid #555", padding:"4px 12px", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <div style={{ background:"linear-gradient(90deg,#000080,#1084d0)", padding:"2px 12px" }}>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:12, color:"#fff", fontWeight:"bold" }}>⊞ Keighley — Portfolio</span>
        </div>
        <div style={{ flex:1 }} />
        <span style={{ fontFamily:"'Courier New',monospace", fontSize:11 }}>{era.range}</span>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 48px", gap:40, overflow:"hidden" }}>
        <div style={{ flex:"0 0 auto", width:"min(300px,40vw)", ...bv(), background:"#C0C0C0", boxShadow:"4px 4px 0 #000" }}>
          <div style={{ background:"linear-gradient(90deg,#000080,#1084d0)", padding:"3px 6px", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:11 }}>🖥️</span>
            <span style={{ fontFamily:"'Courier New',monospace", fontSize:11, color:"#fff", fontWeight:"bold", flex:1 }}>about.txt</span>
            <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.7)" }}>_ □ ✕</span>
          </div>
          <div style={{ padding:12 }}>
            <div style={{ ...bv(true), background:"#fff", padding:"8px 10px", marginBottom:10 }}>
              <div style={{ fontFamily:"'Courier New',monospace", fontSize:12, color:"#000080", fontWeight:"bold", marginBottom:4 }}>{era.role}</div>
              <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, color:"#444", lineHeight:1.6 }}>{era.tagline}</div>
            </div>
            <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, fontWeight:"bold", marginBottom:5 }}>Skills loaded:</div>
            <div style={{ ...bv(true), background:"#fff" }}>
              {era.skills.map((s,i) => (
                <div key={s} style={{ padding:"3px 8px", fontFamily:"'Courier New',monospace", fontSize:11, borderBottom: i<era.skills.length-1?"1px solid #eee":"none", display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ color:"#000080" }}>▸</span>{s}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12, maxWidth:340 }}>
          {era.images.map(img => <ImgPlaceholder key={img.label} label={img.label} aspect={img.aspect} eraStyle="win95" />)}
        </div>
      </div>
    </div>
  );
}

function PrintScreen({ era, active }) {
  return (
    <div style={{ width:"100%", height:"100%", background:"#F5F0E8", backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(0,0,0,0.03) 27px,rgba(0,0,0,0.03) 28px),repeating-linear-gradient(90deg,transparent,transparent 27px,rgba(0,0,0,0.03) 27px,rgba(0,0,0,0.03) 28px)`, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 48px", overflow:"hidden", position:"relative" }}>
      {[{t:16,l:16,sides:["top","left"]},{t:16,r:16,sides:["top","right"]},{b:16,l:16,sides:["bottom","left"]},{b:16,r:16,sides:["bottom","right"]}].map((m,i)=>(
        <div key={i} style={{ position:"absolute", width:20, height:20, top:m.t, bottom:m.b, left:m.l, right:m.r, borderTop:m.sides.includes("top")?"1px solid #C8102E":"none", borderBottom:m.sides.includes("bottom")?"1px solid #C8102E":"none", borderLeft:m.sides.includes("left")?"1px solid #C8102E":"none", borderRight:m.sides.includes("right")?"1px solid #C8102E":"none" }} />
      ))}
      <div style={{ display:"flex", gap:48, alignItems:"center", maxWidth:900, width:"100%" }}>
        <div style={{ flex:"0 0 auto", maxWidth:300 }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:"#C8102E", marginBottom:12 }}>{era.range}</div>
          <h2 style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:"clamp(28px,4.5vw,52px)", fontWeight:700, color:"#1A1A1A", lineHeight:1, letterSpacing:"-0.03em", marginBottom:8 }}>{era.role}</h2>
          <div style={{ width:48, height:3, background:"#C8102E", marginBottom:8 }} />
          <div style={{ width:"100%", height:1, background:"#003087", marginBottom:16 }} />
          <p style={{ fontFamily:"Georgia,serif", fontSize:13, color:"#555", fontStyle:"italic", lineHeight:1.7, marginBottom:20 }}>{era.tagline}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {era.skills.map((s,i)=>(
              <div key={s} style={{ border:"1px solid #1A1A1A", padding:"4px 10px", fontFamily:"Georgia,serif", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", background: i%3===0?"#C8102E":i%3===1?"#003087":"transparent", color: i%3<2?"#fff":"#1A1A1A" }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {era.images.map(img=><ImgPlaceholder key={img.label} label={img.label} aspect={img.aspect} eraStyle="print" />)}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)", fontFamily:"Georgia,serif", fontSize:9, color:"#bbb", letterSpacing:"0.3em", textTransform:"uppercase" }}>Keighley — Portfolio — Pantone 485C</div>
    </div>
  );
}

function WebScreen({ era, active }) {
  const [blink, setBlink] = useState(true);
  useEffect(()=>{ const t=setInterval(()=>setBlink(b=>!b),530); return ()=>clearInterval(t); },[]);
  return (
    <div style={{ width:"100%", height:"100%", background:"linear-gradient(180deg,#0B1A8E,#04094a)", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)", pointerEvents:"none", zIndex:10 }} />
      <div style={{ background:"#C0C0C0", borderBottom:"2px solid #555", padding:"4px 8px", display:"flex", alignItems:"center", gap:8, flexShrink:0, zIndex:11 }}>
        {["←","→","⟳"].map(b=><div key={b} style={{ width:22, height:20, background:"#C0C0C0", border:"1px solid #888", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:11, cursor:"pointer" }}>{b}</div>)}
        <div style={{ flex:1, background:"#fff", border:"1px inset #888", padding:"1px 8px", fontFamily:"'Courier New',monospace", fontSize:11, color:"#333" }}>http://www.keighley.com/{era.id}/</div>
        <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, color:"#333" }}>IE 6.0</div>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 48px", gap:40, position:"relative", zIndex:1, overflow:"hidden" }}>
        <div style={{ flex:"0 0 auto", maxWidth:280 }}>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, color:"#FFD700", letterSpacing:"0.2em", marginBottom:8 }}>{era.range}</div>
          <h2 style={{ fontFamily:"'Courier New',monospace", fontSize:"clamp(22px,3.5vw,38px)", fontWeight:"bold", color:"#00FF41", textShadow:"0 0 20px rgba(0,255,65,0.4)", marginBottom:8, lineHeight:1.1 }}>{era.role}{blink?"_":" "}</h2>
          <div style={{ width:"100%", height:1, background:"linear-gradient(90deg,#00FF41,transparent)", marginBottom:14 }} />
          <p style={{ fontFamily:"'Courier New',monospace", fontSize:11, color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:18 }}>{era.tagline}</p>
          <div>
            {era.skills.map(s=>(
              <div key={s} style={{ fontFamily:"'Courier New',monospace", fontSize:11, color:"#00FF41", padding:"2px 0", borderBottom:"1px dotted rgba(0,255,65,0.2)" }}>&gt; {s}</div>
            ))}
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10, maxWidth:400 }}>
          {era.images.map(img=>(
            <div key={img.label} style={{ border:"2px solid rgba(0,255,65,0.25)", boxShadow:"0 0 12px rgba(0,255,65,0.08)" }}>
              <ImgPlaceholder label={img.label} aspect={img.aspect} eraStyle="web" />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:52, right:20, fontFamily:"'Courier New',monospace", fontSize:9, color:"rgba(255,255,255,0.15)", zIndex:11 }}>Best viewed 800×600</div>
    </div>
  );
}

function ReactScreen({ era, active }) {
  return (
    <div style={{ width:"100%", height:"100%", background:"#0F0F1A", backgroundImage:"linear-gradient(rgba(97,218,251,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(97,218,251,0.04) 1px,transparent 1px)", backgroundSize:"32px 32px", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 48px", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,#61DAFB33,transparent)" }} />
      <div style={{ display:"flex", gap:40, alignItems:"center", maxWidth:900, width:"100%" }}>
        <div style={{ flex:"0 0 auto", maxWidth:320 }}>
          <div style={{ border:"1px solid rgba(97,218,251,0.2)", borderRadius:8, overflow:"hidden" }}>
            <div style={{ background:"rgba(97,218,251,0.06)", borderBottom:"1px solid rgba(97,218,251,0.15)", padding:"6px 12px", display:"flex", gap:8, alignItems:"center" }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#61DAFB" }} />
              <span style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(97,218,251,0.5)" }}>&lt;Era year="{era.year}" /&gt;</span>
            </div>
            <div style={{ padding:"16px" }}>
              <div style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(97,218,251,0.35)", marginBottom:6 }}>// {era.range}</div>
              <h2 style={{ fontFamily:"'SF Mono',monospace", fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#E0E0E0", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:10 }}>{era.role}</h2>
              <p style={{ fontFamily:"monospace", fontSize:12, color:"#61DAFB", lineHeight:1.6, marginBottom:16 }}>{era.tagline}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {era.skills.map(s=>(
                  <div key={s} style={{ border:"1px solid rgba(97,218,251,0.15)", borderRadius:4, padding:"5px 8px", fontFamily:"monospace", fontSize:10, color:"rgba(224,224,224,0.55)", display:"flex", gap:5, alignItems:"center" }}>
                    <span style={{ color:"#FF6B6B", fontSize:8 }}>▸</span>{s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {era.images.map(img=>(
            <div key={img.label} style={{ border:"1px solid rgba(97,218,251,0.12)", borderRadius:4, overflow:"hidden" }}>
              <ImgPlaceholder label={img.label} aspect={img.aspect} eraStyle="react" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AiScreen({ era, active }) {
  const [typed, setTyped] = useState("");
  const full = era.role;
  useEffect(()=>{
    if(!active){setTyped("");return;}
    let i=0;
    const t=setInterval(()=>{ if(i<=full.length){setTyped(full.slice(0,i));i++;}else clearInterval(t); },55);
    return ()=>clearInterval(t);
  },[active]);
  return (
    <div style={{ width:"100%", height:"100%", background:"#060610", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 48px", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,0.1) 0%,transparent 70%)", top:"-15%", left:"-10%", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(52,211,153,0.07) 0%,transparent 70%)", bottom:"-10%", right:"-5%", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ display:"flex", gap:48, alignItems:"center", maxWidth:900, width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ flex:"0 0 auto", maxWidth:320 }}>
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(167,139,250,0.15)", borderRadius:8, padding:"8px 14px", marginBottom:20, fontFamily:"monospace", fontSize:11, color:"rgba(167,139,250,0.45)", display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ color:"#34D399" }}>→</span> describe designer at {era.year}
          </div>
          <div style={{ fontFamily:"monospace", fontSize:11, color:"rgba(255,255,255,0.18)", letterSpacing:"0.1em", marginBottom:10 }}>{era.range}</div>
          <h2 style={{ fontFamily:"'Helvetica Neue',Helvetica,sans-serif", fontSize:"clamp(26px,4vw,46px)", fontWeight:200, color:"#F0F0FF", letterSpacing:"-0.03em", lineHeight:1, marginBottom:8 }}>
            {typed}<span style={{ animation:"blink 1s infinite", opacity:0.4 }}>|</span>
          </h2>
          <div style={{ width:32, height:1, background:"linear-gradient(90deg,#A78BFA,transparent)", marginBottom:16 }} />
          <p style={{ fontFamily:"'Helvetica Neue',sans-serif", fontWeight:300, fontSize:13, color:"rgba(240,240,255,0.45)", lineHeight:1.7, marginBottom:24 }}>{era.tagline}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {era.skills.map((s,i)=>(
              <div key={s} style={{ padding:"5px 12px", borderRadius:100, border:`1px solid ${i%2===0?"rgba(167,139,250,0.3)":"rgba(52,211,153,0.25)"}`, fontFamily:"'Helvetica Neue',sans-serif", fontSize:11, fontWeight:300, color: i%2===0?"#A78BFA":"#34D399" }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>
          {era.images.map(img=>(
            <div key={img.label} style={{ border:"1px solid rgba(167,139,250,0.12)", borderRadius:8, overflow:"hidden" }}>
              <ImgPlaceholder label={img.label} aspect={img.aspect} eraStyle="ai" />
            </div>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:4 }}>
            <div style={{ flex:1, background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.3)", borderRadius:8, padding:"11px 16px", fontFamily:"'Helvetica Neue',sans-serif", fontSize:12, fontWeight:300, color:"#A78BFA", cursor:"pointer", textAlign:"center" }}>View Case Studies →</div>
            <div style={{ flex:1, border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"11px 16px", fontFamily:"'Helvetica Neue',sans-serif", fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.25)", cursor:"pointer", textAlign:"center" }}>Get in Touch</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ScreenComponents = { win95:Win95Screen, print:PrintScreen, web:WebScreen, react:ReactScreen, ai:AiScreen };

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState(eras.length - 1);
  const screensRef = useRef([]);
  const scrollingRef = useRef(false);

  useEffect(() => {
    screensRef.current[eras.length - 1]?.scrollIntoView({ behavior: "instant" });
  }, []);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(eras.length - 1, idx));
    setCurrent(clamped);
    screensRef.current[clamped]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (scrollingRef.current) return;
      scrollingRef.current = true;
      goTo(current + (e.deltaY > 0 ? -1 : 1));
      setTimeout(() => { scrollingRef.current = false; }, 900);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") goTo(current - 1);
      if (e.key === "ArrowUp") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const era = eras[current];
  const NavComp = NavComponents[era.style];

  const navBg = {
    win95: "#C0C0C0",
    print: "rgba(245,240,232,0.95)",
    web: "#C0C0C0",
    react: "rgba(15,15,26,0.9)",
    ai: "rgba(6,6,16,0.88)",
  }[era.style];

  const navBorder = {
    win95: "2px solid #fff",
    print: "1px solid rgba(0,0,0,0.08)",
    web: "2px solid #fff",
    react: "1px solid rgba(97,218,251,0.1)",
    ai: "1px solid rgba(255,255,255,0.06)",
  }[era.style];

  const arrowColor = {
    win95: "#000", print: "#C8102E", web: "#000",
    react: "rgba(255,255,255,0.35)", ai: "rgba(255,255,255,0.3)",
  }[era.style];

  const countColor = {
    win95: "#666", print: "#bbb", web: "#666",
    react: "rgba(255,255,255,0.2)", ai: "rgba(255,255,255,0.18)",
  }[era.style];

  return (
    <div style={{ width:"100vw", height:"100vh", overflow:"hidden", position:"relative", background:"#000" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        *{box-sizing:border-box;margin:0;padding:0;}
        button{outline:none;font-family:inherit;}
      `}</style>

      {/* Screens stack */}
      <div style={{ width:"100%", height:"100%", overflow:"hidden" }}>
        {eras.map((e, i) => {
          const SC = ScreenComponents[e.style];
          return (
            <div
              key={e.id}
              ref={el => screensRef.current[i] = el}
              style={{ width:"100%", height:"100vh" }}
            >
              <SC era={e} active={current === i} />
            </div>
          );
        })}
      </div>

      {/* Bottom nav bar */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        padding:"8px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        zIndex:200,
        background: navBg,
        backdropFilter: era.style !== "win95" && era.style !== "web" ? "blur(16px)" : "none",
        borderTop: navBorder,
        transition:"background 0.35s, border-color 0.35s",
      }}>
        <NavComp eras={eras} current={current} onSelect={goTo} />
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {current > 0 && <button onClick={()=>goTo(current-1)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, color:arrowColor, lineHeight:1 }}>↑</button>}
          {current < eras.length-1 && <button onClick={()=>goTo(current+1)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, color:arrowColor, lineHeight:1 }}>↓</button>}
          <span style={{ fontFamily:"monospace", fontSize:10, color:countColor }}>{current+1}/{eras.length}</span>
        </div>
      </div>
    </div>
  );
}
