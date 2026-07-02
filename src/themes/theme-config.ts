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
    name: 'Apple Minimal Dark',
    description: '极简高级暗色风，精致留白与微妙光晕，参考 Apple、Linear 设计语言',
    category: 'dark',
    colors: {
      bg: '#050505',
      bgSecondary: '#0a0a0a',
      bgTertiary: '#131313',
      bgElevated: '#1a1a1a',
      accent: '#5c7385',
      accentLight: '#6f879a',
      accentDark: '#3f5666',
      accentGlow: 'rgba(92, 115, 133, 0.2)',
      text: '#f5f5f5',
      textSecondary: '#a0a0a0',
      textTertiary: '#666666',
      textOnAccent: '#f5f5f5',
      border: '#1f1f1f',
      borderHover: '#333333',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
    style: {
      borderRadius: '18px',
      shadowIntensity: 'subtle',
      gridOpacity: '0.025',
      cardStyle: 'glass',
      animationStyle: 'smooth',
      fontWeight: 'normal',
    },
  },
];

export const defaultTheme = themes[0];
