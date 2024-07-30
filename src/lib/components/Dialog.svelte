<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import type { Snippet } from 'svelte'
  import { page } from '$app/stores'

  // import Icon from './Icon.svelte'
  import { goto, pushState, replaceState } from '$app/navigation'
  import { browser } from '$app/environment'
  
  import ExplorePage from '../../routes/explore/+page.svelte'
  import ExploreItemPage from '../../routes/explore/[id]/+page.svelte'
  import NoScroll from './NoScroll.svelte'

  const close = () => pushState($page.url.href, {})

  let flying = $state(false)
</script>

{#if $page.state.data}
<NoScroll />
<button class="button--none close" transition:fade={{ duration: 333 }} onclick={close} >
  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M1 15L15 1" stroke="currentColor"/><path d="M1 0.999999L15 15" stroke="currentColor"/></svg>
</button>

<dialog transition:fly={{ opacity: 1, x: '110%', duration: 666 }} class:flying
  onintrostart={() => flying = true}
  onintroend={() => flying = false}
  onoutrostart={() => flying = true}
  onoutroend={() => flying = false}>
  {#if $page.state.href.includes(`/explore`)}
  <svelte:component this={ExplorePage} data={$page.state.data} />
  {/if}

  {#if $page.state.href.includes(`/explore/`)}
  <dialog transition:fly={{ opacity: 1, x: '-110%', duration: 666 }}>
    <svelte:component this={ExploreItemPage} data={$page.state.data} />
  </dialog>
  {/if}
</dialog>
<button class="back" transition:fade={{ duration: 333 }} onclick={close}></button>
{/if}

<style lang="scss">
  dialog {
    display: block;
    position: fixed;
    top: calc($s0 + $s5);
    right: $s0;
    left: auto;
    // transform: translateX(-50%);
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    width: 90vw;
    max-width: $max * 0.333;
    max-height: calc(100vh - (($s0 + $s5) * 2));
    z-index: 2000;
    border: none;
    border-radius: $s0;

    color: currentColor;
    background-color: $light;
    will-change: transform;

    dialog {
      top: 0;
      right: 0;
    }

    &.flying {
      dialog {
        position: absolute;
        top: 0;
        right: 0;
        transform: none !important;
      }
    }

    // &.wide {
    //   max-width: none;
    // }

    // > article {
    //   position: absolute;
    //   z-index: 4;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   overflow-y: auto;
    //   background-color: $light;
    // }
  }

  .back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1999;
    background: fade-out($color: $light, $amount: 0.8);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: 0;
    padding: 0;
    border: none;
  }

  .close {
    position: fixed;
    top: $s0;
    right: $s0;
    z-index: 2001;
    // transition: transform 333ms;

    // &:hover,
    // &:focus {
    //   transform: translateX(20%);
    // }
  }
</style>