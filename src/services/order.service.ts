/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiService } from "./api-client";

class OrderService extends ApiService {
    constructor() {
        super("/api/orders");
    }

    getAll() {
        return this.get("");
    }

    getById(id: number) {
        return this.get(`/${id}`);
    }

    updateStatus(id: number, status: string) {
        return this.put(`/${id}/status`, { status });
    }

    remove(id: number) {
        return this.delete(`/${id}`);
    }
}

export const orderService = new OrderService();
