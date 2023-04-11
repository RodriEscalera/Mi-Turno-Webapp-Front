/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/*/.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homeImage: "url('https://im.ge/i/Dwe9Ey')",
      },
      colors: {
        violet: "#A442F1",
        violetHover: "#CC6AFF",
        violetSecondary: "rgba(164, 66, 241, 0.1)",
        violetSecondaryHover: "rgba(164, 66, 241, 0.2)",
        violetBackground: "#F0F0F0",
        grey1: "#F5F5F5",
        grey2: "#F0F0F0",
        grey3: "#E1E1E1",
        grey4: "#C8C8C8",
        grey5: "#AFAFAF",
        grey6: "#8C8C8C",
        grey7: "#6E6E6E",
        grey8: "#505050",
        exito: "#00A541",
        error: "#E53939",
        errorHover: "#E54949",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      boxShadow: {
        rl: "0 0 24px rgba(0, 0, 0, 0.12)",
        nav: "0px 0px 12px rgba(0, 0, 0, 0.08)",
        timer: "0px 3px 12px rgba(0, 0, 0, 0.2)",
      },
      width: {
        679: "679px",
        457: "457px",
        drop: "23rem",
        cb: "52rem",
        cbmd: "32rem",
      },
      height: {
        362: "362px",
        cb: "30rem",
        cbmd: "40rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
