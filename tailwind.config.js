/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#1f2328",
        muted: "#68707d",
        paper: "#f7f8f6",
        line: "#dfe4e8",
        teal: "#0f766e",
        coral: "#dc5f45",
        gold: "#b38728"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 35, 40, 0.10)"
      }
    }
  },
  plugins: []
};
