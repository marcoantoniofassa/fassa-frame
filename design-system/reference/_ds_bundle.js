/* @ds-bundle: {"format":4,"namespace":"EditonnyDesignSystem_f6f5bd","components":[{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"CommandLine","sourcePath":"components/content/CommandLine.jsx"},{"name":"MediaCard","sourcePath":"components/content/MediaCard.jsx"},{"name":"PromptCard","sourcePath":"components/content/PromptCard.jsx"},{"name":"SceneCard","sourcePath":"components/content/SceneCard.jsx"},{"name":"StepItem","sourcePath":"components/content/StepItem.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Kbd","sourcePath":"components/core/Kbd.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"KineticCaption","sourcePath":"components/editor/KineticCaption.jsx"},{"name":"MarkItem","sourcePath":"components/editor/MarkItem.jsx"},{"name":"Timeline","sourcePath":"components/editor/Timeline.jsx"},{"name":"Transport","sourcePath":"components/editor/Transport.jsx"},{"name":"Waveform","sourcePath":"components/editor/Waveform.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"ProgressRing","sourcePath":"components/feedback/ProgressRing.jsx"},{"name":"StatusLine","sourcePath":"components/feedback/StatusLine.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"ChoiceCard","sourcePath":"components/forms/ChoiceCard.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Aurora","sourcePath":"components/motion/Aurora.jsx"},{"name":"Counter","sourcePath":"components/motion/Counter.jsx"},{"name":"KineticText","sourcePath":"components/motion/KineticText.jsx"},{"name":"Marquee","sourcePath":"components/motion/Marquee.jsx"},{"name":"Reveal","sourcePath":"components/motion/Reveal.jsx"},{"name":"Chip","sourcePath":"components/site/Chip.jsx"},{"name":"CreatorChip","sourcePath":"components/site/CreatorChip.jsx"},{"name":"Highlight","sourcePath":"components/site/Highlight.jsx"},{"name":"LanguageSelect","sourcePath":"components/site/LanguageSelect.jsx"},{"name":"SiteHeader","sourcePath":"components/site/SiteHeader.jsx"}],"sourceHashes":{"components/content/Accordion.jsx":"1257415d9e92","components/content/Card.jsx":"582955be4e74","components/content/CommandLine.jsx":"be4b6ab436c3","components/content/MediaCard.jsx":"e37c4b9fe48a","components/content/PromptCard.jsx":"5795261acec1","components/content/SceneCard.jsx":"2f741b214ff6","components/content/StepItem.jsx":"4d995b15d96b","components/core/Badge.jsx":"17ffd019c8fe","components/core/Button.jsx":"99eb30a180ab","components/core/Eyebrow.jsx":"046bf7f94676","components/core/Icon.jsx":"c5b29e09ce1e","components/core/IconButton.jsx":"d83dc75e86c4","components/core/Kbd.jsx":"b8c304862361","components/core/Wordmark.jsx":"12d7d1388cbd","components/editor/KineticCaption.jsx":"7986ba68cc5e","components/editor/MarkItem.jsx":"5cecf3ecb606","components/editor/Timeline.jsx":"6f387d19e098","components/editor/Transport.jsx":"dc71edaf6117","components/editor/Waveform.jsx":"5f9ec8719587","components/feedback/Dialog.jsx":"c6dad82ac7e7","components/feedback/ProgressRing.jsx":"e265e4d48074","components/feedback/StatusLine.jsx":"a86c5dc8b17f","components/feedback/Toast.jsx":"b041a929c575","components/forms/ChoiceCard.jsx":"735ea30d1557","components/forms/SegmentedControl.jsx":"e587ea953b14","components/forms/Select.jsx":"745a50b7ac81","components/forms/Switch.jsx":"691af2ac3b1d","components/forms/TextField.jsx":"7adc6929b95b","components/motion/Aurora.jsx":"e11e52fc095e","components/motion/Counter.jsx":"f173c7b77744","components/motion/KineticText.jsx":"089701b60e8f","components/motion/Marquee.jsx":"bad131833066","components/motion/Reveal.jsx":"f395fb944652","components/site/Chip.jsx":"7e821b356d82","components/site/CreatorChip.jsx":"02f039cfdd51","components/site/Highlight.jsx":"cfd98970e479","components/site/LanguageSelect.jsx":"93cac092ece5","components/site/SiteHeader.jsx":"594bd8ab3d5f","ui_kits/guia/Catalog.jsx":"639ee5a1383d","ui_kits/guia/CreatePrompt.jsx":"bb9e8a32a6c5","ui_kits/guia/Header.jsx":"64d4c5e0d6f1","ui_kits/guia/Hero.jsx":"cc9cea2b075a","ui_kits/guia/Home.jsx":"c778c8cfa78f","ui_kits/guia/Install.jsx":"20cad40c125b","ui_kits/preview/CutView.jsx":"a4f40e6b7576","ui_kits/preview/StyleView.jsx":"8e9e6bca86a9","ui_kits/preview/TopBar.jsx":"fbc721ba02b2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EditonnyDesignSystem_f6f5bd = window.EditonnyDesignSystem_f6f5bd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const looks = {
  surface: {
    background: 'var(--surface-card)',
    border: '1px solid var(--line-1)'
  },
  raised: {
    background: 'var(--surface-raised)',
    border: '1px solid var(--line-1)'
  },
  glass: {
    background: 'var(--glass-08)',
    border: '1px solid rgba(255,255,255,.12)',
    boxShadow: 'var(--inner-glass)',
    backdropFilter: 'blur(var(--blur-glass))',
    WebkitBackdropFilter: 'blur(var(--blur-glass))'
  },
  orange: {
    background: 'var(--orange-500)',
    color: 'var(--ink-950)',
    border: '0'
  },
  volt: {
    background: 'var(--volt-400)',
    color: 'var(--ink-950)',
    border: '0'
  },
  white: {
    background: 'var(--fog-50)',
    color: 'var(--ink-950)',
    border: '0'
  },
  fire: {
    background: 'var(--grad-fire)',
    color: 'var(--ink-950)',
    border: '0'
  }
};

/** Base container. `beam` = animated light running around the border; `spotlight` = glow follows the cursor. */
function Card({
  variant = 'surface',
  padding = 24,
  radius = 'xl',
  beam,
  spotlight,
  lift,
  children,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const r = 'var(--radius-' + radius + ')';
  const onMove = e => {
    if (!spotlight || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', e.clientX - b.left + 'px');
    ref.current.style.setProperty('--my', e.clientY - b.top + 'px');
  };
  const dark = variant === 'surface' || variant === 'raised' || variant === 'glass';
  const inner = /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onMouseMove: onMove,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false)
  }, beam ? {} : rest, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding,
      borderRadius: beam ? 'calc(' + r + ' - 1px)' : r,
      color: 'var(--fog-50)',
      ...looks[variant],
      ...(beam ? {
        border: 0
      } : {}),
      transform: lift && hov ? 'translateY(-4px)' : 'none',
      boxShadow: lift && hov ? 'var(--shadow-md)' : looks[variant].boxShadow || 'none',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
      height: beam ? '100%' : undefined,
      ...(beam ? {} : style)
    }
  }), spotlight && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: hov ? 1 : 0,
      transition: 'opacity var(--dur-base)',
      background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ' + (dark ? 'rgba(255,79,18,.22)' : 'rgba(255,255,255,.35)') + ', transparent 45%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, children));
  if (!beam) return inner;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: 'relative',
      padding: 1,
      borderRadius: r,
      background: 'var(--line-2)',
      overflow: 'hidden',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 2000,
      height: 2000,
      margin: -1000,
      background: 'var(--grad-beam)',
      animation: 'ed-spin 4s linear infinite'
    }
  }), inner);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/SceneCard.jsx
try { (() => {
const C = {
  o: 'var(--orange-500)',
  s: 'var(--sun-400)',
  v: 'var(--volt-400)',
  k: 'var(--ink-950)',
  w: '#fff'
};
function Motif({
  kind,
  name,
  playing
}) {
  const ps = playing ? 'running' : 'paused';
  const base = {
    animationPlayState: ps
  };
  if (kind === 'contador') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: 90
      }
    }, [40, 55, 70, 100].map((h, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 22,
        height: h + '%',
        borderRadius: 6,
        background: i === 3 ? C.v : C.w,
        transformOrigin: 'bottom',
        animation: 'ed-wave 1.6s var(--ease-in-out) ' + i * 0.15 + 's infinite',
        ...base
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 8,
        font: '400 34px/1 var(--font-kinetic)',
        color: C.w
      }
    }, "R$+"));
  }
  if (kind === 'passos') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6,
        width: 150
      }
    }, ['01', '02', '03'].map((n, i) => /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 24,
        padding: '0 10px',
        borderRadius: 8,
        background: i === 1 ? C.k : C.w,
        color: i === 1 ? C.w : C.k,
        font: '800 12px var(--font-sans)',
        animation: 'ed-fade-up .8s var(--ease-out) ' + i * 0.25 + 's infinite alternate both',
        ...base
      }
    }, n, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        background: 'currentColor',
        opacity: 0.3
      }
    }))));
  }
  if (kind === 'antes') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 170,
        height: 90,
        borderRadius: 12,
        overflow: 'hidden',
        background: C.k
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        font: '400 30px var(--font-kinetic)',
        color: 'var(--fog-600)'
      }
    }, "ANTES"), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        font: '400 30px var(--font-kinetic)',
        color: C.k,
        background: C.v,
        animation: 'ed-wipe 2.6s var(--ease-snap) infinite',
        ...base
      }
    }, "DEPOIS"));
  }
  if (kind === 'seta') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 46px/1 var(--font-kinetic)',
        color: C.w,
        animation: 'ed-bounce-y 1s var(--ease-in-out) infinite',
        ...base
      }
    }, "\u2193"), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '6px 14px',
        borderRadius: 999,
        background: C.w,
        color: C.k,
        font: '800 13px var(--font-sans)'
      }
    }, "Toque aqui"));
  }
  if (kind === 'confete') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        overflow: 'hidden'
      }
    }, Array.from({
      length: 16
    }, (_, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'absolute',
        top: 0,
        left: i * 6.2 + 3 + '%',
        width: 8,
        height: i % 2 ? 8 : 14,
        borderRadius: i % 3 ? 2 : '50%',
        background: [C.w, C.s, C.v, C.k][i % 4],
        animation: 'ed-fall ' + (1.6 + i % 5 * 0.3) + 's linear ' + i * 0.12 + 's infinite',
        ...base
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        font: '400 40px var(--font-kinetic)',
        color: C.w
      }
    }, "CONSEGUI!"));
  }
  if (kind === 'chat') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6,
        width: 170
      }
    }, [['Como edito isso?', 1], ['Corto as pausas e legendo.', 0], ['Perfeito!', 1]].map(([t, me], i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        justifySelf: me ? 'end' : 'start',
        padding: '6px 10px',
        borderRadius: me ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
        background: me ? C.k : C.w,
        color: me ? C.w : C.k,
        font: '700 11px var(--font-sans)',
        animation: 'ed-pop .5s var(--ease-spring) ' + i * 0.5 + 's infinite alternate both',
        ...base
      }
    }, t)));
  }
  if (kind === 'zoom') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 56px/1 var(--font-kinetic)',
        color: C.w,
        animation: 'ed-pop 1.4s var(--ease-spring) infinite',
        ...base
      }
    }, "ZOOM");
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      padding: '4px 12px',
      font: '400 32px/1.1 var(--font-kinetic)',
      color: C.k,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      transform: 'rotate(-3deg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: C.s,
      transformOrigin: 'left',
      animation: 'ed-sweep 1.4s var(--ease-snap) infinite alternate',
      zIndex: 0,
      ...base
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, name));
}

/** Motion catalog entry with a looping schematic preview (not a render). Animates on hover. */
function SceneCard({
  name,
  group,
  when,
  duration,
  format = '9:16',
  motif = 'tarja',
  bg = 'orange',
  autoplay,
  onClick,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const playing = autoplay || hov;
  const bgs = {
    orange: 'var(--orange-500)',
    black: 'var(--ink-950)',
    volt: 'var(--volt-400)',
    fire: 'var(--grad-fire)'
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 8,
      textAlign: 'left',
      color: 'var(--fog-50)',
      background: hov ? 'var(--ink-700)' : 'var(--surface-card)',
      border: '1px solid ' + (hov ? 'var(--line-strong)' : 'var(--line-1)'),
      borderRadius: 'var(--radius-xl)',
      cursor: 'pointer',
      minWidth: 0,
      transform: hov ? 'translateY(-4px)' : 'none',
      transition: 'background var(--dur-fast), border-color var(--dur-fast), transform var(--dur-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 168,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: bgs[bg] || bgs.orange
    }
  }, /*#__PURE__*/React.createElement(Motif, {
    kind: motif,
    name: name,
    playing: playing
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      padding: '3px 8px',
      borderRadius: 6,
      font: '700 10px var(--font-mono)',
      letterSpacing: '.1em',
      color: '#fff',
      background: 'rgba(5,5,6,.55)',
      textTransform: 'uppercase',
      backdropFilter: 'blur(6px)'
    }
  }, group), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      padding: '3px 8px',
      borderRadius: 6,
      font: '700 10px var(--font-mono)',
      color: '#fff',
      background: 'rgba(5,5,6,.55)'
    }
  }, format, duration ? ' · ' + duration + 's' : ''), !playing && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 12,
      left: 12,
      font: '700 10px var(--font-mono)',
      letterSpacing: '.08em',
      color: 'rgba(5,5,6,.6)'
    }
  }, "\u25B6 PASSE O MOUSE")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 8px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 17px/1.2 var(--font-display)',
      letterSpacing: '-0.02em'
    }
  }, name), when && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      font: '400 12.5px/1.45 var(--font-sans)',
      color: 'var(--text-2)'
    }
  }, when)));
}
Object.assign(__ds_scope, { SceneCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SceneCard.jsx", error: String((e && e.message) || e) }); }

// components/content/StepItem.jsx
try { (() => {
function StepItem({
  number,
  title,
  children,
  last,
  active,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const on = active || hov;
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      position: 'relative',
      display: 'flex',
      gap: 28,
      padding: '26px 0',
      borderBottom: last ? 0 : '1px solid var(--line-1)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      height: 1,
      background: 'var(--orange-500)',
      transformOrigin: 'left',
      transform: on ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 72,
      font: '400 56px/0.9 var(--font-kinetic)',
      color: on ? 'var(--orange-500)' : 'transparent',
      WebkitTextStroke: on ? '0' : '1.5px var(--ink-400)',
      transition: 'color var(--dur-base)'
    }
  }, number), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 24px/1.1 var(--font-display)',
      letterSpacing: '-0.03em',
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 14.5px/1.6 var(--font-sans)',
      color: 'var(--text-2)'
    }
  }, children)));
}
Object.assign(__ds_scope, { StepItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StepItem.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    bg: 'var(--glass-12)',
    fg: 'var(--fog-50)',
    bd: 'rgba(255,255,255,.12)'
  },
  solid: {
    bg: 'var(--fog-50)',
    fg: 'var(--ink-950)',
    bd: 'transparent'
  },
  accent: {
    bg: 'var(--orange-500)',
    fg: 'var(--ink-950)',
    bd: 'transparent'
  },
  volt: {
    bg: 'var(--volt-400)',
    fg: 'var(--ink-950)',
    bd: 'transparent'
  },
  soft: {
    bg: 'var(--accent-soft)',
    fg: 'var(--orange-300)',
    bd: 'var(--accent-line)'
  },
  success: {
    bg: 'var(--accent-2-soft)',
    fg: 'var(--volt-400)',
    bd: 'rgba(212,255,58,.4)'
  },
  warning: {
    bg: 'rgba(255,214,10,.14)',
    fg: 'var(--sun-400)',
    bd: 'rgba(255,214,10,.4)'
  },
  danger: {
    bg: 'rgba(255,59,92,.14)',
    fg: 'var(--rec-400)',
    bd: 'rgba(255,59,92,.45)'
  },
  rec: {
    bg: 'var(--rec-400)',
    fg: '#fff',
    bd: 'transparent'
  }
};
function Badge({
  tone = 'neutral',
  mono,
  live,
  children,
  style
}) {
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 26,
      padding: '0 11px',
      font: mono ? '700 11px/1 var(--font-mono)' : '700 12px/1 var(--font-sans)',
      letterSpacing: mono ? '.04em' : 0,
      color: t.fg,
      background: t.bg,
      border: '1px solid ' + t.bd,
      borderRadius: 'var(--radius-pill)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, live && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'currentColor',
      color: t.fg,
      animation: 'ed-pulse 1.6s var(--ease-out) infinite'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  dot,
  index,
  color,
  dotColor = 'var(--volt-400)',
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      margin: 0,
      font: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: color || 'var(--text-2)',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 8,
      height: 8,
      flex: 'none',
      borderRadius: '50%',
      background: dotColor,
      color: dotColor,
      animation: 'ed-pulse 1.8s var(--ease-out) infinite'
    }
  }), index && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 7px',
      borderRadius: 6,
      background: 'var(--orange-500)',
      color: 'var(--ink-950)',
      letterSpacing: '.04em'
    }
  }, index), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.460.0/icons/';
