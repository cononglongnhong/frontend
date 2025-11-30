/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiService } from "./api-client";

class CartService extends ApiService {
    constructor() {
        super("/api/cart");
    }

    getAll() {
        return this.get("");
    }

    add(item: any) {
        return this.post("/add", item);
    }

    update(id: number, quantity: number) {
        return this.put(`/${id}`, { quantity });
    }

    remove(id: number) {
        return this.delete(`/${id}`);
    }
}

export const cartService = new CartService();
