<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Link from './Link.svelte'
  import Logo from './Logo.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="padded flex flex--thick_gapped">
  <div class="col col--3of12">
    <a href="/">
      <Logo />
    </a>
  </div>
  <div class="col col--9of12">
    <nav class="flex flex--tight_gapped flex--column">
      {#each navigation.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
  </div>
</footer>

<style lang="scss">
  footer {
    border-top: 2px solid;
    background-color: $light;

    nav {
      font-family: $heading_font;
      font-weight: bold;
    }
  }
</style>