/** Lucide icon rendered as a CSS mask so it inherits currentColor.
 *  Source: `base` prop → window.EDITONNY_ICON_BASE (e.g. local "assets/icons/") → Lucide CDN. */
function Icon({
  name,
  size = 18,
  color = 'currentColor',
  base,
  style,
  ...rest
}) {
  const root = base || typeof window !== 'undefined' && window.EDITONNY_ICON_BASE || CDN;
  const url = `url(${root}${name}.svg)`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      background: color,
      WebkitMask: `${url} center/contain no-repeat`,
      mask: `${url} center/contain no-repeat`,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  defaultOpen = 0,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      ...style
    }
  }, items.map((it, i) => {
    const on = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: on ? 'var(--ink-800)' : 'transparent',
        border: '1px solid ' + (on ? 'var(--line-2)' : 'var(--line-1)'),
        borderRadius: 'var(--radius-lg)',
        transition: 'background var(--dur-base), border-color var(--dur-base)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(on ? -1 : i),
      "aria-expanded": on,
      style: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        padding: '18px 18px 18px 20px',
        font: '700 15px var(--font-sans)',
        color: 'var(--fog-50)',
        background: 'none',
        border: 0,
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, it.title, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 30,
        height: 30,
        flex: 'none',
        borderRadius: '50%',
        background: on ? 'var(--orange-500)' : 'var(--ink-700)',
        color: on ? 'var(--ink-950)' : 'var(--fog-50)',
        transform: on ? 'rotate(45deg)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "plus",
      size: 16
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateRows: on ? '1fr' : '0fr',
        transition: 'grid-template-rows var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 60px 20px 20px',
        font: '400 14px/1.6 var(--font-sans)',
        color: 'var(--text-2)',
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(-6px)',
        transition: 'opacity var(--dur-base), transform var(--dur-base) var(--ease-out)'
      }
    }, it.body))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/CommandLine.jsx
try { (() => {
function CommandLine({
  command,
  copyLabel = 'Copiar',
  onCopy,
  typing,
  style
}) {
  const [done, setDone] = React.useState(false);
  const [shown, setShown] = React.useState(typing ? '' : command);
  React.useEffect(() => {
    if (!typing) {
      setShown(command);
      return;
    }
    let i = 0;
    setShown('');
    const id = setInterval(() => {
      i++;
      setShown(command.slice(0, i));
      if (i >= command.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [command, typing]);
  const copy = () => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(command);
    } catch (e) {}
    setDone(true);
    onCopy && onCopy();
    setTimeout(() => setDone(false), 1600);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      padding: '10px 10px 10px 16px',
      background: 'var(--ink-950)',
      border: '1px solid var(--line-2)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("code", {
    style: {
      font: '600 13px/1.5 var(--font-mono)',
      color: 'var(--fog-50)',
      overflowWrap: 'anywhere'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--volt-400)'
    }
  }, "$ "), shown, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: 8,
      height: 15,
      marginLeft: 2,
      verticalAlign: -2,
      background: 'var(--orange-500)',
      animation: 'ed-blink 1s steps(1) infinite'
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      flex: 'none',
      height: 32,
      padding: '0 12px',
      font: '700 12px var(--font-sans)',
      color: done ? 'var(--ink-950)' : 'var(--fog-50)',
      background: done ? 'var(--volt-400)' : 'var(--ink-700)',
      border: 0,
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast), color var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: done ? 'check' : 'copy',
    size: 14
  }), done ? 'Copiado' : copyLabel));
}
Object.assign(__ds_scope, { CommandLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CommandLine.jsx", error: String((e && e.message) || e) }); }

// components/content/MediaCard.jsx
try { (() => {
/** Video/project thumbnail with 3D tilt + light glare following the cursor. */
function MediaCard({
  image,
  title,
  meta,
  duration,
  aspect = '4 / 3',
  playable,
  tilt = true,
  kenburns,
  onClick,
  children,
  style
}) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({
    x: 0,
    y: 0,
    gx: 50,
    gy: 50,
    on: false
  });
  const move = e => {
    if (!tilt || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width,
      py = (e.clientY - b.top) / b.height;
    setT({
      x: (0.5 - py) * 10,
      y: (px - 0.5) * 12,
      gx: px * 100,
      gy: py * 100,
      on: true
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onClick: onClick,
    onMouseMove: move,
    onMouseLeave: () => setT({
      x: 0,
      y: 0,
      gx: 50,
      gy: 50,
      on: false
    }),
    style: {
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: aspect,
      borderRadius: 'var(--radius-xl)',
      background: 'var(--ink-800)',
      cursor: onClick ? 'pointer' : 'default',
      transform: 'perspective(900px) rotateX(' + t.x + 'deg) rotateY(' + t.y + 'deg) scale(' + (t.on ? 1.02 : 1) + ')',
      transition: t.on ? 'transform 80ms linear' : 'transform var(--dur-slow) var(--ease-spring)',
      boxShadow: t.on ? 'var(--shadow-lg)' : 'none',
      ...style
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      animation: kenburns ? 'ed-kenburns 14s var(--ease-in-out) infinite alternate' : undefined
    }
  }), children, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--grad-protect)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: t.on ? 1 : 0,
      transition: 'opacity var(--dur-base)',
      background: 'radial-gradient(circle at ' + t.gx + '% ' + t.gy + '%, rgba(255,255,255,.22), transparent 45%)'
    }
  }), playable && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '45%',
      transform: 'translate(-50%,-50%) scale(' + (t.on ? 1.12 : 1) + ')',
      display: 'grid',
      placeItems: 'center',
      width: 60,
      height: 60,
      borderRadius: '50%',
      background: t.on ? 'var(--orange-500)' : 'var(--glass-28)',
      color: t.on ? 'var(--ink-950)' : '#fff',
      border: '1px solid rgba(255,255,255,.25)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 22,
    style: {
      marginLeft: 3
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 20,
      right: 20,
      bottom: 18,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 19px/1.15 var(--font-display)',
      letterSpacing: '-0.02em',
      color: '#fff'
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      font: '500 13px/1.3 var(--font-sans)',
      color: 'rgba(255,255,255,.7)'
    }
  }, meta)), duration && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    mono: true
  }, duration)));
}
Object.assign(__ds_scope, { MediaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MediaCard.jsx", error: String((e && e.message) || e) }); }

// components/content/PromptCard.jsx
try { (() => {
function PromptCard({
  category,
  title,
  summary,
  action = 'Ver pedido',
  index,
  onClick,
  style
}) {
  const [hov, setHov] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      minWidth: 0,
      padding: 26,
      textAlign: 'left',
      color: hov ? 'var(--ink-950)' : 'var(--fog-50)',
      background: 'var(--surface-card)',
      border: '1px solid ' + (hov ? 'var(--orange-500)' : 'var(--line-1)'),
      borderRadius: 'var(--radius-xl)',
      cursor: 'pointer',
      transition: 'color var(--dur-base), border-color var(--dur-fast)',
      isolation: 'isolate',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      background: 'var(--orange-500)',
      clipPath: hov ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)',
      transition: 'clip-path var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 10px/1.6 var(--font-mono)',
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: hov ? 'var(--ink-950)' : 'var(--orange-500)',
      transition: 'color var(--dur-base)'
    }
  }, category), index && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px var(--font-mono)',
      opacity: 0.5
    }
  }, index)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 26px/1.05 var(--font-display)',
      letterSpacing: '-0.035em',
      marginBottom: 12
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.55 var(--font-sans)',
      color: hov ? 'rgba(5,5,6,.75)' : 'var(--text-2)',
      marginBottom: 26,
      transition: 'color var(--dur-base)'
    }
  }, summary), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
      paddingTop: 16,
      borderTop: '1px solid ' + (hov ? 'rgba(5,5,6,.2)' : 'var(--line-1)'),
      font: '700 13px var(--font-sans)'
    }
  }, action, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: hov ? 'var(--ink-950)' : 'var(--ink-700)',
      color: hov ? 'var(--orange-500)' : 'var(--fog-50)',
      transform: hov ? 'rotate(45deg)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: 16
  }))));
}
Object.assign(__ds_scope, { PromptCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PromptCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    h: 38,
    px: 16,
    fs: 13
  },
  md: {
    h: 50,
    px: 24,
    fs: 15
  },
  lg: {
    h: 60,
    px: 30,
    fs: 17
  }
};
const looks = {
  primary: {
    bg: 'var(--orange-500)',
    hover: 'var(--orange-300)',
    fg: 'var(--ink-950)',
    bd: 'transparent',
    glow: 'var(--shadow-glow)'
  },
  volt: {
    bg: 'var(--volt-400)',
    hover: 'var(--volt-300)',
    fg: 'var(--ink-950)',
    bd: 'transparent',
    glow: 'var(--shadow-glow-volt)'
  },
  white: {
    bg: 'var(--fog-50)',
    hover: '#ffffff',
    fg: 'var(--ink-950)',
    bd: 'transparent',
    glow: '0 12px 40px rgba(255,255,255,.25)'
  },
  dark: {
    bg: 'var(--ink-950)',
    hover: 'var(--ink-800)',
    fg: 'var(--fog-50)',
    bd: 'var(--line-2)'
  },
  glass: {
    bg: 'var(--glass-12)',
    hover: 'var(--glass-18)',
    fg: 'var(--fog-50)',
    bd: 'rgba(255,255,255,.14)',
    blur: true
  },
  outline: {
    bg: 'transparent',
    hover: 'var(--glass-08)',
    fg: 'var(--fog-50)',
    bd: 'var(--line-strong)'
  },
  ghost: {
    bg: 'transparent',
    hover: 'var(--glass-08)',
    fg: 'var(--fog-400)',
    hoverFg: 'var(--fog-50)',
    bd: 'transparent'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  block,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const s = sizes[size] || sizes.md;
  const l = looks[variant] || looks.primary;
  const on = hov && !disabled;
  const solid = variant === 'primary' || variant === 'volt' || variant === 'white';
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }, rest, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      font: '700 ' + s.fs + 'px/1 var(--font-sans)',
      letterSpacing: '-0.01em',
      color: on && l.hoverFg ? l.hoverFg : l.fg,
      background: on ? l.hover : l.bg,
      border: '1px solid ' + l.bd,
      borderRadius: 'var(--radius-pill)',
      boxShadow: on && l.glow ? l.glow : 'none',
      backdropFilter: l.blur ? 'blur(var(--blur-glass))' : undefined,
      WebkitBackdropFilter: l.blur ? 'blur(var(--blur-glass))' : undefined,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: down && !disabled ? 'scale(.95)' : on ? 'translateY(-2px)' : 'none',
      transition: 'background var(--dur-fast), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring), color var(--dur-fast)',
      whiteSpace: 'nowrap',
      ...style
    }
  }), on && solid && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '40%',
      zIndex: -1,
      background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)',
      animation: 'ed-shine .9s var(--ease-out) both'
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.fs + 3
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.fs + 2,
    style: {
      transform: on ? 'translate(3px,-1px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring)'
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  variant = 'tile',
  size = 44,
  active,
  style,
  ...rest
}) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const map = {
    tile: [hov ? 'var(--ink-500)' : 'var(--surface-tile)', 'var(--fog-50)'],
    glass: [hov ? 'var(--glass-28)' : 'var(--glass-12)', 'var(--fog-50)'],
    accent: [hov ? 'var(--orange-300)' : 'var(--orange-500)', 'var(--ink-950)'],
    volt: [hov ? 'var(--volt-300)' : 'var(--volt-400)', 'var(--ink-950)'],
    ghost: [hov ? 'var(--glass-08)' : 'transparent', hov ? 'var(--fog-50)' : 'var(--fog-400)']
  };
  const [bg, fg] = map[variant] || map.tile;
  const round = variant === 'glass' || variant === 'accent' || variant === 'volt';
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }, rest, {
    style: {
      display: 'inline-grid',
      placeItems: 'center',
      flex: 'none',
      width: size,
      height: size,
      padding: 0,
      color: active ? 'var(--ink-950)' : fg,
      background: active ? 'var(--orange-500)' : bg,
      border: '1px solid ' + (variant === 'ghost' || active || variant === 'accent' || variant === 'volt' ? 'transparent' : 'rgba(255,255,255,.08)'),
      borderRadius: round ? '50%' : size >= 56 ? 'var(--radius-lg)' : 'var(--radius-md)',
      boxShadow: active ? 'var(--shadow-glow)' : 'none',
      backdropFilter: variant === 'glass' ? 'blur(var(--blur-glass))' : undefined,
      WebkitBackdropFilter: variant === 'glass' ? 'blur(var(--blur-glass))' : undefined,
      cursor: 'pointer',
      transform: down ? 'scale(.9)' : hov ? 'scale(1.06)' : 'none',
      transition: 'background var(--dur-fast), color var(--dur-fast), transform var(--dur-base) var(--ease-spring)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.44)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Kbd.jsx
try { (() => {
function Kbd({
  children
}) {
  return /*#__PURE__*/React.createElement("kbd", {
    style: {
      display: 'inline-block',
      minWidth: 22,
      padding: '0 6px',
      font: '700 11px/20px var(--font-mono)',
      color: 'var(--fog-200)',
      textAlign: 'center',
      background: 'var(--ink-700)',
      border: '1px solid var(--line-strong)',
      borderBottomWidth: 3,
      borderRadius: 7
    }
  }, children);
}
Object.assign(__ds_scope, { Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kbd.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 30,
  tone = 'dark',
  iconOnly,
  animated,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const onOrange = tone === 'orange';
  const onLight = tone === 'light';
  const blockBg = onOrange ? 'var(--ink-950)' : 'var(--orange-500)';
  const blockFg = onOrange ? 'var(--orange-500)' : 'var(--ink-950)';
  const textColor = onLight || onOrange ? 'var(--ink-950)' : 'var(--fog-50)';
  const dotColor = onOrange ? 'var(--fog-50)' : onLight ? 'var(--orange-500)' : 'var(--volt-400)';
  const r = Math.round(size * 0.26) + 'px ' + Math.max(1, Math.round(size * 0.05)) + 'px';
  const icon = /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      width: size * 1.1,
      height: size * 1.18,
      marginRight: iconOnly ? 0 : size * 0.3,
      background: blockBg,
      color: blockFg,
      font: '900 ' + Math.round(size * 0.92) + 'px/1 var(--font-display)',
      letterSpacing: '-0.04em',
      borderRadius: r + ' ' + r,
      transform: hov || animated ? 'rotate(-8deg) scale(1.06)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring)',
      animation: animated ? 'ed-float-r 3s var(--ease-in-out) infinite' : undefined
    }
  }, "e");
  if (iconOnly) return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'inline-flex',
      ...style
    }
  }, icon);
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "editonny",
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      font: '800 ' + size + 'px/1 var(--font-display)',
      letterSpacing: '-0.065em',
      color: textColor,
      ...style
    }
  }, icon, "editonny", /*#__PURE__*/React.createElement("span", {
    style: {
      color: dotColor,
      display: 'inline-block',
      transform: hov ? 'translateY(-' + Math.round(size * 0.18) + 'px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring)'
    }
  }, "."));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/editor/KineticCaption.jsx
