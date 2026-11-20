// Stroke icon set (24×24). Usage: <Icon name="arrowRight" size={18} />
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  pause: <path d="M8 5v14M16 5v14" />,
  play: <path d="M7 5l12 7-12 7V5z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 3H6v18h12V7l-4-4z" />
      <path d="M14 3v4h4M9 13h6M9 17h6" />
    </>
  ),
  badgeCheck: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  paw: (
    <>
      <circle cx="7" cy="9" r="1.8" />
      <circle cx="12" cy="6.5" r="1.8" />
      <circle cx="17" cy="9" r="1.8" />
      <path d="M12 12c-3 0-5 3-5 5.5 0 1.5 1.5 2 2.5 1.6.9-.4 1.6-.6 2.5-.6s1.6.2 2.5.6c1 .4 2.5-.1 2.5-1.6C17 15 15 12 12 12z" />
    </>
  ),
  homeHeart: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M12 17s-3-1.8-3-4a1.6 1.6 0 0 1 3-.9 1.6 1.6 0 0 1 3 .9c0 2.2-3 4-3 4z" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" />
      <path d="M4 19a2 2 0 0 1 2-2h13" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M14.8 9.2l3.6-3.6M5.6 18.4l3.6-3.6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M2 20h20" />,
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18M16 15h2" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  message: <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z" />,
  whatsapp: (
    <>
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z" />
      <path d="M9.2 8.6c-.4.9-.2 2.2.9 3.6s2.6 2.4 3.6 2.6c.8.2 1.4-.2 1.7-.8l-1.6-1-.8.6c-.7-.3-1.7-1.2-2-2l.6-.8-1-1.6c-.6.1-1.1.6-1.4 1.4z" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  photo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 16-5-5-8 8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 2.5 20h19L12 3.5z" />
      <path d="M12 10v4.5M12 17.3v.01" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 12h18a9 7 0 0 1-18 0z" />
      <path d="M9 21h6M8.5 8c0-1.5 1-2 1-3.5M12.5 8c0-1.5 1-2 1-3.5" />
    </>
  ),
  woman: (
    <>
      <circle cx="12" cy="8.5" r="5" />
      <path d="M12 13.5V21M9 18h6" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M5 8.5 12 10l7-1.5M12 10v4.5M12 14.5 9 21M12 14.5 15 21" />
    </>
  ),
  village: (
    <>
      <path d="M2.5 21h19" />
      <path d="M4 21V11.5L8.5 8 13 11.5V21M13 21v-6.5l3.5-3 3.5 3V21M7.5 21v-4h2v4" />
    </>
  ),
  diya: (
    <>
      <path d="M12 3c1.6 2 2.2 3.1 2.2 4.2a2.2 2.2 0 0 1-4.4 0C9.8 6.1 10.4 5 12 3z" />
      <path d="M3.5 12.5h17a8.5 5.5 0 0 1-17 0z" />
      <path d="M9 21h6M12 18v3" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
}

export default function Icon({ name, size = 24, strokeWidth = 2, className, style }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {path}
    </svg>
  )
}
