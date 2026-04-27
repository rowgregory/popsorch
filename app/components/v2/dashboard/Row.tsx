import Link from 'next/link'

export function Row({ children, href }: { children: React.ReactNode; href?: string }) {
  const cls =
    'flex items-center justify-between gap-2 px-3 py-2 border-b border-border-dark/30 last:border-0 hover:bg-surface-dark transition-colors'
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  return <div className={cls}>{children}</div>
}
