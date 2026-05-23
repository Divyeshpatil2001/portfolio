import { useEffect, useRef, useState, useCallback } from 'react';
import './ScrollTerminal.css';

const TERMINAL_STEPS = [
  { type: 'command', text: 'patil connect --init' },
  { type: 'output',  text: '[SUCCESS] Establishing secure channels...', color: '#00ffd1' },
  { type: 'output',  text: '📧  Email:    patildivyesh861@gmail.com' },
  { type: 'output',  text: '🐙  GitHub:   github.com/Divyeshpatil2001' },
  { type: 'output',  text: '💼  LinkedIn: linkedin.com/in/divyesh-patil' },
  { type: 'blank' },
  { type: 'command', text: 'patil inspect --category stack' },
  { type: 'output',  text: '[SUCCESS] Scanning stack info...', color: '#00ffd1' },
  { type: 'output',  text: '⚛️   Frontend:  React · TypeScript · HTML/CSS · React Native' },
  { type: 'output',  text: '🐍  Backend:   Python · Django · FastAPI · Node.js' },
  { type: 'output',  text: '🗄️   Database:  PostgreSQL · MongoDB · Redis' },
  { type: 'output',  text: '☁️   Cloud:     Docker · AWS · Git' },
  { type: 'blank' },
  { type: 'command', text: 'patil inspect --category biography' },
  { type: 'output',  text: '[SUCCESS] Loading profile...', color: '#00ffd1' },
  { type: 'output',  text: '👤  Name:      Divyesh Patil' },
  { type: 'output',  text: '📍  Location:  India' },
  { type: 'output',  text: '🎓  CGPA:      8.3 / 10' },
  { type: 'output',  text: '💡  Role:      Full Stack Software Engineer' },
  { type: 'blank' },
  { type: 'command', text: 'patil inspect --category projects' },
  { type: 'output',  text: '[SUCCESS] Fetching projects...', color: '#00ffd1' },
  { type: 'output',  text: '🚀  15+ projects shipped to production' },
  { type: 'output',  text: '📱  Apps live on App Store & Play Store' },
  { type: 'output',  text: '🤖  AI/ML integrations & agentic platforms' },
  { type: 'blank' },
  { type: 'command', text: 'patil status' },
  { type: 'output',  text: '🟢  AVAILABLE — Open to new opportunities', color: '#00ffd1' },
];

// How many px of scroll travel reveals each new step
const SCROLL_PER_STEP = 120;
const TOTAL_SCROLL    = TERMINAL_STEPS.length * SCROLL_PER_STEP;

/* ── Typewriter ── */
function Typewriter({ text, active, speed = 28, stepKey }) {
  const [shown, setShown] = useState('');
  const [done,  setDone]  = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (!active) { setShown(text); setDone(true); return; }
    setShown('');
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) timerRef.current = setTimeout(tick, speed);
      else setDone(true);
    };
    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  // stepKey forces reset when same index is re-activated after scrolling back up
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stepKey]);

  return (
    <>
      <span>{shown}</span>
      {active && !done && <span className="st-cursor" />}
    </>
  );
}

