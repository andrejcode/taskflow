import daisyui from 'daisyui';
import tailwindcsstypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [tailwindcsstypography, daisyui],
};
