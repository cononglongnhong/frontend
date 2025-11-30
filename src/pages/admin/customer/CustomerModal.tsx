import React from "react";

export type CustomerModalMode = "view";

export interface Customer {
    id_user?: number;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    address?: string;
}

interface CustomerModalProps {
    open: boolean;
    mode: CustomerModalMode;
    data?: Customer | null;
    onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
    open,
    data,
    onClose
}) => {
    if (!open || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-xl flex flex-col max-h-[90vh]">
                <div className="px-4 py-3 flex justify-between border-b flex-shrink-0">
                    <h2 className="font-semibold text-lg">Thông tin người dùng</h2>
                    <button onClick={onClose} className="text-xl">
                        ×
                    </button>
                </div>

                <div className="p-4 space-y-3 text-sm overflow-y-auto">
                    <p><b>Họ tên:</b> {data.fullName}</p>
                    <p><b>Email:</b> {data.email}</p>
                    <p><b>SĐT:</b> {data.phone}</p>
                    <p><b>Vai trò:</b> {data.role}</p>
                    <p><b>Địa chỉ:</b> {data.address}</p>
                </div>

                <div className="px-4 py-3 border-t text-right flex-shrink-0">
                    <button onClick={onClose} className="border px-3 py-2 rounded">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;
