
export interface IPriceRangeBarFeatureProps {
  min: number
  max: number
  valueMin?: number
  valueMax?: number
  onChange: (min: number | undefined, max: number | undefined) => void
}