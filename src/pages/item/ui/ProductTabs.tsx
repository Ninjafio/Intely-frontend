// src/pages/item/ui/ProductTabs.tsx
import { useState } from 'react';
import type { ProductSpec, Review } from '@pages/item/api/types'; 

const IconStarFilled = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" className="text-yellow-500"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const IconStarEmpty = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const IconUpload = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9.58V15H5V9.58L2.7 11.88L1.29 10.47L6 5.76l4.71 4.71l-1.41 1.41L7 9.58zM13 5h-2v2h2V5zM15 5h-2v2h2V5zM17 5h-2v2h2V5zM19 10.47l-1.41-1.41L15 11.88V15h-2v-5.42L10.7 7.29l1.41-1.41L18 11.59V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h7v-2H4V5h7v7.41l-2.7-2.7L7 11.12V17h10v-5.53z"/></svg>;
const IconClip = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 4.5a2.5 2.5 0 0 0-5 0V11a1 1 0 0 0 2 0V5.71a.5.5 0 0 1 1 0V11a2.5 2.5 0 0 1-5 0V4.5a4 4 0 0 1 8 0V11a1 1 0 0 0 2 0V4.5a2.5 2.5 0 0 0-5 0V11a1 1 0 0 0 2 0V5.71a.5.5 0 0 1 1 0V11a2.5 2.5 0 0 1-5 0V4.5a4 4 0 0 1 8 0V11a1 1 0 0 0 2 0V4.5a2.5 2.5 0 0 0-5 0z"/></svg>;


interface ProductTabsProps {
  description: string;
  specifications: ProductSpec[];
  reviews: Review[];
  itemId: number;
}

type Tab = 'description' | 'characteristics' | 'reviews';

