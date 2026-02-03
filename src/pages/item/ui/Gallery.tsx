import { useState } from 'react'
import type { GalleryProps } from '../model'

const IconUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
)
const IconDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const thumbnails = images.slice(0, 5)

  return (
    <section className="inline-flex h-[540px] items-center gap-5 relative flex-[0_0_auto]">
      <div className="flex flex-col w-[86px] h-[549px] items-center justify-center gap-3.5 relative mt-[-4.50px] mb-[-4.50px]">
        <button type="button" aria-label="Previous image" className="text-grey-500">
          <IconUp />
        </button>
        <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
          {thumbnails.map((thumbnail, index) => (
            <button
              key={index}
              type="button"
              aria-label={`View image ${index + 1}`}
              onClick={() => setSelectedImage(thumbnail)}
              className={`w-full rounded border-2 ${selectedImage === thumbnail ? 'border-accentblue' : 'border-transparent'}`}
            >
              <img className="relative self-stretch w-full aspect-[1] object-cover" alt={`Product thumbnail ${index + 1}`} src={thumbnail} />
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next image" className="text-grey-500">
          <IconDown />
        </button>
      </div>

      <img className="relative w-[540px] h-[540px] aspect-[1] object-cover rounded-lg" src={selectedImage} />
    </section>
  )
}
