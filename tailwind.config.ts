import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    //'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    //'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },

    extend: {
      // colors: {
      //   gray: colors.gray,
      // },
    },
  },
  plugins: [],
}
export default config
