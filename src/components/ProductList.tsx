import React, { useEffect, useState } from "react";
import { productService } from "../services/product.service";
import { useNavigate } from "react-router-dom";

interface Product {
  id_product: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const fakeProducts: Product[] = [
  {
    id_product: 0,
    name: "Nike Air Zoom Pegasus 39",
    price: 2990000,
    description: "Giày chạy bộ êm ái cho mọi địa hình.",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/pegasus.jpg",
  },
  {
    id_product: 0,
    name: "Nike Air Jordan 1 Retro",
    price: 4200000,
    description: "Giày bóng rổ phong cách cổ điển.",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/jordan1.jpg",
  },
  {
    id_product: 0,
    name: "Nike Mercurial Superfly 9",
    price: 5200000,
    description: "Giày bóng đá tốc độ cao.",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/mercurial.jpg",
  }
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productService.getAll();

        if (!data || data.length === 0) {
          setProducts(fakeProducts);
        } else {
          setProducts(data);
        }
      } catch {
        setProducts(fakeProducts); // fallback nếu API lỗi
      }
    };

    load();
  }, []);

  const toggleCart = (product: Product) => {
    setCart((prev) =>
      prev.some((p) => p.id_product === product.id_product)
        ? prev.filter((p) => p.id_product !== product.id_product)
        : [...prev, product]
    );
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">

      {/* LIST PRODUCTS */}
      <h1 className="text-3xl font-bold mb-8">Danh sách sản phẩm</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <span className="text-yellow-500 text-xl">⭐</span>
              </div>

              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <p className="text-black font-bold text-xl mt-3">
                {product.price.toLocaleString("vi-VN")} ₫
              </p>

              <button
                onClick={() => toggleCart(product)}
                className="w-full mt-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900"
              >
                {cart.some((c) => c.id_product === product.id_product)
                  ? "Bỏ khỏi giỏ"
                  : "Thêm vào giỏ"}
              </button>
              <button
                onClick={() => navigate(`/product/${product.id_product}`)}
                className="w-full mt-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
