import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path' // 加入這行

export default defineConfig({
    // 設定為您的儲存庫名稱
    base: '/tcfc/',
    // 設定 Vue 插件
    plugins: [vue()],
    // 設定開發伺服器
    server: {
        port: 3000,          // 設定開發伺服器埠號
        open: true,          // 自動開啟瀏覽器
        host: true,          // 允許外部存取
    },
    // 設定路徑別名
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)) // 使用 fileURLToPath
        },
    },
    // 設定建構選項
    build: {
        outDir: 'dist',      // 輸出目錄
        assetsDir: 'assets', // 靜態資源目錄
        sourcemap: true,     // 產生 sourcemap
    },
    // CSS 相關配置
    css: {
        devSourcemap: true   // CSS sourcemap
    }
})
