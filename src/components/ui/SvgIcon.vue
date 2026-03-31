<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  color: { type: String, default: 'currentColor' },
  size: { type: [Number, String], default: null },
})

const icons = {
  close: {
    viewBox: '0 0 18 18',
    defaultSize: 18,
    template: (c) =>
      `<path d="M16.75 0.75L0.75 16.75M0.75 0.75L16.75 16.75" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  star: {
    viewBox: '0 0 35 35',
    defaultSize: 35,
    template: (c) =>
      `<path d="M18.8192 1.66727C18.6633 1.38906 18.436 1.15743 18.1609 0.996204C17.8857 0.834983 17.5725 0.75 17.2536 0.75C16.9346 0.75 16.6215 0.834983 16.3463 0.996204C16.0711 1.15743 15.8438 1.38906 15.6879 1.66727C15.3212 2.3346 14.9686 3.01049 14.6301 3.69494C13.5634 5.86002 12.6566 8.10022 11.9167 10.3976C11.6619 11.1878 10.9066 11.7359 10.0412 11.7598C7.41813 11.8287 4.80357 12.0891 2.2184 12.5389C0.799402 12.7883 0.265902 14.4053 1.27424 15.3916C1.50401 15.6177 1.73624 15.8408 1.9709 16.0608C3.72551 17.7178 5.58071 19.2651 7.5259 20.6936C8.19874 21.1868 8.47557 22.0319 8.2189 22.8056C7.24117 25.7445 6.54144 28.7687 6.1289 31.8384C5.94557 33.2226 7.4269 34.1998 8.7139 33.5398C11.266 32.2312 13.7064 30.7155 16.0106 29.0078C16.3715 28.7443 16.8067 28.6024 17.2536 28.6024C17.7004 28.6024 18.1357 28.7443 18.4966 29.0078C20.8003 30.7161 23.2408 32.2319 25.7932 33.5398C27.0784 34.1998 28.5616 33.2226 28.3782 31.8384C28.3073 31.319 28.2297 30.8026 28.1454 30.2893C27.7219 27.7502 27.1009 25.2481 26.2882 22.8056C26.0316 22.0319 26.3066 21.1868 26.9812 20.6936C29.1881 19.0766 31.2772 17.3048 33.2329 15.3916C34.2412 14.4053 33.7096 12.7883 32.2887 12.5389C29.7039 12.0865 27.0892 11.8261 24.4659 11.7598C24.0511 11.7532 23.6485 11.6188 23.3129 11.3751C22.9773 11.1313 22.725 10.79 22.5904 10.3976C21.6163 7.37383 20.3535 4.44902 18.8192 1.66727Z" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="${c}"/>`,
  },
  check: {
    viewBox: '0 0 24 24',
    defaultSize: 36,
    template: (c) =>
      `<path d="M20 6L9 17L4 12" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  warning: {
    viewBox: '0 0 24 24',
    defaultSize: 36,
    template: (c) =>
      `<path d="M12 9v4m0 4h.01M12 3l9.5 16.5H2.5L12 3z" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
}

const iconData = computed(() => icons[props.name])

const svgSize = computed(() => {
  if (props.size) return Number(props.size)
  return iconData.value?.defaultSize ?? 18
})

const svgContent = computed(() => iconData.value?.template(props.color) ?? '')
</script>

<template>
  <svg
    v-if="iconData"
    :width="svgSize"
    :height="svgSize"
    :viewBox="iconData.viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-html="svgContent"
  />
</template>
