import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { redirect } from 'next/navigation';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = '52';

    if (password === correctPassword) {
      document.cookie = `auth=${password}; path=/;`;
      router.push('/admin');
    } else {
      alert('Неверный пароль! Попробуйте еще раз.');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <h1>Вход в админ-панель</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <button type="submit">Войти</button>
      </form>
      <button className={styles.exit} onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default LoginPage;
