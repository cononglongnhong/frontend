import { useState } from "react";
import Table, { Column } from "../../../components/Table";
import CustomerModal, { Customer, CustomerModalMode } from "./CustomerModal";

const AdminCustomersPage = () => {
    const [data,] = useState<Customer[]>([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<CustomerModalMode>("view");
    const [selected, setSelected] = useState<Customer | null>(null);

    const columns: Column<Customer>[] = [
        { title: "ID", dataIndex: "id_user", width: 60 },
        { title: "Tên", dataIndex: "fullName" },
        { title: "Email", dataIndex: "email" },
        { title: "Phone", dataIndex: "phone", width: 120 },
        { title: "Vai trò", dataIndex: "role", width: 100 },
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
                    className="border px-2 py-1 rounded text-xs"
                >
                    Xem
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Quản lý người dùng</h1>

            <Table columns={columns} data={data} />

            <CustomerModal
                open={open}
                mode={mode}
                data={selected}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default AdminCustomersPage;
