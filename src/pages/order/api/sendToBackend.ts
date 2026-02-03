import axios from "axios";
import type { OrderFormData } from "../model";
import { GET_PROD_BASE_URL } from "@shared/config/query-client";

export async function sendToBackend(orderData: OrderFormData): Promise<boolean> {
    try {
        const response = await axios.post<void>(
            `${GET_PROD_BASE_URL()}/api/orders/create`,
            {
                productId: orderData.productId,
                price: orderData.productPrice,
                name: orderData.productTitle,
                email: orderData.email,
                phone: orderData.phone,
                comment: orderData.comment
            }
        );

        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.error('Failed to create order on backend:', error);
        throw new Error('Не удалось отправить заказ в Telegram');
    }
}
