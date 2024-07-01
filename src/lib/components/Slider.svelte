<script lang="ts">
  import { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel'
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay'
  import Autoheight from 'embla-carousel-auto-height'
  import { onDestroy, onMount, type Snippet } from 'svelte'
  import { on } from 'svelte/events'

  let { slider = $bindable(), active = $bindable(0), disabled, buttons, autoheight, autoplay, dots, slidesPerView, children }: {
    slider?: EmblaCarouselType
    active?: number
    disabled?: boolean
    buttons?: boolean
    autoheight?: boolean
    autoplay?: boolean
    dots?: number
    slidesPerView?: number
    children: Snippet
  } = $props()

  let figure = $state<HTMLElement>()

  const plugins = [
    ...autoplay ? [Autoplay({ delay: 2666, stopOnFocusIn: true, stopOnMouseEnter: false, stopOnInteraction: true })] : [],
    ...autoheight ? [Autoheight()] : []
  ]

  onMount(() => {
    const off = on(figure, 'emblaInit', event => {
      // @ts-ignore
      slider = event.detail
      slider.on("select", () => active = slider.selectedScrollSnap())
    })
    
  })

  onDestroy(() => {
    slider?.destroy()
  })
</script>

{#if !disabled}
<figure class="slider" style:--view={`${100 / slidesPerView}%`} bind:this={figure} use:emblaCarouselSvelte={{ options: {
  loop: true,
  skipSnaps: true,
  ...slidesPerView > 1 ? {
    align: 'start'
  } : {}
}, plugins }}>
  {@render children()}
</figure>

{#if buttons}
<nav>
  <button class="previous" onclick={(e) => {
    e.preventDefault()
    slider.scrollPrev()
  }}><svg width="20" height="20" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L2 11.5L12 22" stroke="currentColor" stroke-width="2"/></svg></button>
  <button class="next" onclick={(e) => {
    e.preventDefault()
    slider.scrollNext()
  }}><svg width="20" height="20" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 22L11 11.5L0.999999 1" stroke="currentColor" stroke-width="2"/></svg></button>
</nav>
{/if}

{#if dots}
<nav class="dots">
  {#each Array(dots) as d, i}
  <button class="dot" class:active={active === i} onclick={() => {
    slider.scrollTo(i)
    // @ts-ignore
    slider.plugins().autoplay.reset()
  }}>{i}</button>
  {/each}
</nav>
{/if}
{:else}
<figure class="slider" style:--view={`${100 / slidesPerView}%`}>
  {@render children()}
</figure>
{/if}

<style lang="scss">
.slider {
  overflow: hidden;
  // cursor: ew-resize;
  position: relative;
  user-select: none;

  :global(.slider__container) {
    list-style: none;
    display: flex;
    align-items: flex-start;
    transition: height 333ms;
    padding: 0;
  }
    
    :global(.slide) {
      flex: 0 0 var(--view);
      min-width: 0;
    }
} 

nav {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: $base;
  right: $base;
  transform: translateY(-50%);
  pointer-events: none;

  display: flex;
  justify-content: space-between;

  // @media (max-width: $mobile) {
  //   &:not(.dots) {
  //     position: static;
  //     gap: $mobile_base;
  //   }
  // }

  button {
    pointer-events: auto;
    // width: 0;
    display: inline-flex;
    justify-content: center;
    border-radius: 50%;
    padding: $base * 0.5;
  }

  &.dots {
    top: auto;
    left: auto;
    bottom: calc(100% + ($base * 0.5));
    right: $base * 0.5;
    transform: none;

    gap: $base * 0.333;

    button.dot {
      font-size: 0;
      padding: $base * 0.25;
      background-color: $light;

      &.active {
        background-color: $green;
      }
    }
  }
}
</style>