try { (() => {
/** Social-video caption, word by word (karaoke). The active word pops inside a solid highlight box. */
function KineticCaption({
  text = 'Cada palavra no seu tempo',
  wps = 2.6,
  highlight = 'var(--sun-400)',
  font = 'var(--font-caption-clean)',
  size = 30,
  uppercase = true,
  playing = true,
  loop = true,
  align = 'center',
  style
}) {
  const words = text.split(' ');
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setI(v => v + 1 >= words.length + 2 ? loop ? 0 : v : v + 1), 1000 / wps);
    return () => clearInterval(id);
  }, [playing, wps, words.length, loop]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: align === 'left' ? 'flex-start' : 'center',
      gap: '0.12em 0.28em',
      font: '900 ' + size + 'px/1.05 ' + font,
      textTransform: uppercase ? 'uppercase' : 'none',
      letterSpacing: '-0.01em',
      ...style
    }
  }, words.map((w, k) => {
    const on = k === i;
    const seen = k < i;
    return /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        position: 'relative',
        display: 'inline-block',
        padding: '0.04em 0.16em',
        borderRadius: '0.16em',
        color: on ? 'var(--ink-950)' : '#fff',
        background: on ? highlight : 'transparent',
        opacity: seen || on ? 1 : 0.28,
        transform: on ? 'scale(1.12) rotate(-2deg)' : 'none',
        textShadow: on ? 'none' : '0 3px 14px rgba(0,0,0,.55)',
        transition: 'transform var(--dur-fast) var(--ease-spring), opacity var(--dur-fast), background var(--dur-instant)'
      }
    }, w);
  }));
}
Object.assign(__ds_scope, { KineticCaption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editor/KineticCaption.jsx", error: String((e && e.message) || e) }); }

// components/editor/MarkItem.jsx
try { (() => {
function MarkItem({
  index,
  range,
  note,
  current,
  onRemove,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto auto minmax(0,1fr) auto',
      alignItems: 'center',
      gap: 12,
      padding: '6px 6px 6px 8px',
      background: current ? 'var(--ink-600)' : 'var(--ink-700)',
      border: '1px solid ' + (current ? 'var(--volt-400)' : 'var(--line-1)'),
      borderRadius: 'var(--radius-md)',
      animation: 'ed-fade-up .35s var(--ease-out) both',
      transition: 'background var(--dur-fast), border-color var(--dur-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      minWidth: 26,
      height: 26,
      font: '800 12px var(--font-mono)',
      color: 'var(--ink-950)',
      background: 'var(--volt-400)',
      borderRadius: 8
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 12px var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap',
      color: 'var(--fog-200)'
    }
  }, range), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13.5px var(--font-sans)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, note), onRemove ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Remover marca\xE7\xE3o",
    variant: "ghost",
    size: 30,
    onClick: onRemove
  }) : /*#__PURE__*/React.createElement("span", null));
}
Object.assign(__ds_scope, { MarkItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editor/MarkItem.jsx", error: String((e && e.message) || e) }); }

// components/editor/Timeline.jsx
try { (() => {
/** Review timeline: ruler, beat segments, live waveform, numbered marks, glowing playhead. */
function Timeline({
  segments = [],
  duration = 45,
  playhead = 0,
  marks = [],
  playing,
  onSeek,
  style
}) {
  const ref = React.useRef(null);
  const pct = t => t / duration * 100 + '%';
  const seek = e => {
    if (!onSeek || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    onSeek(Math.max(0, Math.min(duration, (e.clientX - r.left) / r.width * duration)));
  };
  const ticks = [];
  for (let t = 0; t <= duration; t += duration > 60 ? 10 : 5) ticks.push(t);
  const bars = React.useMemo(() => Array.from({
    length: 96
  }, (_, i) => 22 + Math.abs(Math.sin(i * 1.7) * 48 + Math.sin(i * 0.37) * 26)), []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onClick: seek,
    style: {
      position: 'relative',
      userSelect: 'none',
      cursor: 'col-resize',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 22
    }
  }, ticks.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      position: 'absolute',
      left: pct(t),
      top: 0,
      bottom: 0,
      paddingLeft: 4,
      borderLeft: '1px solid var(--line-2)',
      font: '600 10px/14px var(--font-mono)',
      color: 'var(--text-3)'
    }
  }, String(Math.floor(t / 60)).padStart(2, '0'), ":", String(t % 60).padStart(2, '0')))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 54
    }
  }, segments.map((s, i) => {
    const on = playhead >= s.start && playhead < s.end;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: pct(s.start),
        width: 'calc(' + pct(s.end - s.start) + ' - 4px)',
        padding: '0 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: on ? 'var(--orange-500)' : 'var(--ink-700)',
        color: on ? 'var(--ink-950)' : 'var(--fog-50)',
        borderRadius: 12,
        transform: on ? 'translateY(-2px)' : 'none',
        boxShadow: on ? '0 10px 24px rgba(255,79,18,.35)' : 'none',
        transition: 'background var(--dur-fast), transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '800 10px var(--font-sans)',
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        opacity: on ? 0.8 : 0.6,
        whiteSpace: 'nowrap'
      }
    }, s.beat), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 12.5px var(--font-sans)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, s.quote));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 58,
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      padding: '0 6px',
      background: 'var(--ink-950)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, bars.map((h, i) => {
    const past = i / bars.length * duration < playhead;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: h + '%',
        borderRadius: 3,
        background: past ? 'var(--orange-500)' : 'var(--ink-500)',
        transformOrigin: 'center',
        animation: playing ? 'ed-wave ' + (0.8 + i % 5 * 0.12) + 's var(--ease-in-out) ' + i % 7 * 0.05 + 's infinite' : undefined
      }
    });
  })), marks.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      top: 22,
      bottom: 0,
      left: pct(m.start),
      width: pct(m.end - m.start),
      background: 'repeating-linear-gradient(135deg, rgba(212,255,58,.16) 0 6px, rgba(212,255,58,.04) 6px 12px)',
      borderLeft: '2px solid var(--volt-400)',
      borderRight: '2px solid var(--volt-400)',
      pointerEvents: 'none',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 4,
      bottom: 4,
      padding: '0 6px',
      font: '800 10px/16px var(--font-mono)',
      color: 'var(--ink-950)',
      background: 'var(--volt-400)',
      borderRadius: 5
    }
  }, i + 1))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: -2,
      left: pct(playhead),
      width: 0,
      pointerEvents: 'none',
      zIndex: 3,
      transition: playing ? 'left 100ms linear' : 'left var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 14,
      bottom: 0,
      left: -1,
      width: 2,
      background: '#fff',
      boxShadow: '0 0 12px rgba(255,255,255,.8)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: -7,
      width: 14,
      height: 16,
      background: '#fff',
      borderRadius: '4px 4px 8px 8px',
      boxShadow: '0 0 14px rgba(255,255,255,.6)'
    }
  })));
}
Object.assign(__ds_scope, { Timeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editor/Timeline.jsx", error: String((e && e.message) || e) }); }

// components/editor/Transport.jsx
try { (() => {
function Transport({
  playing,
  onToggle,
  time = '00:00.00',
  duration = '00:00.00',
  onStep,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: playing ? 'pause' : 'play',
    label: "Reproduzir ou pausar",
    variant: "accent",
    size: 46,
    onClick: onToggle,
    style: {
      boxShadow: playing ? '0 0 0 6px rgba(255,79,18,.2)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px/1 var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, time, /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 6px',
      color: 'var(--ink-400)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-3)'
    }
  }, duration)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 2
    }
  }, [['chevrons-left', -30, 'Voltar 1 segundo'], ['chevron-left', -1, 'Voltar 1 quadro'], ['chevron-right', 1, 'Avançar 1 quadro'], ['chevrons-right', 30, 'Avançar 1 segundo']].map(([ic, d, l]) => /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    key: ic,
    icon: ic,
    label: l,
    variant: "ghost",
    size: 34,
    onClick: () => onStep && onStep(d)
  }))));
}
Object.assign(__ds_scope, { Transport });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editor/Transport.jsx", error: String((e && e.message) || e) }); }

// components/editor/Waveform.jsx
try { (() => {
/** Animated audio bars. `cuts` paints removed zones (silences) to show "corte seco". */
function Waveform({
  bars = 48,
  height = 64,
  playing = true,
  color = 'var(--orange-500)',
  muted = 'var(--ink-500)',
  progress,
  cuts = [],
  style
}) {
  const hs = React.useMemo(() => Array.from({
    length: bars
  }, (_, i) => 18 + Math.abs(Math.sin(i * 1.3) * 52 + Math.sin(i * 0.41) * 28)), [bars]);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      height,
      ...style
    }
  }, hs.map((h, i) => {
    const x = i / bars;
    const cut = cuts.some(([a, b]) => x >= a && x < b);
    const done = typeof progress === 'number' ? x < progress : true;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        minWidth: 2,
        height: (cut ? 8 : h) + '%',
        borderRadius: 3,
        background: cut ? 'var(--rec-400)' : done ? color : muted,
        opacity: cut ? 0.55 : 1,
        transformOrigin: 'center',
        animation: playing && !cut ? 'ed-wave ' + (0.7 + i % 6 * 0.13) + 's var(--ease-in-out) ' + i % 9 * 0.06 + 's infinite' : undefined,
        transition: 'height var(--dur-base) var(--ease-out), background var(--dur-fast)'
      }
    });
  }));
}
Object.assign(__ds_scope, { Waveform });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editor/Waveform.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  eyebrow,
  onClose,
  children,
  actions,
  width = 520,
  inline,
  style
}) {
  React.useEffect(() => {
    if (!open || inline || !onClose) return;
    const k = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, inline, onClose]);
  if (!open) return null;
  const box = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": title,
    style: {
      position: 'relative',
      overflow: 'hidden',
      width,
      maxWidth: '100%',
      padding: 30,
      color: 'var(--fog-50)',
      background: 'var(--ink-800)',
      border: '1px solid var(--line-2)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-lg)',
      animation: inline ? undefined : 'ed-scale-in .45s var(--ease-spring) both',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: 'var(--grad-fire)'
    }
  }), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Fechar",
    variant: "ghost",
    size: 38,
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 16,
      right: 16
    }
  }), eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      font: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--orange-500)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 14px',
      paddingRight: 36,
      font: '800 30px/1.05 var(--font-display)',
      letterSpacing: '-0.04em'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 14.5px/1.6 var(--font-sans)',
      color: 'var(--text-2)'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 24
    }
  }, actions));
  if (inline) return box;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'grid',
      placeItems: 'center',
      padding: 16,
      background: 'rgba(5,5,6,.7)',
      backdropFilter: 'blur(var(--blur-backdrop))',
      WebkitBackdropFilter: 'blur(var(--blur-backdrop))',
      animation: 'ed-fade-in .25s both'
    }
  }, box);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressRing.jsx
try { (() => {
/** Circular render/progress meter built with a conic-gradient (no SVG). */
function ProgressRing({
  value = 0,
  size = 96,
  thickness = 8,
  label,
  color = 'var(--orange-500)',
  style
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const mask = 'radial-gradient(farthest-side, transparent calc(100% - ' + thickness + 'px), #000 calc(100% - ' + (thickness - 1) + 'px))';
  return /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: 'conic-gradient(' + color + ' ' + pct + '%, var(--ink-600) 0)',
      WebkitMask: mask,
      mask,
      transition: 'background var(--dur-base)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: -6,
      borderRadius: '50%',
      border: '1px solid ' + color,
      opacity: 0.4,
      animation: pct < 100 ? 'ed-ring 2s var(--ease-out) infinite' : undefined
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeContent: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 ' + Math.round(size * 0.3) + 'px/1 var(--font-kinetic)',
      color: 'var(--fog-50)'
    }
  }, Math.round(pct), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.5em',
      color: 'var(--text-2)'
    }
  }, "%")), label && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 3,
      font: '700 9px var(--font-mono)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--text-2)'
    }
  }, label)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusLine.jsx
try { (() => {
const dots = {
  idle: 'var(--fog-600)',
  working: 'var(--sun-400)',
  awaiting: 'var(--orange-500)',
  offline: 'var(--rec-400)',
  done: 'var(--volt-400)'
};
function StatusLine({
  state = 'awaiting',
  text,
  meta,
  badge,
  progress,
  style
}) {
  const c = dots[state];
  const working = state === 'working';
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minHeight: 44,
      padding: '8px 20px',
      font: '500 13.5px/1.4 var(--font-sans)',
      color: state === 'offline' ? 'var(--rec-400)' : 'var(--fog-50)',
      borderBottom: '1px solid var(--line-1)',
      background: 'var(--bg-page)',
      ...style
    }
  }, working && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,214,10,.08), transparent)',
      backgroundSize: '50% 100%',
      backgroundRepeat: 'no-repeat',
      animation: 'ed-shimmer 1.8s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 9,
      height: 9,
      flex: 'none',
      borderRadius: '50%',
      background: c,
      color: c,
      animation: state === 'awaiting' || working ? 'ed-pulse 1.6s var(--ease-out) infinite' : undefined
    }
  }), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      padding: '3px 10px',
      font: '800 11px/1.3 var(--font-sans)',
      letterSpacing: '.02em',
      color: 'var(--ink-950)',
      background: c,
      borderRadius: 999
    }
  }, badge), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, text), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      marginLeft: 'auto',
      font: '600 12px var(--font-mono)',
      color: 'var(--text-3)',
      whiteSpace: 'nowrap'
    }
  }, meta), typeof progress === 'number' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: 2,
      width: progress * 100 + '%',
      background: 'var(--grad-fire)',
      transition: 'width var(--dur-base) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { StatusLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusLine.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  children,
  tone = 'default',
  style
}) {
  const map = {
    default: ['var(--orange-500)', 'sparkles'],
    success: ['var(--volt-400)', 'check'],
    error: ['var(--rec-400)', 'circle-alert']
  };
  const [c, ic] = map[tone] || map.default;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 20px 8px 8px',
      font: '700 14px/1.35 var(--font-sans)',
      color: 'var(--ink-950)',
      background: 'var(--fog-50)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: '0 20px 50px rgba(0,0,0,.55)',
      animation: 'ed-toast-in .5s var(--ease-spring) both',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: c,
      color: 'var(--ink-950)',
      animation: 'ed-pop .5s var(--ease-spring) .1s both'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 16
  })), children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChoiceCard.jsx
