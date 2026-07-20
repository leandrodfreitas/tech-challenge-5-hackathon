/**
 * Constantes centralizadas para temas e espaçamento
 * Evita duplicação de código em componentes
 */

export const FONT_SIZE_MAP = {
  small: '12px',
  medium: '14px',
  large: '16px',
} as const

export const FONT_SIZE_HEADING_MAP = {
  small: '18px',
  medium: '22px',
  large: '26px',
} as const

export const FONT_SIZE_CHART_MAP = {
  small: '20px',
  medium: '28px',
  large: '32px',
} as const

export const SPACING_MAP = {
  compact: '12px',
  normal: '16px',
  wide: '24px',
} as const

export type FontSize = keyof typeof FONT_SIZE_MAP
export type Spacing = keyof typeof SPACING_MAP
