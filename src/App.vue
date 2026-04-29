<template>
    <div id="app">
        <Header />
        <main class="main-content">
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
.page-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}
</style>
