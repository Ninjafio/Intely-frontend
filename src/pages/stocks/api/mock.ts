export interface IStock {
    id: string;
    subtitle: string;
    title: string;
    description: string;
    imageURL?: string;
}

export const STOCKS: IStock[] = [
    {
        id: "1",
        subtitle: "Новинка 2025",
        title: "Мега скидка 30% на все фильтры",
        description: "Получайте выгоду на все типы фильтров — масляные, воздушные, салонные и топливные.",
        imageURL: "/stock-1.png"
    },
    {
        id: "2",
        subtitle: "Мега скидки",
        title: "Бесплатная доставка от 10 000 ₽",
        description: "Мы доставим заказ бесплатно — по всей России и без скрытых условий.",
        imageURL: "/stock-2.png"
    },
    {
        id: "3",
        subtitle: "Новинка 2025",
        title: "Мега скидка 30% на все фильтры",
        description: "Получайте выгоду на все типы фильтров — масляные, воздушные, салонные и топливные.",
        imageURL: "/stock-1.png"
    },
    {
        id: "4",
        subtitle: "Мега скидки",
        title: "Бесплатная доставка от 10 000 ₽",
        description: "Мы доставим заказ бесплатно — по всей России и без скрытых условий.",
        imageURL: "/stock-2.png"
    },
    {
        id: "5",
        subtitle: "Новинка 2025",
        title: "Мега скидка 30% на все фильтры",
        description: "Получайте выгоду на все типы фильтров — масляные, воздушные, салонные и топливные.",
        imageURL: "/stock-1.png"
    },
    {
        id: "6",
        subtitle: "Мега скидки",
        title: "Бесплатная доставка от 10 000 ₽",
        description: "Мы доставим заказ бесплатно — по всей России и без скрытых условий.",
        imageURL: "/stock-2.png"
    },
    {
        id: "7",
        subtitle: "Новинка 2025",
        title: "Мега скидка 30% на все фильтры",
        description: "Получайте выгоду на все типы фильтров — масляные, воздушные, салонные и топливные.",
        imageURL: "/stock-1.png"
    },
    {
        id: "8",
        subtitle: "Новинка 2025",
        title: "Мега скидка 30% на все фильтры",
        description: "Получайте выгоду на все типы фильтров — масляные, воздушные, салонные и топливные.",
        imageURL: "/stock-1.png"
    }
] as const