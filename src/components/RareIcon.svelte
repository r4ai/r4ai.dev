<script lang="ts">
  import { spring } from "svelte/motion";
  import { twMerge } from "tailwind-merge";

  // * Props
  let className: string;
  export { className as class };

  // * Refs
  let cardWrapper: HTMLDivElement | undefined = undefined;

  // * Variables
  let pos = spring(
    { x: 0.5, y: 0.5 },
    {
      stiffness: 0.005,
      damping: 0.1,
    }
  );

  // * Event Handlers
  const handleMouseMove = (e: MouseEvent) => {
    const cardWrapperRect = cardWrapper?.getBoundingClientRect();
    if (!cardWrapperRect) return;

    const mousePos = {
      x: e.clientX,
      y: e.clientY,
    };

    pos.set({
      x: (mousePos.x - cardWrapperRect.x) / cardWrapperRect.width,
      y: (mousePos.y - cardWrapperRect.y) / cardWrapperRect.height,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    const cardWrapperRect = cardWrapper?.getBoundingClientRect();
    if (!cardWrapperRect) return;

    const touchPos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    pos.set({
      x: (touchPos.x - cardWrapperRect.x) / cardWrapperRect.width,
      y: (touchPos.y - cardWrapperRect.y) / cardWrapperRect.height,
    });
  };

  const handleMouseLeave = (e: MouseEvent) => {
    pos.set({ x: 0.5, y: 0.5 });
  };

  const handleTouchLeave = (e: TouchEvent) => {
    pos.set({ x: 0.5, y: 0.5 });
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={twMerge("card-wrapper", className)}
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  on:touchmove={handleTouchMove}
  on:touchcancel={handleTouchLeave}
  bind:this={cardWrapper}
  style="--ratio-x: {$pos.x}; --ratio-y: {$pos.y};"
>
  <slot class="image z-0 drop-shadow-lg" />
  <svg width="0" height="0">
    <clipPath id="iconClip" clipPathUnits="objectBoundingBox">
      <path
        d="M137.563 0.00991593C206.548 -0.836435 261.231 52.6129 279.301 115.473C294.917 169.799 259.023 221.015 210.493 253.718C163.476 285.401 101.678 298.349 54.383 267.037C4.87748 234.263 -10.3324 173.582 6.72698 118.817C25.602 58.2236 70.669 0.830612 137.563 0.00991593Z"
        transform="scale(0.00353356890459363957597173144876 0.00350877192982456140350877192982)"
      />
    </clipPath>
  </svg>
  <div class="card pattern" />
  <div class="card color" />
  <div class="card color" />
  <div class="card highlight" />
</div>

<style lang="scss">
  :root {
    --angle: 50deg;
  }

  .card-wrapper {
    @apply relative z-10 h-full w-full transition-opacity;
    perspective: 1000px;
  }

  .card {
    @apply absolute z-20 h-full w-full -translate-y-full;
    clip-path: url(#iconClip);
  }

  .pattern {
    background: repeating-radial-gradient(
      circle at -150% -25%,
      #ff0000,
      #0011ff 3px,
      #1eff00 3px
    );
    background-position: 50% 50%;
    background-size: 120% 120%;
    mix-blend-mode: color-dodge;
    opacity: 0.3;
  }

  .color {
    background: linear-gradient(
      115deg,
      transparent 18%,
      #b654cc 20%,
      transparent 42% 46%,
      #404fbf 70%,
      transparent
    );
    background-position: 50% 50%;
    background-size: 200% 200%;
    mix-blend-mode: overlay;
  }

  .highlight {
    @apply transition-opacity duration-500;
    background: radial-gradient(
      circle at calc(var(--ratio-x) * 100%) calc(var(--ratio-y) * 100%),
      hsl(0 0% 100% / 0.2),
      transparent 40%
    );
    background-repeat: no-repeat;
    opacity: 0;
  }

  /* 3D Camera Effect */
  .card-wrapper {
    transform: rotateX(calc((var(--ratio-y) - 0.5) * var(--angle)))
      rotateY(calc(((var(--ratio-x) - 0.5)) * var(--angle)));
  }

  .card-wrapper .card,
  .card-wrapper .image {
    translate: calc((var(--ratio-x) - 0.5) * var(--angle))
      calc((var(--ratio-y) - 0.5) * var(--angle));
  }

  /* Horogram Effect */
  .card-wrapper:hover > .pattern {
    background-position: calc(50% + (var(--ratio-x) * -50%))
      calc(((var(--ratio-y) - 0.5) * 50%));
  }

  .card-wrapper > .color {
    background-position: calc(50% + ((var(--ratio-y) - 0.5) * -50%))
      calc(50% + ((var(--ratio-y) - 0.5) * -50%));
  }

  .card-wrapper:hover > .highlight {
    opacity: 1;
  }
</style>