/* ── Single terminal line ── */
function TermLine({ step, visible, active, stepKey }) {
  if (!visible) return null;
  if (step.type === 'blank') return <div style={{ height: 10 }} />;
  const isCmd = step.type === 'command';
  return (
    <div className={`st-line ${isCmd ? 'st-cmd' : 'st-out'}`}>
      {isCmd && <span className="st-prompt">divyesh@engineer:~$&nbsp;</span>}
      <span style={step.color ? { color: step.color } : undefined}>
        <Typewriter
          text={step.text}
          active={active}
          speed={isCmd ? 32 : 16}
          stepKey={stepKey}
        />
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function ScrollTerminal() {
  const wrapRef   = useRef(null);  // the tall scroll-spacer div
  const outputRef = useRef(null);  // the scrollable output pane

  const [visibleCount, setVisibleCount] = useState(0);
  const [activeIdx,    setActiveIdx]    = useState(-1);
  const [progress,     setProgress]     = useState(0);
  // stepKey changes every time a step becomes active — forces Typewriter to restart
  const [stepKey, setStepKey] = useState(0);
  const prevActiveRef = useRef(-1);

  const recalc = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    /*
      KEY FIX: use window.scrollY (absolute page scroll) minus the element's
      offsetTop (absolute element position from document top).
      This is STABLE regardless of viewport changes and works perfectly
      for both scrolling down AND up.
    */
    const sectionTop = wrap.getBoundingClientRect().top + window.scrollY;
    const scrolled   = window.scrollY - sectionTop;

    if (scrolled <= 0) {
      setVisibleCount(0);
      setActiveIdx(-1);
      setProgress(0);
      prevActiveRef.current = -1;
      return;
    }

    const clampedScroll = Math.min(scrolled, TOTAL_SCROLL);
    const stepIdx       = Math.min(
      Math.floor(clampedScroll / SCROLL_PER_STEP),
      TERMINAL_STEPS.length - 1
    );
    const prog = clampedScroll / TOTAL_SCROLL;

    // If active step changed, bump stepKey so Typewriter restarts
    if (stepIdx !== prevActiveRef.current) {
      setStepKey(k => k + 1);
      prevActiveRef.current = stepIdx;
    }

    setVisibleCount(stepIdx + 1);
    setActiveIdx(stepIdx);
    setProgress(Math.min(prog, 1));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', recalc, { passive: true });
    recalc(); // run once on mount
    return () => window.removeEventListener('scroll', recalc);
  }, [recalc]);

  // Auto-scroll output pane to the latest line
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount]);

  const sidebarFiles = [
    { name: 'connect.sys',   activeAt: 1  },
    { name: 'stack.json',    activeAt: 7  },
    { name: 'biography.md',  activeAt: 14 },
    { name: 'projects.json', activeAt: 21 },
    { name: 'status.log',    activeAt: 27 },
  ];

  // Total wrapper height = scroll budget + one full viewport so the terminal
  // stays locked in view until ALL commands have appeared
  const wrapHeight = TOTAL_SCROLL + window.innerHeight;

  return (
    <div
      ref={wrapRef}
      className="st-wrap"
      style={{ height: `${wrapHeight}px` }}
    >
      {/* ── sticky panel — always fills exactly 100vh ── */}
      <div className="st-sticky">

        {/* Section heading (inside sticky so it's always visible) */}
        <div className="st-section-header">
          <p className="st-eyebrow-top">
            <span className="st-eyebrow-dot" />
            Live terminal · scroll to execute
          </p>
          <h2 className="st-heading">Stack &amp; Expertise</h2>
        </div>

        {/* Terminal window */}
        <div className="st-window">

          {/* macOS-style title bar */}
          <div className="st-titlebar">
            <span className="st-dot st-red"    />
            <span className="st-dot st-yellow" />
            <span className="st-dot st-green"  />
            <span className="st-bar-title">divyesh@engineer-pc: ~/portfolio/workspace</span>
            <span className="st-badge">INTERACTIVE</span>
          </div>

          {/* Body: sidebar + output */}
          <div className="st-body">

            {/* File explorer sidebar */}
            <div className="st-sidebar">
              <p className="st-sidebar-label">EXPLORER</p>
              {sidebarFiles.map(f => (
                <div
                  key={f.name}
                  className={`st-file ${visibleCount >= f.activeAt ? 'st-file-on' : ''}`}
                >
                  <span className="st-file-icon">
                    {visibleCount >= f.activeAt ? '⚙' : '🔒'}
                  </span>
                  {f.name}
                </div>
              ))}
            </div>

            {/* Output pane */}
            <div className="st-output" ref={outputRef}>
              {TERMINAL_STEPS.map((step, i) => (
                <TermLine
                  key={i}
                  step={step}
                  visible={i < visibleCount}
                  active={i === activeIdx}
                  stepKey={i === activeIdx ? stepKey : 0}
                />
              ))}

              {/* Idle blinking cursor after all commands shown */}
              {visibleCount >= TERMINAL_STEPS.length && (
                <div className="st-line st-cmd">
                  <span className="st-prompt">divyesh@engineer:~$&nbsp;</span>
                  <span className="st-cursor" />
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="st-progress-track">
            <div
              className="st-progress-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Scroll hint fades as content appears */}
        <div
          className="st-hint"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          <span className="st-hint-arrow" />
          scroll to run commands
        </div>

      </div>
    </div>
  );
}