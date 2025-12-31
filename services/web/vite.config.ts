import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true,
        allowedHosts: ["neal-minipc"],
        port: 5173
    }
});
