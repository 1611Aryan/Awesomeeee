import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3000,
        proxy: {
            '/backend': {
                target: process.env.NODE_ENV === "production"
                    ? "https://awesomeeeee.herokuapp.com"
                    : "http://localhost:5000",
                //changeOrigin: true,
                rewrite: (path) => path.replace(/^\/backend/, '')
            },
        }
    }

})