import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true,
        allowedHosts: ["howl"],
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
});
