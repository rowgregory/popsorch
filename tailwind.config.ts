import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

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
        deepblack: '#0a0a0a',
        berryPunch: '#bc2970',
        sunburst: '#ff9000',
        sunbursthover: '#e67f0a',
        charcoalblue: '#283035',
        'gg-crimson': '#C21067',
        'gg-plum': '#933886',
        'gg-grape': '#5C4A8A',
        'gg-navy': '#334D77',
        'gg-slate': '#2F4858',
        'md-electricraspberry': '#DF0073',
        'mg-royalorchid': '#C438B0',
        'mg-violetpulse': '#8463DF',
        'mg-boltblue': '#0080F5',
        'mg-skysurge': '#0092EE',
        'cp-earthbrown': '#574240',
        'cp-dustyrose': '#BFA5A3',
        'cp-deepleaf': '#447A00',
        'cp-springbud': '#7DAF00',
        'cube-p-mutedrose': '#A5757C',
        'cube-p-slatebluegray': '#798897',
        cottoncandypink: '#f587c1',
        dullchartreuse: '#7daf00',
        duskgray: '#222',
        inkblack: '#1a1a1a',
        gold1: '#db9e45',
        gold2: '#f5b424'
      },
      maxWidth: {
        1190: '1190px',
        1320: '1320px'
      },
      backgroundImage: {
        banner: "url('/images/m-6.jpg')",
        headerbg: "url('/images/header-bg.png')",
        golden50Logo: "url('/images/golden-logo.png')",
        white50Logo: "url('/images/white-logo.png')",
        grain: "url('/images/grain.png')",
        'gold-gradient': 'linear-gradient(to right, #db9e45, #f5b424)'
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
        'rotate-ring': 'rotateRing 15s linear infinite',
        'translate-y-up': 'translate-y-up 0.3s ease-out',
        'underline-grow': 'grow 1s ease-out forwards',
        rotateToTwoOClock: 'rotateToTwoOClock 375ms ease-in-out forwards',
        grain: 'grain 8s steps(10) infinite'
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
        },
        'translate-y-up': {
          '0%': {
            transform: 'translateY(50px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '3rem' } // match `after:w-12`
        },
        rotateToTwoOClock: {
          '0%': { transform: 'rotate(0deg)' },
          '40%': { transform: 'rotate(30deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        grain: {
          '0%, 100%': {
            transform: 'translate(0, 0)'
          },
          '10%': {
            transform: 'translate(-5%, -10%)'
          },
          '20%': {
            transform: 'translate(-10%, 5%)'
          },
          '30%': {
            transform: 'translate(5%, -5%)'
          },
          '40%': {
            transform: 'translate(-2%, 10%)'
          },
          '50%': {
            transform: 'translate(8%, 2%)'
          },
          '60%': {
            transform: 'translate(-8%, -3%)'
          },
          '70%': {
            transform: 'translate(3%, 8%)'
          },
          '80%': {
            transform: 'translate(-6%, -8%)'
          },
          '90%': {
            transform: 'translate(4%, -2%)'
          }
        }
      },
      screens: {
        'max-h-768': { raw: '(max-height: 768px)' },
        'min-h-768': { raw: '(min-height: 768px)' },
        'max-h-1000': { raw: '(max-height: 1000px)' },
        'max-h-1200': { raw: '(max-height: 1200px)' },
        'min-h-1400': { raw: '(min-height: 1400px)' },
        430: '430px',
        480: '480px',
        576: '576px',
        760: '760px',
        990: '990px',
        1100: '1100px',
        1160: '1160px',
        1200: '1200px',
        1280: '1280px',
        1315: '1315px',
        1360: '1360px',
        1400: '1400px',
        1590: '1590px',
        1690: '1690px',
        2300: '2300px',
        2800: '2800px',
        3200: '3200px'
      },
      borderWidth: {
        1: '1px',
        3: '3px'
      },
      fontSize: {
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
        15: '15px',
        17: '17px',
        18: '18px',
        19: '19px',
        20: '20px',
        21: '21px',
        22: '22px',
        23: '23px',
        25: '25px',
        27: '27px',
        30: '30px'
      },
      boxShadow: {
        navdropdown: '0 8px 15px rgba(0, 0, 0, 0.2)',
        adminpage: '0 2px 4px rgba(3,20,63,.1)',
        adminbtn: '0 10px 15px -4px rgba(218,0,50,.4)',
        adminbtnbackwards: '0 10px 15px -4px rgba(186,188,191,0.6)',
        adminConcertRow: '0 2px 4px rgba(60,63,71,.101961)'
      },
      height: {
        600: '600px'
      },
      maxHeight: {
        '1000': '1000px',
        '1600': '1600px'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        oswald: ['var(--font-oswald)'],
        raleway: ['var(--font-raleway)'],
        changa: ['var(--font-changa)'],
        lato: ['var(--font-lato)']
      }
    }
  },
  plugins: []
} satisfies Config
