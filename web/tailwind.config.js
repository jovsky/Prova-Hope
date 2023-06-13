/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,ts,tsx}"],
    theme: {
        extend: {
            scale: {
                101: "1.01",
            },
        },
    },
    plugins: [],
};
