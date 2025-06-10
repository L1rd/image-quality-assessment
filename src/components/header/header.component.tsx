import { Link, useLocation, useNavigate } from "react-router-dom";

import LogoIcon from '../../assets/logo.svg'

const navLinks = [
  { name: "Головна", path: "/" },
  { name: "Оцінювання", path: "/evaluation" },
  { name: "Суб’єктивні метрики", path: "/subjective-assessment" },
  { name: "Об’єктивні метрики", path: "/objective-assessment" },
  { name: "Історія обчислень", path: "/history" },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => navigate("/")}
        >
         <img src={LogoIcon} alt="logo" className="h-13 w-13" /> <p className="text-2xl font-bold text-[#4A3E30]">ImageRate</p>
        </div>
        <nav className="space-x-4">
          {navLinks.map((link) => {
            return (              
				   <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium px-3 py-2 rounded-md transition ${
                location.pathname === link.path
                  ? "bg-[#C89F6B] text-[#4A3E30]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
