import { ApiService } from "./api-client";

class ReviewService extends ApiService {
    constructor() {
        super("/api/reviews");
    }

    getAll() {
        return this.get();
    }

    getByProduct(productId: number) {
        return this.get(`/product/${productId}`);
    }

    remove(id: number) {
        return this.delete(`/${id}`);
    }
}

export const reviewService = new ReviewService();