try { (() => {
function ChoiceCard({
  title,
  description,
  icon,
  media,
  selected,
  onSelect,
  compact,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const stacked = !!media && !icon;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "radio",
    "aria-checked": !!selected,
    onClick: onSelect,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: stacked ? 'stretch' : 'center',
      justifyContent: compact ? 'center' : 'flex-start',
      gap: stacked ? 10 : 12,
      width: '100%',
      minHeight: compact ? 50 : 68,
      padding: compact ? '0 14px' : stacked ? 8 : 14,
      textAlign: 'left',
      color: compact && selected ? 'var(--ink-950)' : 'var(--fog-50)',
      background: compact && selected ? 'var(--orange-500)' : selected ? 'var(--ink-700)' : hov ? 'var(--ink-800)' : 'var(--surface-well)',
      border: '1px solid ' + (selected ? 'var(--orange-500)' : hov ? 'var(--line-strong)' : 'var(--line-1)'),
      boxShadow: selected ? '0 0 0 3px rgba(255,79,18,.18), 0 10px 30px rgba(255,79,18,.15)' : 'none',
      borderRadius: compact ? 'var(--radius-pill)' : 'var(--radius-lg)',
      cursor: 'pointer',
      transform: down ? 'scale(.97)' : 'none',
      transition: 'background var(--dur-fast), border-color var(--dur-fast), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring)',
      ...style
    }
  }, media, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 42,
      height: 42,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: selected ? 'var(--orange-500)' : 'var(--ink-600)',
      color: selected ? 'var(--ink-950)' : 'var(--fog-50)',
      transform: selected ? 'rotate(-6deg)' : 'none',
      transition: 'background var(--dur-fast), transform var(--dur-base) var(--ease-spring)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19
  })), (title || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      padding: stacked ? '0 4px 4px' : 0
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      font: compact ? '700 14px/1.2 var(--font-sans)' : '700 15px/1.3 var(--font-sans)'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 2,
      font: '400 12.5px/1.4 var(--font-sans)',
      color: 'var(--text-2)'
    }
  }, description)), selected && !compact && /*#__PURE__*/React.createElement("span", {
    style: {
      position: stacked ? 'absolute' : 'static',
      top: 14,
      right: 14,
      marginLeft: stacked ? 0 : 'auto',
      display: 'grid',
      placeItems: 'center',
      width: 24,
      height: 24,
      flex: 'none',
      borderRadius: '50%',
      background: 'var(--orange-500)',
      color: 'var(--ink-950)',
      animation: 'ed-pop .45s var(--ease-spring) both',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  })));
}
Object.assign(__ds_scope, { ChoiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChoiceCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  tone = 'glass',
  style
}) {
  const wrap = React.useRef(null);
  const btns = React.useRef({});
  const [ind, setInd] = React.useState({
    left: 0,
    width: 0,
    ready: false
  });
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const h = size === 'sm' ? 34 : 42;
  const measure = React.useCallback(() => {
    const b = btns.current[value];
    if (b && wrap.current) setInd({
      left: b.offsetLeft,
      width: b.offsetWidth,
      ready: true
    });
  }, [value]);
  React.useLayoutEffect(() => {
    measure();
  }, [measure, options.length]);
  React.useEffect(() => {
    if (!wrap.current || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);
  const solid = tone === 'solid';
  return /*#__PURE__*/React.createElement("div", {
    ref: wrap,
    role: "tablist",
    style: {
      position: 'relative',
      display: 'inline-flex',
      gap: 2,
      padding: 4,
      background: 'var(--shade-60)',
      border: '1px solid var(--line-1)',
      borderRadius: 'var(--radius-pill)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 4,
      bottom: 4,
      left: ind.left,
      width: ind.width,
      borderRadius: 'var(--radius-pill)',
      background: solid ? 'var(--orange-500)' : 'var(--glass-18)',
      boxShadow: solid ? '0 6px 20px rgba(255,79,18,.4)' : 'var(--inner-glass)',
      opacity: ind.ready ? 1 : 0,
      transition: 'left var(--dur-base) var(--ease-spring), width var(--dur-base) var(--ease-spring)'
    }
  }), norm.map(o => {
    const on = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      ref: el => {
        btns.current[o.value] = el;
      },
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(o.value),
      style: {
        position: 'relative',
        zIndex: 1,
        height: h,
        padding: '0 ' + (size === 'sm' ? 14 : 20) + 'px',
        font: '700 ' + (size === 'sm' ? 13 : 14) + 'px/1 var(--font-sans)',
        color: on ? solid ? 'var(--ink-950)' : 'var(--fog-50)' : 'var(--fog-400)',
        background: 'transparent',
        border: 0,
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        transition: 'color var(--dur-fast)',
        whiteSpace: 'nowrap'
      }
    }, o.label, o.dot && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 7,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--volt-400)',
        color: 'var(--volt-400)',
        animation: 'ed-pulse 1.6s infinite'
      }
    }));
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [hov, setHov] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 8,
      font: 'var(--text-label)',
      color: 'var(--fog-200)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    },
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false)
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      display: 'block',
      width: '100%',
      height: 52,
      padding: '0 48px 0 16px',
      font: '600 15px var(--font-sans)',
      color: 'var(--fog-50)',
      background: hov || focus ? 'var(--ink-800)' : 'var(--surface-well)',
      border: '1px solid ' + (focus ? 'var(--orange-500)' : 'var(--line-2)'),
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? '0 0 0 4px rgba(255,79,18,.18)' : 'none',
      outline: 'none',
      cursor: 'pointer',
      transition: 'background var(--dur-fast), border-color var(--dur-fast), box-shadow var(--dur-base)'
    }
  }), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 10,
      top: '50%',
      marginTop: -15,
      width: 30,
      height: 30,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 9,
      background: focus ? 'var(--orange-500)' : 'var(--ink-700)',
      color: focus ? 'var(--ink-950)' : 'var(--fog-200)',
      pointerEvents: 'none',
      transition: 'background var(--dur-fast), color var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    style: {
      transform: focus ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring)'
    }
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label,
  description,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const toggle = () => onChange && onChange(!checked);
  const knob = /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": !!checked,
    style: {
      position: 'relative',
      flex: 'none',
      width: 48,
      height: 28,
      borderRadius: 999,
      background: checked ? 'var(--orange-500)' : 'var(--ink-500)',
      boxShadow: checked ? '0 0 18px rgba(255,79,18,.45)' : 'none',
      transition: 'background var(--dur-fast), box-shadow var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: 3,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: checked ? 'var(--ink-950)' : 'var(--fog-50)',
      boxShadow: '0 2px 6px rgba(0,0,0,.4)',
      transform: checked ? 'translateX(20px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast)'
    }
  }));
  if (!label) return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    style: {
      padding: 0,
      border: 0,
      background: 'none',
      cursor: 'pointer',
      ...style
    }
  }, knob);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      width: '100%',
      padding: '14px 16px',
      textAlign: 'left',
      color: 'var(--fog-50)',
      background: checked ? 'var(--ink-700)' : hov ? 'var(--ink-800)' : 'var(--surface-well)',
      border: '1px solid ' + (checked ? 'rgba(255,79,18,.45)' : 'var(--line-1)'),
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast), border-color var(--dur-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: '700 14px/1.3 var(--font-sans)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: '400 12.5px/1.4 var(--font-sans)',
      color: 'var(--text-2)',
      marginTop: 2
    }
  }, description)), knob);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  help,
  error,
  multiline,
  rows = 3,
  counter,
  value,
  style,
  inputStyle,
  onFocus,
  onBlur,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  const len = typeof value === 'string' ? value.length : 0;
  const pct = counter ? Math.min(1, len / counter) : 0;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      font: 'var(--text-label)',
      color: focus ? 'var(--fog-50)' : 'var(--fog-200)',
      transition: 'color var(--dur-fast)'
    }
  }, label, counter && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 11px var(--font-mono)',
      color: pct > 0.9 ? 'var(--sun-400)' : 'var(--text-3)'
    }
  }, len, "/", counter)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement(Tag, _extends({
    rows: multiline ? rows : undefined,
    value: value,
    maxLength: counter,
    onFocus: e => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur && onBlur(e);
    }
  }, rest, {
    style: {
      display: 'block',
      width: '100%',
      padding: '14px 16px',
      font: '500 15px/1.5 var(--font-sans)',
      color: 'var(--fog-50)',
      background: focus ? 'var(--ink-800)' : 'var(--surface-well)',
      border: '1px solid ' + (error ? 'var(--rec-400)' : focus ? 'var(--orange-500)' : 'var(--line-2)'),
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 4px rgba(255,79,18,.18), 0 8px 30px rgba(255,79,18,.12)' : 'none',
      resize: multiline ? 'vertical' : undefined,
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-base) var(--ease-out), background var(--dur-fast)',
      ...inputStyle
    }
  })), counter && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 0,
      height: 2,
      borderRadius: 2,
      background: 'var(--orange-500)',
      transformOrigin: 'left',
      transform: 'scaleX(' + pct + ')',
      transition: 'transform var(--dur-base) var(--ease-out)',
      opacity: focus ? 1 : 0
    }
  })), (help || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 8,
      font: '400 12.5px/1.5 var(--font-sans)',
      color: error ? 'var(--rec-400)' : 'var(--text-3)'
    }
  }, error || help));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/motion/Aurora.jsx
try { (() => {
/** Animated light background: drifting blurred blobs + moving film grain. Place inside a position:relative parent. */
function Aurora({
  intensity = 1,
  grain = true,
  palette = 'fire',
  style
}) {
  const pals = {
    fire: ['rgba(255,79,18,.75)', 'rgba(255,214,10,.45)', 'rgba(255,79,18,.5)'],
    volt: ['rgba(212,255,58,.45)', 'rgba(255,79,18,.55)', 'rgba(212,255,58,.25)'],
    mono: ['rgba(255,255,255,.18)', 'rgba(255,255,255,.1)', 'rgba(255,79,18,.3)']
  };
  const [a, b, c] = pals[palette] || pals.fire;
  const blob = (bg, w, top, left, anim, dur) => /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top,
      left,
      width: w,
      height: w,
      borderRadius: '50%',
      background: 'radial-gradient(circle, ' + bg + ', transparent 65%)',
      filter: 'blur(40px)',
      opacity: intensity,
      animation: anim + ' ' + dur + 's var(--ease-in-out) infinite'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: grain ? 'ed-grain' : undefined,
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      ...style
    }
  }, blob(a, '60%', '-20%', '45%', 'ed-blob-1', 16), blob(b, '45%', '10%', '70%', 'ed-blob-2', 12), blob(c, '50%', '45%', '-10%', 'ed-blob-2', 18));
}
Object.assign(__ds_scope, { Aurora });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/Aurora.jsx", error: String((e && e.message) || e) }); }

// components/motion/Counter.jsx
try { (() => {
/** Number that counts up (expo-out) the first time it scrolls into view. */
function Counter({
  value = 100,
  duration = 1600,
  prefix = '',
  suffix = '',
  decimals = 0,
  style
}) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    let raf,
      started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - t0) / duration);
        setN(value * (1 - Math.pow(2, -10 * p)));
        if (p < 1) raf = requestAnimationFrame(tick);else setN(value);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === 'undefined' || !ref.current) {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(es => {
      if (es[0].isIntersecting && !started) {
        started = true;
        run();
        io.disconnect();
      }
    }, {
      threshold: 0.3
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      fontVariantNumeric: 'tabular-nums',
      ...style
    }
  }, prefix, n.toFixed(decimals).replace('.', ','), suffix);
}
Object.assign(__ds_scope, { Counter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/Counter.jsx", error: String((e && e.message) || e) }); }

// components/motion/KineticText.jsx
try { (() => {
/** Rotating word for headlines: each word blurs/slides in. Optional solid box behind it. */
function KineticText({
  words = [],
  interval = 1800,
  boxed = true,
  color = 'var(--ink-950)',
  box = 'var(--orange-500)',
  style
}) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setI(v => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'bottom',
      overflow: 'hidden',
      padding: boxed ? '0 0.14em 0.04em' : 0,
      borderRadius: boxed ? '0.12em' : 0,
      background: boxed ? box : 'transparent',
      color: boxed ? color : box,
      transition: 'width var(--dur-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-block',
      animation: 'ed-word-in .6s var(--ease-out) both'
    }
  }, words[i]));
}
Object.assign(__ds_scope, { KineticText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/KineticText.jsx", error: String((e && e.message) || e) }); }

// components/motion/Marquee.jsx
try { (() => {
/** Infinite ticker. Children are rendered twice and slide forever; pauses on hover. */
function Marquee({
  items = [],
  speed = 30,
  reverse,
  separator = '✦',
  tone = 'orange',
  size = 64,
  rotate = 0,
  pauseOnHover = true,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const tones = {
    orange: ['var(--orange-500)', 'var(--ink-950)', 'var(--fog-50)'],
    volt: ['var(--volt-400)', 'var(--ink-950)', 'var(--orange-500)'],
    black: ['var(--ink-950)', 'var(--fog-50)', 'var(--orange-500)'],
    white: ['var(--fog-50)', 'var(--ink-950)', 'var(--orange-500)'],
    outline: ['transparent', 'transparent', 'var(--orange-500)']
  };
  const [bg, fg, sep] = tones[tone] || tones.orange;
  const run = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: size * 0.45,
      paddingRight: size * 0.45,
      flex: 'none'
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 ' + size + 'px/1 var(--font-kinetic)',
      textTransform: 'uppercase',
      letterSpacing: '0.005em',
      color: fg,
      WebkitTextStroke: tone === 'outline' ? '1.5px var(--fog-400)' : undefined,
      whiteSpace: 'nowrap'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 ' + Math.round(size * 0.6) + 'px/1 var(--font-sans)',
      color: sep
    }
  }, separator))));
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      overflow: 'hidden',
      background: bg,
      padding: size * 0.28 + 'px 0',
      transform: rotate ? 'rotate(' + rotate + 'deg) scale(1.04)' : undefined,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: 'max-content',
      animation: 'ed-marquee ' + speed + 's linear infinite',
      animationDirection: reverse ? 'reverse' : 'normal',
      animationPlayState: pauseOnHover && hov ? 'paused' : 'running'
    }
  }, run, run));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/motion/Reveal.jsx
try { (() => {
/** Fades/slides its children up when they scroll into view. Stagger with `delay`. */
function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  style
}) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(es => {
      if (es[0].isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    style: {
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(' + y + 'px)',
      filter: on ? 'none' : 'blur(6px)',
      transition: 'opacity .8s var(--ease-out) ' + delay + 'ms, transform .8s var(--ease-out) ' + delay + 'ms, filter .8s var(--ease-out) ' + delay + 'ms',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Reveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/Reveal.jsx", error: String((e && e.message) || e) }); }

// components/site/Chip.jsx
try { (() => {
const ON = {
  white: ['var(--fog-50)', 'var(--ink-950)'],
  orange: ['var(--orange-500)', 'var(--ink-950)'],
  sun: ['var(--sun-400)', 'var(--ink-950)']
};
/** Pill toggle used for filters, chapters, caption fonts and motion picks. */
function Chip({
  selected = false,
  tone = 'white',
  count,
  size = 'md',
  font,
  onClick,
  children,
  style
}) {
  const [bg, fg] = ON[tone] || ON.white;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": selected ? 'true' : 'false',
    onClick: onClick,
    style: {
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: sm ? '8px 12px' : '9px 14px',
      minHeight: sm ? 34 : 36,
      borderRadius: 999,
      border: '1px solid var(--line-2)',
      cursor: 'pointer',
      font: `600 ${sm ? 12.5 : 13}px/1 ${font || 'var(--font-sans)'}`,
      whiteSpace: 'nowrap',
      background: selected ? bg : 'transparent',
      color: selected ? fg : 'var(--fog-200)',
      transition: 'background 200ms, color 200ms, transform 200ms var(--ease-spring)',
      ...style
    },
    onMouseDown: e => e.currentTarget.style.transform = 'scale(.95)',
    onMouseUp: e => e.currentTarget.style.transform = '',
    onMouseLeave: e => e.currentTarget.style.transform = ''
  }, children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      opacity: .6
    }
  }, count));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Chip.jsx", error: String((e && e.message) || e) }); }

// components/site/CreatorChip.jsx
try { (() => {
/** Glass pill with the creator's photo inside a spinning conic ring, name, role and a volt status line. */
function CreatorChip({
  name,
  role,
  status,
  photo,
  href,
  ring = true,
  style
}) {
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    target: href ? '_blank' : undefined,
    rel: href ? 'noopener' : undefined,
    style: {
      alignSelf: 'flex-start',
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '6px 16px 6px 6px',
      borderRadius: 999,
      background: 'rgba(23,23,27,.72)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--line-2)',
      boxShadow: 'var(--inner-glass)',
      color: 'var(--fog-50)',
      textDecoration: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: 'none',
      width: 44,
      height: 44
    }
  }, ring && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: -3,
      borderRadius: '50%',
      background: 'conic-gradient(var(--orange-500),var(--sun-400),var(--volt-400),var(--orange-500))',
      animation: 'ed-spin 6s linear infinite'
    }
  }), photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    width: "44",
    height: "44",
    style: {
      position: 'relative',
      display: 'block',
      width: 44,
      height: 44,
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid var(--ink-900)',
      boxSizing: 'border-box'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--ink-600)',
      border: '2px solid var(--ink-900)',
      boxSizing: 'border-box',
      font: '800 16px var(--font-sans)'
    }
  }, (name || '?')[0])), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 15,
      letterSpacing: '-0.01em'
    }
  }, name), role && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-2)'
    }
  }, role)), status && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--volt-400)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--volt-400)',
      flex: 'none'
    }
  }), status)));
}
Object.assign(__ds_scope, { CreatorChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/CreatorChip.jsx", error: String((e && e.message) || e) }); }

// components/site/Highlight.jsx
try { (() => {
const TONES = {
  orange: ['var(--orange-500)', 'var(--ink-950)'],
  volt: ['var(--volt-400)', 'var(--ink-950)'],
  white: ['var(--fog-50)', 'var(--ink-950)'],
  sun: ['var(--sun-400)', 'var(--ink-950)']
};
/** Solid block behind the keyword of a headline. Wraps across lines (box-decoration-break: clone). */
function Highlight({
  tone = 'orange',
  nowrap = false,
  children,
  style
}) {
  const [bg, fg] = TONES[tone] || TONES.orange;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: bg,
      color: fg,
      padding: '0 .14em',
      borderRadius: '.14em',
      WebkitBoxDecorationBreak: 'clone',
      boxDecorationBreak: 'clone',
      whiteSpace: nowrap ? 'nowrap' : undefined,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Highlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Highlight.jsx", error: String((e && e.message) || e) }); }

// components/site/LanguageSelect.jsx
try { (() => {
const DEFAULT = [{
  code: 'pt-BR',
  short: 'PT',
  native: 'Português',
  sub: 'Brasil',
  flag: 'br'
}, {
  code: 'en-US',
  short: 'EN',
  native: 'English',
  sub: 'United States',
  flag: 'us'
}, {
  code: 'es',
  short: 'ES',
  native: 'Español',
  sub: 'España · Latinoamérica',
  flag: 'es'
}];
const norm = v => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
/** Pill trigger (flag + code + chevron) opening a searchable, keyboard-navigable language list. */
function LanguageSelect({
  value = 'pt-BR',
  onChange,
  options = DEFAULT,
  flagBase = 'assets/flags/',
  showCode = true,
  label = 'Idioma',
  searchPlaceholder = 'Buscar idioma…',
  emptyText = 'Nenhum idioma encontrado',
  defaultOpen = false,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [q, setQ] = React.useState('');
  const [hi, setHi] = React.useState(0);
  const ref = React.useRef(null),
    input = React.useRef(null);
  const flag = o => `url(${o.flagUrl || flagBase + o.flag + '.svg'})`;
  const cur = options.find(o => o.code === value) || options[0];
  const list = options.filter(o => !q || norm(o.native + ' ' + o.sub + ' ' + o.code).includes(norm(q)));
  React.useEffect(() => {
    if (!open) return;
    setTimeout(() => input.current && input.current.focus(), 30);
    const down = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', down);
    return () => document.removeEventListener('pointerdown', down);
  }, [open]);
  const pick = o => {
    onChange && onChange(o.code);
    setOpen(false);
    setQ('');
  };
  const key = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHi(Math.min(hi + 1, list.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHi(Math.max(hi - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      list[hi] && pick(list[hi]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };
  const dot = (o, s) => /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: s,
      height: s,
      borderRadius: '50%',
      flex: 'none',
      backgroundColor: 'var(--ink-600)',
      backgroundImage: flag(o),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0 0 0 1px rgba(255,255,255,.2)'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setOpen(!open);
      setQ('');
      setHi(Math.max(0, options.indexOf(cur)));
    },
    "aria-haspopup": "listbox",
    "aria-expanded": open ? 'true' : 'false',
    "aria-label": label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 38,
      padding: '0 10px 0 7px',
      borderRadius: 999,
      border: '1px solid var(--line-2)',
      background: 'var(--glass-08)',
      color: 'var(--fog-50)',
      cursor: 'pointer',
      font: '700 12.5px/1 var(--font-sans)',
      letterSpacing: '.04em'
    }
  }, dot(cur, 22), showCode && /*#__PURE__*/React.createElement("span", null, cur.short), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    color: "var(--text-2)",
    style: {
      transition: 'transform 250ms var(--ease-spring)',
      transform: open ? 'rotate(180deg)' : 'none'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 12px)',
      right: 0,
      width: 'min(300px, calc(100vw - 28px))',
      boxSizing: 'border-box',
      zIndex: 70,
      borderRadius: 22,
      background: 'var(--ink-800)',
      border: '1px solid var(--line-2)',
      boxShadow: 'var(--shadow-lg)',
      padding: 8,
      animation: 'ed-scale-in 220ms var(--ease-out) both',
      transformOrigin: 'top right'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      padding: '0 10px 0 12px',
      borderRadius: 14,
      background: 'var(--ink-900)',
      border: '1px solid var(--line-1)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 15,
    color: "var(--text-3)"
  }), /*#__PURE__*/React.createElement("input", {
    ref: input,
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setHi(0);
    },
    onKeyDown: key,
    placeholder: searchPlaceholder,
    "aria-label": searchPlaceholder,
    autoComplete: "off",
    spellCheck: "false",
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 0,
      outline: 'none',
      color: 'var(--fog-50)',
      font: '500 16px var(--font-sans)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--text-3)',
      padding: '3px 6px',
      borderRadius: 6,
      border: '1px solid var(--line-2)'
    }
  }, "esc")), /*#__PURE__*/React.createElement("div", {
    role: "listbox",
    "aria-label": label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginTop: 6,
      maxHeight: 280,
      overflow: 'auto'
    }
  }, list.map((o, i) => {
    const sel = o.code === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.code,
      type: "button",
      role: "option",
      "aria-selected": sel ? 'true' : 'false',
      onClick: () => pick(o),
      onMouseEnter: () => setHi(i),
      style: {
        display: 'grid',
        gridTemplateColumns: '28px minmax(0,1fr) auto',
        gap: 12,
        alignItems: 'center',
        padding: 10,
        borderRadius: 14,
        border: 0,
        textAlign: 'left',
        cursor: 'pointer',
        color: 'var(--fog-50)',
        fontFamily: 'inherit',
        background: i === hi ? 'var(--ink-700)' : 'transparent'
      }
    }, dot(o, 28), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: 14.5
      }
    }, o.native), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-2)'
      }
    }, o.sub)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        letterSpacing: '.06em',
        padding: '4px 7px',
        borderRadius: 999,
        background: sel ? 'var(--orange-500)' : 'var(--glass-08)',
        color: sel ? 'var(--ink-950)' : 'var(--text-2)'
      }
    }, o.code));
  }), !list.length && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '18px 10px',
      textAlign: 'center',
      fontSize: 13.5,
      color: 'var(--text-2)'
    }
  }, emptyText))));
}
Object.assign(__ds_scope, { LanguageSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/LanguageSelect.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteHeader.jsx
try { (() => {
/** Floating glass-pill header: wordmark, section links, right-side slot (language + CTA). */
function SiteHeader({
  links = [],
  active,
  right,
  fixed = true,
  wordmarkSize = 19,
  onHome,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: fixed ? 'fixed' : 'relative',
      top: fixed ? 'max(10px, env(safe-area-inset-top))' : undefined,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 clamp(10px,3vw,40px)',
      pointerEvents: fixed ? 'none' : undefined,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto',
      width: '100%',
      maxWidth: 1360,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '6px 6px 6px 14px',
      borderRadius: 999,
      background: 'rgba(11,11,13,.66)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--line-2)',
      boxShadow: 'var(--inner-glass)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      if (onHome) {
        e.preventDefault();
        onHome();
      }
    },
    "aria-label": "Editonny",
    style: {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      minHeight: 40
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: wordmarkSize
  })), links.length > 0 && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Principal",
    style: {
      display: 'flex',
      gap: 2,
      marginLeft: 10,
      overflow: 'hidden'
    }
  }, links.map(l => {
    const on = active === l.href;
    return /*#__PURE__*/React.createElement("a", {
      key: l.href,
      href: l.href,
      onClick: l.onClick,
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: on ? 'var(--fog-50)' : 'var(--text-2)',
        background: on ? 'var(--glass-08)' : 'transparent',
        padding: '8px 12px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        transition: 'color 200ms, background 200ms'
      },
      onMouseEnter: e => {
        e.currentTarget.style.color = 'var(--fog-50)';
        e.currentTarget.style.background = 'var(--glass-08)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = on ? 'var(--fog-50)' : 'var(--text-2)';
        e.currentTarget.style.background = on ? 'var(--glass-08)' : 'transparent';
      }
    }, l.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flex: 'none'
    }
  }, right)));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/guia/Catalog.jsx
