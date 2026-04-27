export function StatPill({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-2 border-r border-border-dark last:border-0 shrink-0">
      <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-muted-dark whitespace-nowrap">{label}</span>
      <span
        className={`font-quicksand font-black text-base leading-none ${accent ? 'text-primary-dark' : 'text-text-dark'}`}
      >
        {value}
      </span>
    </div>
  )
}
