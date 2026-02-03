import type { Breadcrumb } from '../api/types'
import { Link } from 'react-router-dom'

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  if (!items?.length) return null
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-lg text-[#7f7f7f]">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.href ? <Link to={it.href} className="hover:text-[#141414] transition-colors">{it.label}</Link> : <span>{it.label}</span>}
          {i < items.length - 1 ? <span aria-hidden>/</span> : null}
        </span>
      ))}
    </nav>
  )
}