try { (() => {
(() => {
  const {
    SceneCard,
    PromptCard,
    TextField,
    SegmentedControl,
    Eyebrow,
    Dialog,
    Button,
    Reveal,
    Badge
  } = window.EditonnyDesignSystem_f6f5bd;
  const CENAS = [['Dinheiro subindo', 'Universais', 'quando a fala cita faturamento, lucro ou resultado em reais', 'contador', 'black'], ['Três passos empilhados', 'Universais', 'quando a fala resume um método em três etapas', 'passos', 'orange'], ['Antes e depois', 'Universais', 'quando a fala compara como era e como ficou, com dois números', 'antes', 'black'], ['Chamada final com botão', 'Universais', 'no fim do vídeo, na hora de pedir o toque no botão', 'seta', 'orange'], ['Marca-texto', 'Apontadores', 'para destacar uma palavra escrita na tela', 'tarja', 'black'], ['Zoom de ênfase', 'Entradas', 'quando a fala chega no ponto mais forte', 'zoom', 'fire'], ['Chat com IA', 'Interfaces', 'quando a fala mostra uma conversa com assistente', 'chat', 'volt'], ['Confete', 'Efeitos', 'para comemorar um resultado ou anúncio', 'confete', 'orange'], ['Comparação', 'Universais', 'quando a fala põe duas opções lado a lado', 'antes', 'volt']];
  const PEDIDOS = [['Começar', 'Meu primeiro vídeo', 'Um ponto de partida para transformar uma gravação em um vídeo claro.'], ['Começar', 'Testar o ambiente com um trecho', 'Confira as ferramentas antes de editar um projeto longo.'], ['Editar', 'Anúncio com uma mensagem clara', 'Gancho, demonstração e chamada com fatos do seu material.'], ['Editar', 'Reels de conteúdo', 'Uma ideia completa, com ritmo e sem venda forçada.'], ['Editar', 'VSL com momentos visuais', 'Organize a apresentação de venda e ilustre as passagens decisivas.'], ['Áudio', 'Limpar a voz', 'Ruído de fundo fora, palavras inteiras dentro.']];
  function Catalog({
    mode,
    go,
    toast
  }) {
    const isScenes = mode === 'catalogo';
    const groups = isScenes ? ['Todas', 'Universais', 'Apontadores', 'Interfaces', 'Efeitos'] : ['Todas', 'Começar', 'Editar', 'Áudio'];
    const [g, setG] = React.useState('Todas');
    const [q, setQ] = React.useState('');
    const [open, setOpen] = React.useState(null);
    React.useEffect(() => {
      setG('Todas');
      setQ('');
    }, [mode]);
    const list = (isScenes ? CENAS : PEDIDOS).filter(x => (g === 'Todas' || x[isScenes ? 1 : 0] === g) && x.join(' ').toLowerCase().includes(q.toLowerCase()));
    const box = t => /*#__PURE__*/React.createElement("span", {
      style: {
        background: isScenes ? 'var(--orange-500)' : 'var(--volt-400)',
        color: 'var(--ink-950)',
        padding: '0 .12em',
        borderRadius: '.1em'
      }
    }, t);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '40px 56px 100px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 40,
        marginBottom: 44
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
      index: isScenes ? '145' : '54',
      style: {
        marginBottom: 22
      }
    }, isScenes ? 'Biblioteca visual / Motion' : 'Biblioteca de pedidos / Exemplos'), /*#__PURE__*/React.createElement("h1", {
      key: mode,
      style: {
        margin: 0,
        font: '800 clamp(56px, 6.4vw, 100px)/0.92 var(--font-display)',
        letterSpacing: '-0.06em',
        animation: 'ed-word-in .8s var(--ease-out) both'
      }
    }, isScenes ? /*#__PURE__*/React.createElement(React.Fragment, null, "Uma ideia.", /*#__PURE__*/React.createElement("br", null), box('Muitas formas.')) : /*#__PURE__*/React.createElement(React.Fragment, null, "Uma inten\xE7\xE3o.", /*#__PURE__*/React.createElement("br", null), box('Um bom começo.')))), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 330,
        margin: 0,
        font: '500 16px/1.6 var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, isScenes ? 'Cenas para explicar, destacar e dar ritmo. Passe o mouse para ver cada uma se mexer.' : 'Do vídeo bruto ao acabamento. Encontre um exemplo e adapte o pedido à sua história.')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        paddingTop: 26,
        borderTop: '1px solid var(--line-1)',
        marginBottom: 30
      }
    }, /*#__PURE__*/React.createElement(TextField, {
      label: isScenes ? 'Buscar cenas' : 'Buscar exemplos e prompts',
      placeholder: isScenes ? 'Tente: comparação, título, passos…' : 'Tente: aula, áudio, legendas…',
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        flex: '1 1 320px'
      }
    }), /*#__PURE__*/React.createElement(SegmentedControl, {
      tone: "solid",
      options: groups,
      value: g,
      onChange: setG
    }), /*#__PURE__*/React.createElement(Badge, {
      mono: true,
      style: {
        marginBottom: 12
      }
    }, list.length, " ", isScenes ? 'CENAS' : 'PEDIDOS')), /*#__PURE__*/React.createElement("div", {
      key: mode + g + q,
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 16
      }
    }, list.map((x, i) => /*#__PURE__*/React.createElement("div", {
      key: x[0] + x[1],
      style: {
        animation: 'ed-fade-up .6s var(--ease-out) ' + i * 60 + 'ms both',
        display: 'flex'
      }
    }, isScenes ? /*#__PURE__*/React.createElement(SceneCard, {
      name: x[0],
      group: x[1],
      when: x[2],
      motif: x[3],
      bg: x[4],
      duration: 6,
      onClick: () => setOpen(x),
      style: {
        width: '100%'
      }
    }) : /*#__PURE__*/React.createElement(PromptCard, {
      index: String(i + 1).padStart(2, '0'),
      category: x[0],
      title: x[1],
      summary: x[2],
      onClick: () => setOpen(x),
      style: {
        width: '100%',
        minHeight: 260
      }
    }))), !list.length && /*#__PURE__*/React.createElement("p", {
      style: {
        gridColumn: '1/-1',
        color: 'var(--text-2)'
      }
    }, "Nada encontrado. Tente outra palavra.")), /*#__PURE__*/React.createElement(Dialog, {
      open: !!open,
      eyebrow: open && (isScenes ? open[1] : open[0]),
      title: open && (isScenes ? open[0] : open[1]),
      onClose: () => setOpen(null),
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        size: "sm",
        icon: "copy",
        onClick: () => {
          setOpen(null);
          toast('Pedido copiado.');
        }
      }, "Copiar pedido"), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconRight: "arrow-up-right",
        onClick: () => {
          setOpen(null);
          go('criar');
          toast(isScenes ? 'Cena adicionada ao seu pedido.' : 'Exemplo aplicado ao briefing.');
        }
      }, isScenes ? 'Usar no meu pedido' : 'Personalizar pedido'))
    }, open && (isScenes ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SceneCard, {
      name: open[0],
      group: open[1],
      motif: open[3],
      bg: open[4],
      autoplay: true,
      duration: 6,
      style: {
        width: '100%',
        pointerEvents: 'none'
      }
    })), "Use ", open[2], ".", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-3)',
        fontSize: 12
      }
    }, "Esquema ilustrativo. A composi\xE7\xE3o real \xE9 renderizada pelo agente.")) : open[2])));
  }
  window.Catalog = Catalog;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guia/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/guia/CreatePrompt.jsx
try { (() => {
(() => {
  const {
    TextField,
    Select,
    ChoiceCard,
    Button,
    Eyebrow,
    Card,
    Icon,
    Badge,
    Reveal
  } = window.EditonnyDesignSystem_f6f5bd;
  function CreatePrompt({
    toast
  }) {
    const [goal, setGoal] = React.useState('Um tutorial de 45 segundos ensinando a preparar um café, com etapas claras.');
    const [folder, setFolder] = React.useState('/Users/ana/Vídeos/cafe');
    const [format, setFormat] = React.useState('9:16 (vertical)');
    const [pace, setPace] = React.useState('natural, preservando pausas expressivas');
    const [fx, setFx] = React.useState('sutil, apenas quando ajudar a explicar a fala');
    const [agent, setAgent] = React.useState('claude');
    const cmd = agent === 'claude' ? '/editonny' : '$editonny';
    const prompt = cmd + '\n\nObjetivo: ' + goal + '\nPasta: ' + folder + '\nFormato: ' + format + '\nRitmo: ' + pace + '\nLegendas: legíveis, com destaque discreto nas palavras importantes\nMotion: ' + fx + '\n\nAntes do vídeo inteiro, prepare uma amostra de 8–15 segundos para eu revisar. Preserve os originais e o sentido da fala.';
    const [flash, setFlash] = React.useState(0);
    React.useEffect(() => {
      setFlash(f => f + 1);
    }, [prompt]);
    const sec = (n, t, children, d = 0) => /*#__PURE__*/React.createElement(Reveal, {
      delay: d
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '28px 0',
        borderTop: '1px solid var(--line-1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 40px/1 var(--font-kinetic)',
        color: 'var(--orange-500)'
      }
    }, n), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        font: '800 26px var(--font-display)',
        letterSpacing: '-0.04em'
      }
    }, t)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 18
      }
    }, children)));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '40px 56px 100px'
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      index: "\u2726",
      style: {
        marginBottom: 22
      }
    }, "Dire\xE7\xE3o criativa / Criar prompt"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '0 0 20px',
        font: '800 clamp(56px, 6.4vw, 100px)/0.92 var(--font-display)',
        letterSpacing: '-0.06em',
        animation: 'ed-word-in .8s var(--ease-out) both'
      }
    }, "Da sua ideia ao", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--orange-500)',
        color: 'var(--ink-950)',
        padding: '0 .12em',
        borderRadius: '.1em'
      }
    }, "primeiro corte.")), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 520,
        margin: '0 0 48px',
        font: '500 17px/1.6 var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, "Preencha o briefing e leve o pedido para sua IA. Nenhum arquivo \xE9 enviado por aqui."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
        gap: 56,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", null, sec('01', 'A história', /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextField, {
      label: "O que voc\xEA quer criar?",
      multiline: true,
      rows: 3,
      value: goal,
      onChange: e => setGoal(e.target.value)
    }), /*#__PURE__*/React.createElement(TextField, {
      label: "Pasta dos v\xEDdeos no seu computador",
      value: folder,
      onChange: e => setFolder(e.target.value),
      help: "Cole o caminho da pasta. O guia n\xE3o acessa nem envia os arquivos."
    }))), sec('02', 'O jeito de contar', /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-label)',
        color: 'var(--fog-200)',
        marginBottom: 8
      }
    }, "Formato"), /*#__PURE__*/React.createElement("div", {
      role: "radiogroup",
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 8
      }
    }, ['9:16 (vertical)', '1:1 (quadrado)', '4:5 (feed vertical)', '16:9 (horizontal)'].map(f => /*#__PURE__*/React.createElement(ChoiceCard, {
      key: f,
      compact: true,
      title: f.split(' ')[0],
      selected: format === f,
      onSelect: () => setFormat(f)
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Ritmo",
      value: pace,
      onChange: e => setPace(e.target.value),
      options: [{
        value: 'natural, preservando pausas expressivas',
        label: 'Natural e fluido'
      }, {
        value: 'dinâmico, com cortes precisos sem atropelar as palavras',
        label: 'Dinâmico e direto'
      }, {
        value: 'calmo, com espaço para a fala respirar',
        label: 'Calmo e contemplativo'
      }]
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Motion e efeitos",
      value: fx,
      onChange: e => setFx(e.target.value),
      options: [{
        value: 'sutil, apenas quando ajudar a explicar a fala',
        label: 'Sutil · só o necessário'
      }, {
        value: 'didático, com etapas, apontadores e títulos',
        label: 'Didático · ideias visuais'
      }, {
        value: 'expressivo, com transições e ênfases bem dosadas',
        label: 'Expressivo · mais movimento'
      }, {
        value: 'sem cenas de motion ou efeitos adicionais',
        label: 'Só edição · sem motion'
      }]
    }))), 80), sec('03', 'Sua ferramenta', /*#__PURE__*/React.createElement("div", {
      role: "radiogroup",
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(ChoiceCard, {
      icon: "terminal",
      title: "Codex",
      description: "$editonny",
      selected: agent === 'codex',
      onSelect: () => setAgent('codex')
    }), /*#__PURE__*/React.createElement(ChoiceCard, {
      icon: "sparkles",
      title: "Claude Code",
      description: "/editonny",
      selected: agent === 'claude',
      onSelect: () => setAgent('claude')
    })), 160)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 100
      }
    }, /*#__PURE__*/React.createElement(Card, {
      beam: true,
      padding: 26,
      radius: "2xl",
      style: {
        boxShadow: '0 40px 100px rgba(255,79,18,.12)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      dot: true
    }, "Seu pedido, pronto para levar"), /*#__PURE__*/React.createElement(Badge, {
      mono: true
    }, cmd)), /*#__PURE__*/React.createElement("pre", {
      key: flash,
      style: {
        minHeight: 330,
        margin: '0 0 20px',
        padding: 20,
        font: '600 12.5px/1.85 var(--font-mono)',
        color: 'var(--fog-50)',
        whiteSpace: 'pre-wrap',
        background: 'var(--ink-950)',
        border: '1px solid var(--line-1)',
        borderRadius: 'var(--radius-lg)',
        animation: 'ed-fade-in .4s both'
      }
    }, prompt, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: 8,
        height: 15,
        marginLeft: 2,
        verticalAlign: -2,
        background: 'var(--orange-500)',
        animation: 'ed-blink 1s steps(1) infinite'
      }
    })), /*#__PURE__*/React.createElement(Button, {
      block: true,
      size: "lg",
      icon: "copy",
      onClick: () => toast('Pedido copiado. Abra seu agente na pasta e cole.')
    }, "Copiar pedido"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '14px 0 0',
        textAlign: 'center',
        font: '500 12.5px/1.5 var(--font-sans)',
        color: 'var(--text-3)'
      }
    }, "Abra seu agente na pasta do projeto e cole o pedido.")))));
  }
  window.CreatePrompt = CreatePrompt;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guia/CreatePrompt.jsx", error: String((e && e.message) || e) }); }

