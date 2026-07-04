export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  category: 'dark' | 'light';
  colors: {
    bg: string;
    bgSecondary: string;
    bgTertiary: string;
    bgElevated: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    accentGlow: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    textOnAccent: string;
    border: string;
    borderHover: string;
    success: string;
    warning: string;
    info: string;
  };
  style: {
    borderRadius: string;
    shadowIntensity: string;
    gridOpacity: string;
    cardStyle: 'glass' | 'solid' | 'outlined';
    animationStyle: 'smooth' | 'snappy' | 'dramatic';
    fontWeight: 'normal' | 'bold';
  };
}

export const themes: ThemeConfig[] = [
  {
    id: 'morandi-light',
    name: 'Morandi Light',
    description: '浅色莫兰迪色系，源自项目 LOGO 的奶油米白与雾霭石板蓝，柔和高级、留白克制',
    category: 'light',
    colors: {
      bg: '#f6f4ef',
      bgSecondary: '#fcfaf5',
      bgTertiary: '#efebe2',
      bgElevated: '#e6e1d6',
      accent: '#5c7385',
      accentLight: '#6f879a',
      accentDark: '#3f5666',
      accentGlow: 'rgba(92, 115, 133, 0.16)',
      text: '#2d3a45',
      textSecondary: '#5d6b78',
      textTertiary: '#8d97a3',
      textOnAccent: '#f6f4ef',
      border: '#ddd7ca',
      borderHover: '#c8c0b0',
      success: '#7ba88a',
      warning: '#c9a96a',
      info: '#6b8ca8',
    },
    style: {
      borderRadius: '16px',
      shadowIntensity: 'subtle',
      gridOpacity: '0.05',
      cardStyle: 'solid',
      animationStyle: 'smooth',
      fontWeight: 'normal',
    },
  },
  {
    id: 'apple-dark',
    name: 'ASPIRE Launch Dark',
    description: 'High-contrast launch-page theme with near-black surfaces, precise borders, and a restrained cyan-green accent.',
    category: 'dark',
    colors: {
      bg: '#07090b',
      bgSecondary: '#0f1317',
      bgTertiary: '#151b20',
      bgElevated: '#1b2329',
      accent: '#8bd8c7',
      accentLight: '#b8f1e5',
      accentDark: '#4da995',
      accentGlow: 'rgba(139, 216, 199, 0.22)',
      text: '#f4f7f6',
      textSecondary: '#b6c0bd',
      textTertiary: '#74817e',
      textOnAccent: '#06100d',
      border: '#253039',
      borderHover: '#3a4a54',
      success: '#8bd8a7',
      warning: '#d9bd73',
      info: '#8eb7d8',
    },
    style: {
      borderRadius: '8px',
      shadowIntensity: 'subtle',
      gridOpacity: '0.025',
      cardStyle: 'outlined',
      animationStyle: 'smooth',
      fontWeight: 'normal',
    },
  },
];

export const defaultTheme = themes[1];
