module.exports = {
  mode: 'jit',
  purge: {
    content: ['dist/**/*.html'],
    options: {
      safelist: [],
    },
  },
  theme: {
    extend: {
      colors: {
        change: 'black',
      },
    },
  },
  variants: {},
  plugins: [],
}
