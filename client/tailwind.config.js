/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      gray: {
        0: "#070C1B",
        100: "#21263F",
        200: "#565F7E",
        300: "#8B93B0",
        400: "#C8CEDD",
      },
      blue: {
        100: "#4E7BEE",
        200: "#1E29A8",
        300: "#0C1580",
      },
      green: "#00A372",
      red: "#E5364B",
      white: "#FFFFFF",
    },
    fontSize: {
      head1: [
        "56px",
        {
          lineHeight: "64px",
          fontWeight: "700",
        },
      ],
      head2: [
        "36px",
        {
          lineHeight: "44px",
          fontWeight: "700",
        },
      ],
      head3: [
        "24px",
        {
          lineHeight: "30px",
          fontWeight: "700",
        },
      ],
      head4: [
        "36px",
        {
          lineHeight: "26px",
          fontWeight: "700",
        },
      ],
      body1M: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "700",
        },
      ],
      body1R: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      body2M: [
        "14px",
        {
          lineHeight: "20px",
          fontWeight: "500",
        },
      ],
      body2R: [
        "14px",
        {
          lineHeight: "20px",
          fontWeight: "400",
        },
      ],
      body2M: [
        "12px",
        {
          lineHeight: "18px",
          fontWeight: "400",
        },
      ],
    },
  },
  plugins: [require("daisyui")],
};
