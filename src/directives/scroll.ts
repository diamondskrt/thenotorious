import { VNodeDirective } from 'vue';

export default {
  bind: (el: HTMLElement, binding: VNodeDirective): void => {
    el.addEventListener('click', scrollTo)

    function scrollTo() {
      const scrollElement = document.querySelector(binding.value) as HTMLElement;
      scrollElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  },
};
