import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find((user: any) =>
      user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (existingUser) {
      setError('Даний користувач вже зареєстрований');
    } else {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem('users', JSON.stringify([...users, newUser]));

      sessionStorage.setItem(
        'currentUser',
        JSON.stringify({
          email: formData.email,
          password: formData.password,
          stayLoggedIn: false, // or true if you add a checkbox
        })
      );

      navigate('/main-app');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Створити акаунт</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          >
            Зареєструватися
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Вже маєте акаунт?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
};