// ui_kits/guia/Header.jsx
try { (() => {
(() => {
  const {
    Wordmark,
    Icon,
    Button
  } = window.EditonnyDesignSystem_f6f5bd;
  function GuiaHeader({
    page,
    go
  }) {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
      const f = () => setScrolled(window.scrollY > 24);
      f();
      window.addEventListener('scroll', f, {
        passive: true
      });
      return () => window.removeEventListener('scroll', f);
    }, []);
    const items = [['inicio', 'Início'], ['criar', 'Criar prompt'], ['catalogo', 'Catálogo'], ['exemplos', 'Exemplos']];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: scrolled ? '10px 24px' : '18px 24px',
        transition: 'padding var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        maxWidth: 1360,
        margin: '0 auto',
        padding: '8px 8px 8px 20px',
        background: scrolled ? 'rgba(11,11,13,.72)' : 'transparent',
        border: '1px solid ' + (scrolled ? 'var(--line-2)' : 'transparent'),
        borderRadius: 999,
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        boxShadow: scrolled ? '0 20px 50px rgba(0,0,0,.45)' : 'none',
        transition: 'all var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('inicio');
      },
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement(Wordmark, {
      size: 24
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 4
      }
    }, items.map(([k, l]) => {
      const on = page === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => go(k),
        style: {
          position: 'relative',
          height: 40,
          padding: '0 16px',
          font: '700 14px var(--font-sans)',
          color: on ? 'var(--fog-50)' : 'var(--fog-400)',
          background: on ? 'var(--glass-12)' : 'transparent',
          border: 0,
          borderRadius: 999,
          cursor: 'pointer',
          transition: 'color var(--dur-fast), background var(--dur-fast)'
        }
      }, l, on && /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: '50%',
          bottom: 5,
          width: 4,
          height: 4,
          marginLeft: -2,
          borderRadius: '50%',
          background: 'var(--orange-500)'
        }
      }));
    })), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: page === 'instalacao' ? 'volt' : 'primary',
      iconRight: "arrow-up-right",
      onClick: () => go('instalacao')
    }, "Instalar")));
  }
  window.GuiaHeader = GuiaHeader;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guia/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/guia/Hero.jsx
try { (() => {
(() => {
  const {
    Button,
    Eyebrow,
    Badge,
    Icon,
    KineticText,
    KineticCaption,
    Waveform,
    ProgressRing,
    Aurora
  } = window.EditonnyDesignSystem_f6f5bd;
  function FloatChip({
    children,
    style,
    delay = 0,
    rot
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        zIndex: 3,
        animation: (rot ? 'ed-float-r ' : 'ed-float ') + '4s var(--ease-in-out) ' + delay + 's infinite',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 12,
        background: 'rgba(23,23,27,.78)',
        border: '1px solid var(--line-2)',
        borderRadius: 20,
        boxShadow: '0 24px 60px rgba(0,0,0,.55)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        animation: 'ed-scale-in .8s var(--ease-spring) ' + (0.5 + delay) + 's both'
      }
    }, children));
  }
  function Phone() {
    const [p, setP] = React.useState(0.18);
    React.useEffect(() => {
      const id = setInterval(() => setP(v => v >= 1 ? 0.08 : Math.min(1, v + 0.02)), 140);
      return () => clearInterval(id);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 340,
        margin: '0 auto',
        animation: 'ed-fade-up 1s var(--ease-out) .2s both'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        inset: '-12% -30%',
        background: 'radial-gradient(closest-side, rgba(255,79,18,.55), transparent)',
        filter: 'blur(30px)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        aspectRatio: '9 / 19',
        padding: 10,
        background: 'var(--ink-950)',
        border: '1px solid var(--line-strong)',
        borderRadius: 54,
        boxShadow: '0 50px 120px rgba(0,0,0,.7), inset 0 0 0 2px #26262b',
        transform: 'rotate(3deg)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: '100%',
        borderRadius: 44,
        overflow: 'hidden',
        background: '#000'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/cidade.jpg",
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        animation: 'ed-kenburns 12s var(--ease-in-out) infinite alternate'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(5,5,6,.55), transparent 30%, transparent 55%, rgba(5,5,6,.85))'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 12,
        left: '50%',
        width: 96,
        height: 26,
        marginLeft: -48,
        borderRadius: 999,
        background: '#000'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 56,
        left: 18,
        right: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'inline-block',
        padding: '2px 8px',
        font: '400 34px/1 var(--font-kinetic)',
        color: 'var(--ink-950)',
        textTransform: 'uppercase',
        transform: 'rotate(-3deg)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--orange-500)',
        transformOrigin: 'left',
        animation: 'ed-sweep .9s var(--ease-snap) .6s both'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative'
      }
    }, "Ningu\xE9m te contou")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        font: '400 34px/1 var(--font-kinetic)',
        color: '#fff',
        textTransform: 'uppercase',
        animation: 'ed-word-in .7s var(--ease-out) 1.1s both'
      }
    }, "isso sobre caf\xE9")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 14,
        right: 14,
        bottom: 96
      }
    }, /*#__PURE__*/React.createElement(KineticCaption, {
      text: "Primeiro, noventa e quatro graus. Depois, o bloom.",
      size: 24,
      wps: 2.4
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 22,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        flex: 'none',
        borderRadius: '50%',
        background: 'var(--orange-500)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink-950)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pause",
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Waveform, {
      bars: 34,
      height: 26,
      progress: p,
      color: "var(--fog-50)",
      muted: "rgba(255,255,255,.25)"
    }))))), /*#__PURE__*/React.createElement(FloatChip, {
      delay: 0,
      style: {
        top: 70,
        left: -150
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 12,
        display: 'grid',
        placeItems: 'center',
        background: 'var(--orange-500)',
        color: 'var(--ink-950)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "scissors",
      size: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '800 15px var(--font-sans)'
      }
    }, "14 cortes"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: '600 11px var(--font-mono)',
        color: 'var(--volt-400)'
      }
    }, "0 palavras perdidas")))), /*#__PURE__*/React.createElement(FloatChip, {
      delay: 0.8,
      rot: true,
      style: {
        top: 250,
        right: -140
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(ProgressRing, {
      value: p,
      size: 64,
      thickness: 6
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '800 14px var(--font-sans)'
      }
    }, "Renderizando"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: '600 11px var(--font-mono)',
        color: 'var(--text-2)'
      }
    }, "1080p \xB7 9:16")))), /*#__PURE__*/React.createElement(FloatChip, {
      delay: 1.4,
      style: {
        bottom: 120,
        left: -170,
        width: 210
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '700 10px var(--font-mono)',
        letterSpacing: '.14em',
        color: 'var(--text-2)',
        marginBottom: 8
      }
    }, "VOZ \xB7 RU\xCDDO REMOVIDO"), /*#__PURE__*/React.createElement(Waveform, {
      bars: 28,
      height: 34,
      color: "var(--volt-400)",
      cuts: [[0.3, 0.4], [0.7, 0.76]]
    })), /*#__PURE__*/React.createElement(FloatChip, {
      delay: 2,
      rot: true,
      style: {
        bottom: 30,
        right: -110
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "\u2726 Motion"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 13px var(--font-sans)'
      }
    }, "Antes e depois"))));
  }
  function Hero({
    go
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        margin: '-96px 0 0',
        padding: '150px 56px 90px'
      }
    }, /*#__PURE__*/React.createElement(Aurora, null), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,.85fr)',
        gap: 40,
        alignItems: 'center',
        maxWidth: 1360,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 14px 6px 6px',
        marginBottom: 30,
        background: 'var(--glass-08)',
        border: '1px solid var(--line-2)',
        borderRadius: 999,
        backdropFilter: 'blur(14px)',
        animation: 'ed-fade-up .7s var(--ease-out) both'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "volt"
    }, "NOVO"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 13px var(--font-sans)',
        color: 'var(--fog-200)'
      }
    }, "Editor + Motion em um s\xF3 fluxo, no seu computador")), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '0 0 28px',
        font: '800 clamp(60px, 7.6vw, 124px)/0.9 var(--font-display)',
        letterSpacing: '-0.06em'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        animation: 'ed-word-in .9s var(--ease-out) .1s both'
      }
    }, "Voc\xEA tem"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        animation: 'ed-word-in .9s var(--ease-out) .2s both'
      }
    }, "a hist\xF3ria."), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        color: 'var(--fog-400)',
        animation: 'ed-word-in .9s var(--ease-out) .3s both'
      }
    }, "A gente d\xE1 o"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        marginTop: '0.06em',
        animation: 'ed-word-in .9s var(--ease-out) .4s both'
      }
    }, /*#__PURE__*/React.createElement(KineticText, {
      words: ['ritmo.', 'corte.', 'motion.', 'legenda.', 'som.'],
      interval: 1700
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 460,
        margin: '0 0 34px',
        font: '500 19px/1.55 var(--font-sans)',
        color: 'var(--fog-400)',
        animation: 'ed-fade-up .8s var(--ease-out) .5s both'
      }
    }, "Do bruto ao \xFAltimo detalhe. Corte, legendas, som e motion com a IA que voc\xEA j\xE1 usa \u2014 e um v\xEDdeo pronto para postar."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        animation: 'ed-fade-up .8s var(--ease-out) .6s both'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      iconRight: "arrow-up-right",
      onClick: () => go('criar')
    }, "Criar meu primeiro pedido"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "glass",
      icon: "terminal",
      onClick: () => go('instalacao')
    }, "Instalar a skill")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 18,
        marginTop: 30,
        font: '600 12px var(--font-mono)',
        letterSpacing: '.08em',
        color: 'var(--text-3)',
        animation: 'ed-fade-in 1s .9s both'
      }
    }, /*#__PURE__*/React.createElement("span", null, "/editonny ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--fog-200)'
      }
    }, "CLAUDE CODE")), /*#__PURE__*/React.createElement("span", null, "$editonny ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--fog-200)'
      }
    }, "CODEX")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--volt-400)'
      }
    }, "\u25CF 100% LOCAL"))), /*#__PURE__*/React.createElement(Phone, null)));
  }
  window.Hero = Hero;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guia/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/guia/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(() => {
  const {
    Button,
    Eyebrow,
    StepItem,
    PromptCard,
    Card,
    Marquee,
    Counter,
    Reveal,
    Waveform,
    KineticCaption,
    SceneCard,
    Timeline,
    Icon,
    Badge
  } = window.EditonnyDesignSystem_f6f5bd;
  const H2 = ({
    children,
    style
  }) => /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '800 clamp(44px, 5vw, 72px)/0.95 var(--font-display)',
      letterSpacing: '-0.055em',
      ...style
    }
  }, children);
  const Box = ({
    children,
    c = 'var(--orange-500)'
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      background: c,
      color: 'var(--ink-950)',
      padding: '0 .12em',
      borderRadius: '.1em'
    }
  }, children);
  function CutDemo() {
    const [cut, setCut] = React.useState(false);
    React.useEffect(() => {
      const id = setInterval(() => setCut(v => !v), 2200);
      return () => clearInterval(id);
    }, []);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 12,
        font: '700 11px var(--font-mono)',
        letterSpacing: '.12em'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-2)'
      }
    }, "BRUTO \xB7 01:12"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: cut ? 'var(--volt-400)' : 'var(--text-3)',
        transition: 'color var(--dur-base)'
      }
    }, cut ? 'CORTE · 00:45 ✓' : 'ANALISANDO PAUSAS…')), /*#__PURE__*/React.createElement(Waveform, {
      bars: 64,
      height: 86,
      cuts: cut ? [[0.12, 0.19], [0.38, 0.44], [0.63, 0.7], [0.86, 0.9]] : []
    }));
  }
  function FormatDemo() {
    const labels = ['9:16', '1:1', '16:9'];
    const [i, setI] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setI(v => (v + 1) % 3), 1500);
      return () => clearInterval(id);
    }, []);
    const dims = [[64, 112], [96, 96], [140, 80]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 130,
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: dims[i][0],
        height: dims[i][1],
        display: 'grid',
        placeItems: 'center',
        background: 'var(--fog-50)',
        color: 'var(--ink-950)',
        borderRadius: 14,
        font: '400 26px var(--font-kinetic)',
        transition: 'width var(--dur-slow) var(--ease-spring), height var(--dur-slow) var(--ease-spring)'
      }
    }, labels[i]));
  }
  function ReviewDemo() {
    const [t, setT] = React.useState(3);
    React.useEffect(() => {
      const id = setInterval(() => setT(v => v + 0.15 > 45 ? 0 : v + 0.15), 100);
      return () => clearInterval(id);
    }, []);
    return /*#__PURE__*/React.createElement(Timeline, {
      duration: 45,
      playhead: t,
      playing: true,
      segments: [{
        start: 0,
        end: 8,
        beat: 'Gancho',
        quote: 'Ninguém te contou'
      }, {
        start: 8,
        end: 26,
        beat: 'Passos',
        quote: '94 graus'
      }, {
        start: 26,
        end: 45,
        beat: 'Chamada',
        quote: 'Salva aí'
      }],
      marks: [{
        start: 30,
        end: 35
      }]
    });
  }
  const Tile = ({
    span,
    row,
    children,
    ...p
  }) => /*#__PURE__*/React.createElement(Card, _extends({
    spotlight: true,
    lift: true,
    padding: 28,
    radius: "2xl"
  }, p, {
    style: {
      gridColumn: 'span ' + span,
      gridRow: row ? 'span ' + row : undefined,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 24,
      minHeight: 280,
      ...(p.style || {})
    }
  }), children);
  const TileHead = ({
    k,
    t,
    d,
    dark
  }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 11px var(--font-mono)',
      letterSpacing: '.16em',
      marginBottom: 12,
      color: dark ? 'rgba(5,5,6,.6)' : 'var(--orange-500)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 30px/1 var(--font-display)',
      letterSpacing: '-0.045em',
      marginBottom: 8
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 14.5px/1.5 var(--font-sans)',
      color: dark ? 'rgba(5,5,6,.72)' : 'var(--text-2)',
      maxWidth: 380
    }
  }, d));
  function Home({
    go
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
      go: go
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 210,
        overflow: 'hidden',
        margin: '0 0 40px'
      }
    }, /*#__PURE__*/React.createElement(Marquee, {
      tone: "orange",
      size: 58,
      rotate: -3,
      speed: 34,
      items: ['Corte seco', 'Legendas palavra a palavra', 'Motion', 'Trilha sob medida', 'Ruído zero', '145 cenas'],
      style: {
        position: 'absolute',
        left: -40,
        right: -40,
        top: 30
      }
    }), /*#__PURE__*/React.createElement(Marquee, {
      tone: "volt",
      size: 40,
      reverse: true,
      rotate: 2.5,
      speed: 28,
      items: ['9:16', '16:9', '1:1', '4:5', 'Claude Code', 'Codex', '100% local'],
      style: {
        position: 'absolute',
        left: -40,
        right: -40,
        top: 118
      }
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '40px 56px 100px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 16
      }
    }, [[145, '', 'cenas de motion no catálogo', 'var(--orange-500)'], [54, '', 'pedidos prontos para adaptar', 'var(--fog-50)'], [4, '', 'formatos: vertical, quadrado, feed, horizontal', 'var(--fog-50)'], [100, '%', 'local. Nada sobe para a nuvem por aqui.', 'var(--volt-400)']].map(([v, s, l, c], i) => /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: i * 90
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '26px 0',
        borderTop: '2px solid ' + (i === 0 ? 'var(--orange-500)' : 'var(--line-2)')
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '400 clamp(64px, 7vw, 108px)/0.9 var(--font-kinetic)',
        color: c
      }
    }, /*#__PURE__*/React.createElement(Counter, {
      value: v,
      suffix: s
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        font: '600 14px/1.45 var(--font-sans)',
        color: 'var(--text-2)',
        maxWidth: 220
      }
    }, l)))))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '0 56px 110px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 40,
        marginBottom: 44
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
      index: "01",
      style: {
        marginBottom: 22
      }
    }, "Tudo em um fluxo"), /*#__PURE__*/React.createElement(H2, null, "Tudo que um editor faz.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fog-400)'
      }
    }, "Em uma"), " ", /*#__PURE__*/React.createElement(Box, null, "conversa."))), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 340,
        margin: 0,
        font: '500 16px/1.55 var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, "Editor e Motion trabalham juntos no seu computador. Voc\xEA revisa uma amostra antes de finalizar o v\xEDdeo inteiro."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0,1fr))',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Tile, {
      span: 7
    }, /*#__PURE__*/React.createElement(TileHead, {
      k: "EDITOR / CORTE",
      t: "Corte com inten\xE7\xE3o.",
      d: "Tira pausas, repeti\xE7\xF5es e erros sem perder palavras nem o sentido da fala."
    }), /*#__PURE__*/React.createElement(CutDemo, null)), /*#__PURE__*/React.createElement(Tile, {
      span: 5,
      variant: "orange"
    }, /*#__PURE__*/React.createElement(TileHead, {
      dark: true,
      k: "LEGENDAS",
      t: "Cada palavra, no tempo.",
      d: "Legendas palavra a palavra, pensadas para quem assiste sem som."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '18px 10px',
        background: 'var(--ink-950)',
        borderRadius: 20
      }
    }, /*#__PURE__*/React.createElement(KineticCaption, {
      text: "Pare de perder quem assiste sem som",
      size: 26,
      highlight: "var(--orange-500)"
    }))), /*#__PURE__*/React.createElement(Tile, {
      span: 4,
      padding: 10,
      style: {
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(SceneCard, {
      group: "Universais",
      name: "Dinheiro subindo",
      motif: "contador",
      bg: "black",
      autoplay: true,
      when: "Motion que explica: n\xFAmeros, passos, compara\xE7\xF5es.",
      style: {
        background: 'transparent',
        border: 0
      }
    })), /*#__PURE__*/React.createElement(Tile, {
      span: 4
    }, /*#__PURE__*/React.createElement(TileHead, {
      k: "FORMATOS",
      t: "Um v\xEDdeo, todo lugar.",
      d: "Reels, Stories, feed e YouTube a partir do mesmo material."
    }), /*#__PURE__*/React.createElement(FormatDemo, null)), /*#__PURE__*/React.createElement(Tile, {
      span: 4,
      variant: "volt"
    }, /*#__PURE__*/React.createElement(TileHead, {
      dark: true,
      k: "SOM",
      t: "Voz limpa. Trilha certa.",
      d: "Ru\xEDdo de fundo fora, trilha com o clima do v\xEDdeo."
    }), /*#__PURE__*/React.createElement(Waveform, {
      bars: 36,
      height: 70,
      color: "var(--ink-950)"
    })), /*#__PURE__*/React.createElement(Tile, {
      span: 12,
      style: {
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(0,.7fr) minmax(0,1.3fr)',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(TileHead, {
      k: "REVIS\xC3O",
      t: "Voc\xEA aprova antes do final.",
      d: "O preview abre no navegador: marque o trecho, diga o que mudar, aprove. A IA renderiza de novo."
    }), /*#__PURE__*/React.createElement(ReviewDemo, null)))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '0 56px 110px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
        gap: 72
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 120
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      index: "02",
      style: {
        marginBottom: 22
      }
    }, "Como funciona"), /*#__PURE__*/React.createElement(H2, null, "Menos opera\xE7\xF5es.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Box, {
      c: "var(--volt-400)"
    }, "Mais dire\xE7\xE3o.")), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 380,
        margin: '24px 0 30px',
        font: '500 16px/1.6 var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, "Este guia prepara o pedido. A edi\xE7\xE3o acontece no seu computador, com sua IA e o pacote instalado."), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconRight: "arrow-up-right",
      onClick: () => go('criar')
    }, "Montar meu pedido"))), /*#__PURE__*/React.createElement("div", null, [['01', 'Conte o que quer dizer', 'Escolha o objetivo, indique a pasta dos vídeos e defina o tom. Não precisa conhecer uma timeline.'], ['02', 'Acerte o primeiro corte', 'A IA confere o ambiente, trabalha o corte e prepara uma amostra de 8–15 segundos. Você avalia o ritmo e o visual.'], ['03', 'Dê o acabamento', 'Legendas, som e motion ajudam a contar a história. Depois da sua revisão, a IA finaliza e verifica o arquivo.']].map(([n, t, d], i) => /*#__PURE__*/React.createElement(Reveal, {
      key: n,
      delay: i * 110
    }, /*#__PURE__*/React.createElement(StepItem, {
      number: n,
      title: t,
      last: i === 2
    }, d))))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '0 56px 110px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 36
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
      index: "03",
      style: {
        marginBottom: 22
      }
    }, "Um bom ponto de partida"), /*#__PURE__*/React.createElement(H2, null, "Comece com uma inten\xE7\xE3o.")), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconRight: "arrow-up-right",
      onClick: () => go('exemplos')
    }, "Ver os 54 pedidos"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 16
      }
    }, [['Educar', 'Ensinar com clareza', 'Um tutorial direto, com etapas visuais.'], ['Apresentar', 'Apresentar uma ideia', 'Uma história curta que dá vontade de ouvir.'], ['Demonstrar', 'Mostrar a diferença', 'Antes e depois, usando suas provas reais.']].map(([c, t, s], i) => /*#__PURE__*/React.createElement(Reveal, {
      key: t,
      delay: i * 90
    }, /*#__PURE__*/React.createElement(PromptCard, {
      index: '0' + (i + 1),
      category: c,
      title: t,
      summary: s,
      action: "Usar este ponto de partida",
      onClick: () => go('criar'),
      style: {
        width: '100%',
        minHeight: 280
      }
    }))))), /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '0 56px 80px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      className: "ed-grain",
      style: {
        position: 'relative',
        overflow: 'hidden',
        padding: '72px 64px 64px',
        background: 'var(--orange-500)',
        color: 'var(--ink-950)',
        borderRadius: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        font: '400 clamp(72px, 9vw, 150px)/0.84 var(--font-kinetic)',
        textTransform: 'uppercase',
        letterSpacing: '-0.005em'
      }
    }, "Seu pr\xF3ximo v\xEDdeo", /*#__PURE__*/React.createElement("br", null), "come\xE7a com ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fog-50)'
      }
    }, "um pedido.")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
        marginTop: 44,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: 420,
        font: '600 17px/1.5 var(--font-sans)'
      }
    }, "Monte o briefing em dois minutos e leve para o Claude Code ou o Codex."), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "dark",
      iconRight: "arrow-up-right",
      onClick: () => go('criar')
    }, "Vamos criar")), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        right: -60,
        top: -60,
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: '2px solid rgba(5,5,6,.25)',
        animation: 'ed-ring 3s var(--ease-out) infinite'
      }
    })))));
  }
  window.Home = Home;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guia/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/guia/Install.jsx
