const CLOUDS = [
  [-8, 8, 46, 0.06, 50, 1],
  [52, 2, 42, 0.1, 40, 1.2],
  [18, 25, 52, 0.14, 60, 0.9],
  [60, 45, 46, 0.08, 45, 1.1],
  [-10, 65, 50, 0.12, 55, 1],
  [48, 75, 44, 0.05, 42, 1.3],
  [15, 85, 48, 0.09, 48, 1],
]

export default function Backdrop() {
  return (
    <>
      <div className="pagebg" />
      <div className="clouds" aria-hidden="true">
        {CLOUDS.map(([l, t, w, s, d, sc], n) => (
          <div className="cl" key={n} style={{ left: `${l}%`, top: `${t}%`, width: `${w}vw`, '--s': s, '--sc': sc }}>
            <i style={{ '--d': `${d}s` }} />
          </div>
        ))}
      </div>
      <div className="ambient-particles" aria-hidden="true">
        <div className="dust-particle dp-1" />
        <div className="dust-particle dp-2" />
        <div className="dust-particle dp-3" />
        <div className="dust-particle dp-4" />
      </div>
      <div id="pg" />
    </>
  )
}

