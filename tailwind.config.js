/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          container: 'hsl(var(--primary-container))',
          'on-container': 'hsl(var(--on-primary-container))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          container: 'hsl(var(--secondary-container))',
          'on-container': 'hsl(var(--on-secondary-container))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          dim: 'hsl(var(--surface-dim))',
          container: 'hsl(var(--surface-container))',
          'container-low': 'hsl(var(--surface-container-low))',
          'container-lowest': 'hsl(var(--surface-container-lowest))',
          'container-high': 'hsl(var(--surface-container-high))',
          variant: 'hsl(var(--surface-variant))',
        },
        outline: {
          DEFAULT: 'hsl(var(--outline))',
          variant: 'hsl(var(--outline-variant))',
        },
        inverse: {
          surface: 'hsl(var(--inverse-surface))',
          'on-surface': 'hsl(var(--inverse-on-surface))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
      },
      fontFamily: {
        display: ['"Brygada 1918"', 'serif'],
        headline: ['"Brygada 1918"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '24px',
        full: '9999px',
      },
      spacing: {
        'gutter-xs': '4px',
        'gutter-sm': '8px',
        'gutter-md': '12px',
        'gutter-lg': '16px',
        'gutter-xl': '24px',
        'section': '28px',
        'page-margin': '16px',
      },
      fontSize: {
        'display-lg': ['40px', { lineHeight: '46px', letterSpacing: '-0.5px', fontWeight: '700' }],
        'display-mobile': ['28px', { lineHeight: '34px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '38px', letterSpacing: '-0.25px', fontWeight: '600' }],
        'headline-mobile': ['22px', { lineHeight: '28px', letterSpacing: '0px', fontWeight: '600' }],
        'headline-sm': ['18px', { lineHeight: '24px', letterSpacing: '0px', fontWeight: '600' }],
        'title-md': ['16px', { lineHeight: '22px', letterSpacing: '0px', fontWeight: '700' }],
        'body-md': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.2px', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '700' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.3px', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}
