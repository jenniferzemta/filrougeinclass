/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Active le dark mode manuel
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    //"./public/index.html"
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: '#0927EB', // Exemple : votre couleur bleue
      //   secondary: '#FD6E47', // Exemple : votre couleur orange
      // },
    
    },
  },
  plugins: [],
}

