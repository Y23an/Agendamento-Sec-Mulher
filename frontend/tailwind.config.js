/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ceamLilas: '#783FA8',
        ceamAzul: '#253DD9',
        ceamAzulEscuro: '#0C205F',
        ceamVerde: '#009A97',
        ceamFundo: '#F5F5F5',
      }
    },
  },
  plugins: [],
}
