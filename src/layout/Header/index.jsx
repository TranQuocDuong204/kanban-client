import { useState } from "react";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative w-full z-[2000]">
      <div className="bg-white shadow-xl px-0 lg:px-4">
        <div className="lg:w-[1012px] m-auto h-[60px]">
          {/* laptop */}
          <div className="flex justify-center items-center px-1 lg:px-6 lg:justify-between max-sm:justify-around">
            <div className="py-[15px] float-left hidden lg:block max-sm:block">
              <a href="/#">
                <img
                  className="td-retina-data td-retina-version"
                  data-retina="/wp-content/uploads/2021/06/logo.svg"
                  src={logo}
                  alt=""
                  data-no-lazy="1"
                  width="122"
                  height="30"
                />
              </a>
            </div>

            <div className={`h-[60px] hidden sm:block px-12 sm:px-0`}>
              <div className="">
                <ul className="flex items-center gap-[35px] font-bold text-[#425466] text-[14px]">
                  <li className="relative group py-[10px]">
                    <a
                      href="/#"
                      className="after:content-['*'] after:ml-2 after:text-red-500 block px-[10px] h-[40px] leading-[40px]"
                    >
                      Dịch vụ
                    </a>
                    {/* Menu con */}
                    <ul className="group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 absolute w-[600px] rounded-xl bg-white left-[-175px] top-full flex justify-around text-[16px] pt-9 p-4 uppercase opacity-0 pointer-events-none z-[999] shadow-2xl">
                      <li className="z-[999]">
                        <a href="#/">SẢN PHẨM DỊCH VỤ</a>
                        <div className="py-4 flex flex-col gap-4">
                          <a href="#/">Thanh toán học phí</a>
                          <a href="#/">Ngân hàng điện tử</a>
                        </div>
                      </li>
                      <li>
                        <a href="#/">THANH TOÁN HÓA ĐƠN</a>
                        <div className="py-4 flex flex-col gap-4">
                          <a href="#/">Học phí</a>
                          <a href="#/">Dịch vụ khác</a>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="relative group py-[10px]">
                    <a
                      href="/#"
                      className="after:content-['*'] after:ml-2 after:text-red-500 block px-[10px] h-[40px] leading-[40px]"
                    >
                      Tin tức
                    </a>
                    {/* Menu con */}
                    <ul className="group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 absolute w-[250px] rounded-xl bg-white left-[-75px] top-full text-[16px] p-4 opacity-0 pointer-events-none z-[999] shadow-2xl flex flex-col justify-items-center gap-7 px-10">
                      <li className="">
                        <a href="#/" className="hover:font-medium">
                          Sự kiện
                        </a>
                      </li>
                      <li>
                        <a href="#/" className="hover:font-medium">
                          Khuyến mãi
                        </a>
                      </li>
                      <li>
                        <a href="#/" className="hover:font-medium">
                          Thông báo
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/#" className="px-[10px]">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="px-[10px]">
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="px-[10px]">
                      Hỗ trợ
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="text-[#00cc8d] px-[10px]">
                      Đăng nhập
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="block sm:hidden cursor-pointer"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>
          {/* mobile */}
          <div
            className={`fixed top-[60px] left-0 w-full bg-white shadow-xl z-[2000] ${
              menuOpen ? "block" : "hidden"
            } sm:hidden`}
          >
            <ul className="flex flex-col gap-[15px] font-bold text-[#425466] text-[14px] p-4">
              <li className="relative group">
                <a href="/#" className="block px-[10px]">
                  Dịch vụ
                </a>

                <ul className="group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 absolute  rounded-xl bg-white w-full top-full flex flex-col text-[16px] pt-9 p-4 uppercase opacity-0 pointer-events-none z-[999] shadow-2xl">
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <a href="#/" className="block">
                      SẢN PHẨM DỊCH VỤ
                    </a>
                    <div className="flex flex-col pl-4">
                      <a href="#/" className="py-1">
                        Thanh toán học phí
                      </a>
                      <a href="#/" className="py-1">
                        Ngân hàng điện tử
                      </a>
                    </div>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <a href="#/" className="block">
                      THANH TOÁN HÓA ĐƠN
                    </a>
                    <div className="flex flex-col pl-4">
                      <a href="#/" className="py-1">
                        Học phí
                      </a>
                      <a href="#/" className="py-1">
                        Dịch vụ khác
                      </a>
                    </div>
                  </li>
                </ul>
              </li>

              <li className="relative group px-[10px]">
                <a
                  href="/#"
                  className="after:content-['*'] after:ml-2 after:text-red-500 block"
                >
                  Tin tức
                </a>
                {/* Menu con */}
                <ul className="group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 absolute rounded-xl bg-white w-full top-full text-[16px] p-4 opacity-0 pointer-events-none z-[999] shadow-2xl flex flex-col justify-items-center gap-7 px-10">
                  <li className="">
                    <a href="#/" className="hover:font-medium">
                      Sự kiện
                    </a>
                  </li>
                  <li>
                    <a href="#/" className="hover:font-medium">
                      Khuyến mãi
                    </a>
                  </li>
                  <li>
                    <a href="#/" className="hover:font-medium">
                      Thông báo
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#" className="px-[10px]">
                  Blog
                </a>
              </li>
              <li className="px-[10px]">
                <a href="/#">Giới thiệu</a>
              </li>
              <li className="px-[10px]">
                <a href="/#">Hỗ trợ</a>
              </li>
              <li className="px-[10px]">
                <a href="/#" className="text-[#00cc8d]">
                  Đăng nhập
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
