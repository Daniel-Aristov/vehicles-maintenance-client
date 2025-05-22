import { DirectiveBinding, ObjectDirective } from 'vue'

type ClickOutsideElement = HTMLElement & {
  clickOutsideEvent?: (event: Event) => void
}

export const clickOutside: ObjectDirective = {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: ClickOutsideElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}
