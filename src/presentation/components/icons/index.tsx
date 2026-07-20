/**
 * Ícones minimalistas em SVG
 * Reutilizáveis e acessíveis
 */

interface IconProps {
  style?: React.CSSProperties
  className?: string
}

export function IconBell({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export function IconWave({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M12 2c-3.3 0-6 1.3-6 3v2c0 1.7-2.7 3-6 3v2c3.3 0 6 1.3 6 3v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-2c0-1.7 2.7-3 6-3v-2c-3.3 0-6-1.3-6-3V5c0-1.7-2.7-3-6-3z" />
    </svg>
  )
}

export function IconFrequencyDaily({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle cx="12" cy="17" r="2" />
    </svg>
  )
}

export function IconFrequencyWeekly({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 15l2 2 4-4" />
    </svg>
  )
}

export function IconMobile({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 21h6" />
    </svg>
  )
}

export function IconDisabled({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M4 4l16 16" />
    </svg>
  )
}

export function IconCheckmark({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M5 12l5 5L19 7" />
    </svg>
  )
}

export function IconClose({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  )
}

export function IconWarning({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M12 2l10 18H2L12 2z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  )
}

export function IconClipboard({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M9 2h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z" />
      <rect x="3" y="6" width="18" height="14" rx="2" />
    </svg>
  )
}

export function IconArrowBack({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function IconFont({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <text x="12" y="18" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor">
        Aa
      </text>
    </svg>
  )
}

export function IconContrast({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20V2z" fill="black" />
    </svg>
  )
}

export function IconNavigation({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="2" y="14" width="8" height="8" rx="1" />
      <rect x="14" y="14" width="8" height="8" rx="1" />
    </svg>
  )
}

export function IconSecurity({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M12 1l8 3v7c0 5.55-3.84 10.74-8 12-4.16-1.26-8-6.45-8-12V4z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

export function IconHeart({ style, className }: IconProps) {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={style} className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