export const ProductTabs = ({ description, specifications, reviews }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('reviews');
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void,
  ) => {
    return (
      <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            className={interactive ? 'cursor-pointer p-0 bg-transparent border-none' : 'p-0 bg-transparent border-none'}
            aria-label={`Rate ${star} stars`}
          >
            {star <= rating ? (
              <IconStarFilled /> // <Icon5 className="!relative !w-6 !h-6" />
            ) : (
              <IconStarEmpty /> // <Icon6 className="!relative !w-6 !h-6" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь должна быть ваша логика отправки отзыва (например, useMutation)
    console.log({ rating: reviewRating, text: reviewText });
    alert('Отзыв отправлен (в консоль)');
    setReviewText('');
    setReviewRating(0);
  };

  const TabButton = ({
    tabId,
    label,
  }: {
    tabId: Tab;
    label: string;
  }) => {
    const isActive = activeTab === tabId;
    return (
      <button
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveTab(tabId)}
        className="flex flex-col h-12 items-center justify-end relative flex-1 grow bg-grey-100"
      >
        <div className="flex flex-col items-center justify-center px-4 py-3.5 relative flex-1 self-stretch w-full grow overflow-hidden">
          <div className="inline-flex items-center justify-center gap-1 relative flex-1 grow">
            <span
              className={`relative flex items-center justify-center w-fit mt-[-3.00px] mb-[-1.00px] font-body-l-medium font-[number:var(--body-l-medium-font-weight)] text-center tracking-[var(--body-l-medium-letter-spacing)] leading-[var(--body-l-medium-line-height)] whitespace-nowrap [font-style:var(--body-l-medium-font-style)] ${
                isActive ? 'text-accentgeneral' : 'text-[#1d1b20]'
              }`}
            >
              {label}
            </span>
          </div>
          <div
            className={`absolute w-full left-0 bottom-0 h-0.5 ${
              isActive ? 'bg-accentaccent-hover' : 'bg-grey-300'
            }`}
          />
        </div>
      </button>
    );
  };

  return (
    <div className="flex items-start gap-16 relative self-stretch w-full flex-[0_0_auto]">
      <section className="flex flex-col items-start gap-2.5 relative flex-1 grow">
        <div className="inline-flex flex-col items-start gap-8 relative flex-[0_0_auto]">
          <div
            role="tablist"
            className="flex w-[740px] items-center justify-between relative flex-[0_0_auto]"
          >
            <TabButton tabId="description" label="Описание" />
            <TabButton tabId="characteristics" label="Характеристики" />
            <TabButton tabId="reviews" label={`Отзывы (${reviews.length})`} />
          </div>

          <div
            role="tabpanel"
            className="inline-flex flex-col items-start gap-5 relative flex-[0_0_auto] w-[740px]"
          >
            {activeTab === 'description' && (
              <p className="font-body-m-regular text-colors">
                {description || 'Описание отсутствует.'}
              </p>
            )}
            
            {activeTab === 'characteristics' && (
              <dl>
                {specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-2 border-b border-grey-200">
                    <dt className="text-grey-500 font-body-m-regular">{spec.label}</dt>
                    <dd className="text-colors font-body-m-regular">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {activeTab === 'reviews' && reviews.length > 0 && reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col w-[740px] items-start gap-5 relative flex-[0_0_auto] py-4 border-b border-grey-200 last:border-b-0"
              >
                <header className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                    <div className="relative w-[55px] h-[55px] bg-[#d9d9d9] rounded-[27.5px]" /> {/* Аватарка */}
                    <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
                      <h3 className="relative flex items-center justify-center w-fit mt-[-1.00px] font-body-l-medium font-[number:var(--body-l-medium-font-weight)] text-colors text-[length:var(--body-l-medium-font-size)] tracking-[var(--body-l-medium-letter-spacing)] leading-[var(--body-l-medium-line-height)] whitespace-nowrap [font-style:var(--body-l-medium-font-style)]">
                        {review.author}
                      </h3>
                      <time className="relative flex items-center justify-center w-fit font-body-s-regular font-[number:var(--body-s-regular-font-weight)] text-colors text-[length:var(--body-s-regular-font-size)] tracking-[var(--body-s-regular-letter-spacing)] leading-[var(--body-s-regular-line-height)] whitespace-nowrap [font-style:var(--body-s-regular-font-style)]">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </header>
                <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-m-regular font-[number:var(--body-m-regular-font-weight)] text-colors text-[length:var(--body-m-regular-font-size)] tracking-[var(--body-m-regular-letter-spacing)] leading-[var(--body-m-regular-line-height)] [font-style:var(--body-m-regular-font-style)]">
                    {review.comment}
                  </p>
                </div>
              </article>
            ))}
            {activeTab === 'reviews' && reviews.length === 0 && (
                <p className="font-body-m-regular text-grey-500">Отзывов пока нет. Будьте первым!</p>
            )}
          </div>
        </div>
      </section>

      {/* Форма отзыва из макета */}
      <aside className="flex flex-col w-[520px] items-start gap-[var(--colors-paddings-gaps-p-5)] relative">
        <form
          onSubmit={handleSubmitReview}
          className="flex flex-col w-full items-start gap-[var(--colors-paddings-gaps-p-5)]"
        >
          <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="flex items-center justify-center w-fit mt-[-1.00px] font-body-l-medium font-[number:var(--body-l-medium-font-weight)] text-colors text-[length:var(--body-l-medium-font-size)] leading-[var(--body-l-medium-line-height)] whitespace-nowrap relative tracking-[var(--body-l-medium-letter-spacing)] [font-style:var(--body-l-medium-font-style)]">
              Оставьте отзыв о товаре
            </h2>
            {renderStars(reviewRating, true, setReviewRating)}
          </div>
          <div className="flex flex-col w-[520px] items-start gap-3 relative flex-[0_0_auto]">
            <div className="flex flex-col w-[520px] h-[130px] items-end justify-between p-3 relative bg-accentwhite rounded-[10px] border border-solid border-grey-200 aspect-[4]">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Опишите товар"
                className="w-full flex-1 relative self-stretch mt-[-1.00px] font-body-s-regular font-[number:var(--body-s-regular-font-weight)] text-grey-500 text-[length:var(--body-s-regular-font-size)] leading-[var(--body-s-regular-line-height)] tracking-[var(--body-s-regular-letter-spacing)] [font-style:var(--body-s-regular-font-style)] bg-transparent border-none outline-none resize-none"
                aria-label="Review text"
              />
              <IconClip /> 
            </div>
            <label className="flex justify-center gap-2 p-3 self-stretch w-full flex-[0_0_auto] bg-grey-200 rounded-lg border border-solid border-grey-300 relative items-center cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="sr-only"
                aria-label="Upload photos or videos"
              />
              <IconUpload /> 
              <span className="flex justify-center w-fit mt-[-1.00px] font-body-m-regular font-[number:var(--body-m-regular-font-weight)] text-grey-600 text-[length:var(--body-m-regular-font-size)] tracking-[var(--body-m-regular-letter-spacing)] leading-[var(--body-m-regular-line-height)] whitespace-nowrap relative items-center [font-style:var(--body-m-regular-font-style)]">
                Добавить фото или видео
              </span>
            </label>
            <button
              type="submit"
              className="inline-flex gap-2 p-3 flex-[0_0_auto] bg-accentblue rounded-lg relative items-center"
            >
              <span className="flex justify-center w-fit mt-[-1.00px] font-body-m-regular font-[number:var(--body-m-regular-font-weight)] text-white text-[length:var(--body-m-regular-font-size)] tracking-[var(--body-m-regular-letter-spacing)] leading-[var(--body-m-regular-line-height)] whitespace-nowrap relative items-center [font-style:var(--body-m-regular-font-style)]">
                Отправить
              </span>
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};