<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import NoScroll from './NoScroll.svelte'

  let { navigation, work }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let menu = $state(false)
  let scrollY = $state<number>(0)
</script>

<svelte:window bind:scrollY />

{#if menu}
<NoScroll />
{/if}

<header class="padded--thick flex flex--gapped" class:scrolled={scrollY > 0}>
  <a href="/" onclick={() => menu = false}>
    <Logo step={$page.data.page?.fields.step} />
  </a>
  <label for="menu">
    <input type="checkbox" id="menu" bind:checked={menu}>
    <svg width="42" height="15" viewBox="0 0 42 15">
    <line x1="42.0005" y1="1.64453" x2="0.000488159" y2="1.64453" stroke="currentColor" stroke-width="2"/>
    <line x1="42.0005" y1="7.64453" x2="0.0004882" y2="7.64453" stroke="currentColor" stroke-width="2"/>
    <line x1="42.0005" y1="13.6445" x2="0.0004882" y2="13.6445" stroke="currentColor" stroke-width="2"/>
    </svg>
    <svg width="42" height="16" viewBox="0 0 42 16">
    <path d="M27.8394 1.22461L14.0005 15.0634" stroke="currentColor" stroke-width="2"/>
    <path d="M27.8394 15.0645L14.0005 1.22562" stroke="currentColor" stroke-width="2"/>
    </svg>
  </label>
  <nav class="flex flex--column" onclick={() => menu = false}>
    {#each navigation.fields.links as link}
    <Link {link} className={$page.url.pathname === link.fields.destination ? 'active' : undefined} />
    {/each}

    <nav class="flex flex--tight_gapped flex--column work">
      {#if work.fields.title}
      <h6 class="h--alt">{@html work.fields.title}</h6>
      {/if}
      {#each work.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 25vw;

    @media (min-width: $mobile) {
      flex-direction: column;
    }

    @media (max-width: $mobile) {
      position: -webkit-sticky;
      position: sticky;
      width: 100vw;

      justify-content: space-between;
      align-items: center;
      transition: box-shadow 333ms, padding 333ms;

      &.scrolled {
        background-color: var(--color);
        box-shadow: 0 4px 4px $muted;
        padding-top: $s0;
        padding-bottom: $s-1;
      }
    }

    > a {
      display: block;

      @media (min-width: $mobile) {
        margin-bottom: $s0;
      }
    }

    > label {
      display: block;

      @media (min-width: $mobile) {
        display: none;
      }

      svg:last-of-type {
        display: none;
      }

      input {
        display: none;

        &:checked ~ svg {
          &:first-of-type {
            display: none;
          }

          &:last-of-type {
            display: block;
          }
        }
      }

      @media (max-width: $mobile) {
        &:has(input:checked) + nav {
          transform: translateY(0);
        }
      }
    }

    > a,
    > label {
      @media (max-width: $mobile) {
        position: relative;
        z-index: 50;
      }
    }

    > nav {
      font-family: $heading_font;
      font-weight: bold;

      :global(a) {
        margin-bottom: $s-2;
        border-bottom: 1.5px solid transparent;

        &:focus,
        &:hover {
          border-color: currentColor;
        }
      }

      :global(a.active) {
        border-color: currentColor;
      }

      .work {
        @media (min-width: $mobile) {
          display: none;
        }

        margin-top: auto;

        :global(a) {
          border-bottom: 1.5px solid;
        }
      }

      @media (max-width: $mobile) {
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100vw;
        height: min(100dvh, 100vh);

        padding: calc($s1 * 7) ($s1);
        background-color: $light;

        transition: transform 666ms;
        transform: translateY(-100%);

        > :global(a) {
          font-size: $s3;
          line-height: 1;
          margin-bottom: $s-1;
        }
      }
    }
  }
</style>