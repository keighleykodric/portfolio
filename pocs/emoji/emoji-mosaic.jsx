import { useState, useRef, useEffect, useCallback } from "react";

const EMOJI_MAP = [
  // Blacks / very dark
  { emoji: "⬛", r: 20,  g: 20,  b: 20  },
  { emoji: "🖤", r: 32,  g: 28,  b: 34  },
  { emoji: "🌑", r: 45,  g: 42,  b: 48  },

  // Dark grays
  { emoji: "🪨", r: 90,  g: 85,  b: 80  },
  { emoji: "🐘", r: 125, g: 118, b: 122 },

  // Mid / light grays
  { emoji: "🩶", r: 140, g: 138, b: 144 },
  { emoji: "🌫️", r: 158, g: 158, b: 162 },
  { emoji: "☁️", r: 210, g: 215, b: 222 },

  // Whites
  { emoji: "⬜", r: 242, g: 242, b: 242 },
  { emoji: "🤍", r: 248, g: 245, b: 242 },

  // Warm whites / creams
  { emoji: "🥚", r: 242, g: 235, b: 212 },

  // Reds — bright
  { emoji: "🟥", r: 210, g: 48,  b: 48  },
  { emoji: "🍎", r: 188, g: 45,  b: 45  },
  { emoji: "🍓", r: 215, g: 52,  b: 62  },
  { emoji: "❤️", r: 230, g: 65,  b: 85  },

  // Reds — dark
  { emoji: "🌹", r: 195, g: 35,  b: 55  },
  { emoji: "🍒", r: 155, g: 28,  b: 48  },

  // Oranges
  { emoji: "🎃", r: 228, g: 112, b: 28  },
  { emoji: "🟧", r: 235, g: 128, b: 28  },
  { emoji: "🥕", r: 238, g: 128, b: 38  },
  { emoji: "🍊", r: 248, g: 148, b: 50  },
  { emoji: "🦊", r: 215, g: 108, b: 52  },

  // Peach / light orange
  { emoji: "🍑", r: 255, g: 175, b: 130 },

  // Yellows — vivid
  { emoji: "🌻", r: 238, g: 195, b: 38  },
  { emoji: "🟨", r: 240, g: 218, b: 48  },
  { emoji: "⭐", r: 255, g: 222, b: 55  },
  { emoji: "🍌", r: 255, g: 228, b: 75  },
  { emoji: "🍋", r: 255, g: 232, b: 88  },

  // Yellows — muted / golden
  { emoji: "🧀", r: 238, g: 198, b: 80  },
  { emoji: "🌾", r: 200, g: 175, b: 78  },
  { emoji: "🌕", r: 250, g: 215, b: 118 },
  { emoji: "🌙", r: 218, g: 198, b: 128 },

  // Pinks
  { emoji: "🌸", r: 238, g: 158, b: 182 },
  { emoji: "🦩", r: 245, g: 148, b: 168 },
  { emoji: "🩷", r: 240, g: 125, b: 165 },
  { emoji: "🌷", r: 225, g: 95,  b: 125 },
  { emoji: "🌺", r: 218, g: 78,  b: 118 },

  // Browns — light (sandy / tan)
  { emoji: "🦁", r: 210, g: 162, b: 82  },
  { emoji: "🥜", r: 185, g: 138, b: 78  },
  { emoji: "🐿️", r: 168, g: 118, b: 68  },

  // Browns — medium
  { emoji: "🍁", r: 205, g: 85,  b: 38  },
  { emoji: "🍂", r: 185, g: 98,  b: 42  },
  { emoji: "🌰", r: 158, g: 92,  b: 52  },
  { emoji: "🪵", r: 165, g: 108, b: 62  },
  { emoji: "🐻", r: 155, g: 108, b: 72  },

  // Browns — dark
  { emoji: "🟫", r: 128, g: 72,  b: 38  },
  { emoji: "🧱", r: 185, g: 82,  b: 58  },
  { emoji: "🍫", r: 100, g: 55,  b: 28  },

  // Greens — bright / light
  { emoji: "🍏", r: 110, g: 185, b: 78  },
  { emoji: "🟩", r: 68,  g: 185, b: 68  },
  { emoji: "🌱", r: 80,  g: 158, b: 72  },
  { emoji: "🐸", r: 88,  g: 158, b: 68  },
  { emoji: "🍃", r: 78,  g: 158, b: 88  },

  // Greens — medium
  { emoji: "🫑", r: 72,  g: 152, b: 68  },
  { emoji: "🍀", r: 52,  g: 142, b: 62  },
  { emoji: "🌿", r: 48,  g: 128, b: 58  },
  { emoji: "🥦", r: 55,  g: 128, b: 52  },
  { emoji: "🌵", r: 58,  g: 128, b: 68  },

  // Greens — dark
  { emoji: "🌴", r: 42,  g: 112, b: 52  },
  { emoji: "🌲", r: 28,  g: 88,  b: 42  },

  // Teals
  { emoji: "🦎", r: 72,  g: 150, b: 88  },
  { emoji: "🐢", r: 62,  g: 142, b: 98  },

  // Blues — pale / sky
  { emoji: "🫧", r: 188, g: 218, b: 232 },
  { emoji: "🧊", r: 158, g: 208, b: 240 },
  { emoji: "💧", r: 90,  g: 172, b: 218 },

  // Blues — medium
  { emoji: "🌊", r: 38,  g: 138, b: 192 },
  { emoji: "🐟", r: 78,  g: 148, b: 198 },
  { emoji: "🏔️", r: 128, g: 150, b: 178 },
  { emoji: "🌀", r: 48,  g: 128, b: 195 },

  // Blues — vivid / dark
  { emoji: "🟦", r: 48,  g: 118, b: 210 },
  { emoji: "💙", r: 35,  g: 90,  b: 185 },

  // Purples
  { emoji: "🪻", r: 118, g: 72,  b: 152 },
  { emoji: "🔮", r: 128, g: 78,  b: 172 },
  { emoji: "🟪", r: 138, g: 68,  b: 182 },
  { emoji: "💜", r: 148, g: 62,  b: 195 },
  { emoji: "🍇", r: 108, g: 52,  b: 128 },
  { emoji: "🫐", r: 58,  g: 48,  b: 128 },
];

