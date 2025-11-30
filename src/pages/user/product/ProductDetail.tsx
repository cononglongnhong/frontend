/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../../services/product.service";
import { variantService } from "../../../services/variant.service";
import { cartService } from "../../../services/cart.service";
import { useAppContext } from "../../../contexts/AppContext";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<any>(null);
    const [variants, setVariants] = useState<any[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [fallbackProducts, setFallbackProducts] = useState<any[]>([]);

    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [activeVariant, setActiveVariant] = useState<any>(null);

    const showToast = useAppContext().showToast;

    // ===== LOAD CURRENT PRODUCT =====
    useEffect(() => {
        if (!id) return;

        productService.getById(Number(id)).then(setProduct);
        variantService.getByProduct(Number(id)).then(setVariants);
    }, [id]);

    // ===== LOAD RELATED PRODUCTS =====
    useEffect(() => {
        if (!product) return;

        // Lấy sản phẩm cùng category
        productService
            .getByCategory(product.id_category)
            .then((res) => {
                const list = res.filter((p: any) => p.id_product !== product.id_product);
                setRelatedProducts(list.slice(0, 5));
            });

        // Backup nếu thiếu
        productService.getAll().then((res) => {
            const shuffled = res
                .filter((p: any) => p.id_product !== product.id_product)
                .sort(() => 0.5 - Math.random());

            setFallbackProducts(shuffled.slice(0, 5));
        });
    }, [product]);

    // ===== ACTIVE VARIANT =====
    useEffect(() => {
        if (!selectedColor || !selectedSize) return;

        const v = variants.find(
            (x) => x.color === selectedColor && String(x.size) === String(selectedSize)
        );

        setActiveVariant(v || null);
    }, [selectedColor, selectedSize, variants]);

    // ===== ADD TO CART =====
    const addToCart = async () => {
        if (!activeVariant) return showToast("Vui lòng chọn biến thể!", "ERROR");
        if (activeVariant.stock <= 0) return showToast("Hết hàng!", "ERROR");

        try {
            await cartService.add({
                id_product: product.id_product,
                id_variant: activeVariant.id_variant,
                quantity: 1
            });
            showToast("Đã thêm vào giỏ!", "SUCCESS");
        } catch {
            showToast("Lỗi khi thêm giỏ hàng", "ERROR");
        }
    };

    if (!product) return <div className="p-8 text-center">Đang tải...</div>;

    // Unique colors + sizes
    const colors = [...new Set(variants.map((v) => v.color))];
    const sizes = [...new Set(variants.map((v) => v.size))];

    // Recommend list: ưu tiên related ≥ 5 → else lấy thêm fallback
    const recommendList =
        relatedProducts.length >= 5
            ? relatedProducts
            : [...relatedProducts, ...fallbackProducts].slice(0, 5);

    return (
        <div className="max-w-screen-xl mx-auto p-6 mt-10 space-y-12">

            {/* ================= PRODUCT DETAIL ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* IMAGE */}
                <div className="border rounded-xl overflow-hidden shadow">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[450px] object-cover"
                    />
                </div>

                {/* INFO */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                    {/* PRICE */}
                    <div className="text-xl font-semibold text-red-600 mb-3">
                        {activeVariant
                            ? `${activeVariant.price_variant.toLocaleString("vi-VN")} ₫`
                            : `${product.price.toLocaleString("vi-VN")} ₫`}
                    </div>

                    {/* STOCK */}
                    {activeVariant && (
                        <p className="text-sm mb-3 text-gray-600">
                            Tồn kho: <b>{activeVariant.stock}</b> đôi
                        </p>
                    )}

                    {/* COLOR */}
                    <div className="mb-5">
                        <h3 className="font-medium mb-2">Màu sắc</h3>
                        <div className="flex gap-2 flex-wrap">
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    className={`px-4 py-2 rounded border text-sm 
                                        ${selectedColor === c
                                            ? "bg-black text-white"
                                            : "bg-white"}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SIZE */}
                    <div className="mb-5">
                        <h3 className="font-medium mb-2">Size</h3>
                        <div className="flex gap-2 flex-wrap">
                            {sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(String(s))}
                                    className={`px-4 py-2 rounded border text-sm 
                                        ${selectedSize === s
                                            ? "bg-black text-white"
                                            : "bg-white"}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ADD TO CART */}
                    <button
                        onClick={addToCart}
                        disabled={!activeVariant}
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow mt-4 disabled:bg-gray-300"
                    >
                        Thêm vào giỏ hàng
                    </button>

                    {/* DESCRIPTION */}
                    <div className="mt-8">
                        <h3 className="font-semibold mb-2">Mô tả</h3>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                </div>
            </div>

            {/* ================= RELATED PRODUCTS ================= */}
            <div>
                <h2 className="text-xl font-bold mb-4">Sản phẩm gợi ý</h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {recommendList.map((p) => (
                        <div
                            key={p.id_product}
                            onClick={() => navigate(`/product/${p.id_product}`)}
                            className="cursor-pointer border rounded-xl p-3 shadow hover:shadow-lg transition"
                        >
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="mt-2 font-semibold text-sm">{p.name}</h3>
                            <p className="text-red-600 font-bold text-sm">
                                {Number(p.price).toLocaleString("vi-VN")} ₫
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
