/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        color: {
            'primary': "#232A3B",
            'secondary': "#293145",
            'tertiary': "#313A56",
        },
        outlineOffset: {
            3: '3px',
        }
    },
    plugins: [],
}