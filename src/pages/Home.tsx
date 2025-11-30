import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { userService } from "../services/user.service";
import ProductList from "../components/ProductList";
import CategoryShowcase from "../components/CategoryShowcase";

const Home: React.FC = () => {
  const { userId } = useAppContext();
  const [, setUserName] = useState<string>("");

  useEffect(() => {
    if (userId) {
      userService
        .getById(userId)
        .then((user) => setUserName(user.FullName || "Khách hàng"))
        .catch(console.error);
    }
  }, [userId]);

  return (
    <div>
      {/* Welcome section */}
      {/* <div className="max-w-screen-2xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Chào mừng bạn đến với Shop của chúng tôi!
        </h1>

        {userId ? (
          <p className="text-xl text-gray-700">
            Chào bạn, <span className="font-semibold">{userName}</span>!
          </p>
        ) : (
          <p className="text-xl text-gray-700">
            Vui lòng đăng nhập để trải nghiệm đầy đủ các tính năng.
          </p>
        )}
      </div> */}

      {/* TWO-COLUMN LAYOUT */}
      <div className="max-w-screen-2xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* LEFT SIDEBAR - CATEGORY LIST (3/12) */}
        <div className="md:col-span-3">
          <CategoryShowcase viewMode="list" />
        </div>

        {/* RIGHT CONTENT - PRODUCT LIST (9/12) */}
        <div className="md:col-span-9">
          <ProductList />
        </div>

      </div>
    </div>
  );
};

export default Home;
