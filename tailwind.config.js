/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'), // Enables Tailwind-styled forms
    ],
};