try { (() => {
(() => {
  const {
    StepItem,
    CommandLine,
    Accordion,
    Card,
    Button,
    Eyebrow,
    Reveal
  } = window.EditonnyDesignSystem_f6f5bd;
  function Install({
    go,
    toast
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1360,
        margin: '0 auto',
        padding: '40px 56px 100px'
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      index: "\u2318",
      style: {
        marginBottom: 22
      }
    }, "Prepare seu est\xFAdio / Instala\xE7\xE3o"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '0 0 20px',
        font: '800 clamp(56px, 6.4vw, 100px)/0.92 var(--font-display)',
        letterSpacing: '-0.06em',
        animation: 'ed-word-in .8s var(--ease-out) both'
      }
    }, "Um pacote.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--volt-400)',
        color: 'var(--ink-950)',
        padding: '0 .12em',
        borderRadius: '.1em'
      }
    }, "Seu jeito de criar.")), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 520,
        margin: '0 0 48px',
        font: '500 17px/1.6 var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, "Editor e Motion juntos. Uma skill port\xE1til para Codex e Claude Code, executada no seu computador."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)',
        gap: 64,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--line-1)'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(StepItem, {
      number: "01",
      title: "Abra a pasta do projeto"
    }, "Com o reposit\xF3rio baixado, abra um terminal na pasta que cont\xE9m install.py. Prepare Python 3.9+, uv, FFmpeg/ffprobe, Node.js 22+ e seu agente de IA.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 80
    }, /*#__PURE__*/React.createElement(StepItem, {
      number: "02",
      title: "Registre a skill"
    }, "O instalador compartilha o mesmo pacote com as duas ferramentas.", /*#__PURE__*/React.createElement(CommandLine, {
      typing: true,
      command: "python3 install.py --target both",
      style: {
        marginTop: 14
      },
      onCopy: () => toast('Comando copiado.')
    }))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 160
    }, /*#__PURE__*/React.createElement(StepItem, {
      number: "03",
      title: "Confira antes de editar"
    }, "Rode o diagn\xF3stico. Resolva os itens pendentes antes do render.", /*#__PURE__*/React.createElement(CommandLine, {
      command: "python3 ~/.local/share/editonny/scripts/editonny.py doctor",
      style: {
        marginTop: 14
      },
      onCopy: () => toast('Comando copiado.')
    }))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 240
    }, /*#__PURE__*/React.createElement(StepItem, {
      number: "04",
      title: "Fa\xE7a seu primeiro pedido",
      last: true
    }, "No Codex, chame $editonny. No Claude Code, use /editonny. Pe\xE7a uma amostra antes do projeto completo.", /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      iconRight: "arrow-up-right",
      onClick: () => go('criar')
    }, "Montar meu pedido"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Card, {
      variant: "orange",
      padding: 30,
      radius: "2xl",
      className: "ed-grain"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '700 11px var(--font-mono)',
        letterSpacing: '.16em',
        marginBottom: 14,
        color: 'rgba(5,5,6,.65)'
      }
    }, "PREFERE PEDIR \xC0 IA?"), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '0 0 18px',
        font: '400 52px/0.9 var(--font-kinetic)',
        textTransform: 'uppercase',
        color: 'var(--ink-950)'
      }
    }, "A instala\xE7\xE3o tamb\xE9m come\xE7a com um pedido."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 20px',
        padding: 18,
        font: '600 12.5px/1.8 var(--font-mono)',
        color: 'var(--fog-50)',
        background: 'var(--ink-950)',
        borderRadius: 'var(--radius-lg)'
      }
    }, "Instale o editonny deste reposit\xF3rio para Codex e Claude Code usando o instalador do projeto. Confira as depend\xEAncias com o diagn\xF3stico e explique o que falta antes de baixar ferramentas ou usar servi\xE7os pagos."), /*#__PURE__*/React.createElement(Button, {
      block: true,
      variant: "dark",
      icon: "copy",
      onClick: () => toast('Pedido de instalação copiado.')
    }, "Copiar pedido de instala\xE7\xE3o"))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 100
    }, /*#__PURE__*/React.createElement(Accordion, {
      items: [{
        title: 'Skill global ou plugin?',
        body: 'A instalação registra a skill em ~/.local/share/editonny, com links em ~/.agents/skills (Codex) e ~/.claude/skills (Claude). Não é necessário instalar as duas formas.'
      }, {
        title: 'Atualizar com segurança',
        body: 'Execute novamente o instalador. A versão anterior vai para ~/.local/share/editonny-backups/ e os arquivos .env são preservados.'
      }, {
        title: 'O que roda localmente? Tem custo?',
        body: 'Este guia monta pedidos, reúne exemplos e consulta o catálogo. Não faz upload nem edição no navegador. Serviços externos são opcionais e exigem sua autorização.'
      }, {
        title: 'Como revisar a primeira amostra?',
        body: 'Ouça palavras cortadas, confira a fidelidade das legendas e veja se o enquadramento preserva o assunto. Peça os ajustes antes de finalizar tudo.'
      }]
    })))));
  }
  window.Install = Install;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guia/Install.jsx", error: String((e && e.message) || e) }); }

