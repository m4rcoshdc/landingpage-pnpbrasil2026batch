// Tweaks for Plug and Play São Paulo 2026 landing
// Live edit-mode controls — palette, hero copy, type scale, toggles.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroScale": 1.0,
  "heroHeadline": "Where Brazil's next category leaders",
  "heroAccent": "take off.",
  "heroSub": "A three-month acceleration program for B2B startups in Energy, Fintech, and AI. Exclusive events, curated corporate connections, hands-on mentorship, and access to capital — all in one place.",
  "palette": ["#253B49", "#498DFC"],
  "showMarquee": true,
  "showVideoCard": true,
  "showStats": true,
  "sectionDensity": "comfortable"
}/*EDITMODE-END*/;

// Curated palettes — [background, accent]
const PALETTES = [
  ["#253B49", "#498DFC"],   // current — navy + electric blue
  ["#0E1116", "#FF5C1F"],   // original — ink + orange
  ["#0B1A26", "#3FE0A8"],   // midnight + mint
  ["#1F1B2E", "#A77BFF"],   // plum + violet
  ["#13241F", "#FFD15C"],   // forest + gold
  ["#F4EFE6", "#0E1116"],   // cream + ink (light)
];

function shiftHex(hex, amt) {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  const clip = v => Math.max(0, Math.min(255, Math.round(v + amt)));
  const x = v => clip(v).toString(16).padStart(2,'0');
  return '#' + x(r) + x(g) + x(b);
}
function isLight(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  return (r*299 + g*587 + b*114) / 1000 > 150;
}
function hexToRgb(hex) {
  const h = hex.replace('#','');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function applyPalette([bg, accent]) {
  const root = document.documentElement.style;
  const light = isLight(bg);
  const text = light ? "#0E1116" : "#FBFAFA";
  const textRgb = hexToRgb(text).join(',');
  const accentRgb = hexToRgb(accent).join(',');

  root.setProperty('--bg', bg);
  root.setProperty('--bg-1', shiftHex(bg, light ? -10 : 12));
  root.setProperty('--bg-2', shiftHex(bg, light ? -22 : 26));
  root.setProperty('--bg-3', shiftHex(bg, light ? -32 : 38));
  root.setProperty('--bg-deep', shiftHex(bg, light ? -6 : -14));

  root.setProperty('--text', text);
  root.setProperty('--text-soft', `rgba(${textRgb},.78)`);
  root.setProperty('--muted', `rgba(${textRgb},.58)`);
  root.setProperty('--subtle', `rgba(${textRgb},.42)`);
  root.setProperty('--rule', `rgba(${textRgb},.14)`);
  root.setProperty('--rule-soft', `rgba(${textRgb},.07)`);

  root.setProperty('--accent', accent);
  root.setProperty('--accent-2', shiftHex(accent, 40));
  root.setProperty('--accent-deep', shiftHex(accent, -30));
  root.setProperty('--accent-glow', `rgba(${accentRgb},.22)`);
  root.setProperty('--accent-ink', light ? '#FFFFFF' : '#0a1730');
  root.setProperty('--c-fin', accent);

  // Nav backdrop tint (uses raw rgb of bg w/ alpha)
  const navBg = `rgba(${hexToRgb(bg).join(',')},.78)`;
  document.querySelectorAll('.nav').forEach(n => n.style.background = navBg);

  // Logo: keep white-on-dark; invert for light bg
  document.querySelectorAll('.brand .logo').forEach(l => {
    l.style.filter = light ? 'invert(1)' : '';
  });
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyPalette(t.palette); }, [t.palette]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--hero-scale', t.heroScale);
  }, [t.heroScale]);

  React.useEffect(() => {
    const h = document.getElementById('hero-headline');
    if (!h) return;
    // Rebuild as: <text> <span.accent>accent</span>
    h.innerHTML = '';
    h.appendChild(document.createTextNode(t.heroHeadline + ' '));
    const span = document.createElement('span');
    span.className = 'italic accent';
    span.id = 'hero-accent';
    span.textContent = t.heroAccent;
    h.appendChild(span);
  }, [t.heroHeadline, t.heroAccent]);

  React.useEffect(() => {
    const el = document.querySelector('.hero-sub');
    if (el) el.textContent = t.heroSub;
  }, [t.heroSub]);

  React.useEffect(() => {
    const m = document.querySelector('.marquee');
    if (m) m.style.display = t.showMarquee ? '' : 'none';
  }, [t.showMarquee]);

  React.useEffect(() => {
    const v = document.querySelector('.hero-side');
    if (v) v.style.display = t.showVideoCard ? '' : 'none';
    const g = document.querySelector('.hero-grid');
    if (g) g.style.gridTemplateColumns = t.showVideoCard ? '' : '1fr';
  }, [t.showVideoCard]);

  React.useEffect(() => {
    const s = document.querySelector('[data-screen-label="02 Stats"]');
    if (s) s.style.display = t.showStats ? '' : 'none';
  }, [t.showStats]);

  React.useEffect(() => {
    const map = { tight: '56px', comfortable: '', airy: 'clamp(96px, 11vw, 180px)' };
    document.querySelectorAll('.section').forEach(s => {
      const inline = s.getAttribute('style') || '';
      if (inline.includes('padding-top:0')) return; // skip stats
      if (t.sectionDensity === 'comfortable') {
        s.style.paddingTop = ''; s.style.paddingBottom = '';
      } else {
        s.style.paddingTop = map[t.sectionDensity];
        s.style.paddingBottom = map[t.sectionDensity];
      }
    });
  }, [t.sectionDensity]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero" />
      <TweakSlider label="Headline scale" value={t.heroScale}
                   min={0.6} max={1.6} step={0.05} unit="×"
                   onChange={(v) => setTweak('heroScale', v)} />
      <TweakText  label="Headline" value={t.heroHeadline}
                  onChange={(v) => setTweak('heroHeadline', v)} />
      <TweakText  label="Accent" value={t.heroAccent}
                  onChange={(v) => setTweak('heroAccent', v)} />
      <TweakText  label="Subtitle" value={t.heroSub}
                  onChange={(v) => setTweak('heroSub', v)} />
      <TweakToggle label="Show video card" value={t.showVideoCard}
                   onChange={(v) => setTweak('showVideoCard', v)} />

      <TweakSection label="Palette" />
      <TweakColor label="Theme" value={t.palette} options={PALETTES}
                  onChange={(v) => setTweak('palette', v)} />

      <TweakSection label="Layout" />
      <TweakRadio label="Spacing" value={t.sectionDensity}
                  options={['tight', 'comfortable', 'airy']}
                  onChange={(v) => setTweak('sectionDensity', v)} />
      <TweakToggle label="Show marquee" value={t.showMarquee}
                   onChange={(v) => setTweak('showMarquee', v)} />
      <TweakToggle label="Show stats strip" value={t.showStats}
                   onChange={(v) => setTweak('showStats', v)} />
    </TweaksPanel>
  );
}

const __twkMount = document.createElement('div');
__twkMount.id = '__tweaks-root';
document.body.appendChild(__twkMount);
ReactDOM.createRoot(__twkMount).render(<App />);
