/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./resources/views/**/*.edge'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'corporate', 'dark'],
  },
}