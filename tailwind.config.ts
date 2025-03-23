import type { Config } from 'tailwindcss'

export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        conertconoir: '#1c1a18',
        darkcrimson: '#1c1416',
        charcoalgray: '#333333',
        midnightblack: '#121212',
        blaze: '#da0032',
        blazehover: '#e32b4d',
        deepmidnight: '#0b1120',
        midnightsteel: '#182134',
        slatemist: '#7f8593',
        maestroshadow: '#252a37',
        silkfog: '#e1e2e4',
        shadowblue: '#080d19',
        deepspaceblue: '#162646',
        cosmicabyss: '#0b1628',
        mutedslate: '#838593',
        charcoalnight: '#252a35',
        irongray: '#2a303f',
        graphite: '#2c303e',
        mist: '#e4e5e4',
        slategray: '#5B5C66',
        gunmetal: '#2a303d',
        silver: '#d1d1d1',
        lavendermist: '#f6f3f9',
        slatebluegray: '#bac2cc',
        velveteclipse: '#211e2d',
        deepblack: '#0a0a0a'
      },
      maxWidth: {
        1190: '1190px',
        1320: '1320px'
      },
      backgroundImage: {
        banner: "url('/images/m-6.jpg')"
      },
      animation: {
        'equalizer-1': 'equalizer 0.7s ease-in-out infinite alternate',
        'equalizer-2': 'equalizer 0.7s ease-in-out infinite alternate 0.15s',
        'equalizer-3': 'equalizer 0.7s ease-in-out infinite alternate 0.3s',
        'equalizer-4': 'equalizer 0.7s ease-in-out infinite alternate 0.45s',
        'equalizer-1-mobile': 'equalizer-mobile 0.7s ease-in-out infinite alternate',
        'equalizer-2-mobile': 'equalizer-mobile 0.7s ease-in-out infinite alternate 0.15s',
        'equalizer-3-mobile': 'equalizer-mobile 0.7s ease-in-out infinite alternate 0.3s',
        'equalizer-4-mobile': 'equalizer-mobile 0.7s ease-in-out infinite alternate 0.45s',
        'rotate-ring': 'rotateRing 15s linear infinite'
      },
      keyframes: {
        equalizer: {
          '0%': { width: '56px' },
          '50%': { width: '30px' },
          '100%': { width: '56px' }
        },
        'equalizer-mobile': {
          '0%': { width: '32px' },
          '50%': { width: '16px' },
          '100%': { width: '32px' }
        },
        rotateRing: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      },
      screens: {
        430: '430px',
        576: '576px',
        760: '760px',
        990: '990px',
        1160: '1160px',
        1200: '1200px',
        1315: '1315px',
        1400: '1400px',
        1590: '1590px',
        1690: '1690px'
      },
      borderWidth: {
        1: '1px',
        3: '3px'
      },
      fontSize: {
        11: '11px',
        13: '13px',
        15: '15px',
        17: '17px',
        18: '18px',
        19: '19px',
        21: '21px',
        23: '23px'
      },
      boxShadow: {
        navdropdown: '0 8px 15px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
} satisfies Config
