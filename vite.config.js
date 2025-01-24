import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
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
            '@': path.resolve(__dirname, './src'),
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
