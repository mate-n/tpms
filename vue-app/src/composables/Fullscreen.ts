import { ref } from 'vue'

export function useFullscreen() {
  const isFullScreen = ref(false)
  const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value
    const elem = document.documentElement
    if (isFullScreen.value) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }
  return { isFullScreen, toggleFullScreen }
}
