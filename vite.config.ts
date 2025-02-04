import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'


export default defineConfig({
    base: '/',
    plugins: [vue()],
    server: {
        port: 3000,
        open: true,
        host: true,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    define: {
        'process.env.VITE_GOOGLE_SHEETS_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_SHEETS_API_KEY),
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: fileURLToPath(new URL('./index.html', import.meta.url)),
            },
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/settings" as *;`
            }
        },
        devSourcemap: true
    }
})
console.log("VITE_GOOGLE_SHEETS_API_KEY:", process.env.VITE_GOOGLE_SHEETS_API_KEY);
