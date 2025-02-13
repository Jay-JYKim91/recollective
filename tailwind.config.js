/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Caveat", "cursive"],
      },
      colors: {
        primary: {
          blue: "#5C7AEA", // Muted Blue
          teal: "#5ABFBF", // Soft Teal
          beige: "#F6F1E9", // Warm Beige
        },
        accent: {
          yellow: "#FFC857", // Golden Yellow
          plum: "#623CEA", // Deep Plum
        },
        neutral: {
          gray: "#EDEDED", // Soft Gray
          charcoal: "#333333", // Charcoal Gray
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        recollective: {
          primary: "#5C7AEA", // Muted Blue
          secondary: "#5ABFBF", // Soft Teal
          accent: "#FFC857", // Golden Yellow
          neutral: "#EDEDED", // Soft Gray
          "base-100": "#F6F1E9", // Warm Beige (배경)
          info: "#623CEA", // Deep Plum
          success: "#00A676", // 성공 (보통 초록 계열)
          warning: "#FFB347", // 경고 (조금 더 따뜻한 오렌지 느낌)
          error: "#FF4C4C", // 오류 (더 강한 빨강)
          // "text-primary": "#333333", // Charcoal Gray (텍스트 기본 색상)
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