function nearest(r, g, b) {
  let best = EMOJI_MAP[0], bestD = Infinity;
  for (const e of EMOJI_MAP) {
    const dr = r - e.r, dg = g - e.g, db = b - e.b;
    const d = dr*dr + dg*dg*1.5 + db*db;
    if (d < bestD) { bestD = d; best = e; }
  }
  return best.emoji;
}

function makeDemoCanvas() {
  const W = 640, H = 426;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.58);
  sky.addColorStop(0, "#3a7ab8"); sky.addColorStop(1, "#a8d4f0");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.58);
  const gnd = ctx.createLinearGradient(0, H * 0.58, 0, H);
  gnd.addColorStop(0, "#6a9e52"); gnd.addColorStop(1, "#324f28");
  ctx.fillStyle = gnd; ctx.fillRect(0, H * 0.58, W, H);
  ctx.fillStyle = "#f0c828";
  ctx.beginPath(); ctx.arc(W * 0.80, H * 0.18, 34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  [[0.15, 0.12, 38, 18], [0.32, 0.10, 48, 22], [0.50, 0.16, 32, 16]].forEach(([cx, cy, rw, rh]) => {
    ctx.beginPath(); ctx.ellipse(W*cx, H*cy, rw, rh, 0, 0, Math.PI*2); ctx.fill();
  });
  ctx.fillStyle = "#5a3010"; ctx.fillRect(W*0.15, H*0.46, 10, H*0.25);
  ctx.fillStyle = "#1e5c24"; ctx.beginPath(); ctx.arc(W*0.155, H*0.37, 34, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#484848"; ctx.fillRect(W*0.38, H*0.58, W*0.28, H);
  ctx.fillStyle = "#e8e0d0";
  ctx.fillRect(W*0.40, H*0.64, W*0.24, H*0.09);
  ctx.fillStyle = "#b8b0a0"; ctx.fillRect(W*0.40, H*0.64, W*0.24, 4);
  ctx.fillRect(W*0.40, H*0.73, W*0.24, 4);
  ctx.strokeStyle = "#ccc4b4"; ctx.lineWidth = 1;
  for (let i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(W*(0.40 + i*0.048), H*0.64);
    ctx.lineTo(W*(0.40 + i*0.048), H*0.73);
    ctx.stroke();
  }
  return c;
}

export default function EmojiMosaic() {
  const [cols, setCols] = useState(40);
  const [srcCanvas, setSrcCanvas] = useState(null);
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [canvasW, setCanvasW] = useState(0);
  const outputRef = useRef(null);
  const containerRef = useRef(null);
  const fileRef = useRef(null);

  // Track container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const w = Math.floor(entries[0].contentRect.width);
      if (w > 0) setCanvasW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const render = useCallback((src, numCols, displayW) => {
    const out = outputRef.current;
    if (!src || !out || displayW === 0) return;
    const aspectRatio = src.height / src.width;
    const displayH = Math.round(displayW * aspectRatio);
    const numRows = Math.round(aspectRatio * numCols);
    const cellW = src.width / numCols;
    const cellH = src.height / numRows;
    const srcCtx = src.getContext("2d");
    const grid = [];
    for (let row = 0; row < numRows; row++) {
      const line = [];
      for (let col = 0; col < numCols; col++) {
        const x = Math.floor(col * cellW), y = Math.floor(row * cellH);
        const w = Math.max(1, Math.floor(cellW)), h = Math.max(1, Math.floor(cellH));
        const d = srcCtx.getImageData(x, y, w, h).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; n++; }
        line.push(nearest(r/n, g/n, b/n));
      }
      grid.push(line);
    }
    out.width = displayW;
    out.height = displayH;
    const ctx = out.getContext("2d");
    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, displayW, displayH);
    const eW = displayW / numCols;
    const eH = displayH / numRows;
    const fontSize = Math.max(4, Math.min(eW, eH) * 1.1);
    ctx.font = `${fontSize}px serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        ctx.fillText(grid[row][col], (col + 0.5) * eW, (row + 0.5) * eH);
      }
    }
  }, []);

  useEffect(() => {
    const demo = makeDemoCanvas();
    setSrcCanvas(demo);
  }, []);

  useEffect(() => {
    if (srcCanvas && canvasW > 0) render(srcCanvas, cols, canvasW);
  }, [srcCanvas, cols, canvasW, render]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        c.getContext("2d").drawImage(img, 0, 0);
        setSrcCanvas(c);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const out = outputRef.current;
    if (!out) return;
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = "emoji-mosaic.png";
    a.click();
  };

  const handleCopy = () => {
    const out = outputRef.current;
    if (!out) return;
    out.toBlob(blob => {
      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const label = cols <= 20 ? "chunky" : cols <= 60 ? "mosaic" : cols <= 120 ? "detailed" : "photographic";

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#d8d4ca", fontFamily: "'Courier New', monospace" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn { background:transparent; border:1px solid #2e2e2e; color:#d8d4ca;
          font-family:'Courier New',monospace; font-size:10px; letter-spacing:0.14em;
          text-transform:uppercase; padding:7px 14px; cursor:pointer; transition:all 0.12s; white-space:nowrap; }
        .btn:hover { border-color:#d8d4ca; }
        .btn.p { background:#d8d4ca; color:#0d0d0d; border-color:#d8d4ca; }
        .btn.p:hover { background:#b8b4aa; }
        input[type=range] { -webkit-appearance:none; width:100%; height:1px;
          background:#252525; outline:none; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none;
          width:10px; height:10px; background:#d8d4ca; border-radius:0; cursor:pointer; }
      `}</style>

      {/* Sticky controls bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#0d0d0d",
        padding: "12px 0", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "-0.01em", marginRight: 4, whiteSpace: "nowrap" }}>
          EMOJI MOSAIC
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontSize: 9, color: "#484848", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>
            density — {cols} col — {label}
          </div>
          <input type="range" min={8} max={200} value={cols} onChange={e => setCols(Number(e.target.value))} />
        </div>
        <button className="btn" onClick={() => fileRef.current?.click()}>
          {preview ? "swap photo" : "upload photo"}
        </button>
        <button className="btn" onClick={handleCopy}>{copied ? "copied ✓" : "copy img"}</button>
        <button className="btn p" onClick={handleDownload}>download</button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* Full-width canvas */}
      <div ref={containerRef} style={{ width: "100%", position: "relative", background: "#080808" }}>
        <canvas ref={outputRef} style={{ display: "block", width: "100%", height: "auto" }} />
        {preview && (
          <img src={preview} alt="src" style={{
            position: "absolute", bottom: 8, right: 8, height: 48,
            objectFit: "cover", opacity: 0.3, border: "1px solid #333"
          }} />
        )}
      </div>
    </div>
  );
}
