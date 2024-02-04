import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config({ path: `../.env` });
console.log(process.env.PORT);
const { PORT = 8080 } = process.env.PORT;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${process.env.API_BASE_URL}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
  },
})
