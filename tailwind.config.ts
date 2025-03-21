/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', 
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#111317', // لون الخلفية الأساسي
          secondary: '#1E1F22', // يمكنك إضافة ألوان إضافية
          textPrimary: '#eeaaff', // لون النص في الوضع الداكن
          textSecondary: '#000000', // لون النص في الوضع الفاتح
        },
      },
    },
    plugins: [],
  };
  