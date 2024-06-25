<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Link from './Link.svelte'
  import Logo from './Logo.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<header class="padded flex flex--tight_gapped flex--column">
  <a href="/">
    <Logo />
  </a>
  <nav class="flex flex--tight_gapped flex--column">
    {#each navigation.fields.links as link}
    <Link {link} />
    {/each}
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 25vw;

    nav {
      font-family: $heading_font;
      font-weight: bold;
    }
  }
</style>