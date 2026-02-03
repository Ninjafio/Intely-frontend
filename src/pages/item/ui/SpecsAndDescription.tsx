import type { ProductSpec } from '../api/types'

export function SpecsAndDescription({
  description,
  specs,
}: {
  description?: string | null
  specs: ProductSpec[]
}) {
    const finallize_description = () => {
        const final = description || "У данного товара нет описания.";
        return {__html: final}
    }

  return (
    <section className="w-[448px] mt-12">
      <div className="space-y-4">
        <h2 className="text-base text-[#7f7f7f]">Описание</h2>
        <p className="text-lg text-[#141414]" dangerouslySetInnerHTML={finallize_description()}>
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-base text-[#7f7f7f]">Характеристики</h2>
        <ul className="space-y-3">
          {specs.map((s, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-lg text-[#141414]">{s.label}</span>
              <span aria-hidden className="flex-1 border-b border-dashed border-[#E5E7EB]" />
              <span className="text-lg text-[#141414]">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
