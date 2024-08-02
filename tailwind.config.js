/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A5319',
        secondary: '#508D4E',
        accent: '#80AF81'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [{
      mytheme: {
        primary: '#1A5319',
        secondary: '#508D4E',
        accent: '#80AF81',
        'neutral': '#3D4451',
        'base-100': '#FFFFFF',
        'info': '#3ABFF8',
        'success': '#36D399',
        'warning': '#FBBD23',
        'error': '#F87272',
      }
    },
    'light'
  ],
    base: false
  }
}

