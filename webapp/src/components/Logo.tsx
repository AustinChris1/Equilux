/**
 * The Equals Seal — an equals sign where only one side is shown: the solid
 * bar is the published aggregate, the hollow bar is the sealed payroll it
 * was proven from. Equality with one half deliberately kept empty.
 * Draws in currentColor so it recolors with its context.
 */
export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="11" y="21" width="42" height="9" rx="4.5" fill="currentColor" />
      <rect
        x="12.5"
        y="35.5"
        width="39"
        height="6"
        rx="3"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function LogoLockup({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="wordmark" style={{ fontSize: size * 0.95 }}>
        Equilux
      </span>
    </span>
  );
}
