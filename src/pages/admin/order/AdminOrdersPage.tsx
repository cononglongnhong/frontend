import { useState, useEffect } from "react";
import Table, { Column } from "../../../components/Table";
import OrderModal, { Order, OrderModalMode } from "./OrderModal";
import { orderService } from "../../../services/order.service";

const AdminOrdersPage = () => {
    const [data, setData] = useState<Order[]>([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<OrderModalMode>("view");
    const [selected, setSelected] = useState<Order | null>(null);

    const loadOrders = () => {
        orderService
            .getAll()
            .then((res) => setData(res))
            .catch((err) => console.error("Load orders error:", err));
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const columns: Column<Order>[] = [
        { title: "ID", dataIndex: "id_order", width: 60 },
        { title: "Mã đơn", dataIndex: "order_code" },
        { title: "Khách hàng", dataIndex: "customer_name", width: 140 },
        {
            title: "Tổng tiền",
            dataIndex: "total_amount",
            render: (v) => Number(v).toLocaleString("vi-VN") + "₫",
            width: 120
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 100,
            render: (v) => (
                <span className="px-2 py-1 rounded bg-gray-200 text-xs">
                    {v}
                </span>
            )
        },
        {
            title: "Thao tác",
            width: 150,
            render: (_, record) => (
                <button
                    onClick={() => {
                        setSelected(record);
                        setMode("view");
                        setOpen(true);
                    }}
                    className="border px-2 py-1 text-xs rounded"
                >
                    Xem chi tiết
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Quản lý đơn hàng</h1>

            <Table columns={columns} data={data} />

            <OrderModal
                open={open}
                mode={mode}
                data={selected}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default AdminOrdersPage;
