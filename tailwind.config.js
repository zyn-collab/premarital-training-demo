/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Segoe UI'", 'system-ui', 'sans-serif'],
      },
      colors: {
        // Kaiveni Portal palette
        cream: '#FAF6F2',
        'cream-section': '#F5EDE6',
        peach: '#F0C4AD',
        terracotta: {
          DEFAULT: '#C44B34',
          dark:    '#A33B27',
          light:   '#fff5f3',
          pale:    '#F5EDE6',
        },
        navy: {
          DEFAULT: '#1B3F61',
          dark:    '#142F4A',
          light:   '#EEF2F7',
        },
        orange: '#E8926B',

        // Remap emerald → Kaiveni palette so existing emerald-* classes work
        // emerald-50/100  = light tints  (success / badge backgrounds)
        // emerald-500     = terracotta   (borders, focus rings, left-border accents)
        // emerald-600     = navy         (primary buttons, progress bar fill)
        // emerald-700     = navy-dark    (button hover)
        // emerald-800     = terracotta-dark (text on tinted backgrounds)
        emerald: {
          50:  '#fff5f3',
          100: '#F5EDE6',
          200: '#fce0d8',
          500: '#C44B34',
          600: '#1B3F61',
          700: '#142F4A',
          800: '#A33B27',
        },
      },
      boxShadow: {
        card:    '0 2px 12px rgba(0,0,0,0.07)',
        'card-hv': '0 6px 20px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
