<template>
    <div class="fixed-cta" :class="{ 'fixed-cta--visible': isVisible }">
        <a href="https://www.facebook.com/groups/576604161850781" target="_blank" class="fixed-cta__btn fixed-cta__btn--primary">
            <i class="fab fa-facebook-f"></i>
            <span>加入社群</span>
        </a>
        <a href="mailto:service@tcfc.org.tw" class="fixed-cta__btn fixed-cta__btn--outline">
            <i class="fas fa-envelope"></i>
            <span>聯絡我們</span>
        </a>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

function onScroll() {
    isVisible.value = window.scrollY > 300
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
@use '@/assets/styles/settings' as *;

.fixed-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    transform: translateY(100%);
    transition: transform 0.4s ease;

    &--visible {
        transform: translateY(0);
    }

    &__btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        padding: 1rem;
        font-size: 0.95rem;
        letter-spacing: 0.05em;
        text-decoration: none;
        font-weight: 600;
        transition: opacity 0.2s ease;

        i { font-size: 1rem; }

        &:hover { opacity: 0.85; }

        &--primary {
            background: $primary-color;
            color: #fff;
        }

        &--outline {
            background: #fff;
            color: $primary-color;
            border-top: 2px solid $primary-color;
        }
    }

    @media (max-width: $mobile-width) {
        &__btn span { font-size: 0.85rem; }
    }
}
</style>
