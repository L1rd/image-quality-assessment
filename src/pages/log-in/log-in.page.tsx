import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStayLogged, setIsStayLogged] = useState(false);
  const [error, setError] = useState('');

  const saveUserSession = (user: { email: string; password: string; stayLoggedIn: boolean }) => {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    if (user.stayLoggedIn) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (!existingUser) {
      setError('Користувача не знайдено або пароль неправильний');
      return;
    }

    saveUserSession({ email, password, stayLoggedIn: isStayLogged });
    navigate('/main-app');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Вхід</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Електронна пошта"
            className="w-full border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={isStayLogged}
              onChange={(e) => setIsStayLogged(e.target.checked)}
            />
            <span>Залишатися в системі</span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Увійти
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Ще не маєте акаунту?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
};
