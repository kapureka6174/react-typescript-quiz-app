module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  mode: process.env.NODE_ENV ? 'jit' : undefined,
};
