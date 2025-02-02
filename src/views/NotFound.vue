<template>
    <div class="not-found">
        <div class="not-found__container">
            <h1 class="not-found__title floating">404</h1>
            <h2 class="not-found__subtitle">找不到頁面</h2>
            <p class="not-found__text">
                很抱歉，您所尋找的頁面不存在或已被移除。
                請檢查網址是否正確，或返回首頁繼續瀏覽。
            </p>
            <router-link to="/" class="not-found__button">
                返回首頁
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NotFound',
    mounted() {
        // 設定頁面標題
        document.title = '404 - 頁面未找到 | 臺中市體育總會足球委員會'
    }
})
</script>
