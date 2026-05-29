export function StarfieldFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in srgb, var(--color-nebula-light) 60%, transparent), transparent), radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--color-orbit) 30%, transparent), transparent 50%), radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 45%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, var(--color-star), transparent),
            radial-gradient(1px 1px at 80px 120px, var(--color-star-dim), transparent),
            radial-gradient(1.5px 1.5px at 160px 80px, var(--color-star), transparent),
            radial-gradient(1px 1px at 240px 200px, var(--color-star-dim), transparent),
            radial-gradient(1px 1px at 320px 40px, var(--color-star), transparent)
          `,
          backgroundSize: '360px 240px',
        }}
      />
    </div>
  )
}
