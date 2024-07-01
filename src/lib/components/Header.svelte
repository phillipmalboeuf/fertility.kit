<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Link from './Link.svelte'
  import Logo from './Logo.svelte'

  import { page } from '$app/stores'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<header class="padded flex flex--gapped flex--column">
  <a href="/">
    <Logo step={$page.data.page?.fields.step} />
  </a>
  <nav class="flex flex--column">
    {#each navigation.fields.links as link}
    <Link {link} className={$page.url.pathname === link.fields.destination ? 'active' : undefined} />
    {/each}
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 25vw;

    > a {
      margin-bottom: $s1;
    }

    nav {
      font-family: $heading_font;
      font-weight: bold;

      :global(a) {
        margin-bottom: $s0;
        border-bottom: 1.5px solid transparent;

        &:focus,
        &:hover {
          border-color: currentColor;
        }
      }

      :global(a.active) {
        border-color: currentColor;
      }
    }
  }
</style>