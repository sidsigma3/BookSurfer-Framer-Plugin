/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                booksurfer: {
                    primary: "#6B3A2A",
                    secondary: "#FAF8F5",
                },
            },
        },
    },
    plugins: [],
}
