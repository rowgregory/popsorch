'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body
        style={{ background: '#000', color: '#fff', fontFamily: 'system-ui', padding: '2rem', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>500</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.6 }}>Something went wrong</p>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#da0032',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  )
}
