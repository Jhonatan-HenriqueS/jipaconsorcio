import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/#inicio"
      prefetch={false}
      className="brand-mark"
      data-inverse={inverse || undefined}
    >
      <svg aria-hidden="true" viewBox="0 0 48 38" width="42" height="34">
        <path d="M3 23 22 7l22 16" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M10 25v9h28v-9M19 34V23h10v11" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M5 17h10" stroke="var(--brand-red)" strokeWidth="4" />
      </svg>
      <span>
        <strong>JIPA</strong>
        <small>Consórcios</small>
      </span>
    </Link>
  );
}
