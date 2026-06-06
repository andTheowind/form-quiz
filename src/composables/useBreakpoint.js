import { onMounted, onUnmounted, ref } from 'vue'

export function useBreakpoint(query) {
  const mql = matchMedia(query)
  const matches = ref(mql.matches)

  function update() {
    matches.value = mql.matches
  }

  onMounted(() => {
    update()
    mql.addEventListener('change', update)
  })

  onUnmounted(() => {
    mql.removeEventListener('change', update)
  })

  return matches
}
