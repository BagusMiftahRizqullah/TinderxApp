export interface AppTheme {
  colors: {
    background: string
    surface: string
    primary: string
    accent: string
    success: string
    textPrimary: string
    textSecondary: string
    border: string
    overlayGradient: string[]
    likeGradient: string[]
    nopeGradient: string[]
  }
  spacing: (v: number) => number
  radius: { sm: number; md: number; lg: number }
  typography: {
    title: { fontSize: number; lineHeight: number; fontWeight: string }
    subtitle: { fontSize: number; lineHeight: number; fontWeight: string }
    body: { fontSize: number; lineHeight: number; fontWeight: string }
    caption: { fontSize: number; lineHeight: number; fontWeight: string }
  }
}

export const spacing = (v: number) => v

export const lightTheme: AppTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F7F8FB',
    primary: '#5B48D1',
    accent: '#FF5A5F',
    success: '#22C55E',
    textPrimary: '#0E0F14',
    textSecondary: '#5A5F72',
    border: '#E6E8EF',
    overlayGradient: ['transparent', 'rgba(0,0,0,0.6)'],
    likeGradient: ['#34D399', '#10B981'],
    nopeGradient: ['#FF6B6B', '#EF4444']
  },
  spacing,
  radius: { sm: 16, md: 20, lg: 24 },
  typography: {
    title: { fontSize: 32, lineHeight: 36, fontWeight: '700' },
    subtitle: { fontSize: 20, lineHeight: 24, fontWeight: '600' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
    caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' }
  }
}

export const darkTheme: AppTheme = {
  colors: {
    background: '#0E0F14',
    surface: '#141721',
    primary: '#6C5DD3',
    accent: '#FF6B6B',
    success: '#34D399',
    textPrimary: '#FFFFFF',
    textSecondary: '#A9B0C5',
    border: '#262A36',
    overlayGradient: ['transparent', 'rgba(0,0,0,0.6)'],
    likeGradient: ['#34D399', '#10B981'],
    nopeGradient: ['#FF6B6B', '#EF4444']
  },
  spacing,
  radius: { sm: 16, md: 20, lg: 24 },
  typography: {
    title: { fontSize: 32, lineHeight: 36, fontWeight: '700' },
    subtitle: { fontSize: 20, lineHeight: 24, fontWeight: '600' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
    caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' }
  }
}
