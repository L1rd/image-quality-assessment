import { useNavigate } from "react-router-dom";

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Ласкаво просимо</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
          >
            Увійти
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl"
          >
            Створити акаунт
          </button>

          <div className="relative group w-full">
            <button
              className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-xl"
              onClick={() => navigate("/main-app")}
            >
              Використовувати без входу
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              ⚠️ Оцінка якості зображення не буде збережена.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
