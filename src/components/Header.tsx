import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, userRole } = useAppContext();

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-gray-900">
          <Link to="/">ShopLogo</Link>
        </div>

        {/* Menu Items */}
        <ul className="flex gap-8 text-sm text-gray-800 font-medium items-center">
          {isLoggedIn && userRole === "user" && (
            <>
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/product">Sản phẩm</Link></li>
              <li><Link to="/mydonhang">Đơn hàng</Link></li>
              <li><Link to="/cart">Giỏ hàng</Link></li>
              <li><SignOutButton /></li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li><Link to="/login">Đăng nhập</Link></li>
              <li><Link to="/register">Đăng ký</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
