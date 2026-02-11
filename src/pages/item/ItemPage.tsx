import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ChevronUp, ChevronDown, Star, Paperclip, Upload, ChevronLeft, ChevronRight } from 'lucide-react'

import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { OrderModal } from '@pages/order'
import { addToCart } from '@store/cart'
import type { IProduct } from '@pages/catalog/model'
import { createReview, useProductQuery, useRelatedProductsQuery, useReviewsQuery } from './api/queries'
import type { Tab } from './model'
import { tabs } from './config'

const NO_IMAGE = '/no-image.png'

export default function ItemPage() {
	const { id } = useParams<{ id: string }>()
	const productId = Number(id ?? '1')

	const { data: product, isLoading: loadingProduct } = useProductQuery(productId)
	const { data: related, isLoading: loadingRelated } = useRelatedProductsQuery(productId)
	const { data: reviews, isLoading: loadingReviews } = useReviewsQuery(productId)

	const [activeTab, setActiveTab] = useState<Tab>('description')
	const [reviewRating, setReviewRating] = useState(0)
	const [reviewText, setReviewText] = useState('')
	const [reviewAuthor, setReviewAuthor] = useState('')
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	const [isOrderOpen, setIsOrderOpen] = useState(false)
	const [orderProduct, setOrderProduct] = useState<IProduct | null>(null)

	useEffect(() => {
		if (product?.images?.length) {
			setSelectedImage(product.images[0])
		} else if (product?.imageUrl) {
			setSelectedImage(product.imageUrl)
		}
	}, [product])

	const openOrderModal = (p: IProduct) => {
		setOrderProduct(p)
		setIsOrderOpen(true)
	}

const handleBuyNow = () => {
		if (!product) return
		addToCart({
			id: product.id,
			title: product.title,
			price: product.price,
			oldPrice: product.oldPrice,
			brand: (product as any).brand,
			article: (product as any).article,
			imageUrl: product.imageUrl,
			qty: 1,
		})
		setIsOrderOpen(false)
}

	const handleSubmitReview = (e: React.FormEvent) => {
		e.preventDefault()
		const created = new Date()
		console.log('Отправка отзыва:', { rating: reviewRating, text: reviewText, productId: productId })
		createReview({
			id: Number(productId),
			author: reviewAuthor,
			rating: reviewRating,
			comment: reviewText,
		})
		setReviewText('')
		setReviewRating(0)
		reviews?.push({
			id: productId,
			author: reviewAuthor,
			rating: reviewRating,
			comment: reviewText,
			createdAt: String(created),
		})
	}

	const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => (
		<div className="flex items-center gap-1">
			{[1, 2, 3, 4, 5].map((star) => {
				const active = star <= rating
				return (
					<button
						key={star}
						type="button"
						disabled={!interactive}
						onClick={interactive && onRate ? () => onRate(star) : undefined}
						className={`p-0 border-none bg-transparent ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
						aria-label={interactive ? `Оценка ${star}` : undefined}
					>
						<Star className={`h-5 w-5 ${active ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
					</button>
				)
			})}
		</div>
	)

	if (loadingProduct && !product) {
		return (
			<>
				<Header />
				<main className="min-h-[600px] max-w-[1360px] mx-auto px-4 md:px-10 py-8">
					<div className="animate-pulse space-y-6">
						<div className="h-6 w-64 bg-[#ededed] rounded" />
						<div className="grid md:grid-cols-[540px,1fr] gap-10">
							<div className="h-[540px] bg-[#ededed] rounded-[10px]" />
							<div className="space-y-4 pt-4">
								<div className="h-10 w-3/4 bg-[#ededed] rounded" />
								<div className="h-6 w-1/4 bg-[#ededed] rounded" />
								<div className="h-10 w-1/3 bg-[#ededed] rounded mt-6" />
								<div className="h-14 w-1/2 bg-[#ededed] rounded mt-6" />
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</>
		)
	}

	if (!product) {
		return (
			<>
				<Header />
				<main className="min-h-[600px] flex items-center justify-center text-[#7f7f7f]">Товар не найден</main>
				<Footer />
			</>
		)
	}

	const thumbnails = product.images?.length ? product.images.slice(0, 5) : []
	const mainImage = selectedImage ?? product.images?.[0] ?? product.imageUrl ?? ''

	return (
		<>
			<Header />

			<main className="bg-grey-100 px-4 md:px-10 pb-10">
				<div className="max-w-[1360px] mx-auto flex flex-col gap-6">
					<nav aria-label="Хлебные крошки" className="pt-4">
						<ol className="inline-flex items-center gap-2 text-xs text-grey-500">
							{product.breadcrumbs.map((crumb, index) => (
								<React.Fragment key={index}>
									<li>{crumb.label}</li>
									{index < product.breadcrumbs.length - 1 && <li>/</li>}
								</React.Fragment>
							))}
						</ol>
					</nav>

					<section className="flex flex-col lg:flex-row gap-10">
						<div className="flex gap-5">
							<div className="flex flex-col items-center gap-3">
								<button type="button" aria-label="Предыдущее изображение" className="p-1 text-grey-600">
									<ChevronUp />
								</button>

								<div className="flex flex-col gap-3">
									{thumbnails.map((thumbnail, index) => {
										const thumbSrc = thumbnail || NO_IMAGE

										return (
											<button
												key={index}
												type="button"
												aria-label={`Показать изображение ${index + 1}`}
												onClick={() => setSelectedImage(thumbSrc)}
												className={`w-[80px] h-[80px] rounded border-2 overflow-hidden ${
													selectedImage === thumbSrc ? 'border-[#0075B1]' : 'border-transparent'
												}`}
											>
												<img src={thumbSrc} alt={`Миниатюра ${index + 1}`} className="w-full h-full object-cover" />
											</button>
										)
									})}
								</div>

								<button type="button" aria-label="Следующее изображение" className="p-1 text-grey-600">
									<ChevronDown />
								</button>
							</div>

							<div className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[540px] h-[260px] sm:h-[340px] md:h-[420px] lg:h-[540px] rounded-[10px] overflow-hidden bg-gray-100">
								<img src={mainImage || NO_IMAGE} alt={product.title} className="w-full h-full object-cover" />
							</div>
						</div>

						<div className="flex-1 flex flex-col gap-8">
							<header className="space-y-4">
								<h1 className="text-2xl md:text-3xl font-medium text-black">{product.title}</h1>
								{product.stock > 0 && <p className="text-sm font-medium text-[#0075B1]">В наличии {product.stock}</p>}
								{product.stock <= 0 && <p className="text-sm font-medium text-[#c00]">Нет в наличии</p>}
							</header>

							<div className="flex items-end gap-6">
								<div className="text-2xl md:text-3xl font-semibold text-black">{product.price} ₽</div>
								{product.oldPrice && <div className="text-xl text-[#929292] line-through">{product.oldPrice} ₽</div>}
							</div>

							<section className="w-full">
								<dl className="w-full text-sm text-[#313131]">
									<div className="flex justify-between items-baseline py-2 border-b border-gray-200">
										<dt className="text-[#0B0D0D]">Артикул</dt>
										<dd className="text-right text-[#707070] whitespace-nowrap">Ln2137</dd>
									</div>

									<div className="flex justify-between items-baseline py-2 border-b border-gray-200">
										<dt className="text-[#0B0D0D]">Бренд</dt>
										<dd className="text-right text-[#707070] whitespace-nowrap">LAVR</dd>
									</div>

									<div className="flex justify-between items-baseline py-2 border-b border-gray-200">
										<dt className="text-[#0B0D0D]">Категория</dt>
										<dd className="text-right text-[#707070] whitespace-nowrap">Присадки в топливо</dd>
									</div>
								</dl>
							</section>

							<button
								type="button"
								onClick={handleBuyNow}
								className="inline-flex items-center gap-2 bg-[#0075B1] hover:bg-[#2a4b5c] text-white px-4 py-3 rounded-[6px] text-sm font-medium transition-colors w-fit"
							>
								{product.stock > 0 ? 'Купить сейчас' : 'Оставить заявку'}
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					</section>

					<section className="flex flex-col lg:flex-row gap-10 mt-4">
						<div className="flex-1 max-w-[740px] flex flex-col gap-4">
							<div
								role="tablist"
								className="border-b border-gray-200 flex items-center gap-2 sm:gap-6 overflow-x-auto overflow-y-hidden whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0 justify-start sm:justify-center no-scrollbar"
							>
								{tabs.map((tab) => (
									<button
										key={tab.id}
										type="button"
										role="tab"
										aria-selected={activeTab === tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`flex-none px-4 sm:px-8 lg:px-12.5 py-3.5 -mb-px text-sm font-medium border-b-2 transition-colors ${
											activeTab === tab.id ? 'border-[#0075B1] text-[#0075B1]' : 'border-transparent text-[#1D1B20] hover:text-[#0075B1]'
										} `}
									>
										{tab.id === 'reviews' ? `${tab.label} (${reviews?.length ?? 0})` : tab.label}
									</button>
								))}
							</div>

							<div role="tabpanel" className="mt-4">
								{activeTab === 'description' && (
									<p
										className="text-sm leading-relaxed text-[#313131]"
										dangerouslySetInnerHTML={{ __html: product.description || 'Описание отсутствует.' }}
									></p>
								)}

								{activeTab === 'characteristics' && (
									<dl className="w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
										{product.specs.map((spec, index) => (
											<div key={index} className="flex justify-between gap-4 px-4 py-2 text-sm">
												<dt className="text-gray-500">{spec.label}</dt>
												<dd className="text-[#313131] text-right">{spec.value}</dd>
											</div>
										))}
									</dl>
								)}

								{activeTab === 'reviews' && (
									<>
										{(reviews ?? []).length === 0 && <p className="text-sm text-gray-500">Отзывов пока нет.</p>}

										{(reviews ?? []).map((review) => (
											<article key={review.id} className="py-4 border-b border-gray-200 last:border-b-0">
												<header className="flex items-start justify-between mb-2">
													<div className="flex items-center gap-4">
														<div className="w-[55px] h-[55px] rounded-full bg-gray-200" />
														<div>
															<h3 className="text-sm font-medium text-[#313131]">{review.author}</h3>
															<time className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</time>
														</div>
													</div>
													{renderStars(review.rating)}
												</header>
												<p className="text-sm leading-relaxed text-[#313131]">{review.comment}</p>
											</article>
										))}
									</>
								)}
							</div>
						</div>

						<aside className="w-full lg:w-[520px] flex flex-col gap-5">
							<form onSubmit={handleSubmitReview} className="flex flex-col gap-4 bg-accentwhite">
								<div className="flex items-center justify-between">
									<h2 className="text-[18px] font-medium text-[#0C0C0C]">Оставьте отзыв о товаре</h2>
									{renderStars(reviewRating, true, setReviewRating)}
								</div>

								<div className="flex flex-col gap-3">
									<div className="flex flex-col h-[45px] items-end justify-between p-3 bg-accentwhite rounded-[10px] border border-grey-200">
										<input
											value={reviewAuthor}
											onChange={(e) => setReviewAuthor(e.target.value)}
											className="w-full flex-1 text-sm text-grey-600 bg-transparent border-none outline-none resize-none"
											placeholder="Ваше имя"
											required
										/>
									</div>
									<div className="flex flex-col h-[130px] items-end justify-between p-3 bg-accentwhite rounded-[10px] border border-grey-200">
										<textarea
											value={reviewText}
											onChange={(e) => setReviewText(e.target.value)}
											placeholder="Опишите товар"
											className="w-full flex-1 text-sm text-grey-600 bg-transparent border-none outline-none resize-none"
											aria-label="Текст отзыва"
										/>
										<Paperclip className="w-4 h-4 text-[#707070]" />
									</div>

									<label className="flex items-center gap-2 p-3 bg-grey-200 rounded-lg border border-grey-300 cursor-pointer text-sm text-grey-600">
										<input type="file" accept="image/*,video/*" multiple className="sr-only" aria-label="Загрузить фото или видео" />
										<Upload className="w-5 h-5 text-[#494949]" />
										<span>Добавить фото или видео</span>
									</label>

									<div>
										<button
											type="submit"
											className="inline-flex items-center justify-center bg-[#0075B1] hover:bg-[#2a4b5c] text-white px-4 py-3 rounded-[6px] text-sm font-medium transition-colors"
										>
											Отправить
										</button>
									</div>
								</div>
							</form>
						</aside>
					</section>

					{/* Блок "С этим товаром часто покупают" */}
					{related && related.length > 0 && (
						<section className="mt-10 flex flex-col gap-4">
							<header className="flex items-center justify-between">
								<h2 className="text-lg font-medium text-[#141414]">С этим товаром часто покупают</h2>
								<div className="flex items-center gap-2 text-grey-500">
									<button type="button" aria-label="Предыдущие товары" className="p-1">
										<ChevronLeft className="w-5 h-5" />
									</button>
									<div className="w-px h-4 bg-grey-300" />
									<button type="button" aria-label="Следующие товары" className="p-1">
										<ChevronRight className="w-5 h-5" />
									</button>
								</div>
							</header>

							<div className="w-full overflow-x-auto pb-3">
								<div className="flex gap-5 w-max">
									{related.map((rp) => {
										const cardImage = rp.imageUrl || NO_IMAGE

										return (
											<article key={rp.id} className="w-[250px] flex flex-col gap-3">
												<Link to={`/item/${rp.id}`} className="block w-full">
													<div
														className="h-[252px] w-full rounded-[10px] bg-gray-100 bg-cover bg-center"
														style={{ backgroundImage: `url(${cardImage})` }}
													/>
												</Link>

												<div className="flex flex-col gap-2">
													<Link to={`/item/${rp.id}`} className="block text-sm text-grey-600 hover:text-[#0075B1] truncate">
														{rp.title}
													</Link>

													<div className="flex items-center gap-2">
														<span className="text-base font-medium text-grey-600">{rp.price} ₽</span>
														{rp.oldPrice && <span className="text-xs text-grey-500 line-through">{rp.oldPrice} ₽</span>}
													</div>
												</div>

												<div>
													<button
														type="button"
														className="inline-flex items-center justify-center bg-[#0075B1] hover:bg-[#2a4b5c] text-white px-3 py-2 rounded-[6px] text-sm font-medium transition-colors"
														onClick={() => openOrderModal(rp as unknown as IProduct)}
													>
														Купить
													</button>
												</div>
											</article>
										)
									})}
								</div>
							</div>
						</section>
					)}

					{(loadingRelated || loadingReviews) && <div className="mt-6 text-sm text-[#7f7f7f]">Загрузка дополнительных данных…</div>}
				</div>
			</main>

			<OrderModal isOpen={isOrderOpen} product={orderProduct} onClose={() => setIsOrderOpen(false)} />
			<Footer />
		</>
	)
}