// ui_kits/preview/CutView.jsx
try { (() => {
(() => {
  const {
    Card,
    Transport,
    Timeline,
    MarkItem,
    Button,
    TextField,
    Kbd,
    Badge,
    KineticCaption,
    ProgressRing
  } = window.EditonnyDesignSystem_f6f5bd;
  const SEGS = [{
    start: 0,
    end: 6,
    beat: 'Gancho',
    quote: 'Ninguém te contou isso sobre café'
  }, {
    start: 6,
    end: 17,
    beat: 'Problema',
    quote: 'A maioria passa do ponto da água'
  }, {
    start: 17,
    end: 33,
    beat: 'Passo a passo',
    quote: 'Primeiro, 94 graus. Depois, o bloom'
  }, {
    start: 33,
    end: 45,
    beat: 'Chamada',
    quote: 'Salva pra testar amanhã'
  }];
  function CutView({
    final,
    onApprove,
    toast
  }) {
    const [t, setT] = React.useState(9.2);
    const [playing, setPlaying] = React.useState(false);
    const [marks, setMarks] = React.useState([{
      start: 22,
      end: 26,
      note: 'tira essa parte, ficou repetido'
    }]);
    const [inPt, setIn] = React.useState(null);
    const [note, setNote] = React.useState('');
    React.useEffect(() => {
      if (!playing) return;
      const id = setInterval(() => setT(v => v + .1 > 45 ? 0 : v + .1), 100);
      return () => clearInterval(id);
    }, [playing]);
    const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(2).padStart(5, '0')}`;
    const seg = SEGS.find(s => t >= s.start && t < s.end) || SEGS[0];
    const add = e => {
      e.preventDefault();
      setMarks([...marks, {
        start: inPt,
        end: Math.max(inPt + .5, t),
        note: note || 'ajustar este trecho'
      }]);
      setIn(null);
      setNote('');
      toast('Marcação adicionada');
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0,1fr)',
        gap: 20,
        padding: '16px 20px 20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 340
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => setPlaying(!playing),
      style: {
        position: 'relative',
        aspectRatio: '9 / 16',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: '#000',
        border: '1px solid var(--line-1)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/cidade.jpg",
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: `${30 + t}% 50%`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--grad-protect)'
      }
    }), (final || t < 6) && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '18%',
        left: 20,
        right: 20,
        font: '800 30px/1.05 var(--font-caption-clean)',
        textTransform: 'uppercase',
        color: '#fff',
        textShadow: '0 2px 12px rgba(0,0,0,.5)'
      }
    }, "Ningu\xE9m te contou ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--gold-400)'
      }
    }, "isso"), " sobre caf\xE9"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '14%',
        left: 14,
        right: 14
      }
    }, /*#__PURE__*/React.createElement(KineticCaption, {
      key: seg.quote,
      text: seg.quote,
      playing: playing,
      loop: false,
      size: 24,
      highlight: final ? 'var(--sun-400)' : 'var(--fog-50)'
    })), !playing && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 64,
        height: 64,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: 'var(--glass-28)',
        border: '1px solid rgba(255,255,255,.25)',
        backdropFilter: 'blur(8px)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 0,
        height: 0,
        marginLeft: 5,
        borderLeft: '20px solid #fff',
        borderTop: '12px solid transparent',
        borderBottom: '12px solid transparent'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 14,
        right: 14
      }
    }, final ? /*#__PURE__*/React.createElement(Badge, {
      tone: "volt",
      live: true
    }, "FINAL \xB7 1080p") : /*#__PURE__*/React.createElement(Badge, {
      mono: true
    }, "CORTE v2"))), /*#__PURE__*/React.createElement(Transport, {
      playing: playing,
      onToggle: () => setPlaying(!playing),
      time: fmt(t),
      duration: "00:45.00",
      onStep: d => setT(v => Math.max(0, Math.min(45, v + d / 30)))
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        minHeight: 36,
        font: '400 12.5px/1.45 var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        font: '700 10px var(--font-sans)',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'var(--ember-300)',
        marginRight: 6
      }
    }, seg.beat), "\u201C", seg.quote, "\u201D")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: 16,
      radius: "lg"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        font: '650 13px var(--font-sans)'
      }
    }, "Linha do tempo"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 12px var(--font-sans)',
        color: 'var(--text-3)'
      }
    }, "Clique para navegar \xB7 2 cliques marcam o trecho")), /*#__PURE__*/React.createElement(Timeline, {
      duration: 45,
      playhead: t,
      playing: playing,
      segments: SEGS,
      marks: marks,
      onSeek: setT
    })), /*#__PURE__*/React.createElement(Card, {
      padding: 16,
      radius: "lg",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        font: '650 13px var(--font-sans)'
      }
    }, "Marca\xE7\xF5es ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-3)',
        fontWeight: 500
      }
    }, marks.length)), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 12px var(--font-sans)',
        color: 'var(--warning-400)'
      }
    }, "N\xE3o salvo")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 12px',
        font: '400 12.5px var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, "Achou algo para mudar? Marque o come\xE7o e o fim do trecho e diga o que fazer."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "dark",
      onClick: () => setIn(t)
    }, "Marcar in\xEDcio ", /*#__PURE__*/React.createElement(Kbd, null, "I")), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "dark",
      disabled: inPt === null
    }, "Marcar fim ", /*#__PURE__*/React.createElement(Kbd, null, "O")), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      icon: "sparkles",
      onClick: () => toast('Pedido de motion em ' + fmt(t))
    }, "Motion aqui ", /*#__PURE__*/React.createElement(Kbd, null, "M"))), inPt !== null && /*#__PURE__*/React.createElement("form", {
      onSubmit: add,
      style: {
        display: 'grid',
        gap: 8,
        padding: 12,
        marginBottom: 12,
        background: 'var(--surface-raised)',
        border: '1px solid var(--accent-line)',
        borderRadius: 'var(--radius-md)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 12px var(--font-mono)',
        color: 'var(--ember-300)'
      }
    }, fmt(inPt), " \u2013 ", fmt(Math.max(inPt + .5, t))), /*#__PURE__*/React.createElement(TextField, {
      autoFocus: true,
      placeholder: "O que mudar neste trecho? Ex.: tira essa parte",
      value: note,
      onChange: e => setNote(e.target.value)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      type: "button",
      onClick: () => setIn(null)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      type: "submit"
    }, "Adicionar marca\xE7\xE3o"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 6
      }
    }, marks.map((m, i) => /*#__PURE__*/React.createElement(MarkItem, {
      key: i,
      index: i + 1,
      range: `${fmt(m.start)} – ${fmt(m.end)}`,
      note: m.note,
      current: t >= m.start && t <= m.end,
      onRemove: () => setMarks(marks.filter((_, j) => j !== i))
    })))), /*#__PURE__*/React.createElement(Card, {
      padding: 12,
      radius: "lg",
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: 12,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Coment\xE1rio para o agente (opcional)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, final && /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "download"
    }, "Baixar v\xEDdeo"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => toast('Marcações salvas')
    }, "Salvar marca\xE7\xF5es"), /*#__PURE__*/React.createElement(Button, {
      variant: "volt",
      icon: "check",
      onClick: onApprove
    }, "Aprovar")))));
  }
  window.CutView = CutView;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/preview/CutView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/preview/StyleView.jsx
try { (() => {
(() => {
  const {
    ChoiceCard,
    Switch,
    TextField,
    Button,
    Card,
    SegmentedControl
  } = window.EditonnyDesignSystem_f6f5bd;
  const TYPES = [['Câmera cheia', 'Você ocupa a tela toda', 'user'], ['Tela dividida', 'Imagem em cima, você embaixo', 'rows-2'], ['Tela verde', 'Fundo trocado atrás de você', 'layers']];
  const HOOKS = ['Tarja', 'Caixa alta', 'Manuscrito', 'Neon'];
  const CAPS = [['Palavra a palavra', 'var(--font-caption-clean)'], ['Impacto', 'var(--font-caption-impact)'], ['Marcador', 'var(--font-caption-marker)'], ['Discreta', 'var(--font-sans)']];
  const MUSIC = [['Calma', 'respira com a fala'], ['Batida calma', 'lo-fi leve'], ['Alegre', 'energia para dicas'], ['Sem trilha', 'só a voz']];
  const SWATCHES = ['#FFC400', '#FF5A1F', '#FFFFFF', '#6FD3A0', '#8FB4FF'];
  function Sec({
    n,
    title,
    sub,
    children
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '20px 0 24px',
        borderBottom: '1px solid var(--line-1)'
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        gap: 12,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 26,
        height: 26,
        flex: 'none',
        font: '700 11px var(--font-mono)',
        color: 'var(--text-2)',
        border: '1px solid var(--line-strong)',
        borderRadius: '50%'
      }
    }, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        font: '650 16px var(--font-sans)'
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: '400 13px var(--font-sans)',
        color: 'var(--text-2)'
      }
    }, sub))), children);
  }
  function StyleView({
    toast
  }) {
    const [type, setType] = React.useState(0);
    const [accent, setAccent] = React.useState('#FFC400');
    const [hook, setHook] = React.useState('Ninguém te contou isso sobre café');
    const [hs, setHs] = React.useState(0);
    const [cap, setCap] = React.useState(0);
    const [music, setMusic] = React.useState(1);
    const [pv, setPv] = React.useState('hook');
    const [el, setEl] = React.useState({
      legendas: true,
      gancho: true,
      animacoes: true,
      chamada: false
    });
    const grid = (min, children) => /*#__PURE__*/React.createElement("div", {
      role: "radiogroup",
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
        gap: 10
      }
    }, children);
    const thumb = (label, font, on) => /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: '9 / 16',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        padding: 8,
        borderRadius: 10,
        background: on ? 'var(--ink-950)' : 'var(--orange-500)',
        font: `800 15px/1.1 ${font}`,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: on ? accent : 'var(--ink-950)',
        transition: 'background var(--dur-fast), color var(--dur-fast)'
      }
    }, label);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 340px',
        gap: 28,
        maxWidth: 1240,
        margin: '0 auto',
        padding: '8px 20px 40px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Sec, {
      n: "1",
      title: "Tipo de edi\xE7\xE3o",
      sub: "Como voc\xEA aparece na tela."
    }, grid(210, TYPES.map((x, i) => /*#__PURE__*/React.createElement(ChoiceCard, {
      key: i,
      icon: x[2],
      title: x[0],
      description: x[1],
      selected: type === i,
      onSelect: () => setType(i)
    })))), /*#__PURE__*/React.createElement(Sec, {
      n: "2",
      title: "Cor de destaque",
      sub: "Usada nas legendas, no gancho e na chamada."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: accent,
        border: '1px solid var(--line-strong)'
      }
    }), /*#__PURE__*/React.createElement("code", {
      style: {
        padding: '10px 14px',
        font: '600 13px var(--font-mono)',
        background: 'var(--surface-well)',
        border: '1px solid var(--line-2)',
        borderRadius: 'var(--radius-md)'
      }
    }, accent), SWATCHES.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      "aria-label": c,
      onClick: () => setAccent(c),
      style: {
        width: 28,
        height: 28,
        padding: 0,
        borderRadius: '50%',
        background: c,
        border: '2px solid var(--bg-page)',
        boxShadow: accent === c ? '0 0 0 2px var(--text-1)' : '0 0 0 1px var(--line-strong)',
        cursor: 'pointer'
      }
    })))), /*#__PURE__*/React.createElement(Sec, {
      n: "3",
      title: "Gancho",
      sub: "A frase que aparece nos primeiros segundos."
    }, /*#__PURE__*/React.createElement(TextField, {
      label: "Texto do gancho",
      counter: 90,
      value: hook,
      onChange: e => setHook(e.target.value),
      help: "Deixe vazio para o agente sugerir.",
      style: {
        marginBottom: 14
      }
    }), grid(120, HOOKS.map((h, i) => /*#__PURE__*/React.createElement(ChoiceCard, {
      key: h,
      media: /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%'
        }
      }, thumb(h, i === 2 ? 'var(--font-caption-hand)' : i === 1 ? 'var(--font-caption-impact)' : 'var(--font-caption-clean)', hs === i)),
      title: "",
      selected: hs === i,
      onSelect: () => setHs(i),
      style: {
        flexDirection: 'column',
        padding: 6
      }
    })))), /*#__PURE__*/React.createElement(Sec, {
      n: "4",
      title: "Legendas",
      sub: "Pensadas para quem assiste sem som."
    }, grid(120, CAPS.map((c, i) => /*#__PURE__*/React.createElement(ChoiceCard, {
      key: c[0],
      media: /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%'
        }
      }, thumb('cada palavra', c[1], cap === i), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8,
          font: '600 13px var(--font-sans)'
        }
      }, c[0])),
      title: "",
      selected: cap === i,
      onSelect: () => setCap(i),
      style: {
        flexDirection: 'column',
        padding: 6
      }
    })))), /*#__PURE__*/React.createElement(Sec, {
      n: "5",
      title: "Elementos",
      sub: "Ligue s\xF3 o que combina com o seu v\xEDdeo."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
        gap: 8
      }
    }, [['legendas', 'Legendas'], ['gancho', 'Gancho na abertura'], ['animacoes', 'Animações de motion'], ['chamada', 'Chamada no final']].map(([k, l]) => /*#__PURE__*/React.createElement(Switch, {
      key: k,
      label: l,
      checked: el[k],
      onChange: v => setEl({
        ...el,
        [k]: v
      })
    })))), /*#__PURE__*/React.createElement(Sec, {
      n: "6",
      title: "Trilha de fundo",
      sub: "Escolha o clima da m\xFAsica. A trilha sai da sua biblioteca."
    }, grid(190, MUSIC.map((m, i) => /*#__PURE__*/React.createElement(ChoiceCard, {
      key: m[0],
      icon: i === 3 ? 'volume-x' : 'music',
      title: m[0],
      description: m[1],
      selected: music === i,
      onSelect: () => setMusic(i)
    }))))), /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'sticky',
        top: 16,
        alignSelf: 'start',
        display: 'grid',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: 14,
      radius: "lg"
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      options: [{
        value: 'hook',
        label: 'Gancho'
      }, {
        value: 'caption',
        label: 'Legenda'
      }],
      value: pv,
      onChange: setPv,
      style: {
        display: 'flex',
        marginBottom: 12
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        aspectRatio: '9 / 16',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: '#000'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/cidade.jpg",
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--grad-protect)'
      }
    }), pv === 'hook' ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '16%',
        left: 18,
        right: 18,
        font: `800 26px/1.05 ${hs === 2 ? 'var(--font-caption-hand)' : hs === 1 ? 'var(--font-caption-impact)' : 'var(--font-caption-clean)'}`,
        textTransform: hs === 2 ? 'none' : 'uppercase',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: hs === 0 ? accent : 'transparent',
        color: hs === 0 ? 'var(--ink-900)' : hs === 3 ? accent : '#fff',
        textShadow: hs === 3 ? `0 0 18px ${accent}` : 'none',
        padding: hs === 0 ? '0 6px' : 0,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone'
      }
    }, hook || 'Seu gancho aqui')) : /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '18%',
        left: 0,
        right: 0,
        textAlign: 'center',
        font: `800 22px ${CAPS[cap][1]}`,
        color: '#fff',
        textTransform: 'uppercase'
      }
    }, "cada ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: accent
      }
    }, "palavra"))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '10px 0 0',
        textAlign: 'center',
        font: '400 12px var(--font-sans)',
        color: 'var(--text-3)'
      }
    }, "Amostra aproximada. O render final sai do agente.")), /*#__PURE__*/React.createElement(Card, {
      padding: 16,
      radius: "lg"
    }, /*#__PURE__*/React.createElement("dl", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0,1fr)',
        gap: '7px 14px',
        margin: '0 0 14px',
        font: '400 13px var(--font-sans)'
      }
    }, [['Tipo', TYPES[type][0]], ['Destaque', accent], ['Gancho', HOOKS[hs]], ['Legenda', CAPS[cap][0]], ['Trilha', MUSIC[music][0]]].map(([k, v]) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: k
    }, /*#__PURE__*/React.createElement("dt", {
      style: {
        color: 'var(--text-3)'
      }
    }, k), /*#__PURE__*/React.createElement("dd", {
      style: {
        margin: 0,
        textAlign: 'right'
      }
    }, v)))), /*#__PURE__*/React.createElement(Button, {
      block: true,
      onClick: () => toast('Estilo salvo. O agente vai renderizar o final.')
    }, "Salvar estilo"))));
  }
  window.StyleView = StyleView;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/preview/StyleView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/preview/TopBar.jsx
try { (() => {
(() => {
  const {
    Wordmark,
    SegmentedControl,
    IconButton,
    StatusLine
  } = window.EditonnyDesignSystem_f6f5bd;
  function TopBar({
    tab,
    setTab,
    status,
    onHelp
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
        alignItems: 'center',
        gap: 16,
        height: 64,
        padding: '0 20px',
        background: 'var(--bg-deep)',
        borderBottom: '1px solid var(--line-1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Wordmark, {
      iconOnly: true,
      size: 26
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '650 15px var(--font-sans)'
      }
    }, "Preview da edi\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-3)'
      }
    }, "/ cafe-tutorial")), /*#__PURE__*/React.createElement(SegmentedControl, {
      options: [{
        value: 'cut',
        label: 'Corte',
        dot: status.awaiting === 'cut'
      }, {
        value: 'style',
        label: 'Estilo',
        dot: status.awaiting === 'style'
      }, {
        value: 'final',
        label: 'Final'
      }],
      value: tab,
      onChange: setTab
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        justifySelf: 'end'
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "keyboard",
      label: "Atalhos do teclado",
      onClick: onHelp,
      size: 40
    }))), /*#__PURE__*/React.createElement(StatusLine, {
      state: status.state,
      badge: status.badge,
      text: status.text,
      meta: status.meta
    }));
  }
  window.TopBar = TopBar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/preview/TopBar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CommandLine = __ds_scope.CommandLine;

__ds_ns.MediaCard = __ds_scope.MediaCard;

__ds_ns.PromptCard = __ds_scope.PromptCard;

__ds_ns.SceneCard = __ds_scope.SceneCard;

__ds_ns.StepItem = __ds_scope.StepItem;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.KineticCaption = __ds_scope.KineticCaption;

__ds_ns.MarkItem = __ds_scope.MarkItem;

__ds_ns.Timeline = __ds_scope.Timeline;

__ds_ns.Transport = __ds_scope.Transport;

__ds_ns.Waveform = __ds_scope.Waveform;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.StatusLine = __ds_scope.StatusLine;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.ChoiceCard = __ds_scope.ChoiceCard;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Aurora = __ds_scope.Aurora;

__ds_ns.Counter = __ds_scope.Counter;

__ds_ns.KineticText = __ds_scope.KineticText;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.CreatorChip = __ds_scope.CreatorChip;

__ds_ns.Highlight = __ds_scope.Highlight;

__ds_ns.LanguageSelect = __ds_scope.LanguageSelect;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
