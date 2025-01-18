import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';

export default function Root() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <header></header>
      <main>
        <div className="container mx-auto py-10 text-center">
          <h1 className="text-primary">Hello, DaisyUI in React!</h1>
          <button onClick={toggleTheme} className="btn mt-5">
            Toggle Theme
          </button>
        </div>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
