import type { Directive } from 'vue'

const scrollReveal: Directive = {
  mounted(el, binding) {
    const delay = binding.value?.delay || 0
    const direction = binding.value?.direction || 'up' // up | left | right

    const translateMap: Record<string, string> = {
      up: 'translateY(40px)',
      left: 'translateX(-40px)',
      right: 'translateX(40px)',
    }

    el.style.opacity = '0'
    el.style.transform = translateMap[direction]
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'none'
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
  },
}

export default scrollReveal
