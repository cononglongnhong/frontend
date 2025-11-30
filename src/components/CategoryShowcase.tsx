import React, { useEffect, useState } from "react";
import { categoryService } from "../services/category.service";
import { useNavigate } from "react-router-dom";

interface Category {
    id_category: number;
    name: string;
    image?: string;
}

const fallbackCategories: Category[] = [
    { id_category: 0, name: "Giày Bóng Đá" },
    { id_category: 0, name: "Giày Bóng Rổ" },
    { id_category: 0, name: "Giày Chạy Bộ" },
    { id_category: 0, name: "Giày Thời Trang" }
];


interface Props {
    viewMode?: "grid" | "list"; // 2 chế độ hiển thị
}

const CategoryShowcase: React.FC<Props> = ({ viewMode = "grid" }) => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        categoryService
            .getAll()
            .then((data) => setCategories(data))
            .catch(() => setCategories(null));
    }, []);

    const dataToRender =
        categories && categories.length > 0 ? categories : fallbackCategories;

    return (
        <div className="max-w-screen-2xl mx-auto px-8 mt-20">

            {/* === MODE 1: GRID WITH IMAGE === */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {dataToRender.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                cat.id_category !== 0
                                    ? navigate(`/product?category=${cat.id_category}`)
                                    : null
                            }
                            className="group cursor-pointer overflow-hidden shadow hover:shadow-xl transition rounded-xl"
                        >
                            {/* IMAGE */}
                            <div className="h-56 w-full overflow-hidden bg-gray-100">
                                <img
                                    src={
                                        cat.image ||
                                        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1536,c_limit/a/dplsp4/nike-just-do-it.jpg"
                                    }
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>

                            {/* NAME */}
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold">{cat.name}</h3>
                                {cat.id_category !== 0 && (
                                    <p className="text-gray-500 text-sm mt-1">Xem sản phẩm</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* === MODE 2: LIST ONLY TEXT === */}
            {viewMode === "list" && (
                <div className="flex flex-col gap-4">
                    {dataToRender.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                cat.id_category !== 0
                                    ? navigate(`/product?category=${cat.id_category}`)
                                    : null
                            }
                            className="cursor-pointer py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-medium transition"
                        >
                            {cat.name}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default CategoryShowcase;
