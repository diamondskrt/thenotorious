import { VNodeDirective } from 'vue';

export default {
  bind: (el: HTMLElement, binding: VNodeDirective): void => {
    const container = el;
    container.innerHTML = binding.value;
  },
  update: (el: HTMLElement, binding: VNodeDirective): void => {
    const numberAnimation = (element: HTMLElement, oldValue: number, newValue: number) => {
      let start: number;
      const duration = 300;
      const container = element;

      function step(timestamp: number) {
        if (!start) {
          start = timestamp;
        }

        const progress = timestamp - start;

        container.innerHTML = `
          ${Math.round(oldValue + (newValue - oldValue) * progress / duration)}
        `;

        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          container.innerHTML = `${newValue}`;
        }
      }

      container.innerHTML = `${oldValue}`;

      window.requestAnimationFrame(step);
    };

    if (binding.value !== binding.oldValue && binding.value !== false) {
      numberAnimation(el, binding.oldValue, binding.value);
    }
  },
};
