/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface Props {
    children: React.ReactNode;
    title: any;
}
export default function AdminLayout({ children, title }: Props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="w-full min-h-screen flex bg-gray-100">
            {/* SIDEBAR */}
            <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            {/* MAIN */}
            <div className="flex-1 flex flex-col">
                {/* TOPBAR */}
                <AdminTopbar title={title} />

                {/* CONTENT */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
