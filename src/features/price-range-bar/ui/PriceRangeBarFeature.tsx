import * as Slider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'
import type { IPriceRangeBarFeatureProps } from '../model'

export function PriceRangeBarFeature({ min, max, valueMin, valueMax, onChange }: IPriceRangeBarFeatureProps) {
  const [values, setValues] = useState<[number, number]>([valueMin ?? min, valueMax ?? max])

  useEffect(() => {
    onChange(values[0], values[1])
  }, [values])

  return (
    <Slider.Root
      min={min}
      max={max}
      value={values}
      onValueChange={(v) => setValues([v[0], v[1]])}
      step={1}
      className="relative flex items-center select-none touch-none w-full h-6"
    >
      <Slider.Track className="bg-[#CFCFCF] relative h-[4px] grow rounded">
        <Slider.Range className="absolute h-full bg-[#0075B1] rounded" />
      </Slider.Track>

      <Slider.Thumb className="block w-4 h-4 bg-white border border-[#0075B1] rounded-full shadow cursor-pointer" aria-label="Min price" />

      <Slider.Thumb className="block w-4 h-4 bg-white border border-[#0075B1] rounded-full shadow cursor-pointer" aria-label="Max price" />
    </Slider.Root>
  )
}
